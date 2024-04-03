import React, { useState, useContext, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { unselectTicket } from './redux/slices/ticketsSlice'


EventSuccess.propTypes = {

};

function EventSuccess(props) {
    const dispatch = useDispatch();

    const selectedTicket = useSelector((state) => state.tickets.selectedTicket);
    console.log('Selected Ticket:', JSON.stringify(selectedTicket, null, 2));
    const [done, setdone] = useState(true);

    const save = () => {
        const addTicketEndpoint = "http://localhost:4000/tickets/addUpdate";

        fetch(addTicketEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedTicket),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('Tickets saved!');
                    setdone(false);
                    dispatch(unselectTicket());
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Error saving tickets. Please try again.');
            });
    };
    useEffect(() => {
        if (selectedTicket && done) {
            save();
        }
    }, [selectedTicket]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <img src="https://storage.needpix.com/rsynced_images/check-37583_1280.png" style={{ width: '400px', height: '400px' }} alt=" image" />
            <h4>Your operation has been successfully completed!</h4>
            <p>You can view your tickets in your profile.</p>
        </div>

    );
}

export default EventSuccess;