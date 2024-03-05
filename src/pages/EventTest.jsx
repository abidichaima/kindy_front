import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { FiIconName } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal } from "react-bootstrap";
import { Link } from 'react-router-dom'


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
function EventTest(props) {
  
  const [id, setId] = useState('');
  const [title, setTitle] = useState( '');
  const [price, setPrice] = useState( '');
  const [maxPeople, setMaxPeople] = useState( '');
  const [desc, setDesc] = useState('');
  const [organizer, setOrganizer] = useState( '');
  const [location, setLocation] = useState( '');
  const [first_image, setFirstImage] = useState( '');
  const [date, setDate] = useState( null);

  const [image, setImage] = useState(null);


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
  const isNumber = (value) => !isNaN(Number(value));


  const handleSave = () => {
    // Basic input validation
    if (!title || !desc || !date || !isNumber(price) || !isNumber(maxPeople)) {
      alert('Please fill in all fields, and ensure Price and Max People are valid numbers.');
      return;
    }

    // Display input data in the console
    console.log('id : ', id);
    console.log('Title:', title);
    console.log('Price:', price);
    console.log('Max People:', maxPeople);
    console.log('Description:', desc);
    console.log('Date:', date);
    console.log('location:', location);
    console.log('organizer:', organizer);

    const payload = {
      id,
      title,
      price,
      maxPeople,
      desc,
      date,
      location,
      organizer,
      first_image,
      image
    };

    axios.post('http://localhost:4000/events/updateImage/', payload)
      .then(response => {
        console.log('Event updated successfully:', response.data);
        alert('Event updated successfully');
      })
      .catch(error => {
        console.error('Error updating event:', error);
        alert('Error updating event');
      });
      

  }

  


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
              <MDBTextArea id='textAreaExample' rows={3} value={desc}
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
              {image === null ? (
                <img className="img-fluid" src={first_image.url} alt="" />
              ) : (
                <img className="img-fluid" src={image} alt="" />
              )}          <MDBFile size='lg' id='customFile' onChange={handleImage} />
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
           
            
            <Button
              type="submit"
              variant="contained"
              style={styles.buttonS}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </MDBContainer>
      </div>
    </Modal>
  );
}

export default EventTest;
