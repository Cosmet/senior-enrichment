import React from 'react';
import { connect } from 'react-redux';
import { postCampus } from '../store';

function NewCampus(props) {
  const { postCampus } = props;

  return (
    <div className="sidebar-container">
      <h2>Add Campus</h2>
      <form className="new-form" onSubmit={postCampus}>
        <label className="label">Name</label>
        <input className="input is-medium" type="text" name="name" />
        <label className="label">Image URL</label>
        <input className="input is-medium" type="text" name="image" />
        <button className="button is-primary">Add Campus</button>
      </form>
    </div>
  );
}

const mapStateToProps = null;

const mapDispatchToProps = function (dispatch) {
  return {
    postCampus: function (e) {
      e.preventDefault();
      const newCampus = {
        name: e.target.name.value,
        image: e.target.image.value
      };
      let action = postCampus(newCampus);
      dispatch(action);
      alert(`Campus ${newCampus.name} successfully added.`)
    }
  };
};

const NewCampusContainer = connect(mapStateToProps, mapDispatchToProps)(NewCampus);
export default NewCampusContainer
