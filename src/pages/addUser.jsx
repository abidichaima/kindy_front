import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

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
  },
  footer: {
    textAlign: 'right',
    marginTop: '20px',
  },
};

function AddUserForm({ onClose, onAddUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState(''); // Set default role

  const handleClosePopup = () => {
    onClose();
  };

  const handleSave = () => {
    const addUserEndpoint = "http://localhost:4000/users/addUser"; // Replace with your actual backend endpoint

    fetch(addUserEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        role,
      }),
    })
      .then(response => response.json())
      .then(data => {
        onAddUser(data);
        onClose();
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <div style={styles.popup}>
      <div style={styles.title}>Add User</div>
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
        label="Password"
        variant="outlined"
        style={styles.textField}
        InputProps={{ style: { color: 'black' } }}
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
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
          onClick={handleClosePopup}
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

export default AddUserForm;
