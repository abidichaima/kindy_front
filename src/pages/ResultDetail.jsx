import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PageTitle from '../components/pagetitle/PageTitle';
import Dashboard from './Dashboard';
import img from '../assets/images/BATTERIE.jpg';

function ResultDetail() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/result/show/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    return (
        <div>
            <section className="tf-page-title">
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="thumb-pagetitle">
                            <img src={img} alt="images" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="tf-dashboard tf-tab">
                <div className="tf-container">
                    <Tabs className='dashboard-filter'>
                        <div className="row">
                            <div className="col-xl-3 col-lg-12 col-md-12">
                                <Dashboard />
                            </div>
                            <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">
                                <div className="dashboard-content inventory content-tab">
                                    <PageTitle sub='Explore' title='Item Details' />
                                    <section className="tf-item-detail">
                                        <div className="tf-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="tf-item-detail-inner">
                                                        <div className="content">
                                                            <Tabs className="tf-tab">
                                                                <TabList className="menu-tab">
                                                                    <Tab className="tab-title active"><Link to="#">User</Link></Tab>
                                                                    <Tab className="tab-title"><Link to="#">Quizz</Link></Tab>
                                                                    <Tab className="tab-title"><Link to="#">Responses</Link></Tab>
                                                                </TabList>
                                                                <TabPanel>
                                                                    {data && (
                                                                        <div className="tab-details">
                                                                            <div>
                                                                                {data.userId && data.userId.image && (
                                                                                    <img src={data.userId.image.url} alt="no Image" height="100px" width="100px" />
                                                                                )}
                                                                                <p><strong>Last Name:</strong> {data.userId && data.userId.lastName}</p>
                                                                                <p><strong>First Name:</strong> {data.userId && data.userId.firstName}</p>
                                                                                <p><strong>Email:</strong> {data.userId && data.userId.email}</p>
                                                                                <p><strong>Phone Number:</strong> {data.userId && data.userId.phoneNumber}</p>
                                                                                <p><strong>Level:</strong> {data.userId && data.userId.level}</p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </TabPanel>
                                                                <TabPanel>
                                                                    {data && (
                                                                        <div className="tab-details">
                                                                            <div>
                                                                                <p><strong>Title:</strong> {data.quizId && data.quizId.titre}</p>
                                                                                <p><strong>Description:</strong> {data.quizId && data.quizId.description}</p>
                                                                                <p><strong>Duration:</strong> {data.quizId && data.quizId.duree}</p>
                                                                                <p><strong>Start Date:</strong> {data.quizId && data.quizId.dateDebut}</p>
                                                                                <p><strong>End Date:</strong> {data.quizId && data.quizId.dateFin}</p>
                                                                                <p><strong>Level:</strong> {data.quizId && data.quizId.level}</p>
                                                                                <p><strong>Score:</strong> {data.quizId && data.quizId.score}</p>
                                                                                <p><strong>Questions:</strong></p>
                                                                                <ul>
                                                                                    {data.quizId && data.quizId.questions.map((quest, index) => (
                                                                                        <li key={index}>
                                                                                            <p><strong>Ennonce:</strong> {quest.ennonce}</p>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </TabPanel>
                                                                <TabPanel>
  {data && data.responses && (
    <div className="tab-details">
      {data.responses.map((response, index) => {
        const question = response.questionId;
        const selectedOptions = response.selectedOptions || [];
        const correctResponses = question.responses || [];

        // Vérifier si la question est correcte ou incorrecte
        const isQuestionCorrect = correctResponses.every(response => {
          return selectedOptions.includes(response.content) === response.isCorrect;
        });

        return (
          <div key={index}>
            <p><strong>Question:</strong> {question && question.ennonce}</p>
            <p><strong>User Answers:</strong> {selectedOptions.join(', ')}</p>
            <ul style={{ listStyleType: 'none', paddingLeft: '0', marginBottom: '0.5rem' }}>
              <li style={{ fontWeight: 'bold' }}>
                {selectedOptions.length > 0 ? (
                  <div>
                    {selectedOptions.map((option, j) => (
                      <div key={j}>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span>none selected</span>
                )}
                <p style={{ fontWeight: 'bold', color: isQuestionCorrect ? 'green' : 'red' }}>
                  The response is {isQuestionCorrect ? 'correct' : 'incorrect'}
                </p>
              </li>
            </ul>
            <hr />
          </div>
        );
      })}
    </div>
  )}
</TabPanel>

                                                            </Tabs>
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
}

export default ResultDetail;
