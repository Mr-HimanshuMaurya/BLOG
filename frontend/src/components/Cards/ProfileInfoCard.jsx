import React, { useContext } from 'react'
import { UserContex } from "../../context/userContext";
import {useNavigate} from "react-router-dom";

export default function ProfileInfoCard() {
  const {user, clearUser} = useContext(UserContex);
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return user && (
    <div className='flex items-center'>
      <img
      src={user.profileImageUrl}
      alt=""
      className='w-11 h-11 bg-gray-300 rounded-full mr-3'
      />
      <div>
        <div className='text-[15px] text-black font-black leading-3'>
          {user.name || ""}
        </div>
        <button
        className='text-sky-600 text-sm font-semibold cursor-pointer hover:underline'
        onClick={handelLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
