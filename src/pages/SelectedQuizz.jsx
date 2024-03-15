import Quiz from 'react-quiz-component';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SelectedQuizz = ({ quizDuration, user }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questionResponses, setQuestionResponses] = useState([]);
  const { quizId } = useParams(); // Récupérer l'identifiant du quiz à partir de l'URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/quizz/show/${quizId}`);
        setSelectedQuiz(response.data.quizz);
        console.log(selectedQuiz);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    if (quizId) {
      fetchData();
    }
  }, [quizId]);

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
    console.log("Quiz result:", result);
    // Créer un objet contenant les informations du quiz
    const quizResult = {
      userId: user._id,
      quizId: selectedQuiz._id,
      responses: questionResponses,
      score: result.correctPoints,
    };
    console.log("Quiz result to send:", quizResult);
    sendQuizResult(quizResult);
  };

  const generateQuiz = () => {
    // Vérifier si un quiz est sélectionné
    if (!selectedQuiz) return null;

    return {
      quizTitle: selectedQuiz.titre,
      quizSynopsis: selectedQuiz.description,
      questions: selectedQuiz.questions.map(question => {
        const correctAnswerIndices = question.responses
          .map((response, index) => response.isCorrect ? index + 1 : null)
          .filter(index => index !== null);

        return {
          userId: user._id,
          quizId: selectedQuiz._id,
          questionId: question._id,
          question: question.ennonce,
          questionType: "text", 
          answerSelectionType: "multiple",
          imageUrl: question.image ? question.image.url : null,
          answers: question.responses.map(response => response.content),
          correctAnswer: correctAnswerIndices,
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          explanation: "Explanation goes here.",
          point: "10"
        };
      }),
    };
  };

  return (
    <div>
   
      <Quiz
        quiz={generateQuiz()}
        shuffle
        shuffleAnswer
        showInstantFeedback
        onComplete={handleQuizCompletion}
        onQuestionSubmit={handleQuestionSubmit}
        disableSynopsis
        timer={quizDuration}
      />
    
  </div>
  );
};

export default SelectedQuizz;
