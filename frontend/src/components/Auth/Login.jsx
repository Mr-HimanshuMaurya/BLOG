import { useContext, useState } from "react"
import { UserContex } from "../../context/userContext"
import { useNavigate } from "react-router-dom";
import Input from "../Inputs/input";
import { validateEmail } from "../../utils/helper";

import AUTH_IMG from "../../assets/authImage.jpg"
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";


export default function Login({setCurrentPage}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const {updateUser, setOpenAuthForm} = useContext(UserContex);
    const navigate = useNavigate();

    //handle Login form submit
    const handleLogin = async(e)=>{
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address");
            return;
        }

        if(!password){
            setError("Please enter the password");
            return;
        }

        setError("");

        //Logiin API Call
        try{

            setLoading(true)


            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });

            const {token, role} = response.data;

            if(token){
                localStorage.setItem("token", token);
                updateUser(response.data);
                setLoading(false);
                //Redirect based on role
                if(role === "admin"){
                    setOpenAuthForm(false)
                    navigate("/admin/dashboard");
                }
                setOpenAuthForm(false)
            }
        }catch(error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("Something went wrong. Please try again");
            }
            setLoading(false)
        }

    };


  return (
    <div className='flex items-center'>
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
            <p className="text-xs text-slate-700 mt-[2px] mb-6">
                Please enter your details to log in
            </p>

            <form onSubmit={handleLogin}>

                <Input 
                value={email}
                onChange={({target}) => setEmail(target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="text"
                />

                <Input 
                value={password}
                onChange={({target})=> setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
                />
                
                {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                <button type="submit" className="btn-primary " disabled={loading}>
                    {loading ? "Logging in..." : "LOGIN"}
                </button>

                <p className="text-[13px] text-slate-800 mt-3">
                    Don't have an account?{" "}
                    <button
                    className="font-medium text-primary underline cursor-pointer"
                    onClick={()=>{
                        setCurrentPage("signup")
                    }}
                    >
                        SignUp
                        </button>
                </p>
            </form>
        </div>
        
        <div className="hidden md:block">
            <img src={AUTH_IMG} alt="Login" className="h-[400px] w-[400px]"/>
        </div>
    </div>
  )
}
