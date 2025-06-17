import { useState, useCallback } from "react";
import axios from "axios";
const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:3000";
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;


export function useUserProfile() {
    const [userData, setUserData] = useState(null);

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem("key");
        if (!token) return null;
        try {
            const response = await axios.get(
                `${API_BASE}/api/users/token/${token}`,
                { headers: { Authorization: token } }
            );
            setUserData(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }, []);

    const updateUser = async (updatedData) => {
        const token = localStorage.getItem("key");
        if (!token) throw new Error("Token not found");
        try {
            const response = await axios.put(
                `${API_BASE}/api/users/${updatedData._id}`,
                updatedData,
                { headers: { Authorization: token } }
            );
            setUserData(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const deleteUser = async (userId) => {
        const token = localStorage.getItem("key");
        if (!token) throw new Error("Token not found");
        try {
            await axios.delete(`${API_BASE}/api/users/${userId}`, {
                headers: { Authorization: token },
            });
            localStorage.removeItem("key");
            return true;
        } catch (error) {
            throw error;
        }
    };

    const uploadImage = async (file) => {
        try {
            const imageFormData = new FormData();
            imageFormData.append("file", file);
            imageFormData.append(
                "upload_preset",
                UPLOAD_PRESET
            );
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
                imageFormData
            );
            return response.data.secure_url;
        } catch (error) {
            throw error;
        }
    };

    return { userData, setUserData, fetchUser, updateUser, deleteUser, uploadImage };
}