import axios from 'axios';
import store, { fetchStudents } from '../store';

// ACTION TYPES

const GET_CAMPUSES = 'GET_CAMPUSES';
const NEW_CAMPUS = 'NEW_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

// ACTION CREATORS

export const getCampuses = campuses => ({ type: GET_CAMPUSES, campuses });
export const newCampus = campus => ({ type: NEW_CAMPUS, campus });
export const deleteCampusAction = campusId => ({ type: DELETE_CAMPUS, campusId });
export const updateCampusAction = campus => ({ type: UPDATE_CAMPUS, campus: campus });

// THUNK CREATORS

export function fetchCampuses() {

  return function thunk(dispatch) {
    return axios.get('/api/campus')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  }
}

export function postCampus(createCampus) {

  return function thunk(dispatch) {
    return axios.post('/api/campus', createCampus)
      .then(res => res.data)
      .then(data => {
        const campus = data[0]
        const action = newCampus(campus);
        dispatch(action);
      });
  }
}

export function deleteCampus(campusId) {

  return function thunk(dispatch) {
    return axios.delete(`/api/campus/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        const action = deleteCampusAction(campusId);
        dispatch(action);
        // update stores students due to cascading
        const studentThunk = fetchStudents();
        store.dispatch(studentThunk);
      });
  }
}

export function updateCampus(upCampus) {

  return function thunk(dispatch) {
    return axios.put(`/api/campus/${upCampus.id}`, upCampus)
      .then(res => res.data)
      .then(campus => {
        const action = updateCampusAction(campus);
        dispatch(action);
      });
  }
}
// REDUCER

export default function campusesReducer(state = [], action) {

  switch (action.type) {

    case GET_CAMPUSES:
      return action.campuses;

    case NEW_CAMPUS:
      return [...state, action.campus];

    case DELETE_CAMPUS:
      return state.filter(campus => campus.id !== action.campusId);

    case UPDATE_CAMPUS:
    return state.map(campus => {
        if (campus.id === action.campus.id) return action.campus;
        return campus;
      });

    default:
      return state;
  }

}
