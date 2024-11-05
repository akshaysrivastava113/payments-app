import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userBalance } from "../store/atoms/userBalance";
import getCookie from "../custom/getCookie";
import sendModalState from "../store/atoms/sendModalState";

function UserBalance() {
    const token = getCookie("token");
    const [balance, setBalance] = useRecoilState(userBalance);
    const sendModal = useRecoilValue(sendModalState);
    useEffect(() => {
        axios.get("http://ec2-44-223-1-245.compute-1.amazonaws.com/api/v1/account/balance",{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
            setBalance(response.data.balance);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [sendModal]);
    return(
        <div className="flex items-center shadow-md border m-2 p-2 pl-6 pr-6 w-fit">
            <h2 className="font-semibold text-lg m-2">Your balance: </h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

            <p className="font-semibold text-lg m-2">{balance}</p>
        </div>
    )
}

export default UserBalance;