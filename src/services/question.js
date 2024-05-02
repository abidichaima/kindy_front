import axios from "axios";

const url = "https://elkindy-back.onrender.com/question";
export const getAllquestions = async () => {   
    return await axios.get(`${url}/showall`);   
};
const urlRes = "https://elkindy-back.onrender.com/result";
export const getAllRes = async () => {   
    return await axios.get(`${urlRes}/showall`);   
};
const urlUser = "https://elkindy-back.onrender.com/users";
export const getuser = async (id) => {   
    return await axios.get(`${urlUser}/${id}`);   
};
export const addQuestion = async (formData) => {
  return await axios.post(`${url}/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      
  });
  
};
export const deleteQuestion = async (id) => {
 return await axios.delete(`${url}/delete/${id}`);     
 };
 export const editQuestion = async (id, question) => {
return await axios.put(`${url}/update/${id}`, question);
    };

  