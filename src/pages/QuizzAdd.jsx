import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2';
import {  getAllquestions } from '../services/question';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'; 

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
  
  
   const [quizzItem, setquizzItem] = useState({
     titre: "",
     description: "",
     duree: "",
     dateDebut: "",
     dateFin: "",
     questions:"",
   });
  
   const [questionList, setQuestionList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionResult = await getAllquestions();
        setQuestionList(questionResult.data.map(question => ({
          label: question.ennonce, 
          value: question._id 
        })));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  function handleSelect(data) {
    setSelectedOptions(data);
    setquizzItem(quizzItem => ({
      ...quizzItem,
      questions: data
    }));
  }
   const navigate = useNavigate();

   const onValueChange = (e, index) => {
     const { name, value } = e.currentTarget; 
     setquizzItem({ ...quizzItem });
   };
 
  
 
  
  
   const handleModalClose = () => {
    setquizzItem({
      titre: "",
      description: "",
      duree: "",
      dateDebut: "",
      dateFin: "",
      level: "",
      questions:"",
    });
    

    if (props.onHide) {
      props.onHide();
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007bff' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
    control: (provided) => ({
      ...provided,
      border: '1px solid #ced4da',
    }),
  };
  const url = "http://localhost:4000/quizz";
 
   const AddQuizz = async (e) => {
     e.preventDefault();
     
     try {
      const formData = new FormData();
       formData.append("titre", quizzItem.titre);
       formData.append("description", quizzItem.description);
       formData.append("duree", quizzItem.duree);
       formData.append("dateDebut", quizzItem.dateDebut);
       formData.append("dateFin", quizzItem.dateFin);
       formData.append("level", quizzItem.level);
       formData.append("questions", JSON.stringify(quizzItem.questions));
      // console.log(formData.);
      formData.forEach(function(value, key){
       console.log(key + ': ' + value);
   });  
console.log("dddd",quizzItem);
       const result = await axios.post(`${url}/add`, quizzItem);
       console.log("dddd222",result);

       if (result.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Quizz added successfully!',
          showConfirmButton: false,
          timer: 1500 
        }).then(() => {
          if (props.onHide) {
           handleModalClose();
          }
        });
               }
     } catch (error) {
       console.log(error);
     }
   };
   
  return (

    <Modal style={styles.popup}
    show={props.show}
    onHide={handleModalClose}
    >

      <Modal.Header closeButton></Modal.Header>
      <div className="modal-body space-y-20 pd-40">
        <h3>Add Question</h3>

        <MDBContainer fluid>

          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Titre</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='titre' type='text' value={quizzItem.titre}
                onChange={(e) => {
                    setquizzItem({ ...quizzItem, titre: e.target.value });
                   
                }} />
            </MDBCol>
          </MDBRow>
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Description</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='description' type='text' value={quizzItem.description}
                onChange={(e) => {
                  setquizzItem({ ...quizzItem, description: e.target.value });
                   
                }} />
            </MDBCol>
          </MDBRow>
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Duree</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='duree' type='text' value={quizzItem.duree}
                onChange={(e) => {
                  setquizzItem({ ...quizzItem, duree: e.target.value });
                   
                }} />
            </MDBCol>
          </MDBRow>
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Level</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='level' type='text' value={quizzItem.level}
                onChange={(e) => {
                  setquizzItem({ ...quizzItem, level: e.target.value });
                   
                }} />
            </MDBCol>
          </MDBRow>
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Date Debut</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
            <DatePicker
      selected={quizzItem.dateDebut} 
      onChange={(dateD) => { 
        setquizzItem({ ...quizzItem, dateDebut: dateD });
      }}
     
     name='dateDebut'
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        calendarClassName="custom-calendar"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    
            </MDBCol>
          </MDBRow>
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Date Fin</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
            <DatePicker
      selected={quizzItem.dateFin} 
      onChange={(dateF) => { 
        setquizzItem({ ...quizzItem, dateFin: dateF });
      }}
      name='dateFin'
      showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
    />
            </MDBCol>
          </MDBRow>


    
    
          <div className="app">
      <h2>Choose your questions</h2>
      <div className="dropdown-container">
        <Select
          styles={customStyles}
          options={questionList}
          placeholder="Select questions"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
      </div>
    </div>
          
    
          <div style={styles.footer}>
  <button  className="button-popup" onClick={AddQuizz}>Save</button>
</div>
        </MDBContainer>
      </div>
    </Modal>
  );
}

export default QuizzAdd;