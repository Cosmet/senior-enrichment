import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { filterStudents } from '../store';
import { Student } from './';

function StudentList(props) {
  const { students, campuses, filteredStudents = [], filterStudents } = props;

  return (
    <div>
      <div className="searchbox">
        <input
          name="search"
          className="input is-medium"
          id="student-search"
          type="text"
          placeholder="Search"
          onChange={(e) => filterStudents(e, students)}
        />
      </div>
      <table className="table is-hoverable is-striped">
        <thead>
          <tr>
            <th>{/*edit & delete button column*/}</th>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Campus</th>
          </tr>
        </thead>
        <tbody>
          {createStudentList(students, campuses, filteredStudents)}
        </tbody>
      </table>
    </div>
  );
}

function createStudentList(students, campuses, filteredStudents) {
  // maps campuses to an object
  let campusesObj = campuses.reduce((acc, cur, i) => {
    acc[cur.id] = cur;
    return acc;
  }, {});
  if (filteredStudents.length > 0) students = filteredStudents;
  return students.map(student => {
    return (
      <Student
        key={student.id}
        student={student}
        campus={campusesObj[student.campusId]}
      />
    )
  })
}

const mapStateToProps = function (state) {
  return {
    students: state.students,
    campuses: state.campuses,
    filteredStudents: state.selectors.filteredStudents,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    filterStudents: function (e, students) {
      e.persist();
      _.debounce(() => {
        let input = e.target.value;
        let filteredList = students.filter(student => {
          return student.name.toUpperCase().match(input.toUpperCase());
        })
        let action = filterStudents(filteredList);
        dispatch(action);
      }, 500)()
    }
  };
};

const StudentListContainer = connect(mapStateToProps, mapDispatchToProps)(StudentList);
export default StudentListContainer
