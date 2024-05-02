import axios from "axios";

const url = "https://elkindy-back.onrender.com/api/classroom";

export const getAllclassrooms = async () => {   
    return await axios.get(`${url}/get`);   
};
export const addClassroom = async (formData) => {
  return await axios.post(`${url}/create`, formData, {
  });
  
};
export const deleteClassroom = async (id) => {
 return await axios.delete(`${url}/delete/${id}`);     
 };
 export const editClassroom= async (id, classroom) => {
return await axios.put(`${url}/update/${id}`, classroom);
    };
    export const getclassroom = async (id) => {   
      return await axios.get(`${url}/show/${id}`);   
  };
