import axios from "axios";
import React from "react";
import { DEVTINDER_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeConnectionRequest } from "../redux/connectionSlice";

const ConnectionRequest = ({ user }) => {
    const dispatch = useDispatch();
    
    
  const acceptConnectionRequest = async () => {
    try {
      const response = await axios.post(
        DEVTINDER_BASE_URL + "/request/review/accepted/" + user?.fromUserId?._id,
        {},
        { withCredentials: true }
      );
      console.log(response);
      dispatch(removeConnectionRequest(user?._id))
    } catch (err) {
      console.log(err);
    }
  };

  const rejectConnectionRequest = async () => {
    try {
      const response = await axios.post(
        DEVTINDER_BASE_URL + "/request/review/rejected/" + user?.fromUserId?._id,
        {},
        { withCredentials: true }
      );
      console.log(response);
      dispatch(removeConnectionRequest(user?._id))
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-1/2 border justify-between p-4 rounded-lg items-center">
      <div className="">
        <h1 className="text-2xl">{user?.fromUserId?.firstName}</h1>
        <p className="text-sm">{user?.fromUserId?.lastName}</p>
      </div>
      <div className="flex space-x-2">
        <button
          className="btn btn-outline btn-success rounded-xl"
          onClick={acceptConnectionRequest}
        >
          accept
        </button>
        <button
          className="btn btn-outline btn-error rounded-xl"
          onClick={rejectConnectionRequest}
        >
          reject
        </button>
      </div>
    </div>
  );
};

export default ConnectionRequest;
