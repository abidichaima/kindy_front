import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const styles = {
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    padding: '20px',
    width: '600px',
    height: '400px',
    overflowY: "auto"
  },
  textField: {
    marginBottom: '20px',
  },
  buttonS: {
    margin: '10px',
    minWidth: '120px',
  },
  buttonC: {
    border: "none",
    cursor: "pointer",
    padding: "5px",
    outline: "none",
    transition: "background-color 0.3s",
    backgroundColor: "#6c757d",
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  footer: {
    textAlign: 'right',
    marginTop: '20px',
  },
};

function AddQuestionForm({ onClose }) {
const [ennonceErr, setEnnonceErr] = useState('');
 const [showErrE, setshowErrE] = useState(false);

 const [respErr, setrespErr] = useState('');
 const [showResp, setshowResp] = useState(false);
 
 
  const [questionItem, setQuestionItem] = useState({
    ennonce: "",
    image: "",
    responsesData: [{ content: "", isCorrect: false }]
  });
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    }
  }

  const handleChangeFile = (e) => {
    const image = e.target.files[0];
    setImage(image);
    previewFiles(image);
  };

  const onValueChange = (e, index) => {
    const { name, value } = e.currentTarget;
    const updatedResponses = [...questionItem.responsesData];
    updatedResponses[index][name] = name === "isCorrect" ? value === "true" : value;

    setQuestionItem({ ...questionItem, responsesData: updatedResponses });
  };

  const handleAddResponse = () => {
    setQuestionItem({
      ...questionItem,
      responsesData: [...questionItem.responsesData, { content: "", isCorrect: false }]
    });
  };

  const url = "http://localhost:4000/question";

  const AddQuestion = async (e) => {
    e.preventDefault();
    if (!questionItem.ennonce  ) {
      setEnnonceErr('Please fill in the question');
      setshowErrE(true) }
      if (!questionItem.responsesData ) {
        setrespErr('Please fill in the responses');
        setshowResp(true) }
      

    try {
      const formData = new FormData();
      formData.append("ennonce", questionItem.ennonce);
      if (image==="") {
        console.log("none");
      }
      else{
       formData.append("image", image);
      }
      formData.append("responsesData", JSON.stringify(questionItem.responsesData));
     // console.log(formData.);
    /* formData.forEach(function(value, key){
      console.log(key + ': ' + value);
  });  */
      const result = await axios.post(`${url}/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (result.status === 201) {
        console.log("Question added successfully");
        navigate("/question");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePopup = () => {
    onClose();
  };

  return (
    <div style={styles.popup}>
      <div style={styles.title}>Add Question</div>
      Question:
      <TextField
      
        fullWidth
        variant="outlined"
        style={styles.textField}
        InputProps={{ style: { color: 'black' } }}
        name="ennonce"
        value={questionItem.ennonce}
        onChange={(e) => {
          setQuestionItem({ ...questionItem, ennonce: e.target.value });
          setEnnonceErr('');
        }}
        placeholder="Question"
      />
      {showErrE && (
  <div className='error-message'>
    <p style={{ color: 'red' }}>{ennonceErr}</p>
  </div>
)}
Image:
      <TextField
        fullWidth
        variant="outlined"
        style={styles.textField}
        InputProps={{ style: { color: 'black' } }}
        name="image"
        type='file'
        accept="image/*"
        onChange={handleChangeFile}
   />
     <img src={image} alt=""  />
      <Button
        variant="contained"
        onClick={handleAddResponse}
        style={{ marginBottom: '10px' }}
      >
        Add Response
      </Button>
      {questionItem.responsesData.map((response, index) => (
        <div key={index}>
          Responses
          <TextField
            fullWidth
            variant="outlined"
            style={styles.textField}
            InputProps={{ style: { color: 'black' } }}
            name="content"
            value={response.content}
            onChange={(e) => { 
              onValueChange(e, index); 
              setrespErr(''); 
            }}
            placeholder="Response"

          />
          {showResp && (
  <div className='error-message'>
    <p style={{ color: 'red' }}>{respErr}</p>
  </div>
)}
          <select
            value={response.isCorrect ? "true" : "false"}
            onChange={(e) => onValueChange(e, index)}
            name="isCorrect"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      ))}
      <div style={styles.footer}>
        <Button
          type="button"
          variant="contained"
          onClick={handleClosePopup}
          style={styles.buttonC}
        >
          Close
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={styles.buttonS}
          onClick={AddQuestion}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default AddQuestionForm;