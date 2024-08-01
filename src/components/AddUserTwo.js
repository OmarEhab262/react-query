import React, { useState } from "react";
// import { useAddUserData } from "../hooks/userData";
import toast from "react-hot-toast";
import axiosUser from "../config/axiosUser";
import { useMutation } from "react-query";

const AddUserTwo = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  // Extract mutation function and states from useAddUserData hook
  const useCreateUserMutation = () => {
    return useMutation(async (user) => {
      return axiosUser.post(`/users`, user);
    });
  };

  // Usage example:
  const { mutate, isLoading, isError, error } = useCreateUserMutation();

  // Handle form submission
  const handelSubmit = (e) => {
    e.preventDefault();
    // Call the mutation function
    mutate({ name, username: userName });

    // Reset the form
    setName("");
    setUserName("");
    toast.success("User added successfully");
  };

  // Handle name input change
  const handelName = (e) => setName(e.target.value);

  // Handle username input change
  const handelUserName = (e) => setUserName(e.target.value);

  return (
    <>
      <div className="text-center">
        <h1>Add User</h1>
      </div>
      <div className="form">
        <div className="w-full mx-auto my-10 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handelSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign up to our platform
            </h5>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Name
              </label>
              <input
                onChange={handelName}
                value={name}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Username
              </label>
              <input
                value={userName}
                onChange={handelUserName}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            {isError && (
              <div className="text-red-500">Error: {error.message}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUserTwo;
