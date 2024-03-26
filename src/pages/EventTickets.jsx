import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PageTitle from '../components/pagetitle/PageTitle';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import img from '../assets/images/BATTERIE.jpg'

//import avt from '../assets/images/logo1.png'

import axios from 'axios';

import Swal from 'sweetalert2';
import AddEventForm from './EventAdd';
import UpdateEventForm from './EventUpdate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Dashboard from './Dashboard';
import CardModal from '../components/layouts/CardModal';
import EventTest from './EventTest'




function EventTickets(props) {


    const DeleteConfirmation = (id) => {
        console.log("id:", id);
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:4000/events/delete/${id}`);
                    Swal.fire(
                        'Deleted!',
                        'Your item has been deleted.',
                        'success'
                    );
                    axios.get('http://localhost:4000/events/')
                        .then((response) => {
                            setData(response.data);
                        })

                } catch (error) {
                    console.error('Error deleting the event:', error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while deleting the event.',
                        'error'
                    );
                }
            }
        });
    };


    const btnupdate = {
        backgroundColor: "#28a745",
        borderRadius: "25px",
        border: "none",
        cursor: "pointer",
        padding: "5px", // Ajustez le padding pour réduire l'espace autour de l'icône
        outline: "none",
        transition: "background-color 0.3s",
        marginRight: "5px",
    };

    const btndelete = {
        backgroundColor: "#dc3545",
        borderRadius: "25px",
        border: "none",
        cursor: "pointer",
        padding: "5px",
        outline: "none",
        transition: "background-color 0.3s",

    };
    const btnshow = {
        backgroundColor: "#ffc107",
        borderRadius: "25px",
        border: "none",
        cursor: "pointer",
        padding: "5px",
        outline: "none",
        transition: "background-color 0.3s",
        marginRight: "5px",
    };
    const btnStyles = {
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "5px",
        outline: "none",
        transition: "background-color 0.3s",
    };

    const iconStyles = {
        fontSize: "1.5rem",
        color: "#333",
    };
    const btnHoverStyles = {
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
        backgroundColor: "grey",
    };
    const selectStyle = {
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        transition: 'box-shadow 0.3s',
        marginLeft: "15px",
        marginBottom: "5px",
    };
    const dialogContentStyle = {
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        // background: `url('https://thumbs.dreamstime.com/z/notes-de-musique-7544001.jpg?w=576 576w')` , // Adjust the path to your image
        backgroundSize: 'cover',
        backdropFilter: 'blur(5px)', // Adjust the blur amount as needed
        transition: 'box-shadow 0.3s',
    };

    const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);



    const [prevHover, setPrevHover] = useState(false);
    const [nextHover, setNextHover] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [isPopupOpenUp, setIsPopupOpenUp] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Modifié pour démarrer à 5 par défaut
    const [data, setData] = useState([]);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/tickets/getTickets');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventPromises = data.map(async (item) => {
                try {
                    const response = await axios.get(`http://localhost:4000/events/${item.event_id}`);
                    return response.data.event;
                } catch (error) {
                    console.error('Error fetching event data:', error);
                    return null;
                }
            });

            const eventResults = await Promise.all(eventPromises);
            setEvents(eventResults);
        };

        fetchEvents();
    }, [data]);



    const handleChangeItemsPerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(data.length / itemsPerPage)));
    };

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);

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
                <div class="container-fluid" style={{ width: '100%' }}>
                    <div class="row" style={{ width: '100%' }}>
                        <div class="thumb-pagetitle" style={{ width: '100%' }}>
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
                                <Dashboard />
                            </div>
                            <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">

                                <div className="dashboard-content inventory content-tab">

                                    <TabPanel>
                                        <div>
                                            <div className="inner-content inventory">
                                                <h4 className="title-dashboard">Tickets</h4>

                                                <div className="pagination-controls" style={{ marginBottom: '20px' }}>
                                                    <select id="itemsPerPage" value={itemsPerPage} onChange={handleChangeItemsPerPage} style={selectStyle}>
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                    </select>
                                                </div>

                                                <div className="table-ranking top">
                                                    <div className="title-ranking">
                                                        <div className="col-rankingg"><Link to="#">Booking Date</Link></div>
                                                        <div className="col-rankingg"><Link to="#">Event</Link></div>
                                                        <div className="col-rankingg"><Link to="#">User</Link></div>
                                                        <div className="col-rankingg"><Link to="#">Number of tickets</Link></div>
                                                        <div className="col-rankingg"><Link to="#">Total Amount</Link></div>
                                                    </div>
                                                </div>

                                                <div className="table-ranking">
                                                    {/* Affichage des éléments de la page actuelle */}
                                                    {data.map((item, index) => (
                                                        <div className="content-ranking" key={index}>
                                                            <div className="col-rankingg">
                                                                {new Date(item.createdAt).toLocaleDateString('en-GB')}
                                                            </div>
                                                            <div className="col-rankingg">{events[index]?.title}</div>
                                                            <div className="col-rankingg">{item.user_id}</div>
                                                            <div className="col-rankingg">{item.number}</div>
                                                            <div className="col-rankingg">{item.amount}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Contrôles de pagination en bas du tableau */}
                                            <div className="pagination-controls" style={{ marginTop: '20px', textAlign: 'center' }}>
                                                <button
                                                    onClick={handlePrevPage}
                                                    style={{ ...btnStyles, ...(currentPage === 1 ? { pointerEvents: "none" } : {}), ...(prevHover ? btnHoverStyles : {}) }}
                                                    onMouseEnter={() => setPrevHover(true)}
                                                    onMouseLeave={() => setPrevHover(false)}
                                                    disabled={currentPage === 1}
                                                >
                                                    <FiChevronLeft style={iconStyles} />
                                                </button>

                                                <button
                                                    onClick={handleNextPage}
                                                    style={{ ...btnStyles, ...(currentPage === pageCount ? { pointerEvents: "none" } : {}), ...(nextHover ? btnHoverStyles : {}) }}
                                                    onMouseEnter={() => setNextHover(true)}
                                                    onMouseLeave={() => setNextHover(false)}
                                                    disabled={currentPage === pageCount}
                                                >
                                                    <FiChevronRight style={iconStyles} />
                                                </button>

                                                <span style={{ marginLeft: '10px' }}>{data.length}</span>
                                            </div>
                                        </div>
                                    </TabPanel>




                                </div>
                            </div>
                        </div>
                    </Tabs>

                </div>
            </section>

        </div>
    );
}

export default EventTickets;