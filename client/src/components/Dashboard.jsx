
import getCookie from "../custom/getCookie";
import AppBar from "./AppBar";
import UserBalance from "./UserBalance";
import Users from "./Users";

function Dashboard() {
  const token = getCookie("token");
    return(
      <>
      <AppBar/>
      <UserBalance/>
      <Users/>
      </>
    )
}

export default Dashboard;