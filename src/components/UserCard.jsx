import axios from "axios";
import React, { useState } from "react";
import { DEVTINDER_BASE_URL } from "../utils/constants";
import { removeFeedUser } from "../redux/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const removeUserFromFeed = () => {
    dispatch(removeFeedUser(user?._id));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        DEVTINDER_BASE_URL + "/request/send/interested/" + user?._id,
        {},
        {
          withCredentials: true,
        }
      );
      removeUserFromFeed();
      console.log(response);
    } catch (err) {
      setErrorMessage(err?.response?.data?.error);
    }
  };

  const ignoreRequest = async () => {
    try {
      const response = await axios.post(
        DEVTINDER_BASE_URL + "/request/send/ignored/" + user?._id,
        {},
        {
          withCredentials: true,
        }
      );
      removeUserFromFeed();
      console.log(response);
    } 
    catch (err) {
      setErrorMessage(err?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="card bg-neutral text-neutral-content w-96 h-80">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user?.firstName}</h2>
          <p>{user?.lastName}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={sendRequest}>
              Interested
            </button>
            <button className="btn btn-ghost" onClick={ignoreRequest}>
              Ignore
            </button>
          </div>
          {errorMessage && (
            <div>
              <p className="text-red-600">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCard;
