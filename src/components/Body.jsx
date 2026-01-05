import React, {  useEffect } from 'react'
import NavBar from './NavBar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { BASE_URL } from '../utils/constants.js';
import { useNavigate } from 'react-router-dom';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store => store.user);

    const fetchUser = async() => {
        if(userData) return
        try {
            const res = await axios.get(`${BASE_URL}/profile/view`, {withCredentials: true})
            dispatch(addUser(res.data))
        } catch (err) {
            if(err.status === 401){
                navigate("/login");
            }
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])
  return (
    <div className='min-h-screen flex flex-col'>        
        <NavBar />
        <div className='flex-1 flex items-center flex-col mt-10 gap-4'>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Body