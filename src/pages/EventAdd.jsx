import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { FiIconName } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";
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

const styles = {

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
  datePicker: {
    flex: '1',
    boxSizing: 'border-box',
    fontSize: '24px',
  },
  
};

function AddEventForm(props) {

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [maxPeople, setMaxPeople] = useState('');
  const [desc, setDesc] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState(new Date());

  const isNumber = (value) => !isNaN(Number(value));

  const handleSave = () => {
    // Basic input validation
    if (!title || !desc || !date || !isNumber(price) || !isNumber(maxPeople)) {
      alert('Please fill in all fields, and ensure Price and Max People are valid numbers.');
      return;
    }

    // Display input data in the console
    console.log('Title:', title, 'Price:', price, 'Max People:', maxPeople);
    console.log('Description:', desc, 'Date:', date, 'location:', location);
    console.log('organizer:', organizer, 'Image', image);
    // Additional logic for saving the data goes here
    const addEventEndpoint = "http://localhost:4000/events/addImage"; // backend endpoint

    fetch(addEventEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        price,
        maxPeople,
        desc,
        date,
        location,
        organizer,
        image,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          alert('Event saved!');
        }
      })
      .catch(error => {

        console.error('There was a problem with the fetch operation:', error);
        alert('Error saving event. Please try again.');
      });

  };
 
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  }
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    }

  }
  const handleModalClose = () => {
    setTitle('');
    setPrice('');
    setMaxPeople('');
    setDesc('');
    setOrganizer('');
    setLocation('');
    setImage('');
    setDate(new Date());

    if (props.onHide) {
      props.onHide();
    }
  };

  return (

    <Modal
      show={props.show}
      onHide={handleModalClose}
    >

      <Modal.Header closeButton></Modal.Header>
      <div className="modal-body space-y-20 pd-40">
        <h3>Add Event</h3>

        <MDBContainer fluid>


          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Title</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='Title' type='text' value={title}
                onChange={(e) => setTitle(e.target.value)} />
            </MDBCol>
          </MDBRow>



          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Organizer</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='Organizer' type='text' value={organizer}
                onChange={(e) => setOrganizer(e.target.value)} />
            </MDBCol>
          </MDBRow>



          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Price</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='Price' type='text' value={price}
                onChange={(e) => setPrice(e.target.value)} />
            </MDBCol>
          </MDBRow>



          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Tickets</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='People' type='text' value={maxPeople}
                onChange={(e) => setMaxPeople(e.target.value)} />
            </MDBCol>
          </MDBRow>



          <MDBRow className='align-items-center pt-4 pb-3'>

            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Description</h11>
            </MDBCol>

            <MDBCol md='9' className='pe-5'>
              <MDBInput style={{ height: '100px', width: '600px' }} size='lg' id='desc' type='textarea' rows='5' value={desc}
                onChange={(e) => setDesc(e.target.value)} />
            </MDBCol>

          </MDBRow>
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Location</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='form1' type='text' value={location}
                onChange={(e) => setLocation(e.target.value)} />
            </MDBCol>
          </MDBRow>


          <MDBRow className='align-items-center pt-4 pb-3'>

            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Image</h11>
            </MDBCol>

            <MDBCol md='9' className='pe-5'>
              <img className="img-fluid" src={image} alt="" />
              <MDBFile size='lg' id='customFile' onChange={handleImage} />


            </MDBCol>

          </MDBRow>




          <MDBRow className='align-items-center pt-4 pb-3'>

            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Date</h11>
            </MDBCol>

            <MDBCol md='9' className='pe-5'>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </MDBCol>

          </MDBRow>

          <div style={styles.footer}>

          <Link to="#"  onClick={handleSave} className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Save </Link>

          </div>
        </MDBContainer>
      </div>
    </Modal>
  );
}

export default AddEventForm;
