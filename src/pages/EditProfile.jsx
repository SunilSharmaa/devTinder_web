import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import axios from "axios";
import { DEVTINDER_BASE_URL } from "../utils/constants";

const EditProfile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });
  

  const updateUserProfile = async () => {
    await axios.patch(
      DEVTINDER_BASE_URL + "/profile/edit",
      {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
      },
      {
        withCredentials: true,
      }
    );

    
  };

  useEffect(() => {
    const userProfile = async () => {
      try {
        const response = await axios.get(
          DEVTINDER_BASE_URL + "/profile/view",
          {
            withCredentials: true,
          }
        );
        
        setUser(response?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    userProfile();
  }, []);

  return (
    <div className="pt-20 min-h-screen mx-auto">
      <div className="flex flex-col items-center">
        <div className="flex mx-auto py-18 justify-center space-x-4">
          <form
            action=""
            className=" flex flex-col space-y-4 border p-10 rounded-lg border-gray-500"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="first name"
              className="p-4 border border-gray-500 rounded-lg"
              value={user.firstName}
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="last name"
              className="p-4 border border-gray-500 rounded-lg"
              value={user.lastName}
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="age"
              className="p-4 border border-gray-500 rounded-lg"
              value={user.age}
              onChange={(e) => {
                setUser({ ...user, age: Number(e.target.value) });
              }}
            />
          </form>
          <div>
            <UserCard user={user} />
          </div>
        </div>
        <div className="">
          <button
            className="btn btn-soft btn-success"
            type="button"
            onClick={updateUserProfile}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
