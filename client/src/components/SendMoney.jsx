import { useState } from "react";
import axios from "axios";
import getCookie from "../custom/getCookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import sendModalState from "../store/atoms/sendModalState";

function SendMoney(props) {
  const navigate = useNavigate();
  const token = getCookie("token");
  const [amount, setAmount] = useState(0);
  const [sendModal, setSendModal] = useRecoilState(sendModalState);
    return(
      <>
        <div className="absolute w-1/3 border bg-white top-1/3 left-1/3 flex flex-col justify-center items-start">
          <h2 className="text-2xl m-2 p-2">Send Money</h2>
          <h4 className="text-xl m-2 p-2">{props.receiverName}</h4>
          <div className="w-full p-2 mt-1">
              <label htmlFor="amount-ip" className="w-full text-lg font-medium">Amount:</label>
              <input type="number" id="amount-ip" className="w-full border border-gray-400 rounded-md p-2" placeholder="Amount" onChange={(e) => setAmount(e.target.value)}/>
          </div>
          <div className="w-full flex justify-center">
          <button onClick={() => {
          axios.post('http://ec2-44-223-1-245.compute-1.amazonaws.com/api/v1/account/transfer', {
              sendTo: props.receiverKey,
              amount: amount,
          },{
            headers:{
              'Authorization': `Bearer ${token}`
            }
          }).then(response => {
              console.log(response.data); // Logs the response data
              navigate('/dashboard');
              setSendModal(false);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
          }} className="w-full bg-black text-white font-semibold rounded-md m-4 p-2">Send
          </button>
          </div>
        </div>
      </>

    )
}

export default SendMoney;