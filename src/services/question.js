import axios from "axios";

const url = "http://localhost:4000/question";
export const getAllquestions = async () => {   
    return await axios.get(`${url}/showall`);   
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