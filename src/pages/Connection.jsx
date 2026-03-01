import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../redux/connectionSlice';
import axios from 'axios';
import { DEVTINDER_BASE_URL } from '../utils/constants';
import ConnectionCard from '../components/ConnectionCard';

const Connection = () => {
  const dispatch = useDispatch();
  const connection = useSelector((state) => state.connection);
  console.log(connection);

  useEffect(() => {
    if (connection.length > 0) {
      return;
    }
    const getConnection = async () => {
      try {
        const response = await axios.get(
          DEVTINDER_BASE_URL + "/user/connection",
          {
            withCredentials: true, 
          }
        );
        console.log(response?.data?.data);
        const data = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

        dispatch(addConnection(data));
      } catch (err) {
        console.log(err);
      }
    };
    getConnection();
  }, []);

  return (
    <div className="min-h-screen text-xl pt-18">
      <div className="border py-10 w-[90%] mx-auto flex flex-col items-center rounded-lg space-y-2 ">
        {connection.length === 0 ? (
          <h1>no connection found</h1>
        ) : (
          connection?.map((user) => (
            <ConnectionCard user={user} key={user?._id}/>
          ))
        )}
      </div>
    </div>
  )
}

export default Connection