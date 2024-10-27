import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "./AppBar";
import setCookie from "../custom/setCookie";

function Signin() {
const navigate =  useNavigate();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
    return(
        <>
        <AppBar/>
        <div id="signin" className="w-screen h-screen flex justify-center items-center">
            <div id="background-light" className=" bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div id="main-content" className="bg-white flex flex-col justify-center items-center shadow-lg m-5 p-5 rounded-lg">
                <h1 className="text-3xl font-bold">Sign In</h1>
                <h3 className="text-lg text-gray-400">Enter you information to log into your account</h3>
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
                        axios.post('http://localhost:3000/signin', {
                            username: username,
                            password: password
                        }).then(response => {
                            console.log(response.data); // Logs the response data
                            navigate('/dashboard');
                            const tokenCookie = setCookie("token",response.data.token, 1);
                          })
                          .catch(error => {
                            console.error('Error fetching data:', error);
                          });
                    }} className="w-full bg-black text-white font-semibold p-2 rounded-md">Sign In</button>
                </div>
                    <p className="pt-2">Don't have an account? <a onClick={() => navigate('/signup')} className=" underline cursor-pointer">Signup</a></p>
            </div>
            </div>
        </div>
        </>
    )
}

export default Signin;