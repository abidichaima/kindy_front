import React, { useState, useContext, useEffect } from 'react';
import PageTitle from '../components/pagetitle/PageTitle';
import EventAuctions from './EventAuctions'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { unselectTicket } from './redux/slices/ticketsSlice'

EventFail.propTypes = {

};

function EventFail(props) {

    const dispatch = useDispatch();

    const selectedTicket = useSelector((state) => state.tickets.selectedTicket);
    console.log('Selected Ticket:', JSON.stringify(selectedTicket, null, 2));

    const save = () => {

        alert('Tickets unsaved!');
        dispatch(unselectTicket());
        console.log("after unsaved : ", selectedTicket)

    };
    useEffect(() => {
        if (selectedTicket) {
            save();
        }
    }, [selectedTicket]);



    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/6659/6659895.png" style={{ width: '400px', height: '400px' }} alt="Description de l'image" />
            <h4>Your operation has failed !</h4>
            <p>We're sorry, but there was an issue processing your payment. Please try again or contact support for assistance.</p>
        </div>
    );
}

export default EventFail;