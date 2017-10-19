import axios from 'axios';

// ACTION TYPES

const GET_STUDENTS = 'GET_STUDENTS';
const NEW_STUDENT = 'NEW_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

// ACTION CREATORS

export const getStudents = students => ({ type: GET_STUDENTS, students })
export const newStudent = student => ({ type: NEW_STUDENT, student })
export const deleteStudentAction = studentId => ({ type: DELETE_STUDENT, studentId })
export const updateStudentAction = student => ({ type: UPDATE_STUDENT, student })

// THUNK CREATORS

export function fetchStudents() {

  return function thunk(dispatch) {
    return axios.get('/api/student')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  }
}

export function postStudent(createStudent) {

  return function thunk(dispatch) {
    return axios.post('/api/student', createStudent)
      .then(res => res.data)
      .then(data => {
        const student = data[0];
        const action = newStudent(student);
        dispatch(action);
      });
  }
}

export function deleteStudent(studentId) {

  return function thunk(dispatch) {
    return axios.delete(`/api/student/${studentId}`)
      .then(res => res.data)
      .then(student => {
        const action = deleteStudentAction(studentId);
        dispatch(action);
      });
  }
}

export function updateStudent(upStudent) {

  return function thunk(dispatch) {
    return axios.put(`/api/student/${upStudent.id}`, upStudent)
      .then(res => res.data)
      .then(student => {
        const action = updateStudentAction(student);
        dispatch(action);
      });
  }
}

// REDUCER

export default function studentsReducer(state = [], action) {

  switch (action.type) {

    case GET_STUDENTS:
      return action.students;

    case NEW_STUDENT:
      return [...state, action.student];

    case DELETE_STUDENT:
      return state.filter(student => student.id !== action.studentId);

    case UPDATE_STUDENT:
      return state.map(student => {
        if (student.id === action.student.id) return action.student;
        return student;
      });

    default:
      return state;
  }

}
