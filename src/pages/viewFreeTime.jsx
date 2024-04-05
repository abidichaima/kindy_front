
import React , {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg'

import Dashboard from './Dashboard';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import LessonsForm from '../components/LessonForm'; 



function ViewFreeTime(props) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialEvents, setInitialEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    function getUserInfoFromCookie() {
      var cookieValue = document.cookie.match(/(?:^|;) ?user=([^;]*)(?:;|$)/);
  
      if (cookieValue) {
        var decodedValue = decodeURIComponent(cookieValue[1].replace(/\+/g, ' '));
  
        var userObject = JSON.parse(decodedValue);
  
        return userObject;
      } else {
        return null;
      }
    }
     var currentUser = getUserInfoFromCookie();
console.log("user id",currentUser._id);
const teacherId = currentUser._id; // Static teacher ID

fetch(`http://localhost:4000/api/freetime/${teacherId}`)
      .then((response) => response.json())
      .then((data) => {
        const events = [];
        const currentDate = new Date();
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, 0); // Generate events for the next 6 months

        data.forEach((free) => {
          const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 6].indexOf(free.day);
          let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (dayIndex + 1 - currentDate.getDay()) % 7);

          while (date <= endDate) {
            events.push({
              id: `${free._id}-${date}`,
              start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), free.start.split(':')[0], free.start.split(':')[1]),
              end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), free.end.split(':')[0], free.end.split(':')[1]),
              display: 'background', // Set the display property to 'background'
              rendering: 'background', // Also set the rendering property to 'background'
              color: 'red', // Set the background color to red
            });
            date.setDate(date.getDate() + 7);
          }
        });

        setInitialEvents(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  function handleEventClick(clickInfo) {
              // eslint-disable-next-line no-restricted-globals

      console.log("modal true")
      console.log(clickInfo.event)

      setShowModal(true);
      setSelectedRange({ start: clickInfo.event.start, end: clickInfo.event.end });
      setSelectedEvent(clickInfo.event);
    
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function handleCloseModal() {
    setShowModal(false);
    setSelectedRange(null);
    setSelectedEvent(null);
  }


return (

   
  <div>
  <section class="tf-page-title">    
      <div class="tf-container">
          <div class="row">
              <div class="col-md-12">
                  <ul class="breadcrumbs">
                      <li><Link to="/">Home</Link></li>
                      <li>All lessons</li>
                  </ul>
              </div>
          </div>
          <div class="row">
              <div class="col-md-12">
                  <div class="thumb-pagetitle">
                      <img src={img} alt="images" style={{ width: '100%' }}/>
                  </div>
              </div>
          </div>
      </div>
  </section>

  <section className="tf-dashboard tf-tab">
  <div className="container-fluid">
    <div className="row">
      <div className="col-xl-2 col-lg-4 col-md-12">
        <Dashboard />
      </div>
      <div className="col-xl-10 col-lg-8 col-md-12">
        <div className="row">       
        <div className={`col-xl-12} col-lg-12 col-md-12 overflow-table`}>
            <div className="dashboard-content inventory content-tab">
              <div className="demo-app-main">
              <FullCalendar
  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridWeek,timeGridDay',
  }}
  initialView="timeGridWeek"
  editable={true}
  selectable={true}
  selectMirror={true}
  dayMaxEvents={true}
  weekends={weekendsVisible}
  events={initialEvents}
  select={(selectInfo) => {
    setShowModal(true);
    setSelectedRange(selectInfo);
    setSelectedEvent(null);
  }}
  eventContent={renderEventContent}
  eventClick={handleEventClick}
  eventsSet={handleEvents}
  contentHeight="auto"
  slotMinTime="08:00:00"
  slotMaxTime="20:00:00"
/>
              </div>
              
            </div>
            

          </div>

        </div>
      </div>
    </div>
  </div>
</section>
</div>
);
}
function renderEventContent(eventInfo) {
  return (
    <div style={{ backgroundColor: 'red', color: 'white' }}>
    </div>
  );
}



export default ViewFreeTime;