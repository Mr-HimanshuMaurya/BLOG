import React, { useContext } from 'react'
import { UserContex } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function ProfileInfoCard() {
  const { user, clearUser } = useContext(UserContex);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className='flex items-center'>
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={user.name || "User"}
          className='w-11 h-11 bg-gray-300 rounded-full mr-3 object-cover'
        />
      ) : (
        <div className='w-11 h-11 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-gray-600'>
          {user.name ? user.name[0].toUpperCase() : "?"}
        </div>
      )}
      <div>
        <div className='text-[15px] text-black font-black leading-3'>
          {user.name || ""}
        </div>
        <button
          className='text-sky-600 text-sm font-semibold cursor-pointer hover:underline'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
