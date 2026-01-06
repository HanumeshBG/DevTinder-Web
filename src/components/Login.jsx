import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';

const Login = () => {
    const navigate = useNavigate();

    const [isLoginPage, setIsLoginPage] = useState(true);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();

    const handleLogin = async() => {
        try {
            const res = await axios.post(`${BASE_URL}/login`, {
                email,
                password
            }, {withCredentials: true})
    
            dispatch(addUser(res.data))          
            navigate("/")
        } catch (err) {
            console.error(err);
        }
    }

    const handleSignup = async() => {
        try {
            const res  = await axios.post(`${BASE_URL}/signup`, {
                firstName,
                lastName,
                email,
                password
            }, {
                withCredentials: true,
            })

            dispatch(addUser(res.data.data)) 
            navigate("/profile")
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <>
        <div className="card card-dash w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title flex justify-center">{isLoginPage ? "Login" : "Sign Up"}</h2>
                <div>
                    {!isLoginPage && <>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name: </legend>
                                <input type="text" className="input" 
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name: </legend>
                                <input type="text" className="input" 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                />
                            </fieldset> 
                        </>
                    }
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email ID: </legend>
                        <input type="text" className="input" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password: </legend>
                        <input type="password" className="input" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </fieldset>
                </div>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={isLoginPage ? handleLogin : handleSignup}>{isLoginPage ? "Login" : "Sign Up"}</button>
                </div>
                <p className='cursor-pointer m-auto' onClick={() => setIsLoginPage(!isLoginPage)}>{isLoginPage ? "New User ? click here":"Existing User ? click here"}</p>
            </div>
        </div>
    </>
  )
}

export default Login