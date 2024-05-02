import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg';
import { Tabs } from 'react-tabs';
import Dashboard from './Dashboard';

function RemarksPage(props) {
  const [remarks, setRemarks] = useState('');
  
  useEffect(() => {
    // Fetch lesson data and set initial value of remarks
    const fetchLessonData = async () => {
      try {
        const lessonId = window.location.pathname.split('/')[2];
        const response = await fetch(`http://localhost:4000/api/lesson/get/${lessonId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lesson data');
        }
        const lesson = await response.json();
        // Set initial value of remarks to the value saved in the lesson
        setRemarks(lesson.remarks || '');
      } catch (error) {
        console.error('Error fetching lesson data:', error);
        // Handle error, show error message to the user, etc.
      }
    };
    fetchLessonData();
  }, []);

  const handleChange = (e) => {
    setRemarks(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const lessonId = window.location.pathname.split('/')[2];
      const response = await fetch(`http://localhost:4000/api/lesson/lessons/${lessonId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ remarks }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update lesson');
      }
  
      const data = await response.json();
      console.log('Lesson updated successfully:', data);
      
      // Redirect to the lesson page
      window.location.href = '/lesson';
    } catch (error) {
      console.error('Error updating lesson:', error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <div>
      <section class="tf-page-title ">    
        <div class="tf-container">
          <div class="row">
            <div class="col-md-12">
              <ul class="breadcrumbs">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/lesson">Lessons</Link>Remarks</li>
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
                  <h2>Write Your Remark</h2>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <textarea
                        value={remarks}
                        onChange={handleChange}
                        placeholder="Write your remarks here..."
                        rows={5}
                        cols={50}
                        required
                      />
                    </div>
                    <div>
                      <button type="submit">Submit Remark</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Tabs> 
        </div>
      </section>
    </div>
  );
}

export default RemarksPage;
