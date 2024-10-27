import { useRecoilValue } from "recoil";
import { userId } from "../store/atoms/userid";
import getCookie from "../custom/getCookie";
import AppBar from "./AppBar";
import { useNavigate } from "react-router-dom";

function ProfileOptions() {
  const token = getCookie("token");
  const navigate = useNavigate();
    return(
    <div>
        {token?(<div id="user-navigate" className="m-4 mr-6">
                <h1 onClick={() => navigate('/dashboard')} className=" cursor-pointer">Profile</h1>
            </div>): 
            (<div id="user-navigate" className="m-4 mr-6 flex">
                <h1 onClick={() => navigate('/signin')} className="m-2 cursor-pointer">Sign in</h1>
                <h1 onClick={() => navigate('/signup')} className="m-2 cursor-pointer">Register</h1>
            </div>)}
    </div>
    )
}

export default ProfileOptions;