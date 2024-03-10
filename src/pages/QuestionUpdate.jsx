import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Modal } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { editQuestion } from '../services/question';


import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile
}
  from 'mdb-react-ui-kit';
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
    maxWidth: '500px',
    width: '80%',
    zIndex: '9999',
  },
  textField: {
    marginBottom: '20px',
  },
  buttonS: {
    margin: '10px',
    minWidth: '120px',
  },
  buttonC: {
    //borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    outline: "none",
    transition: "background-color 0.3s",
    //margin: '10px',
    //minWidth: '120px',
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
function QuestionUpdate(props) {
  const [ennonceErr, setEnnonceErr] = useState('');
  const [showErrE, setshowErrE] = useState(false);
 
  const [respErr, setrespErr] = useState('');
  const [showResp, setshowResp] = useState(false);

  const [ennonce, setEnnonce] = useState(props.initialValues.ennonce || '');
  const [Latestimage, setLatestimage] = useState(props.initialValues.image || '');
  const [image, setImage] = useState(null);
const  quest={
  ennonce,
  image,
};
  const updateQuest = async () => {
    const result = await editQuestion(props.initialValues._id,quest);
    console.log("quest",quest);
    console.log("rrrrrrrrrr",props.initialValues);
    if (result.status === 201) {
      console.log("yessss");
    //navigate("/ques");
    }
    };
 
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


  




  return (

    <Modal
      show={props.show}
      onHide={props.onHide}
    >

      <Modal.Header closeButton></Modal.Header>
      <div className="modal-body space-y-20 pd-40">
        <h3>Update Event</h3>
        <MDBContainer fluid>


        <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Ennonce</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='ennonce' type='text' value={ennonce}
                onChange={(e) => setEnnonce(e.target.value)}
               />
            </MDBCol>
          </MDBRow>

         {showErrE && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{ennonceErr}</p>
              </MDBCol>
            </MDBRow>)}
    
            <MDBRow className='align-items-center pt-4 pb-3'>

<MDBCol md='3' className='ps-5'>
  <h11 className="mb-0">Image</h11>
</MDBCol>

<MDBCol md='9' className='pe-5'>
  {image === null ? (
    <img className="img-fluid" src={Latestimage.url} alt="" />
  ) : (
    <img className="img-fluid" src={image} alt="" />
  )}          <MDBFile size='lg' id='customFile' onChange={handleChangeFile} />
</MDBCol>

</MDBRow>

          <img src={image} alt="Preview"  hidden/>

         
          <div style={styles.footer}>

            <Link to="#" onClick={updateQuest} className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Save </Link>

          </div>
        </MDBContainer>
      </div>
    </Modal>
  );
}

export default QuestionUpdate;