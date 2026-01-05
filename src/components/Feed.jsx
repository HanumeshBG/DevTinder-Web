import React, { useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';

const Feed = () => {
    const dispatch = useDispatch();
    const users = useSelector(store => store.feed);

    const getUsers = async () => {
        if(users) return;
        try {
            const res = await axios.get(`${BASE_URL}/user/feeds`, {withCredentials: true})
            dispatch(addFeed(res.data.data))
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    if(!users) return

    if(users.length === 0) return <h1 className='text-center'>No more users available!</h1>
  return (
    <>
        {users && <UserCard user = {users?.[0]} />}
    </>
  )
}

export default Feed