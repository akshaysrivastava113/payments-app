import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import getCookie from "../custom/getCookie";
import usersList from "../store/atoms/usersList";
import SendMoney from "./SendMoney";
import sendModalState from "../store/atoms/sendModalState";

function Users() {
    const token = getCookie("token");
    const [usersListLocal, setUsersListLocal] = useRecoilState(usersList);
    const [searchedUser, setSearchedUser] = useState("Akshay");
    const [receiverName, setReceiverName] = useState("");
    const [receiverId, setReceiverId] = useState("");
    const [sendModal, setSendModal] = useRecoilState(sendModalState);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchedUser}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
            setUsersListLocal(response.data.users);
            console.log(usersListLocal);
        })
        .catch((error) => {
            console.error(error);
        })
    }, []);
    return(
        <>
        {usersListLocal.map((user) => {
            return (
                <>
                <div className="flex justify-between items-center m-2 p-2 border">
                    <div className="flex flex-col">
                        <div className="flex">
                            <p className="p-1">{user.firstName}</p>
                            <p className="p-1">{user.lastName}</p>
                        </div>
                        <p className="p-1">{user.username}</p>
                    </div>
                    
                    <button onClick={() => {

                        setReceiverId(user._id);
                        setReceiverName(user.firstName+" "+user.lastName);
                        setSendModal(true);

                    }} className=" bg-black h-12 text-white text-sm p-1 m-2 rounded-md">Send Money</button>
                </div>
                {sendModal&&
                <>
                <div onClick={() => {

                    setReceiverId("");
                    setReceiverName("");
                    setSendModal(false);

                    }} className="fixed top-0 w-screen h-screen bg-gray-200 z-0 opacity-20 flex justify-center items-center cursor-pointer">
                </div>
                <SendMoney receiverName={receiverName} receiverKey={receiverId}/>
                </>
                }
                </>
            )
        })}
        </>
    )
}

export default Users;