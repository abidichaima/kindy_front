import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function LessonsForm({ show, selectedRange, selectedEvent, onClose, onSubmit }) {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState(null);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const [startLessonDate, setStartLessonDate] = useState('');
  const [endLessonDate, setEndLessonDate] = useState('');
  const [typeLesson, setTypeLesson] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const [allStudents, setAllStudents] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allClassrooms, setAllClassrooms] = useState([]);

  useEffect(() => {
    console.log("ana jit")
    const fetchData = async () => {
      try {
        const [studentsResponse, teachersResponse, coursesResponse,classroomsResponse] = await Promise.all([
          fetch('http://localhost:4000/user/users/role/student'),
          fetch('http://localhost:4000/user/users/role/teacher'),
          fetch('http://localhost:4000/api/course/get'),
          fetch('http://localhost:4000/api/classroom/get'),

        ]);

        const studentsData = await studentsResponse.json();
        const teachersData = await teachersResponse.json();
        const coursesData = await coursesResponse.json();

        setAllStudents(studentsData.map(teacher => ({ value: teacher._id, label: `${teacher.firstName} ${teacher.lastName}` })));
        setAllTeachers(teachersData.map(teacher => ({ value: teacher._id, label: `${teacher.firstName} ${teacher.lastName}` })));
        setAllCourses(coursesData.map(course => ({ value: course._id, label: course.name })));
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
      setSelectedTeacher({ value: selectedEvent.extendedProps.teacher._id, label: `${selectedEvent.extendedProps.teacher.firstName} ${selectedEvent.extendedProps.teacher.lastName}` });
      setSelectedCourse({ value: selectedEvent.extendedProps.course._id, label: selectedEvent.extendedProps.course.name });
      setSelectedStudents(selectedEvent.extendedProps.students.map(student => ({ value: student._id, label: `${student.firstName} ${student.lastName}` })));
      setStartLessonDate(formatDate(selectedEvent.start));
      setEndLessonDate(formatDate(selectedEvent.end));
      setTypeLesson(selectedEvent.title.split(' - ')[0]);
      setClassRoom(selectedEvent.extendedProps.classroom);
    } else {
      setSelectedTeacher(null);
      setSelectedCourse(null);
      setSelectedStudents([]);
      setStartLessonDate('');
      setEndLessonDate('');
      setTypeLesson('');
      setClassRoom('');
    }
  }, [selectedEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lessonData = {
      teacher: selectedTeacher.value,
      students: selectedStudents.map(student => student.value),
      startLessonDate: startLessonDate ? new Date(startLessonDate) : null,
      endLessonDate: endLessonDate ? new Date(endLessonDate) : null,
      course: selectedCourse.value,
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
          selectedEvent.setProp('title', `${typeLesson} - ${selectedCourse.label}`);
          selectedEvent.setStart(new Date(startLessonDate));
          selectedEvent.setEnd(new Date(endLessonDate));
          selectedEvent.setExtendedProp('teacher', selectedTeacher);
          selectedEvent.setExtendedProp('students', selectedStudents);
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

  const handleStudentChange = (selectedOptions) => {
    setSelectedStudents(selectedOptions);
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
            <Select
              value={selectedTeacher}
              onChange={setSelectedTeacher}
              options={allTeachers}
              required
            />
          </label>
          <br />
          <label>
  Students:
  <Select
    value={selectedStudents}
    onChange={handleStudentChange}
    options={allStudents}
    isMulti
    required
  />
</label>
          <br />
          <label>
            Start Date:
            <input type="datetime-local" value={startLessonDate} onChange={(e) => setStartLessonDate(e.target.value)} required />
          </label>
          <br /><label>
            End Date:
            <input
              type="datetime-local"
              value={endLessonDate}
              onChange={(e) => setEndLessonDate(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Course:
            <Select
              value={selectedCourse}
              onChange={setSelectedCourse}
              options={allCourses}
              required
            />
          </label>
          <br />
          <label>
            Lesson Type:
            <input
              type="text"
              value={typeLesson}
              onChange={(e) => setTypeLesson(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Classroom:
            <input
              type="text"
              value={classRoom}
              onChange={(e) => setClassRoom(e.target.value)}
            />
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