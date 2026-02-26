import React from 'react'
import { Link } from 'react-router';

const ConnectionCard = ({user}) => {
  console.log(user);
  return (
    <div className="flex w-1/2 border justify-between p-4 rounded-lg items-center">
      <div className="">
        <h1 className="text-2xl">{user?.firstName}</h1>
        <p className="text-sm">{user?.lastName}</p>
      </div>
      <div className="flex space-x-2">
        <Link to={"/chat/" + user?._id}>
        <button className="btn btn-soft btn-success">Chat</button>
        </Link>
        
      </div>
    </div>
  )
}

export default ConnectionCard