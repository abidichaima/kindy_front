import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios  from 'axios';

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
  InputLabel: {
    marginBottom: '20px',
  },
  buttonS: {
    margin: '10px',
    minWidth: '120px',
  },
  buttonC: {
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    outline: 'none',
    transition: 'background-color 0.3s',
    backgroundColor: '#6c757d',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color :'Black'
  },
  footer: {
    textAlign: 'right',
    marginTop: '20px',
  },
};



function UpdateUserForm({ onClose, onUpdateUser , initialValues }) {
  const [email, setEmail] = useState(''||initialValues.email);
  const [password, setPassword] = useState(''||initialValues.password);
  const [firstName, setFirstName] = useState(''||initialValues.firstName);
  const [lastName, setLastName] = useState(''||initialValues.lastName);
  const [role, setRole] = useState(''||initialValues.role); // Set default role

  const handleClosePopupUp = () => {
    onClose();
  };

  const handleSave = () => {

    const payload ={
      firstName , lastName , password , email , role
    }

    axios.put('http://localhost:4000/users/user', payload)
      .then(response => {
        // Handle the successful response, e.g., show a success message
        console.log('user updated successfully:', response.data);
        alert('user updated successfully');
      })
      .catch(error => {
        // Handle errors, e.g., show an error message
        console.error('Error updating user:', error);
        alert('Error updating user');
      })
      .finally(() => {
        // Close the popup
        handleClosePopupUp();
      });

    }

  return (
    <div style={styles.popup}>
      <div style={styles.title}>Update User</div>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        style={styles.textField}
        InputProps={{ style: { color: 'black' } }}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
   
      <TextField
        fullWidth
        label="First Name"
        variant="outlined"
        style={styles.textField}
        InputProps={{ style: { color: 'black' } }}
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Last Name"
        variant="outlined"
        style={styles.textField}
        InputProps={{ style: { color: 'black' } }}
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />

<FormControl variant="outlined" style={styles.formControl}>
        <InputLabel>Role</InputLabel>
        <Select
          label="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </Select>
      </FormControl>


      <div style={styles.footer}>
        <Button
          type="button"
          variant="contained"
          onClick={handleClosePopupUp}
          style={styles.buttonC}
        >
          Close
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={styles.buttonS}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default UpdateUserForm;
