import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios  from 'axios';
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
  import { Modal } from "react-bootstrap";
import { Link } from 'react-router-dom'
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



function UpdateUserForm(props ) {
 
  const [email, setEmail] = useState(props.initialValues.email || '');
  const [firstName, setFirstName] = useState(props.initialValues.firstName || '');
  const [lastName, setLastName] = useState(props.initialValues.lastName || '');
  const [level, setLevel] = useState(props.initialValues.level || '');

  const [phoneNumber, setPhoneNumber] = useState(props.initialValues.phoneNumber || '');

  const [role, setRole] = useState(props.initialValues.role || ''); // Set default role


 //control saisie 
 const [errEmail, setErrEmail] = useState('');
 const [showerrEmail, setShowerrEmail] = useState(false);

 const [errPassword, setErrPassword] = useState('');
 const [showerrPassword, setShowerrPassword] = useState(false);

 const [errFirstName, setErrFirstName] = useState('');
 const [showerrFirstName, setShowerrFirstName] = useState(false);

 const [errLastName, setErrLastName] = useState('');
 const [showErrLastName, setShowErrLastName] = useState(false);
 
 const [errLevel, setErrLevel] = useState('');
 const [showErrLevel, setShowErrLevel] = useState(false);
 
 const [errPhoneNumber, setErrPhoneNumber] = useState('');
 const [showErrPhoneNumber, setShowErrPhoneNumber] = useState(false);
 
 const [errRole, setErrRole] = useState('');
 const [showErrRole, setShowErrRole] = useState(false);
 const isNumber = (value) => !isNaN(Number(value));


 const isValidEmail = (value) => {
  // You can use a regular expression for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

  const handleSave = () => {
     if (!isNumber(phoneNumber)) {
    setErrPhoneNumber('Ensure phone number is a number');
    setShowErrPhoneNumber(true);
  } else if (phoneNumber.length !== 8) {
    setErrPhoneNumber('Phone number must be 8 digits');
    setShowErrPhoneNumber(true);
  }


    if (!isValidEmail(email)) {
      setErrEmail('Please enter a valid email address');
      setShowerrEmail(true);
    }
    //input 
    if (!firstName) {
      setErrFirstName('Please fill in first name');
      setShowerrFirstName(true) }

      if (!email) {
        setErrEmail('Please fill in email');
        setShowerrEmail(true);
      }
      
      // Validate password
     
      
      // Validate first name
      if (!firstName) {
        setErrFirstName('Please fill in first name');
        setShowerrFirstName(true);
      }
      
      // Validate last name
      if (!lastName) {
        setErrLastName('Please fill in last name');
        setShowErrLastName(true);
      }
      
      // Validate level (adjust the condition as needed)
      if (!level) {
        setErrLevel('Please select a level');
        setShowErrLevel(true);
      }
      
      // Validate phone number
      if (!phoneNumber) {
        setErrPhoneNumber('Please fill in phone number');
        setShowErrPhoneNumber(true);
      }
      
      // Validate role (adjust the condition as needed)
      if (!role) {
        setErrRole('Please select a role');
        setShowErrRole(true);
      }
    const payload ={
      firstName , lastName  , email , role , phoneNumber , level 
    }

    axios.put('http://localhost:4000/user/users/updateUser', payload)
    .then(response => {
      console.log('user updated successfully:', response.data);
      alert('user updated successfully');
     

    })
    .catch(error => {
      console.error('Error updating user:', error);
      alert('Error updating user');
    });

}

  return (
    
    <Modal
    show={props.show}
    onHide={props.onHide}
  >

    <Modal.Header closeButton></Modal.Header>
    <div className="modal-body space-y-20 pd-40">
      <h3>Update User</h3>
    
      <MDBContainer fluid>

      <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">email</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='email' type='text' value={email}
                onChange={(e) => {setEmail(e.target.value) ; setErrEmail('')} }/>
            </MDBCol>
          </MDBRow>
          {showerrEmail && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{errEmail}</p>
              </MDBCol>
            </MDBRow>)}

       
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">firstName</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='firstName' type='text' value={firstName}
                onChange={(e) => {setFirstName(e.target.value)   ; setErrFirstName ('')} }
                />
            </MDBCol>
          </MDBRow>
          {showerrFirstName && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{errFirstName}</p>
              </MDBCol>
            </MDBRow>)}

          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">LastName</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='LastName' type='text' value={lastName}
                onChange={(e) => {setLastName(e.target.value) ; setErrLastName ('')}} />
            </MDBCol>
          </MDBRow>
           {showErrLastName && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{errLastName}</p>
              </MDBCol>
            </MDBRow>)}


          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">phone Number</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='phoneNumber' type='text' value={phoneNumber}
                onChange={(e) => {setPhoneNumber(e.target.value) ; setErrPhoneNumber ('')} }/>
            </MDBCol>
          </MDBRow>
          {showErrPhoneNumber && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{errPhoneNumber}</p>
              </MDBCol>
            </MDBRow>)}


            <MDBRow className='align-items-center pt-4 pb-3'>
          <MDBCol md='3' className='checkbox'>
        <h11 className="mb-0">Role</h11>
      </MDBCol>
      <MDBCol md='9' className='pe-5'>
        <select
      className="form-control"
      value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </MDBCol>
      </MDBRow>
      <MDBRow className='align-items-center pt-4 pb-3'>
  <MDBCol md='3' className='checkbox'>
    <h11 className="mb-0">Level</h11>
  </MDBCol>
  <MDBCol md='9' className='pe-5'>
    <select
      className="form-control"
      value={level}
      onChange={(e) => setLevel(e.target.value)}
    >
      <option value="gradeLevel1">Grade Level 1</option>
      <option value="gradeLevel2">Grade Level 2</option>
      <option value="gradeLevel3">Grade Level 3</option>
      <option value="gradeLevel4">Grade Level 4</option>
      <option value="gradeLevel5">Grade Level 5</option>
      <option value="gradeLevel6">Grade Level 6</option>
      <option value="gradeLevel7">Grade Level 7</option>
      <option value="non precise level">Non Precise Level</option>
    </select>
  </MDBCol>

 
</MDBRow>


<div style={styles.footer}>

  <Link to="#" onClick={handleSave} className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Save </Link>

</div>
</MDBContainer>
</div>
</Modal>
  );
}

export default UpdateUserForm;
