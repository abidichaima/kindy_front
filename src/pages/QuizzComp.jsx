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
import { Grid, Typography } from '@material-ui/core';

function QuizzComp() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);  
  const [user,setuser] = useState([]);
  const [quizzList, setQuizzList] = useState([]);
  const [quizDuration, setQuizDuration] = useState(60);

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
        setQuizzList(quizzResult.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleStartQuiz = (quiz) => {
    if (quiz) {
      const currentDate = new Date();
      const startDate = new Date(quiz.dateDebut);
      const endDate = new Date(quiz.dateFin);
    
      if (currentDate >= startDate && currentDate <= endDate) {
        setSelectedQuiz(quiz);
        setShowQuiz(true);
      } else {
        alert('Le quiz n\'est pas encore disponible ou a expiré.');
      }
    }
  };

  const renderQuizItem = (quiz) => (
    <Grid item key={quiz.id}>
      <Link to="#" onClick={() => handleStartQuiz(quiz)}>
        {/* Replace the icon below with your desired icon component */}
        <i className="material-icons">assessment</i>
        <Typography>{quiz.titre}</Typography>
      </Link>
    </Grid>
  );


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
      <section className="tf-dashboard tf-tab">
        <div className="tf-container">
          <Grid container spacing={3}>
            <Grid item xs={3}>
              {/* Your side profile component */}
              <SideProfile />
            </Grid>
            <Grid item xs={9}>
              <div className="dashboard-content inventory content-tab">
                <section className="tf-item-detail">
                  <div className="tf-container">
                    <Grid container spacing={3}>
                      {quizzList.map(renderQuizItem)}
                    </Grid>
                  </div>
                </section>
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    </div>
  );
};

export default QuizzComp;
