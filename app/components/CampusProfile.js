import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { reloadSelectedCampus } from '../store';
import { Student } from './';

function CampusProfile(props) {
  const { id, name, image } = props.selectedCampus;

  // if selectedCampus hasn't loaded in the store reload it
  props.selectedCampus.hasOwnProperty('id') || props.reloadSelectedCampus(+props.match.params.campusId);

  return (
    <div className="sidebar-container">
      <h2>
        <div className="campus-item-sidebar">
          <img src={image} />
        </div>
        {name}
        <hr />
        <NavLink to={`/campuses/${id}/edit`}>
          <button className="button is-primary sidebar-edit-btn">Edit Campus</button>
        </NavLink>
      </h2>
      <table className="table is-hoverable is-striped">
        <thead>
          <tr>
            <th>{/*edit & delete button column*/}</th>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {createStudentList(props)}
        </tbody>
      </table>
    </div>
  );
}

function createStudentList({ selectedCampus, students, campuses }) {
  // maps campuses to an object
  let campusesObj = campuses.reduce((acc, cur) => {
    acc[cur.id] = cur;
    return acc;
  }, {});

  return students.filter(student => student.campusId === +selectedCampus.id)
    .map(student => {
      return (
        <Student
          key={student.id}
          student={student}
          campus={campusesObj[student.campusId]}
          hideCampus={true}
        />)
    })
}

const mapStateToProps = function (state) {
  return {
    selectedCampus: state.selectors.campus,
    students: state.students,
    campuses: state.campuses
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    reloadSelectedCampus: function (campusId) {
      let action = reloadSelectedCampus(campusId);
      dispatch(action);
    }
  };
};

const CampusProfileContainer = connect(mapStateToProps, mapDispatchToProps)(CampusProfile);
export default CampusProfileContainer
