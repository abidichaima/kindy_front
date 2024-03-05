import React, { useState, useContext, useEffect } from 'react';
import PageTitle from '../components/pagetitle/PageTitle';
import EventAuctions from './EventAuctions'
import axios from 'axios';

EventFront.propTypes = {

};

function EventFront(props) {
    const [dataE, setDataE] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/events/')
            .then((response) => {
                setDataE(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='page-liveauction'>
               
            <EventAuctions data={dataE} />

        </div>
    );
}

export default EventFront;