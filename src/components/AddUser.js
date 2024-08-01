import React, { useState } from "react";
import axiosUser from "../config/axiosUser";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
const AddUser = () => {
  const [name, setName] = useState("");
  //   const [id, setId] = useState(7);
  const [userName, setUserName] = useState("");
  const handelSubmit = (e) => {
    e.preventDefault();
    const user = { id: uuidv4(), name, username: userName };
    axiosUser.post(`/users`, user).then((res) => console.log("data", res));
    // alert("user ADD");
    setName("");
    setUserName("");
  };

  //   setInterval(() => {
  //     const user = {
  //       id: uuidv4(),
  //       name: faker.person.firstName(),
  //       username: faker.person.lastName(),
  //     };
  //     axiosUser.post(`/users`, user).then((res) => console.log("data", res));
  //     // alert("user ADD");
  //     setName("");
  //     setUserName("");
  //   }, 2000);
  const handelName = (e) => {
    setName(e.target.value);
    console.log("name: ", name);
  };
  const handelUserName = (e) => {
    setUserName(e.target.value);
    console.log("userName: ", userName);
  };

  return (
    <>
      <div className="text-center">
        {" "}
        <h1>AddUser</h1>
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
                onChange={(e) => handelName(e)}
                value={name}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Name"
                // required
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your UserNama
              </label>
              <input
                value={userName}
                onChange={(e) => handelUserName(e)}
                type="text"
                name="username"
                id="username"
                placeholder="User Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                // required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
