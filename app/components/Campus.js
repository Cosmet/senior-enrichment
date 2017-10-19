import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectCampus } from '../store';

function Campus(props) {
  const { id, name, image } = props.campus;

  return (
    <NavLink to={`/campuses/${id}`}>
      <div className="campus-item">
        <img src={image} />
        <div className="overlay" onClick={(e) => props.selectCampus(e, props.campus)}>
          <span>{name}</span>
        </div>
      </div>
    </NavLink>
  );
}

const mapStateToProps = null;

const mapDispatchToProps = function (dispatch) {
  return {
    selectCampus: function (e, campus) {
      let action = selectCampus(campus);
      dispatch(action);
    }
  };
};

const CampusContainer = connect(mapStateToProps, mapDispatchToProps)(Campus);
export default CampusContainer
