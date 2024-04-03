import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Container, Grid, Typography } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import { getuser } from '../services/question';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import './quiz.css'; // Importer le fichier CSS pour les styles personnalisés
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
const Quiz = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState();
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quizDurationInSeconds, setQuizDurationInSeconds] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [user, setUser] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showQuizz, setshowQuizz] = useState(true);
  const [resultResponse, setResultResponse] = useState(null);
  
  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: '#FFC0CB', // Couleur rose
      color: 'white', // Couleur du texte
      '&:hover': {
        backgroundColor: '#FF69B4', // Couleur rose foncé au survol
      },
      borderRadius: '20px',
      fontSize: '1.5rem', // Taille de la police
      height: '40px', // Hauteur du bouton
    },
    card: {
    
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow effect
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResult = await getuser("65f104d40b866b69b10b9552");
        setUser(userResult.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/quizz/show/${id}`);
        setQuizData(response.data.quizz); 
        startTimer();
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    if (id) {
      fetchQuizData();
    }

  }, [id]);

  useEffect(() => {
    if (quizData && quizData.duree) {
      const durationInSeconds = quizData.duree * 60; 
      setQuizDurationInSeconds(durationInSeconds);
      setTimeRemaining(durationInSeconds);
    }
  }, [quizData]);

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 0) {
          clearInterval(interval);
          setShowResults(false);
          setshowQuizz(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "complete all questikons",
            footer: '<a href="#"></a>'
          });
          window.location.href = `/quizz/validation/${id}`;
        }
        return prevTime - 1;
      });
      
    }, 1000);
  };
  
  const handleOptionSelect = (option, index) => {
    const newSelectedOptions = [...selectedOptions];
    if (newSelectedOptions[currentQuestionIndex]?.includes(option)) {
      // Remove the option if already selected
      newSelectedOptions[currentQuestionIndex] = newSelectedOptions[currentQuestionIndex].filter(item => item !== option);
    } else {
      // Add the option if not selected
      newSelectedOptions[currentQuestionIndex] = [...(newSelectedOptions[currentQuestionIndex] || []), option];
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOptions([...selectedOptions, []]);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  if (!quizData || !quizData.questions) {
    return <div>Loading...</div>;
  }

  
  const sendQuizResult = async () => {
    let updatedScore = 0;
  
    const responses = quizData.questions.map((question, index) => {
      const selectedOptionsForQuestion = selectedOptions[index] || [];
  
      const isQuestionCorrect = selectedOptionsForQuestion.every(selectedOption => {
        return question.responses.some(response => {
          return selectedOption === response.content && response.isCorrect;
        });
      });
  
      if (isQuestionCorrect) {
        updatedScore += question.point;
      }
  
      return {
        question: question,
        selectedOptions: selectedOptionsForQuestion,
      };
    });
  
    if (responses.some(response => response.selectedOptions.length === 0)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "complete all questikons",
        footer: '<a href="#"></a>'
      });
      return;
    }
  
    setScore(updatedScore);
  
    const quizResult = {
      userId: user._id,
      quizId: id,
      score: updatedScore,
      responses: JSON.stringify(responses),
    };
  
    console.log("Réponses sélectionnées :", quizResult);
  
    try {
      const response = await axios.post('http://localhost:4000/result/add', quizResult, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const resultId = response.data._id;
      console.log('ID du résultat créé :', resultId);
    
      setShowResults(true);
      setshowQuizz(false);
    
      const Response = await axios.get(`http://localhost:4000/result/show/${resultId}`);
      console.log("tyu",Response.data);
     setResultResponse(Response.data) ;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du résultat du quiz ou de la récupération du résultat:', error);
    }
  };
  const quizzItemStyle = {
    color:'black',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '15px',
      alignItems: 'center',
    };
  
  const question = quizData.questions[currentQuestionIndex];

  return (
    <Container maxWidth="md" className="quiz-container">
      {showQuizz && (
        <Card className={classes.card}>
          <CardContent>
            {/* Afficher le numéro de la question */}
            <Typography variant="h6" component="h2" style={{ marginBottom: '1rem' }}>
              Question {currentQuestionIndex + 1}/{quizData.questions.length}
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom className="question" style={{ textAlign: 'center' }}>
  {question.ennonce}
</Typography>
{question.image.url && (
    <div style={{ textAlign: 'center' }}>
        <img src={question.image.url} className="image" />
    </div>
)}       <Grid container spacing={2} justifyContent="center">
              {question.responses.map((response, index) => (
                <Grid item xs={6} key={index}>
                  <Button
                    style={{
                      color: 'black', // Couleur du texte
                      height: '50px', // Hauteur du bouton
                      fontSize: '1.4rem', // Taille de la police
                      fontWeight: 'bold', // Poids de la police
                    }}
                    className={`optionButton ${
                      (selectedOptions[currentQuestionIndex] || []).includes(response.content) ? 'selectedOptionButton' : ''
                    }`}
                    variant={(selectedOptions[currentQuestionIndex] || []).includes(response.content) ? "contained" : "outlined"}
  
                    onClick={() => handleOptionSelect(response.content, index)}
                  >
                    {(selectedOptions[currentQuestionIndex] || []).includes(response.content) ? response.content : response.content}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <Typography variant="body1" style={{ fontSize:'15px',color:'black' }}>
                Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </Typography>
              <div>
                <Button
                  variant="contained"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={classes.button}
                >
                  <NavigateBeforeIcon /> Previous
                </Button>
                {currentQuestionIndex === quizData.questions.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={sendQuizResult}
                    className={classes.button}
                  >
                    Finish Quiz
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={currentQuestionIndex === quizData.questions.length - 1}
                    className={classes.button}
                  >
                    Next <NavigateNextIcon />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
  
  {showResults && (
                                                          <div className="tf-item-detail-inner">
      <div className="content text-center col-md-12">
        <div style={quizzItemStyle}>
        <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold', color: '#4155c2', fontSize: '24px', marginBottom: '20px' }}>
            Results
          </Typography>
          <Typography variant="body1" gutterBottom style={{ marginBottom: '1rem', fontSize: '18px', fontWeight: 'bold' }}>
            Title of quizz : {quizData && quizData.titre}
          </Typography>
          {resultResponse && resultResponse.responses && resultResponse.responses.length > 0 && (
  <Card style={{ marginBottom: '2rem', textAlign: 'left' }}>
    <CardContent>
     
      <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '18px' }}>
        Score : {resultResponse.score}
      </Typography>
      {resultResponse.responses.map((questionResponse, i) => {
        const question = questionResponse.questionId;
        const selectedOptions = questionResponse.selectedOptions || [];
        const correctResponses = question.responses || [];

        return (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold', fontSize: '16px' }}>
              Question {i + 1}: {question ? question.ennonce : ''}
            </Typography>
            <ul style={{ listStyleType: 'none', paddingLeft: '0', marginBottom: '0.5rem' }}>
            <li style={{ fontWeight: 'bold' }}>
  Responses  :
  {questionResponse.questionId.responses && questionResponse.questionId.responses.map((response, index) => (
    <span key={index} style={{ marginRight: '1rem' }}>
    {response.content} :  {response.isCorrect ? 'Correcte' : 'Incorrecte'}
  </span>
  ))}
</li>
              <li style={{ fontWeight: 'bold' }}>
                Options selected :
                {selectedOptions.length > 0 ? (
                  selectedOptions.map((option, j) => (
                    <span key={j} style={{ marginRight: '1rem' }}>{option}  , </span>
                  ))
                ) : (
                  <span>none selected</span>
                )}
              </li>
            </ul>
          </div>
        );
      })}
      
    </CardContent>
 
  </Card>
)}


        </div>
      </div>
    </div>


                
   
               
)}

    </Container>
  );
  
};

export default Quiz;