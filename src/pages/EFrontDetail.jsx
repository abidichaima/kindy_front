import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../components/pagetitle/PageTitle';
import { Link } from 'react-router-dom';

import CardModal from './EventPayment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EventIcon from '@material-ui/icons/Event';


EFrontDetail.propTypes = {

};

function EFrontDetail(props) {

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [user, setUser] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/events/${id}`);
                setData(response.data.event);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]); // Ensure id is in the dependency array

    console.log('Current data:', data);


    const [modalShow, setModalShow] = useState(false);

    if (!data) {
        // Data is still loading
        return <p>Loading...</p>;
    }
    return (
        <div>

            <PageTitle sub='Event' title=' Detail' />

            <section className="tf-item-detail">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-item-detail-inner">
                                <div className="image">
                                    <img src={data.image.url} alt="Binasea" style={{ width: '800px', height: '700px' }} />                                                        </div>
                                <div className="content">

                                    <h2 className="title-detail">Event {data.title}  </h2>
                                    <p className="except">Organized BY {data.organizer} .</p>

                                    <Tabs className="tf-tab">
                                        <TabList className="menu-tab ">
                                            <Tab className="tab-title "><Link to="#">Details</Link></Tab>
                                            <Tab className="tab-title "><Link to="#">Description</Link></Tab>

                                        </TabList>

                                        <TabPanel >
                                            <div className="tab-details">

                                                <p >Price: {data.price}</p>
                                                <br></br>
                                                <p >Number of Tickets: {data.maxPeople}</p>
                                                <br></br>
                                                <p >Location: {data.location}</p>
                                                <br></br>
                                                <p >Date & Time: {data.date}</p>
                                                <br></br>

                                            </div>
                                        </TabPanel>
                                        <TabPanel >
                                            <ul className="tab-bid">
                                                <p>{data.desc} </p>
                                            </ul>
                                        </TabPanel>

                                    </Tabs>

                                    <div className="content-bottom">
                                        <div className="heading">
                                            <h6>Get your ticket NOW</h6>
                                            <div className="price"><div className="icon"> <EventIcon fontSize="large" /></div></div>
                                        </div>
                                        <div className="button">
                                            <Link to="#" onClick={() => setModalShow(true)} className="tf-button" data-toggle="modal" data-target="#popup_bid" style={{ width: '100%', padding: '15px', fontSize: '18px' }}>
                                                BOOK A TICKET
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='tf-explore-more'>
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-heading">
                                <h4 className="heading">Comment & Review</h4>
                            </div>
                        </div>



                    </div>
                </div>

                        <CardModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            event={data}
                            user={user}
                        />
                

            </section>

        </div>
    );
}

export default EFrontDetail;