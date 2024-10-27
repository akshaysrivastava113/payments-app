import { atom } from "recoil";

const usersList = atom({
    key: "usersList",
    default:[]
});

export default usersList;