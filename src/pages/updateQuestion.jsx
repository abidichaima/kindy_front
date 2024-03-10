import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { editQuestion } from '../services/question';

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

function UpdateQuestionForm({ onClose, selectedItem }) {
  const [ennonce, setEnnonce] = useState(selectedItem.ennonce || '');
  const [image, setImage] = useState(selectedItem.image || '');

const  quest={
  ennonce,
  image,
};
  const updateQuest = async () => {
    const result = await editQuestion(selectedItem._id,quest);
    if (result.status === 201) {
      console.log("yessss");
    //navigate("/ques");
    }
    };
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
        value={ennonce}
        InputProps={{ style: { color: 'black' } }}
        onChange={(e) => setEnnonce(e.target.value)}
        name="Question"
      />
      <TextField
        fullWidth
        label="Answer"
        variant="outlined"
        style={styles.textField}
        value={image}
        InputProps={{ style: { color: 'black' } }}
        onChange={(e) => setImage(e.target.value)}
        name="Answer"
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
        <Button type="submit" variant="contained" style={styles.buttonS} onClick={updateQuest}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default UpdateQuestionForm;
