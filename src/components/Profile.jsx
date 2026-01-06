import React from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
import UserCard from './UserCard.jsx';

const Profile = () => {
    const user = useSelector(store => store.user);

    const [firstName, setFirstName] = React.useState(user?.firstName || "");
    const [lastName, setLastName] = React.useState(user?.lastName || "");
    const [age, setAge] = React.useState(user?.age || "");   
    const [about, setAbout] = React.useState(user?.about || "");
    const [gender, setGender] = React.useState(user?.gender || "");
    const [photoUrl, setPhotoUrl] = React.useState(user?.photoUrl || "");

    const handleEditProfile = async() => {
        try {
            const res = await axios.patch(`${BASE_URL}/profile/edit`, {
                firstName,
                lastName,
                age,
                about,
                gender,
                photoUrl
            }, { withCredentials: true})

            console.log("Profile updated:", res.data);
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div className='flex gap-4'>
        <div className="card card-dash w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title flex justify-center">Profile</h2>
                <div>
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
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Age: </legend>
                        <input type="text" className="input" 
                            value={age} 
                            onChange={(e) => setAge(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">About: </legend>
                        <input type="text" className="input" 
                            value={about} 
                            onChange={(e) => setAbout(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Gender: </legend>
                        <input type="text" className="input" 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Photo URL: </legend>
                        <input type="text" className="input" 
                            value={photoUrl} 
                            onChange={(e) => setPhotoUrl(e.target.value)} 
                        />
                    </fieldset>
                </div>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={handleEditProfile}>Save Profile</button>
                </div>
            </div>
        </div>
        <div>
            <UserCard user={user}/>
        </div>
    </div>
  )
}

export default Profile