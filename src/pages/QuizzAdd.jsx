import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2';
import {  getAllquestions } from '../services/question';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile,
  MDBInputGroup
}
  from 'mdb-react-ui-kit';
import ViewQuizz from './ViewQuestion';
const styles = {
    popup: {
        
        backgroundColor: 'trasparent',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        
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
  footer: {
    textAlign: 'right',
    marginTop: '20px',
  },
  


};


function QuizzAdd(props) {

  // ERROR CONSTANT 
  
  
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
       if (!questionItem.responsesData.content) {
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
        Swal.fire({
          icon: 'success',
          title: 'Question added successfully!',
          showConfirmButton: false,
          timer: 1500 
        }).then(() => {
          if (props.onHide) {
            props.onHide();
          }
        });
               }
     } catch (error) {
       console.log(error);
     }
   };
  
  const handleModalClose = () => {
    //setTitle('');
    

    if (props.onHide) {
      props.onHide();
    }
  };

  return (

    <Modal style={styles.popup}
    show={props.show} onHide={props.onHide}
    >

      <Modal.Header closeButton></Modal.Header>
      <div className="modal-body space-y-20 pd-40">
        <h3>Add Question</h3>

        <MDBContainer fluid>

          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Ennonce</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='ennonce' type='text' value={questionItem.ennonce}
                onChange={(e) => {
                    setQuestionItem({ ...questionItem, ennonce: e.target.value });
                   
                }} />
            </MDBCol>
          </MDBRow>

    
     <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Ennonce</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg'  name="image" type='file'  accept="image/*"
             onChange={handleChangeFile}
                       />
            </MDBCol>
          </MDBRow>
          <img src={image}   />
         
          <Button
        variant="contained"
        onClick={handleAddResponse}
        style={{ marginBottom: '10px' }}
      >
        Add Response
      </Button>
      {questionItem.responsesData.map((response, index) => (
        <div key={index}>
            <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Response</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name="content" type='text' value={response.content}
                 onChange={(e) => { 
                  onValueChange(e, index); 
                  setrespErr(''); 
                }} />
            </MDBCol>
          </MDBRow>
          {showResp && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{respErr}</p>
              </MDBCol>
            </MDBRow>)}
          <select
    className="form-select form-select-lg"
    style={{ padding: '0.5rem', borderRadius: '0.3rem', border: '1px solid #ced4da' }}
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
  <button onClick={AddQuestion} className="button-popup">Save</button>
</div>
        </MDBContainer>
      </div>
    </Modal>
  );
}

export default QuizzAdd;