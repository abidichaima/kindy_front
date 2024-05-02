import axios from "axios";
const url = "https://elkindy-back.onrender.com/user/users";

export const getAllUsers = async () => {
  return await axios.get(`${url}/getAllUsers`);
};
