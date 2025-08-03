import axios from "axios";
import React, { useEffect } from "react";
import { DEVTINDER_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionRequest } from "../redux/connectionSlice";
import ConnectionRequest from "../components/ConnectionRequest";

const Connection = () => {
  const dispatch = useDispatch();
  const connectionRequest = useSelector((state) => state.connectionReducer);

  useEffect(() => {
    if (connectionRequest.length > 0) {
      return;
    }
    const getConnectionRequest = async () => {
      try {
        const response = await axios.get(
          DEVTINDER_BASE_URL + "/user/request/received",
          {
            withCredentials: true,
          }
        );
        // console.log(response?.data?.data);
        dispatch(addConnectionRequest(response?.data?.data));
      } catch (err) {
        console.log(err);
      }
    };
    getConnectionRequest();
  }, []);
  return (
    <div className="min-h-screen text-xl pt-18">
      <div className="border py-10 w-[90%] mx-auto flex flex-col items-center rounded-lg space-y-2 ">
        {connectionRequest.length === 0 ? (
          <h1>no connection request found</h1>
        ) : (
          connectionRequest?.map((user) => (
            <ConnectionRequest user={user} key={user?._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Connection;
