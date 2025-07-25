import React,{ createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContex = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openAuthForm, setOpenAuthForm] = useState(false);

    useEffect(()=>{
        if (user) return;

        const accessToken = localStorage.getItem("token");
        if(!accessToken){
            setLoading(false);
            return;
        }
        const fetchUser = async ()=>{
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            }catch(error){
                console.error("Usernot authenticated", error);
                clearUser();
            }finally{
                setLoading(false);
            }
        };
        fetchUser();
    },[]);

    const updateUser = (userData) =>{
        setUser(userData);
        localStorage.setItem("token", userData.token); //Save token
        setLoading(false);
    };

    const clearUser = ()=>{
        setUser(null);
        // setSearchResults([])
        localStorage.removeItem("token");
    };

    return <UserContex.Provider 
    value={{
        user,
        setUser,
        loading,
        updateUser,
        clearUser,
        openAuthForm,
        setOpenAuthForm,
    }}>{children}</UserContex.Provider>
};

export default UserProvider;