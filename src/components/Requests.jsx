import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice.js'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.request);

    const getRequests = async () => {
        try {
            const requests = await axios.get(`${BASE_URL}/user/requests/received`, {withCredentials: true})
            dispatch(addRequest(requests.data?.data));
        } catch (err) {
            console.error(err);
        }
    }

    const handleRequest = async(status, _id) => {
        try {
            await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, {withCredentials: true})
            dispatch(removeRequest(_id));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getRequests();
    }, [])

    if(!requests) return;

    if(requests.length === 0) return <h1 className='text-center'>No requests found!</h1>
  return (
    <>
        <div className='font-bold'>Requests</div>
        {requests && requests.map((requests) => {
            const {_id, firstName, lastName, photoUrl, about, age, gender} = requests.fromUserId;
            return <div key={_id} className='flex gap-2 shadow-lg w-3/4 p-4 items-center'>
                    <div>
                        <img className='rounded h-20 w-3/4' src={photoUrl} alt="user" />
                    </div>
                    <div className='w-3/4'>
                        <h3>{firstName} {lastName}</h3>
                        {age && gender && <p>{`${age}, ${gender}`}</p>}
                        <p>{about}</p>
                    </div>
                    <div className='flex'>
                        <button className='btn btn-primary mr-2' onClick={() => handleRequest("accepted", requests._id)}>Accept</button>
                        <button className='btn btn-secondary' onClick={() => handleRequest("rejected", requests._id)}>Decline</button>
                    </div>
                </div>
            })}
    </> 
  )
}

export default Requests