import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import './LogModal.css';
import {useNavigate} from 'react-router-dom';

function LogModal({setModelOpen}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="darkBg" >
        <div className="centered">
          <div className="modal">
            {/* modal header */}
            <div className="btn">
            <div className="modalHeader">
              <h3 className='heading' >Confirm</h3>
            </div>
            <button className='closeBtn'>
              <RiCloseLine id='RiCloseLine'  onClick={() => setModelOpen(false)}></RiCloseLine>
            </button>
            </div>
            {/* modal content */}
            <div className="modalContent">
              Are you really want to log out
            </div>
            {/*  */}
            <div className="modalAction">
              <div className="actionContainer">
                <button className='logoutBtn' onClick={()=>{
                  setModelOpen(false);
                  localStorage.clear();
                  navigate("./signin");
                }} >Log Out</button>
                <button className='cancelBtn'  onClick={() => setModelOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogModal