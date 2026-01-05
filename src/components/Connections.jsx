import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
import { useEffect } from 'react';
import { addConnection } from '../utils/connectionsSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connection);

    const getConnections = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, {withCredentials: true})
            console.log(res.data);
            dispatch(addConnection(res.data?.data));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getConnections();
    }, [])

    if(!connections) return;

    if(connections.length === 0) return <h1 className='text-center'>No connections found!</h1>
  return (
    <>
        <div>Connections</div>
        {connections && connections.map((connection) => {
            const {_id, firstName, lastName, photoUrl, about, age, gender} = connection;
           return <div key={_id} className='flex gap-2 shadow-lg w-3/4 p-4'>
                <div>
                    <img className='rounded h-20 w-3/4' src={photoUrl} alt="user" />
                </div>
                <div>
                    <h3>{firstName} {lastName}</h3>
                    {age && gender && <p>{`${age}, ${gender}`}</p>}
                    <p>{about}</p>
                </div>
            </div>
        })}
    </>
  )
}

export default Connections