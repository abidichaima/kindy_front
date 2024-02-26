import React from 'react';
import { Button, TextField} from '@mui/material';
import { FiIconName } from 'react-icons/fi';

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

function UpdateQuestionForm({ onClose }) {
  const handleClosePopupUp = () => {
    onClose(); 
  };

  return (
    <div style={styles.popup}>
      <div style={styles.title}>Update Question</div>
      <TextField
        fullWidth
        label="Question"
        variant="outlined"
        style={styles.textField}
        InputProps={{ style: { color: 'black' } }}

      />
      <TextField
        fullWidth
        label="Answer"
        variant="outlined"
        style={styles.textField}
        InputProps={{ style: { color: 'black' } }}
      />
      
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
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default UpdateQuestionForm;
