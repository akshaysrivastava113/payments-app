import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import getCookie from "../custom/getCookie";
import usersList from "../store/atoms/usersList";

function Users() {
    const token = getCookie("token");
    const [usersListLocal, setUsersListLocal] = useRecoilState(usersList);
    const [searchedUser, setSearchedUser] = useState("Akshay");
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
                <div className="flex justify-between m-2 p-2 border">
                    <div className="flex">
                        <p className="p-1">{user.firstName}</p>
                        <p className="p-1">{user.lastName}</p>
                    </div>
                    <button className=" bg-black text-white text-sm p-2 rounded-md">Send Money</button>
                </div>
            )
        })}
        </>
    )
}

export default Users;