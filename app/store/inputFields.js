/* Unused
// ACTION TYPES

const FORM_EDIT_CAMPUS = 'FORM_EDIT_CAMPUS';
const FORM_EDIT_STUDENT = 'FORM_EDIT_STUDENT';
const CLEAR_FIELDS = 'CLEAR_FIELDS';

// ACTION CREATORS

export const formEditCampus = editCampus => ({ type: FORM_EDIT_CAMPUS, editCampus });
export const formEditStudent = editStudent => ({ type: FORM_EDIT_STUDENT, editStudent });
export const clearFields = () => ({ type: CLEAR_FIELDS });
// THUNK CREATORS

// REDUCER

export default function inputFieldsReducer (state = {}, action) {

  switch (action.type) {

    case FORM_EDIT_CAMPUS:
      return Object.assign({}, state, {
        editCampusName: action.editCampus.name,
        editCampusImage: action.editCampus.image
      });

    case FORM_EDIT_STUDENT:
      return Object.assign({}, state, {
        editStudentName: action.editStudent.name,
        editStudentEmail: action.editStudent.email,
        editStudentImage: action.editStudent.image
      });

    case CLEAR_FIELDS:
      return Object.assign({}, state, {});

    default:
      return state;
  }

}

*/
