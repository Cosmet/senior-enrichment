import React from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../store';
import avatar from 'cartoon-avatar';

function NewStudent(props) {
  const { campuses, postStudent } = props;

  return (
    <div className="sidebar-container">
      <h2>Add Student</h2>
      <form className="new-form" onSubmit={postStudent}>
        <label className="label">Name</label>
        <input className="input is-medium" type="text" name="name" />
        <label className="label">Email</label>
        <input className="input is-medium" type="text" name="email" />
        <label className="label">Image</label>
        <input className="input is-medium" type="text" name="image" />
        <label className="label">Campus</label>
        <div className="field">
          <div className="control">
            <div className="select is-medium">
              <select id="campus">
                <option disabled selected>Select a Campus</option>
                {
                  campuses.map(campus =>
                    <option key={campus.id} value={campus.id}>{campus.name}</option>
                  )
                }
              </select>
            </div>
          </div>
        </div>
        <button className="button is-primary">Add Student</button>
      </form>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    campuses: state.campuses
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    postStudent: function (e) {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      let image = e.target.image.value;
      if (!image) image = avatar.generate_avatar();
      const campusId = +e.target.campus.value;
      if (!campusId) {
        alert('Please select a campus');
        return;
      }
      const newStudent = { name, email, image, campusId };
      let action = postStudent(newStudent);
      dispatch(action);
      alert(`${name} successfully added.`)
      e.target.name.value = '';
      e.target.email.value = '';
      e.target.image.value = '';
      e.target.campus.value = 'Select a Campus';
    }
  };
};

const NewStudentContainer = connect(mapStateToProps, mapDispatchToProps)(NewStudent);
export default NewStudentContainer
