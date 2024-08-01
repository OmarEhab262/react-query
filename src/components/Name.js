import React, { useState } from "react";
import axiosUser from "../config/axiosUser";
import Spinner from "./ui/Spinner";
import toast from "react-hot-toast";
import { useUserData } from "../hooks/userData";
import { Link } from "react-router-dom";

export const Name = () => {
  // State to manage the update mode and user name
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  // Callback for successful data fetching
  const onSuccess = () => {
    toast.success("Successfully fetched users!");
  };

  // Callback for handling errors during data fetching
  const onError = (err) => {
    toast.error(err.message);
  };

  // Custom hook to fetch user data with error and success callbacks
  const { data, isLoading, error, isFetching, refetch } = useUserData(
    onError,
    onSuccess
  );

  // Function to handle user deletion
  const handelDelete = async (userId) => {
    try {
      await axiosUser.delete(`/users/${userId}`);
      // Optionally refetch or handle successful deletion here
    } catch (error) {
      console.error("Error deleting user", error);
    } finally {
      refetch(); // Refetch user data after deletion
    }
  };

  // Function to handle update mode and set the name for the user to be updated
  const handleUpdateName = (userId) => {
    setCurrentUserId(userId);
    setUpdate(!update);
    const user = data.find((user) => user.id === userId);
    if (user) setName(user.name);
  };

  // Function to handle changes in the name input field
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Function to save the updated user name
  const handleSaveUpdate = async () => {
    try {
      await axiosUser.put(`/users/${currentUserId}`, { name });
      setUpdate(false);
      setCurrentUserId(null);
      // Optionally refetch or handle successful update here
    } catch (error) {
      console.error("Error updating user", error);
    } finally {
      refetch(); // Refetch user data after update
    }
  };

  // Display a spinner while loading data
  if (isLoading || isFetching) {
    return <Spinner />;
  }

  return (
    <div className="text-white">
      <h1>Name</h1>
      {error && <div>{`An error has occurred: ${error.message}`}</div>}
      {data &&
        data?.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            {update && currentUserId === user.id && (
              <input
                onChange={handleNameChange}
                value={name}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Name"
                required
              />
            )}
            <button
              className="text-white bg-blue-700 px-4 py-2 rounded-md m-3"
              onClick={() => handleUpdateName(user.id)}
            >
              Update User
            </button>
            {update && currentUserId === user.id && (
              <button
                className="text-white bg-blue-700 px-4 py-2 rounded-md m-3"
                onClick={handleSaveUpdate}
              >
                Save Update
              </button>
            )}
            <button
              className="text-white bg-red-700 px-4 py-2 rounded-md m-3"
              onClick={() => handelDelete(user.id)}
            >
              Delete User
            </button>
            <Link
              to={`/details/${user.id}`}
              className="text-white bg-green-700 px-4 py-2 rounded-md m-3"
            >
              User Id
            </Link>
          </div>
        ))}
      {!data && (
        <button
          onClick={refetch}
          className="text-white bg-blue-700 px-4 py-2 rounded-md m-3"
        >
          Refetch Data
        </button>
      )}
    </div>
  );
};
