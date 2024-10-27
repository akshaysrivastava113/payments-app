import { useNavigate } from "react-router-dom";
import ProfileOptions from "./ProfileOptions";

function AppBar() {
    const navigate = useNavigate();
    return(
        <div className="w-screen h-24 border-b-2 mb-2 flex justify-between items-center">
            <div id="logo-container" className="m-4 ml-6">
                <h1 onClick={() => navigate('/dashboard')} className=" cursor-pointer">Payments App</h1>
            </div>
            <ProfileOptions/>
        </div>
    )
}

export default AppBar;