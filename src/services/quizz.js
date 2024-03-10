import axios from "axios";

const url = "http://localhost:4000/quizz";
export const getAllquizzs = async () => {   
    return await axios.get(`${url}/showall`);   
};
export const addQuizz = async (formData) => {
  return await axios.post(`${url}/add`, formData, {
  });
  
};
export const deleteQuestion = async (id) => {
 return await axios.delete(`${url}/delete/${id}`);     
 };
 export const editQuestion = async (id, question) => {
return await axios.put(`${url}/update/${id}`, question);
    };