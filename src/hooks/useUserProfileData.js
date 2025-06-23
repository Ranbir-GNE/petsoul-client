import { useState, useContext, useEffect } from "react";
import axios from "axios";
const API_BASE = import.meta.env.VITE_APP_API_BASE;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
import userContext from "../context/UserContext";

export function useUserProfile() {
    const authContext = useContext(userContext);
    const [userData, setUserData] = useState(null);

    const userId = authContext?.userData?._id;

    useEffect(() => {
        if (authContext?.userData) {
            setUserData(authContext.userData);
        }
    }, [authContext]);

    const updateUser = async (updatedData) => {
        const token = localStorage.getItem("key");
        if (!token) throw new Error("Token not found");
        try {
            const response = await axios.put(
                `${API_BASE}/api/users/${userId}`,
                updatedData,
                { headers: { Authorization: token } }
            );
            setUserData(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const deleteUser = async () => {
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
            imageFormData.append("upload_preset", UPLOAD_PRESET);
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
                imageFormData
            );
            return response.data.secure_url;
        } catch (error) {
            throw error;
        }
    };

    return { userData, setUserData, updateUser, deleteUser, uploadImage, userId };
}
