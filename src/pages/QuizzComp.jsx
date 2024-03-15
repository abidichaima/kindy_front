import React, { useState, useEffect } from 'react';
import Quiz from 'react-quiz-component';
import Button from '@material-ui/core/Button';
import { getAllquizzs } from '../services/quizz';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PageTitle from '../components/pagetitle/PageTitle';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg'
import { getuser } from '../services/question';
import SideProfile from './SideProfile';
import { duration } from '@mui/material';
import axios from 'axios';
function QuizzComp() {
  const [questionResponses, setQuestionResponses] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);  
  const [user,setuser] = useState([]);
  const [quizzList, setQuizzList] = useState([]);
  const [quizDuration, setQuizDuration] = useState();
  const [score, setScore] = useState();

  const [quizResult, setQuizResult] = useState();
  useEffect(() => {
    const fetchUser = async () => {
        const userResult = await getuser("65f104d40b866b69b10b9552"); 
        setuser(userResult.data);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzResult = await getAllquizzs();
        const filteredQuizzes = quizzResult.data.filter(quiz => quiz.level === user.level);
        setQuizzList(filteredQuizzes);
        console.log(quizDuration);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
  
    fetchQuizzes();
  }, [user.level, quizDuration]);

  const handleStartQuiz = (quiz) => {
    // Vérifier si un quiz est sélectionné
    if (quiz) {
      const currentDate = new Date();
      const startDate = new Date(quiz.dateDebut);
      const endDate = new Date(quiz.dateFin);
    
      if (currentDate >= startDate && currentDate <= endDate) {
        setSelectedQuiz(quiz);
        setuser(user);
        setShowQuiz(true);
        setQuizDuration(quiz.duree);
        
      } else {
        alert('Le quiz n\'est pas encore disponible ou a expiré.');
      }
    }
  };
  const handleQuestionSubmit = (response) => {
    setQuestionResponses(prevResponses => [...prevResponses, response]);
    
  };
  const sendQuizResult = async (quizResult) => {
    try {
      const response = await axios.post('http://localhost:4000/result/add', quizResult, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Réponse de la requête POST:', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la requête POST:', error);
    }
  };
  
  const handleQuizCompletion = (result) => {
    console.log("result", result);
    // Créer un objet contenant les informations du quiz
    const quizResult = {
      userId: result.questions[0].userId._id,
      quizId: result.questions[0].quizId._id,
      responses: questionResponses,
      score: result.correctPoints,
    };
    console.log("resultapressss", quizResult);
    sendQuizResult(quizResult);
  };
const generateQuiz = () => {
  // Vérifier si un quiz est sélectionné
  if (!selectedQuiz) return null;

  const quizR = selectedQuiz;// Récupérer l'ID du quiz sélectionné
  const userR = user; // Récupérer l'ID de l'utilisateur

  return {
    quizTitle: selectedQuiz.titre,
    quizSynopsis: selectedQuiz.description,
    questions: selectedQuiz.questions.map(question => {
      const correctAnswerIndices = question.responses
        .map((response, index) => response.isCorrect ? index+1 : null)
        .filter(index => index !== null);

      return {
        userId: userR, // Ajouter l'ID de l'utilisateur à chaque question
        quizId: quizR, // Ajouter l'ID du quiz à chaque question
        questionId:question._id,
        question: question.ennonce,
        questionType: "text", 
        answerSelectionType: "multiple",
        imageUrl: question.image ? question.image.url : null,
        answers: question.responses.map(response => response.content),
        correctAnswer: correctAnswerIndices,
        messageForCorrectAnswer: "Correct answer. Good job.",
        messageForIncorrectAnswer: "Incorrect answer, Please try again.",
        explanation: "Explanation goes here.",
        point: "10"

      };
    }),
  };
};
  return (
    <div>
      <section className="tf-page-title ">    
        <div className="tf-container">
          <div className="row">
            <div className="col-md-12">
              <ul className="breadcrumbs">
                <li><Link to="/">Home</Link></li>
                <li>Profile</li>
              </ul>
            </div>
          </div>
        </div>  
        <div className="container-fluid" style={{ width: '100%' }}>
          <div className="row" style={{ width: '100%' }}>
            <div className="thumb-pagetitle" style={{ width: '100%' }}>
              <img src={img} alt="images" style={{ width: '100%' }}/>
            </div>
          </div>
        </div>                     
      </section>

      <section className="tf-dashboard tf-tab">
        <div className="tf-container">
          <Tabs className='dashboard-filter'>
            <div className="row ">                 
              <div className="col-xl-3 col-lg-12 col-md-12">
                <SideProfile/>
              </div>
              <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">
                <div className="dashboard-content inventory content-tab">
                  <section className="tf-item-detail">
                    <div className="tf-container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="tf-item-detail-inner">
                            <div className="content">
                              <h2 className="title-detail"></h2>
                              {quizzList.map((quiz) => (
                                <div key={quiz.id}>
                                  <h3>{quiz.titre}</h3>
                                  <p>{quiz.description}</p>
                                  <Button onClick={() => handleStartQuiz(quiz)}>Commencer le quiz</Button>
                                </div>
                              ))}
                              {showQuiz && generateQuiz() && <Quiz quiz={generateQuiz()}   shuffle
        shuffleAnswer
        showInstantFeedback
        onComplete={handleQuizCompletion}
        onQuestionSubmit={handleQuestionSubmit}
        disableSynopsis
        timer={quizDuration}
       // allowPauseTimer
       // continueTillCorrect
    />}



    
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default QuizzComp;

//<Link to={`/quizz/${quiz._id}`}> <Button >Commencer le quiz</Button></Link>