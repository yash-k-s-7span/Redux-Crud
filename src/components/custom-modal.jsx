/* eslint-disable no-unused-vars */
import React from 'react';
import './custom-modal.css';
import { useSelector } from 'react-redux';

const CustomModal = ({ id, showPopup, setShowPopup }) => {
    const allUsers = useSelector((state) => state.app.users);
    const singleUser = allUsers.filter((element) => element.id === id);
  return (
    <div className='modalBackground'>
          <div className='modalContainer font-serif'>
              <div className='flex justify-end items-end'>
                 <button onClick={() => setShowPopup(false)} >Close</button>  
              </div>
              <div className='text-lg flex flex-col gap-2'>
                <h2>Name:<span className='pl-1'>{singleUser[0].name}</span></h2>
                <h3>Email:<span className='pl-1'>{singleUser[0].email}</span></h3>
                <span>Age:<span className='pl-1'>{singleUser[0].age}</span></span>
                <span>Gender:<span className='pl-1'>{singleUser[0].gender}</span></span>    
              </div>
        </div>
    </div>
  );
}

export default CustomModal;
