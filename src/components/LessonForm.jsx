import React, { useState, useEffect } from 'react';

function LessonsForm({ show, selectedRange, selectedEvent, onClose, onSubmit }) {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const [students, setStudents] = useState([]);
  const [startLessonDate, setStartLessonDate] = useState('');
  const [endLessonDate, setEndLessonDate] = useState('');
  const [typeLesson, setTypeLesson] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const [allStudents, setAllStudents] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    console.log("ana jit")
    const fetchData = async () => {
      try {
        const [studentsResponse, teachersResponse, coursesResponse] = await Promise.all([
          fetch('http://localhost:4000/users/role/student'),
          fetch('http://localhost:4000/users/role/teacher'),
          fetch('http://localhost:4000/api/course/get'),
        ]);

        const studentsData = await studentsResponse.json();
        const teachersData = await teachersResponse.json();
        const coursesData = await coursesResponse.json();

        setAllStudents(studentsData);
        setAllTeachers(teachersData);
        setAllCourses(coursesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRange?.start) {
      setStartLessonDate(formatDate(selectedRange.start));
    } else {
      setStartLessonDate('');
    }

    if (selectedRange?.end) {
      setEndLessonDate(formatDate(selectedRange.end));
    } else {
      setEndLessonDate('');
    }
  }, [selectedRange]);

  useEffect(() => {
    if (selectedEvent) {
      setSelectedTeacher(selectedEvent.extendedProps.teacher._id);
      setSelectedCourse(selectedEvent.extendedProps.course._id);
      //setStudents(selectedEvent.extendedProps.students.map((student) => student._id));
      setStartLessonDate(formatDate(selectedEvent.start));
      setEndLessonDate(formatDate(selectedEvent.end));
      setTypeLesson(selectedEvent.title.split(' - ')[0]);
      setClassRoom(selectedEvent.extendedProps.classroom);
    } else {
      setSelectedTeacher('');
      setSelectedCourse('');
      //setStudents([]);
      setStartLessonDate('');
      setEndLessonDate('');
      setTypeLesson('');
      setClassRoom('');
    }
  }, [selectedEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lessonData = {
      teacher: selectedTeacher,
      students,
      startLessonDate: startLessonDate ? new Date(startLessonDate) : null,
      endLessonDate: endLessonDate ? new Date(endLessonDate) : null,
      course: selectedCourse,
      typeLesson,
      classRoom,
    };

    try {
      if (selectedEvent) {
        // Edit existing lesson
        const response = await fetch(`http://localhost:4000/api/lesson/update/${selectedEvent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lessonData),
        });

        if (response.ok) {
          console.log('Lesson updated successfully');
          selectedEvent.setProp('title', `${typeLesson} - ${selectedCourse}`);
          selectedEvent.setStart(new Date(startLessonDate));
          selectedEvent.setEnd(new Date(endLessonDate));
          selectedEvent.setExtendedProp('teacher', selectedTeacher);
          selectedEvent.setExtendedProp('students', students);
          selectedEvent.setExtendedProp('classroom', classRoom);
          selectedEvent.setExtendedProp('course', selectedCourse);
        } else {
          console.error('Failed to update lesson');
        }
      } else {
        // Create new lesson
        const response = await fetch('http://localhost:4000/api/lesson/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lessonData),
        });

        if (response.ok) {
          console.log('Lesson created successfully');
        } else {
          console.error('Failed to create lesson');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStudentChange = (studentId) => {
    setStudents((prevStudents) => {
      if (prevStudents.includes(studentId)) {
        return prevStudents.filter((id) => id !== studentId);
      } else {
        return [...prevStudents, studentId];
      }
    });
  };

  const handleDeleteLesson = async () => {
          // eslint-disable-next-line no-restricted-globals
    if (selectedEvent && confirm(`Are you sure you want to delete the lesson '${selectedEvent.title}'?`)) {
      try {
        const response = await fetch(`http://localhost:4000/api/lesson/delete/${selectedEvent.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Lesson deleted successfully');
          selectedEvent.remove();
          onClose();
        } else {
          console.error('Failed to delete lesson');
        }
      } catch (error) {
        console.error('Error deleting lesson:', error);
      }
    }
  };

  if (!show) return null;

  return (
    <div className="">
      <div className="">
        <br />
        <h5>{selectedEvent ? 'Edit Lesson' : 'Add a new lesson'}</h5>
        <br />
        <form onSubmit={handleSubmit}>
          <label>
            Teacher:
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              required
            >
              <option value="">Select a teacher</option>
              {allTeachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
  Students:
  <div style={{
    maxHeight: '200px',
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #f5f5f5',
  }}>
    {allStudents.map((student) => (
      <div key={student._id}>
        <input
          type="checkbox"
          id={student._id}
          checked={students.includes(student._id)}
          onChange={() => handleStudentChange(student._id)}
        />
        <label htmlFor={student._id}>{student.firstName} {student.lastName}</label>
      </div>
    ))}
  </div>
</label>
          <br />
          <label>
            Start Date:
            <input type="datetime-local" value={startLessonDate} onChange={(e) => setStartLessonDate(e.target.value)} required />
          </label>
          <br />
          <label>
            End Date:
            <input type="datetime-local" value={endLessonDate} onChange={(e) => setEndLessonDate(e.target.value)} required />
          </label>
          <br />
          <label>
            Course:
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">Select a Course</option>
              {allCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Lesson Type:
            <input type="text" value={typeLesson} onChange={(e) => setTypeLesson(e.target.value)} required />
          </label>
          <br />
          <label>
            Classroom:
            <input type="text" value={classRoom} onChange={(e) => setClassRoom(e.target.value)} />
          </label>
          <br />
          <button type="submit">{selectedEvent ? 'Update' : 'Save'}</button>
          {selectedEvent && <button onClick={handleDeleteLesson}>Delete</button>}
          <button onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default LessonsForm;