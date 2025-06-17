import React, { useState, useEffect, useContext } from "react";
import { useUserProfile } from "../../hooks/useUserProfileData";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import profile from "../../assets/profilePicture.jpg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import userContext from "../../context/UserContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const authContext = useContext(userContext);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const {
    userData,
    setUserData,
    fetchUser,
    updateUser,
    deleteUser,
    uploadImage,
  } = useUserProfile();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const toggleEdit = () => setIsEditing(!isEditing);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let imageUrl = userData.profilePicture;

    if (profilePictureFile) {
      try {
        imageUrl = await uploadImage(profilePictureFile);
      } catch (error) {
        toast.error("Error uploading image");
        return;
      }
    }

    try {
      const updatedData = { ...userData, profilePicture: imageUrl };
      await updateUser(updatedData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update user profile");
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userData._id);
      toast.success("User deleted successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to delete user profile");
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row p-4 ">
      {/* Profile Details */}
      <div className="flex-1 p-6 bg-[#fffff0] rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profile</h2>
          <Button
            onClick={toggleEdit}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            <FaEdit />
            <span>Edit</span>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 flex justify-center">
            <img
              src={userData.profilePicture || profile}
              onError={(e) => (e.target.src = profile)}
              alt="User Profile"
              className="w-44 h-44 rounded-full shadow-md"
            />

          </div>
          <div>
            <p className="font-bold text-gray-600">Username</p>
            <p>{userData.username}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">First Name</p>
            <p>{userData.firstName}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">Last Name</p>
            <p>{userData.lastName}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">Email</p>
            <p>{userData.email}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">Phone Number</p>
            <p>{userData.phoneNumber}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">Pincode</p>
            <p>{userData.pincode}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">Address</p>
            <p>{userData.address}</p>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-[#fffff0] p-6 shadow-lg transform transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Edit Profile</h3>
            <Button
              onClick={toggleEdit}
              className="flex items-center bg-gray-500 space-x-2 text-gray-100 hover:text-gray-800  px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FaTimes />
            </Button>
          </div>
          <form className="space-y-4" onSubmit={handleSave}>
            <Input
              label="First Name"
              name="firstName"
              placeholder="First Name"
              value={userData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              value={userData.lastName}
              onChange={handleInputChange}
            />
            <Input
              label="Address"
              name="address"
              placeholder="Address"
              value={userData.address}
              onChange={handleInputChange}
            />
            <Input
              label="Pincode"
              name="pincode"
              placeholder="Pincode"
              value={userData.pincode}
              onChange={handleInputChange}
            />
            <div className="flex justify-between">
              <Button
                onClick={handleDelete}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                <FaTrash />
                <span>Delete</span>
              </Button>
              <Button
                type="submit"
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                <FaSave />
                <span>Save</span>
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
