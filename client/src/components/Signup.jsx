import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userId } from "../store/atoms/userid";
import setCookie from "../custom/setCookie";
import AppBar from "./AppBar";

function Signup() {
const navigate=  useNavigate();
const [firstName, setFirstName] = useState("");
const [lastName, setlastName] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [userIdRec, setUserIdRec] = useRecoilState(userId);
    return(
        <>
        <AppBar/>
        <div id="signup" className="w-screen h-screen flex justify-center items-center">
            <div id="background-light" className=" bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div id="main-content" className="bg-white flex flex-col justify-center items-center shadow-lg m-5 p-5 rounded-lg">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <h3 className="text-lg text-gray-400">Enter you information to create an account</h3>
                <div className="w-full p-2 mt-1">
                    <label htmlFor="first-name-ip" className="w-full text-lg font-medium">First Name</label>
                    <input id="first-name-ip" className="w-full border border-gray-400 rounded-md p-2" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="w-full p-2 mt-1">
                    <label htmlFor="last-name-ip" className="w-full text-lg font-medium">Last Name</label>
                    <input id="last-name-ip" className="w-full border border-gray-400 rounded-md p-2" placeholder="Last Name" onChange={(e) => setlastName(e.target.value)}/>
                </div>
                <div className="w-full p-2 mt-1">
                    <label htmlFor="username-ip" className="w-full text-lg font-medium">Username/Email</label>
                    <input id="username-ip" className="w-full border border-gray-400 rounded-md p-2" placeholder="Username/Email" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="w-full p-2 mt-1">
                    <label htmlFor="passwrod-ip" className="w-full text-lg font-medium">Password</label>
                    <input id="passwrod-ip" type="password" className="w-full border border-gray-400 rounded-md p-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="w-full p-1 mt-1">
                    <button onClick={() => {
                        console.log(username);
                        axios.post('http://localhost:3000/signup', {
                            username: username,
                            password: password,
                            firstName: firstName,
                            lastName: lastName
                        }).then(response => {
                            console.log(response.data); // Logs the response data
                            navigate('/dashboard');
                            setUserIdRec(response.data.token);
                            const tokenCookie = setCookie("token",response.data.token, 1);
                          })
                          .catch(error => {
                            console.error('Error fetching data:', error);
                          });
                    }} className="w-full bg-black text-white font-semibold p-2 rounded-md">Sign Up</button>
                </div>
                    <p className="pt-2">Already have an account? <a onClick={() => navigate('/signin')} className=" underline cursor-pointer">Login</a></p>
            </div>
            </div>
        </div>
        </>
    )
}

export default Signup;