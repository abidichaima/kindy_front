
import React , {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg'

import Dashboard from './Dashboard';
import { getAllLessons,deleteLesson,updateLesson,getLesson,createLesson} from '../services/lesson';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import LessonsForm from '../components/LessonForm'; 



function ViewCalendar(props) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialEvents, setInitialEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  useEffect(() => {
    fetch('http://localhost:4000/api/lesson/get')
      .then((response) => response.json())
      .then((data) => {
        const events = data.map((lesson) => ({
          id: lesson._id,
          title: `${lesson.typeLesson} - ${lesson.course?.name || 'No Course'}`,
          start: new Date(lesson.startLessonDate),
          end: new Date(lesson.endLessonDate),
          teacher: lesson.teacher,
          students: lesson.students,
          classroom: lesson.classRoom,
          course: lesson.course,
        }));
        setInitialEvents(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

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
const btnAdd = {
    marginLeft: "800px",
    backgroundColor: "#076fb9",
    borderRadius: "10px",
    display: 'flex', 
alignItems: 'center', 
justifyContent: 'center', 
textAlign:'center',

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
    marginLeft:"15px",
    marginBottom:"5px",
  };

  

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
        <div className="row">          {showModal && (
            <div className="col-xl-3 col-lg-12 col-md-12">
              <LessonsForm
                show={showModal}
                selectedRange={selectedRange}
                selectedEvent={selectedEvent}
                onClose={handleCloseModal}
              />
            </div>
          )}
        <div className={`col-xl-${showModal ? '9' : '12'} col-lg-12 col-md-12 overflow-table`}>
            <div className="dashboard-content inventory content-tab">
              <div className="demo-app-main">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                  }}
                  initialView="dayGridMonth"
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
                />
              </div>
              
            </div>
            

          </div><div className="col-xl-12 col-lg-12 col-md-12"><Sidebar
                weekendsVisible={weekendsVisible}
                handleWeekendsToggle={handleWeekendsToggle}
                currentEvents={currentEvents}
              /></div>

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
    <>
      {/*<b>{`${eventInfo.event.extendedProps.teacher.firstName} ${eventInfo.event.extendedProps.teacher.lastName}`}</b> */}
         {/*   <b>{`${eventInfo.event.extendedProps.teacher}`}</b> 

      <br />
      <br />*/}
            <i>{eventInfo.event.title}</i>
            <br />
      Classroom: {eventInfo.event.extendedProps.classroom}
    </>
  );
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
      <div className='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to edit or delete it</li>
        </ul>
      </div>

      
    </div>
  );
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
}

export default ViewCalendar;