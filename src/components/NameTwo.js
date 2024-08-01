import React, { useState } from "react";
import axiosUser from "../config/axiosUser";
import Spinner from "./ui/Spinner";
import toast from "react-hot-toast";
import { useUserData } from "../hooks/userData";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

export const NameTwo = () => {
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const queryClient = useQueryClient();

  // Custom hook to fetch user data
  const { data, isLoading, error, isFetching } = useUserData();

  // Mutation for deleting a user
  const deleteUserMutation = useMutation({
    mutationFn: (userId) => axiosUser.delete(`/users/${userId}`),
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries(["users"]); // Invalidate and refetch user data
    },
    onError: (error) => {
      toast.error(`Error deleting user: ${error.message}`);
    },
  });

  // Mutation for updating a user
  const updateUserMutation = useMutation({
    mutationFn: (user) =>
      axiosUser.put(`/users/${user.id}`, { name: user.name }),
    onSuccess: () => {
      toast.success("User updated successfully!");
      setUpdate(false);
      setCurrentUserId(null);
      queryClient.invalidateQueries(["users"]); // Invalidate and refetch user data
    },
    onError: (error) => {
      toast.error(`Error updating user: ${error.message}`);
    },
  });

  const handleUpdateName = (userId) => {
    setCurrentUserId(userId);
    setUpdate(!update);
    const user = data.find((user) => user.id === userId);
    if (user) setName(user.name);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSaveUpdate = () => {
    updateUserMutation.mutate({ id: currentUserId, name });
  };

  const handleDelete = (userId) => {
    deleteUserMutation.mutate(userId);
  };

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
              onClick={() => handleDelete(user.id)}
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
          onClick={() => queryClient.invalidateQueries(["users"])}
          className="text-white bg-blue-700 px-4 py-2 rounded-md m-3"
        >
          Refetch Data
        </button>
      )}
    </div>
  );
};
