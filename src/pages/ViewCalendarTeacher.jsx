import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg';
import Dashboard from './Dashboard';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import LessonsForm from '../components/LessonForm';
import { format, isSameDay } from 'date-fns';
import { pdf, Document, Page, View, Text, StyleSheet, PDFViewer } from '@react-pdf/renderer';

function ViewCalendarTeacher(props) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialEvents, setInitialEvents] = useState([]);
  const [holidayEvents, setHolidayEvents] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [pdfData, setPdfData] = useState(null);

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
  
    // Fetch lessons for the teacher
    fetch('http://localhost:4000/api/lesson/getByTeacher', {
      method: 'GET',  
      headers: {
        'teacher': currentUser._id
      },
    })
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
          teacherfistname: lesson.teacher.firstName,
          teacherlastname: lesson.teacher.lastName,
        }));
        setInitialEvents(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  
    // Fetch holidays
    fetch('http://localhost:4000/api/holiday')
      .then((response) => response.json())
      .then((data) => {
        const holidayEvents = data.map((holiday) => ({
          title: 'Holiday',
          start: new Date(holiday.date),
          allDay: true,
          display: 'background',
          color: '#FF3633',
          overlap: false,
          constraint: 'availableForMeeting',
        }));
        setHolidayEvents(holidayEvents);
      })
      .catch((error) => {
        console.error('Error fetching holidays:', error);
      });
  }, []);
  
  useEffect(() => {
    generatePdfData();
  }, [initialEvents, holidayEvents]);
  

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleEventClick(clickInfo) {
    if (clickInfo.event.title !== 'Holiday') {
      console.log('modal true');
      console.log(clickInfo.event);
  
      setShowModal(true);
      setSelectedRange({ start: clickInfo.event.start, end: clickInfo.event.end });
      setSelectedEvent(clickInfo.event);
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function handleCloseModal() {
    setShowModal(false);
    setSelectedRange(null);
    setSelectedEvent(null);
  }
  



  //pdf
  function generatePdfData() {
    const data = initialEvents.map(event => {
      const startDate = format(event.start, 'eeee');
      const startTime = format(event.start, 'hh:mm a');
      const endTime = format(event.end, 'hh:mm a');
      const teacherName = `${event.teacher.fistName} ${event.teacher.lastName}`;

      return {
        day: startDate,
        startTime,
        endTime,
        teacher: teacherName
      };
    });

    setPdfData(data);
  }
// Render PDF document
const renderPdf = () => {
 const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const periods = Array.from({ length: 24 }, (_, index) => (index + 1).toString());
  const timings = [
    "08:00-08:30", "08:30-09:00", "09:00-09:30", "09:30-10:00", "10:00-10:30", "10:30-11:00",
    "11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-13:00", "13:00-13:30", "13:30-14:00",
    "14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00", "16:00-16:30", "16:30-17:00",
    "17:00-17:30", "17:30-18:00", "18:00-18:30", "18:30-19:00", "19:00-19:30", "19:30-20:00"
  ];
  const styles = StyleSheet.create({
    
    page: {
      padding: 20,
    },
    tableContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    heading: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
    },
    tableCell: {
      padding: 5,
      borderRightStyle: 'solid',
      borderRightWidth: 1,
      width: "80px",
      height: "auto",
    },
    tableHeading: {
      backgroundColor: '#f2f2f2',
      fontWeight: 'bold',
      fontSize: 12,

    },
    highlight: {
      backgroundColor: '#f8f9fa',
    },
    bold: {
      fontWeight: 'bold',
            fontSize: 12,

    },
    tableData: {
      fontSize: 10,
    },
  });
      return (
        <Document>
  <Page size="A4" style={styles.page}>
    <View style={styles.tableContainer}>
      <Text style={styles.heading}>TIME TABLE</Text>
      <View style={styles.table}>
        {/* Header row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableHeading]}>
            <Text>Time</Text>
          </View>
          {/* Days */}
          {days.map((day, index) => (
            <View key={index} style={[styles.tableCell, styles.tableHeading]}>
              <Text>{day}</Text>
            </View>
          ))}
        </View>

        {/* Data rows */}
        {/* Loop through periods */}
        {periods.map((period, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={[styles.tableCell, styles.highlight]}>
              <Text style={styles.bold}>{timings[index]}</Text>
            </View>
            {/* Loop through days */}
            {days.map((day, i) => (
              <View key={i} style={styles.tableCell}>
                <Text style={styles.tableData}>
                  {/* Add your subject data here */}
                  
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  </Page>
</Document>
      );
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
     {/*      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        {renderPdf()}
</PDFViewer> */} 
            <div className="col-xl-10 col-lg-8 col-md-12">
              <div className="row">
                {showModal && (
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
                        editable={false}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={weekendsVisible}
                        events={[...initialEvents, ...holidayEvents]}

                        selectOverlap={false}
                        
                        select={(selectInfo) => {
                          const selectedStart = selectInfo.start;
                          const selectedEnd = selectInfo.end;
                        
                          // Check if the selected range overlaps with any holiday
                          const overlapsWithHoliday = holidayEvents.some((holidayEvent) => {
                            const holidayStart = holidayEvent.start;
                            const holidayEnd = holidayEvent.end || holidayStart;
                        
                            // Check if the selected range is on the same day as the holiday
                            const isSameStartDay = isSameDay(selectedStart, holidayStart);
                            const isSameEndDay = isSameDay(selectInfo.end, holidayEnd);
                        
                            return (
                              (isSameStartDay && isSameEndDay) || // Selected range is on the same day as the holiday
                              (selectedStart >= holidayStart && selectedStart < holidayEnd) || // Selected start is within the holiday range
                              (selectedEnd > holidayStart && selectedEnd <= holidayEnd) || // Selected end is within the holiday range
                              (selectedStart <= holidayStart && selectedEnd >= holidayEnd) // Selected range encompasses the holiday range
                            );
                          });
                        
                          if (overlapsWithHoliday) {
                            alert('Cannot add an event on a holiday date.');
                          } else {
                            setShowModal(true);
                            setSelectedRange(selectInfo);
                            setSelectedEvent(null);
                          }
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
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <Sidebar
                    weekendsVisible={weekendsVisible}
                    handleWeekendsToggle={handleWeekendsToggle}
                    currentEvents={currentEvents}
                  />
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </section>
    </div>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  text: {
    marginBottom: 10,
    fontSize: 12,
  },
});

function renderEventContent(eventInfo) {
  const { event } = eventInfo;
  if (event.title === 'Holiday') {
    return <span>Holiday</span>;
  } else {
    return (
      <>
        <b>{`${event.extendedProps.teacherfistname} ${event.extendedProps.teacherlastname}`}</b> <br />
        <i>{event.title}</i>
        <br />
        Classroom: {event.extendedProps.classroom}
      </>
    );
  }
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

export default ViewCalendarTeacher; 



/*

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg';
import Dashboard from './Dashboard';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import LessonsForm from '../components/LessonForm';
import { format, isSameDay } from 'date-fns';
import { pdf, Document, Page, View, Text, StyleSheet, PDFViewer } from '@react-pdf/renderer';

function ViewCalendarTeacher(props) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialEvents, setInitialEvents] = useState([]);
  const [holidayEvents, setHolidayEvents] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [pdfData, setPdfData] = useState(null);

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
  
    // Fetch lessons for the teacher
    fetch('http://localhost:4000/api/lesson/getByTeacher', {
      method: 'GET',  
      headers: {
        'teacher': currentUser._id
      },
    })
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
          teacherfistname: lesson.teacher.firstName,
          teacherlastname: lesson.teacher.lastName,
        }));
        setInitialEvents(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  
    // Fetch holidays
    fetch('http://localhost:4000/api/holiday')
      .then((response) => response.json())
      .then((data) => {
        const holidayEvents = data.map((holiday) => ({
          title: 'Holiday',
          start: new Date(holiday.date),
          allDay: true,
          display: 'background',
          color: '#FF3633',
          overlap: false,
          constraint: 'availableForMeeting',
        }));
        setHolidayEvents(holidayEvents);
      })
      .catch((error) => {
        console.error('Error fetching holidays:', error);
      });
  }, []);
  
  useEffect(() => {
    generatePdfData();
  }, [initialEvents, holidayEvents]);
  

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleEventClick(clickInfo) {
    if (clickInfo.event.title !== 'Holiday') {
      console.log('modal true');
      console.log(clickInfo.event);
  
      setShowModal(true);
      setSelectedRange({ start: clickInfo.event.start, end: clickInfo.event.end });
      setSelectedEvent(clickInfo.event);
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function handleCloseModal() {
    setShowModal(false);
    setSelectedRange(null);
    setSelectedEvent(null);
  }
  



  //pdf
  function generatePdfData() {
    const data = initialEvents.map(event => {
      const startDate = format(event.start, 'eeee');
      const startTime = format(event.start, 'hh:mm a');
      const endTime = format(event.end, 'hh:mm a');
      const teacherName = `${event.teacher.firstName} ${event.teacher.lastName}`;

      return {
        day: startDate,
        startTime,
        endTime,
        teacher: teacherName
      };
    });


    setPdfData(data);
  }
    // Render PDF document
    const renderPdf = () => {
      return (
        <Document>
          <Page size="A4" style={styles.page}>
            {pdfData && pdfData.map((item, index) => (
              <Text key={index} style={styles.text}>
                {item.day}: {item.startTime} to {item.endTime}, Teacher: {item.teacher}
              </Text>
            ))}
          </Page>
        </Document>
      );
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
              <div className="row">
                {showModal && (
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
                        editable={false}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={weekendsVisible}
                        events={[...initialEvents, ...holidayEvents]}

                        selectOverlap={false}
                        
                        select={(selectInfo) => {
                          const selectedStart = selectInfo.start;
                          const selectedEnd = selectInfo.end;
                        
                          // Check if the selected range overlaps with any holiday
                          const overlapsWithHoliday = holidayEvents.some((holidayEvent) => {
                            const holidayStart = holidayEvent.start;
                            const holidayEnd = holidayEvent.end || holidayStart;
                        
                            // Check if the selected range is on the same day as the holiday
                            const isSameStartDay = isSameDay(selectedStart, holidayStart);
                            const isSameEndDay = isSameDay(selectInfo.end, holidayEnd);
                        
                            return (
                              (isSameStartDay && isSameEndDay) || // Selected range is on the same day as the holiday
                              (selectedStart >= holidayStart && selectedStart < holidayEnd) || // Selected start is within the holiday range
                              (selectedEnd > holidayStart && selectedEnd <= holidayEnd) || // Selected end is within the holiday range
                              (selectedStart <= holidayStart && selectedEnd >= holidayEnd) // Selected range encompasses the holiday range
                            );
                          });
                        
                          if (overlapsWithHoliday) {
                            alert('Cannot add an event on a holiday date.');
                          } else {
                            setShowModal(true);
                            setSelectedRange(selectInfo);
                            setSelectedEvent(null);
                          }
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
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <Sidebar
                    weekendsVisible={weekendsVisible}
                    handleWeekendsToggle={handleWeekendsToggle}
                    currentEvents={currentEvents}
                  />
                </div>
              </div>
            </div>
            <PDFViewer style={{ width: '100%', height: '100vh' }}>
        {renderPdf()}
      </PDFViewer>
          </div>
        </div>
      </section>
    </div>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  text: {
    marginBottom: 10,
    fontSize: 12,
  },
});

function renderEventContent(eventInfo) {
  const { event } = eventInfo;
  if (event.title === 'Holiday') {
    return <span>Holiday</span>;
  } else {
    return (
      <>
        <b>{`${event.extendedProps.teacherfistname} ${event.extendedProps.teacherlastname}`}</b> <br />
        <i>{event.title}</i>
        <br />
        Classroom: {event.extendedProps.classroom}
      </>
    );
  }
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

export default ViewCalendarTeacher; 



*/