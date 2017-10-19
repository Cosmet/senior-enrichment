import React from 'react';
import { connect } from 'react-redux';
import { Campus } from './';

function CampusList(props) {

  return (
    <div className="main-container">
      {
        props.campuses.map(campus => <Campus key={campus.id} campus={campus} />)
      }
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    campuses: state.campuses
  };
};

const mapDispatchToProps = null;

const CampusListContainer = connect(mapStateToProps, mapDispatchToProps)(CampusList);
export default CampusListContainer
