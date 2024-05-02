import axios from "axios";

const url = "https://elkindy-back.onrender.com/quizz";
const url2 = "https://elkindy-back.onrender.com/result";

export const getAllquizzs = async () => {   
    return await axios.get(`${url}/showall`);   
};
export const addQuizz = async (formData) => {
  return await axios.post(`${url}/add`, formData, {
  });
  
};
export const deleteQuizz = async (id) => {
 return await axios.delete(`${url}/delete/${id}`);     
 };
 export const editQuizz= async (id, quizz) => {
return await axios.put(`${url}/update/${id}`, quizz);
    };
    export const getquizz = async (id) => {   
      return await axios.get(`${url}/show/${id}`);   
  };
  export const deleteRes = async (id) => {
    return await axios.delete(`${url2}/delete/${id}`);     
    };