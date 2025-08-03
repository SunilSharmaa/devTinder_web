import React, { useEffect } from 'react'
import Feed from './Feed'
import axios from 'axios'
import { DEVTINDER_BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { addFeedUser } from '../redux/feedSlice'

const Body = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=> {
        const getFeed = async() => {
            try{
                const response = await axios.get(DEVTINDER_BASE_URL + "/user/feed", {
                    withCredentials : true
                })

                dispatch(addFeedUser(response?.data?.data));
            } catch (err) {
                if(err.status === 401) {
                    navigate("/signin")
                }
            }
            
        }

        getFeed();
    },[])
  return (
    <>
        <Feed  />
    </>
  )
}

export default Body