import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Speech = ({ onResult }) => {
  const [questionIndex, setQuestionIndex] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const startListening = (index) => {
    SpeechRecognition.startListening();
    setQuestionIndex(index);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setQuestionIndex(null);
    resetTranscript();
  };

  // Lorsque la reconnaissance vocale reçoit un résultat, appelez la fonction onResult pour traiter le résultat
  if (transcript !== '' && questionIndex !== null) {
    onResult(questionIndex, transcript);
    stopListening(); // Arrêtez la reconnaissance vocale après avoir reçu le résultat
  }

  return null;
};

export default Speech;
