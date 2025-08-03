import React from 'react'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'

const Feed = () => {
    const feedUser = useSelector((state) => state.feedReducer);
    
    if(!feedUser || feedUser.length < 1) {
        return <h1 className='min-h-screen pt-20'>no user found</h1>
    }
    
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <UserCard user={feedUser[0]} />
    </div>
  )
}

export default Feed