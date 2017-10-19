import React from 'react';
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom';

function Navbar(props) {

  return (
    <nav>
      <NavLink exact to="/" activeClassName="active">
        <span><i className="fa fa-home" /></span>
      </NavLink>
      <NavLink to="/campuses" activeClassName="active">
        <span><i className="fa fa-university" />Campuses</span>
      </NavLink>
      <NavLink to="/students" activeClassName="active">
        <span><i className="fa fa-user" />Students</span>
      </NavLink>
    </nav>
  );
}

export default withRouter((Navbar))
