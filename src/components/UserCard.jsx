import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice.js';

const UserCard = ({ user }) => {
    const { _id,firstName, lastName, age, about, gender, photoUrl } = user;
    const dispatch = useDispatch();

    const handleRequests = async(status, id) => {
        try {
            await axios.post(`${BASE_URL}/request/send/${status}/${id}`, {}, { withCredentials: true});
            dispatch(removeUserFromFeed(id));
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className="card bg-base-100 w-96 shadow-sm mt-20">
        <figure>
            <img
            src={photoUrl}
            alt="user" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName} {lastName}</h2>
            <p>{age} {gender}</p>
            <p>{about}</p>
            <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={() => handleRequests("ignored", _id)}>Ignore</button>
                <button className="btn btn-secondary" onClick={() => handleRequests("interested", _id)}>Interested</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard