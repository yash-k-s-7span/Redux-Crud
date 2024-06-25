/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/user-details-slice";

const Create = () => {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserData = (e) => {
      setUsers({ ...users, [e.target.name]: e.target.value });
      console.log(users);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("users...", users);
    dispatch(createUser(users));
    setUsers({});  
    navigate('/read')  
  };

  return (
    <div className="p-4">
      <h2 className="my-2 text-xl font-semibold">Fill the data</h2>
      <form className="w-full max-w-lg mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
          <input
            type="number"
            name="age"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="mr-2 leading-tight"
            name="gender"
            value="Male"
            type="radio"
            onChange={getUserData}
            required
          />
          <label className="text-gray-700">Male</label>
        </div>
        <div className="mb-4">
          <input
            className="mr-2 leading-tight"
            name="gender"
            value="Female"
            type="radio"
            onChange={getUserData}
          />
          <label className="text-gray-700">Female</label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
