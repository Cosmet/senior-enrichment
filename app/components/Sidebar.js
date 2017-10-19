import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import {
  Navbar,
  CampusProfile,
  StudentProfile,
  NewCampus,
  NewStudent,
  EditCampus,
  EditStudent,
} from './';

export default function Sidebar(props) {

  return (
    <sidebar>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => aboutMe()} />
        <Route exact path="/campuses" render={() => addProfileBtn('campus')} />
        <Route exact path="/students" render={() => addProfileBtn('student')} />
        <Route exact path="/campuses/add" component={NewCampus} />
        <Route exact path="/students/add" component={NewStudent} />
        <Route exact path="/students/:studentId" component={StudentProfile} />
        <Route exact path="/students/:studentId/edit" component={EditStudent} />
        <Route exact path="/campuses/:campusId" component={CampusProfile} />
        <Route exact path="/campuses/:campusId/edit" component={EditCampus} />
      </Switch>
    </sidebar>
  );
}

function addProfileBtn(type) {
  let typeObj = {
    student: {
      urlSlug: 'students',
      name: 'Student'
    },
    campus: {
      urlSlug: 'campuses',
      name: 'Campus'
    }
  }
  const urlSlug = typeObj[type].urlSlug;
  const name = typeObj[type].name;

  return (
    <div className="student-profile">
      <NavLink to={`/${urlSlug}/add`}>
        <button className="button is-success add-btn">Add New {name}</button>
      </NavLink>
    </div>
  )
}

function aboutMe() {
  return (
    <div className="sidebar-container about-me">
      <h1>Campus Management System</h1>
      <p>Senior Enrichment Project</p>
      <p><a href="https://www.linkedin.com/in/damian-michniak-858538145/">Damian Michniak</a></p>
    </div>
  )
}
