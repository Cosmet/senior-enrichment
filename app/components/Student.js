import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteStudent, selectCampus, selectStudent } from '../store';

function Student(props) {
  const {
    campus,
    student,
    deleteStudent,
    selectStudent,
    selectCampus,
    hideCampus = false,
  } = props;
  /* deconstructed student this way over studentId, studentName because this is the Student component and campus properties are accesed with '.', also campus properties were only referenced twice */
  const { id, name, email } = student;

  return (
    <tr className="student-row">
      <td>
        <button className="delete-btn" onClick={(e) => deleteStudent(e, id)}>
          <i className="fa fa-times" />
        </button>
        <NavLink to={`/students/${id}/edit`} onClick={(e) => selectStudent(e, student, campus)}>
          <button className="edit-btn">
            <i className="fa fa-pencil" />
          </button>
        </NavLink>
      </td>
      <th>
        {id}
      </th>
      <td>
        <NavLink to={`/students/${id}`} onClick={(e) => selectStudent(e, student, campus)}>
          {name}
        </NavLink>
      </td>
      <td>
        <a href={`mailto:${email}`}>{email}</a>
      </td>
      { /* if hideCampus is false : renders campus list */
        hideCampus ||
        <td>
          <NavLink to={`/campuses/${campus.id}`} onClick={(e) => selectCampus(e, campus)}>
            {campus.name}
          </NavLink>
        </td>
      }
    </tr>
  );
}

const mapStateToProps = null;

const mapDispatchToProps = function (dispatch) {
  return {
    deleteStudent: function (e, id) {
      e.preventDefault();
      let action = deleteStudent(id);
      dispatch(action);
    },
    selectCampus: function (e, campus) {
      let action = selectCampus(campus);
      dispatch(action);
    },
    selectStudent: function (e, student, campus) {
      let actionStudent = selectStudent(student);
      dispatch(actionStudent);
      let actionCampus = selectCampus(campus);
      dispatch(actionCampus);
    }
  };
};

const StudentContainer = connect(mapStateToProps, mapDispatchToProps)(Student);
export default StudentContainer
