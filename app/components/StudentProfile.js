import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectCampus, reloadSelectors } from '../store';

function StudentProfile(props) {
  const { campus, student, reloadSelectors } = props;
  const { id, name, email, image } = student;

  // if selectedStudent hasn't loaded in the store reload it and grab the associated campus
  student.hasOwnProperty('id') || reloadSelectors(+props.match.params.studentId)

  return (
    <div className="sidebar-container">
      <div className="sidebar-img polaroid-images">
        <a title={name}><img src={image} /></a>
      </div>
      <div className="student-profile">
        <p>
          <b>Email: </b>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>
          <b>Campus: </b>
          <NavLink to={`/campuses/${campus.id}`} onClick={(e) => props.selectCampus(e, campus)}>
            {campus.name}
          </NavLink>
        </p>
        <NavLink to={`/students/${id}/edit`}>
          <button className="button is-primary sidebar-edit-btn">Edit Student</button>
        </NavLink>
      </div>
    </div>
  )
}

const mapStateToProps = function (state) {
  return {
    student: state.selectors.student,
    campus: state.selectors.campus
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    selectCampus: function (e, campus) {
      let action = selectCampus(campus);
      dispatch(action);
    },
    reloadSelectors: function (studentId) {
      let action = reloadSelectors(studentId);
      dispatch(action);
    }
  };
};

const StudentProfileContainer = connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
export default StudentProfileContainer
