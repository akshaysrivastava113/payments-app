import getCookie from "../custom/getCookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import deleteCookie from "../custom/deleteCookie";

function ProfileOptions() {
  const token = getCookie("token");
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const navigate = useNavigate();
    return(
    <div>
        {token?(<div id="user-navigate" className="m-4 mr-6">
            <h1 onClick={() => {
                if(openProfileModal){
                    setOpenProfileModal(false)
                } else {
                    setOpenProfileModal(true);
                }
            }} className=" cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </h1>
            {openProfileModal&&
            <div className="absolute right-6 w-24 bg-white z-20">
                <ul>
                    <li>
                        <button className=" w-full border mr-2 p-2 hover:bg-gray-200">Profile</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            deleteCookie("token");
                            location.reload();
                         } } className=" w-full border mr-2 p-2 hover:bg-gray-200">Sign Out</button>
                    </li>
                </ul>
            </div>}


            </div>): 
            (<div id="user-navigate" className="m-4 mr-6 flex">
                <h1 onClick={() => navigate('/signin')} className="m-2 cursor-pointer">Sign in</h1>
                <h1 onClick={() => navigate('/signup')} className="m-2 cursor-pointer">Register</h1>
            </div>)}
    </div>
    )
}

export default ProfileOptions;