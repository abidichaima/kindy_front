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

function ResultDetail(props) {
    const { id } = useParams();
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/result/show/${id}`);
                console.log("response",response);
                setData(response.data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]); // Ensure id is in the dependency array
    console.log('Current data:', data);

    return (
        <div>
            <section class="tf-page-title ">    
                <div class="tf-container">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="breadcrumbs">
                                <li><Link to="/">Home</Link></li>
                                <li>Profile</li>
                            </ul>
                        </div>
                    </div>
                </div>  
                <div class="container-fluid"  style={{ width: '100%' }}>
                    <div class="row"  style={{ width: '100%' }}>
                        <div class="thumb-pagetitle"  style={{ width: '100%' }}>
                            <img src={img} alt="images"   style={{ width: '100%' }}/>
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
                                                        <div className="image">
                                                                                                              </div>
                                                        <div className="content">
                                                            <Tabs className="tf-tab">
                                                                <TabList className="menu-tab ">
                                                                    <Tab className="tab-title active"><Link to="#">User</Link></Tab>
                                                                    <Tab className="tab-title "><Link to="#">Quizz</Link></Tab>
                                                                    <Tab className="tab-title "><Link to="#">Responses</Link></Tab>

                                                                </TabList>
                                                                <TabPanel >
                                                                {data && (
    <div className="tab-details">
        <div>
        {data && data.userId.image && (
        <img src={data.userId.image.url} alt="no Image" height="100px" width="100px"/>
    )}
            <p>lastName: {data.userId.lastName}</p>
            <p>firstName: {data.userId.firstName}</p>
            <p>email: {data.userId.email}</p>
            <p>phoneNumber: {data.userId.phoneNumber}</p>
            <p>level: {data.userId.level}</p>
           
           
            

        </div>
       
        
    </div>
)}
                                                                </TabPanel>
                                                                <TabPanel >
                                                                {data && (
    <div className="tab-details">
        <div>
        
            <p>Title: {data.quizId.titre}</p>
            <p>description: {data.quizId.description}</p>
            <p>duree: {data.quizId.duree}</p>
            <p>dateDebut: {data.quizId.dateDebut}</p>
            <p>dateFin: {data.quizId.dateFin}</p>
            <p>level: {data.quizId.level}</p>
            <p>score: {data.quizId.score}</p>
            <p>Questions:</p>
<ul>
{data.quizId.questions.map((quest, index) => (
    <div key={index}>
        <p>Ennonce: {quest.ennonce}</p>
        <ul>
           
        </ul>
    </div>
))}
</ul>
           
            

        </div>
       
        
    </div>
)}
                                                                </TabPanel>
                                                                <TabPanel>
  {data && (
    <div className="tab-details">
      {data.responses && data.responses.map((response, index) => (
        <div key={index}>
          <p>Question ID: {response.questionId}</p>
          <p>User Answer: {response.userAnswer.join(', ')}</p>
          <p>Is Correct: {response.isCorrect}</p>
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

export default ResultDetail;
