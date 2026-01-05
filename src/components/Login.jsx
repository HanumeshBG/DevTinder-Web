import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("hanumesh@gmail.com")
    const [password, setPassword] = useState("Hanumesh@123")
    const dispatch = useDispatch();

    const handleLogin = async() => {
        const res = await axios.post(`${BASE_URL}/login`, {
            email,
            password
        }, {withCredentials: true})

        dispatch(addUser(res.data))          
        navigate("/")
    }

  return (
    <>
        <div className="card card-dash w-96 shadow-xl mt-20">
            <div className="card-body">
                <h2 className="card-title flex justify-center">Login</h2>
                <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email ID: </legend>
                        <input type="text" className="input" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password: </legend>
                        <input type="text" className="input" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </fieldset>
                </div>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login