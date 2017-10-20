import React from 'react';
import { connect } from 'react-redux';
import { updateStudent, deleteStudent, reloadSelectors } from '../store';

function EditStudent(props) {
  const { student, campus, campuses, updateStudent, deleteStudent, reloadSelectors } = props;
  const { id, name, email, image } = student;

  // if selectedStudent hasn't loaded in the store reload it and grab the associated campus
  student.hasOwnProperty('id') || reloadSelectors(+props.match.params.studentId)

  return (
    <div className="sidebar-container">
      <div className="sidebar-img polaroid-images">
        <a title={name}><img src={image} /></a>
      </div>
      <h2>Edit Student</h2>
      <form className="new-form" onSubmit={(e) => updateStudent(e, id)}>
        <label className="label">Name</label>
        <input className="input is-medium" type="text" name="name" defaultValue={name} placeholder={name} />
        <label className="label">Email</label>
        <input className="input is-medium" type="text" name="email" defaultValue={email} placeholder={email} />
        <label className="label">Image</label>
        <input className="input is-medium" type="text" name="image" defaultValue={image} placeholder={image} />
        <label className="label">Campus</label>
        <div className="field">
          <div className="control">
            <div className="select is-medium">
              <select id="campus">
                {createOptions(campuses, campus.id)}
              </select>
            </div>
          </div>
        </div>
        <button className="button is-primary">Update Student Info</button>
        <button className="button is-danger" onClick={(e) => deleteStudent(e, student)}>Delete Student</button>
      </form>
    </div>
  );
}

function createOptions(campuses, campusId) {
  return campuses.map(campus => {
    const { name, id } = campus;
    if (id === campusId) {
      return <option selected key={id} value={id}>{name}</option>
    }
    return <option key={id} value={id}>{name}</option>
  })
}

const mapStateToProps = function (state) {
  return {
    student: state.selectors.student,
    campus: state.selectors.campus,
    campuses: state.campuses
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    updateStudent: function (e, studentId) {
      e.preventDefault();
      const newStudentInfo = {
        id: studentId,
        name: e.target.name.value,
        email: e.target.email.value,
        image: e.target.image.value,
        campusId: +e.target.campus.value
      };
      let action = updateStudent(newStudentInfo);
      dispatch(action);
      ownProps.history.push('/students')
    },
    deleteStudent: function (e, { id, name }) {
      e.preventDefault();
      let confirmDelete = confirm(`Are you sure you want to delete: ${name}`);
      if (confirmDelete) {
        let action = deleteStudent(id);
        dispatch(action);
        ownProps.history.push('/students');
      }
    },
    reloadSelectors: function (studentId) {
      let action = reloadSelectors(studentId);
      dispatch(action);
    }
  };
};

const EditStudentContainer = connect(mapStateToProps, mapDispatchToProps)(EditStudent);
export default EditStudentContainer
