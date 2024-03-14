import React, { useState, useContext, useEffect } from 'react';
import PageTitle from '../components/pagetitle/PageTitle';
import Dashboard from './Dashboard';
import img from '../assets/images/BATTERIE.jpg'
import PropTypes from 'prop-types';
import img1 from '../assets/images/item-details.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function QuizzDetail(props) {
    const { id } = useParams();
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/quizz/show/${id}`);
                setData(response.data.quizz);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]); // Ensure id is in the dependency array

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
                <div className="container-fluid"  style={{ width: '100%' }}>
                    <div className="row"  style={{ width: '100%' }}>
                        <div className="thumb-pagetitle"  style={{ width: '100%' }}>
                            <img src={img} alt="images" style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>                  
            </section>
            <section className="tf-dashboard tf-tab">
                <div className="tf-container">
                    <Tabs className='dashboard-filter'>
                        <div className="row ">                 
                            <div className="col-xl-3 col-lg-12 col-md-12">
                                <Dashboard/>
                            </div>
                            <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">
                                <div className="dashboard-content inventory content-tab">
                                    <PageTitle sub='Explore' title='Item Details' />
                                    <section className="tf-item-detail">
                                        <div className="tf-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="tf-item-detail-inner">
                                                        <div className="image"></div>
                                                        <div className="content">
                                                        <Tabs className="tf-tab">
    <TabList className="menu-tab">
        <Tab className="tab-title active"><Link to="#">Quizz</Link></Tab>
        <Tab className="tab-title"><Link to="#">Questions</Link></Tab>
    </TabList>
    <TabPanel>
        {data && (
            <div className="tab-details">
                <div>
                    <p>Titre: {data.titre}</p>
                    <p>Description: {data.description}</p>
                    <p>Durée: {data.duree}</p>
                    <p>Date de début: {data.dateDebut}</p>
                    <p>Date de fin: {data.dateFin}</p>
                </div>
            </div>
        )}
    </TabPanel>
    <TabPanel>
    {data && (
        <div className="tab-details">
            {data.questions.map((question, index) => (
                <div key={index}>
                    <p>question {index + 1}: {question.ennonce}</p>
                    {question.image && ( // Vérifiez si question.image existe
                        <img src={question.image.url} alt="no Image" height="200px" width="200px"/>
                    )}
                    <p>Responses:</p>
                    <ul>
                        {question.responses.map((response, index) => (
                            <li key={index}>
                                Content: {response.content}, is correct: {response.isCorrect.toString()}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
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

export default QuizzDetail;