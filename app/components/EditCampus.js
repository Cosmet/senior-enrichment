import React from 'react';
import { connect } from 'react-redux';
import { updateCampus, deleteCampus, reloadSelectedCampus } from '../store';

function EditCampus(props) {
  const { id, name, image } = props.selectedCampus;
  const { selectedCampus, updateCampus, deleteCampus, reloadSelectedCampus } = props;

  // if selectedCampus hasn't loaded in the store reload it
  selectedCampus.hasOwnProperty('id') || reloadSelectedCampus(+props.match.params.campusId);

  return (
    <div className="sidebar-container">
      <div className="campus-item-sidebar">
        <img src={image} />
      </div>
      <h2>Edit Campus</h2>
      <form className="new-form" onSubmit={updateCampus}>
        <label className="label">Name</label>
        <input className="input is-medium" type="text" name="name" defaultValue={name} placeholder={name} />
        <label className="label">Image URL</label>
        <input className="input is-medium" type="text" name="image" defaultValue={image} placeholder={image} />
        <button className="button is-primary">Update Campus Info</button>
        <button className="button is-danger" onClick={(e) => deleteCampus(e, id, name)}>Delete Campus</button>
      </form>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    selectedCampus: state.selectors.campus
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    updateCampus: function (e) {
      e.preventDefault();
      const newCampusProfile = {
        id: +ownProps.match.params.campusId,
        name: e.target.name.value,
        image: e.target.image.value,
      };
      let action = updateCampus(newCampusProfile);
      dispatch(action);
      ownProps.history.push('/campuses')
    },
    deleteCampus: function (e, id, name) {
      e.preventDefault();
      const promptText = `WARNING: Deleting this campus will delete all students who attend from the database. This is not reverseable.\n\nPlease type "${name}" to delete the campus and all of its students.`;
      const confirmDelete = prompt(promptText);

      if (confirmDelete.toLowerCase() === name.toLowerCase()) {
        let action = deleteCampus(id);
        dispatch(action);
        ownProps.history.push('/campuses')
        alert(`Successfully deleted: ${name}`)
      }
    },
    reloadSelectedCampus: function (campusId) {
      let action = reloadSelectedCampus(campusId);
      dispatch(action);
    }
  };
};

const EditCampusContainer = connect(mapStateToProps, mapDispatchToProps)(EditCampus);
export default EditCampusContainer
