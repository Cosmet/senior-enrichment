import axios from 'axios';
// ACTION TYPES

const SELECT_CAMPUS = 'SELECT_CAMPUS';
const SELECT_STUDENT = 'SELECT_STUDENT';
const FILTERED_STUDENTS = 'FILTERED_STUDENTS';

// ACTION CREATORS

export const selectCampus = selectedCampus => ({ type: SELECT_CAMPUS, selectedCampus });
export const selectStudent = selectedStudent => ({ type: SELECT_STUDENT, selectedStudent });
export const filterStudents = filteredStudents => ({ type: FILTERED_STUDENTS, filteredStudents });
// THUNK CREATORS

export function reloadSelectors(studentId) {

  return function thunk(dispatch) {
    return axios.get(`/api/student/${studentId}`)
      .then(res => res.data)
      .then(student => {
        const actionStudent = selectStudent(student);
        dispatch(actionStudent);
        axios.get(`/api/campus/${student.campusId}`)
          .then(res => res.data)
          .then(campus => {
            const actionCampus = selectCampus(campus);
            dispatch(actionCampus);
          });
      });
  }
}

export function reloadSelectedCampus(campusId) {

  return function thunk(dispatch) {
    return axios.get(`/api/campus/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        const actionCampus = selectCampus(campus);
        dispatch(actionCampus);
      });
  }
}

// REDUCER

const defaultState = {
  campus: {},
  student: {}
}

export default function selectorReducer(state = defaultState, action) {

  switch (action.type) {

    case SELECT_CAMPUS:
      return Object.assign({}, state, { campus: action.selectedCampus });

    case SELECT_STUDENT:
      return Object.assign({}, state, { student: action.selectedStudent });

    case FILTERED_STUDENTS:
      return Object.assign({}, state, { filteredStudents: action.filteredStudents });

    default:
      return state;
  }

}
