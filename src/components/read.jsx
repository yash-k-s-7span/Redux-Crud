/* eslint-disable no-unused-vars */
import React, { useEffect,useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteUser, showUser } from '../features/user-details-slice';
import CustomModal from './custom-modal';
import { Link } from 'react-router-dom';
  
const Read = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [showPopup,setShowPopup] = useState(false);
  const {users,loading,error} = useSelector((state) => state.app)
  useEffect(() => {
    dispatch(showUser())
  }, [dispatch])
    
  if(loading){
    return <h2 className='text-2xl px-4 py-4'>Loading...</h2>
  }
  return (
    <div className="p-4">
      { showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
      <h2 className="text-2xl font-semibold mb-4">All Data</h2>
      <div className='grid grid-cols-1 lg:grid lg:grid-cols-3'>
        {users && users.map((item,index) => (
          <div key={index} className="max-w-sm rounded my-3 hover:opacity-85 overflow-hidden shadow-lg bg-white">
          <div className="px-6 py-4">
              <h5 className="font-bold text-xl mb-2">{item.name}</h5>
              <h6 className="text-gray-600 mb-2">{item.email}</h6>
              <span className="text-gray-700 text-base">Gender:{item.gender}</span>   
                {/* <span className="text-gray-700 text-base">Age:{item.age}</span> */}
            <div className="mt-4">
              <button href="#" className="text-blue-500 hover:text-blue-700 mr-4" onClick={() => [setId(item.id),setShowPopup(true)]}>View</button>
              <Link to={`/edit/${item.id}`} className="text-blue-500 hover:text-blue-700 mr-4">Edit</Link>
              <Link onClick={() => dispatch(deleteUser(item.id))} className="text-blue-500 hover:text-blue-700">Delete</Link>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
