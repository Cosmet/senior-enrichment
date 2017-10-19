import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { fetchStudents, fetchCampuses, reloadSelectors } from '../store';
import { Sidebar, CampusList, StudentList } from './';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const studentsThunk = fetchStudents();
    const campusesThunk = fetchCampuses();
    store.dispatch(studentsThunk);
    store.dispatch(campusesThunk);
  }

  render() {

    return (
      <div className="main-wrapper">
        <div className="main-paper" />
        <div className="main-paper-second" />
        <Sidebar />
        <main>
          <Switch>
            <Route path="/campuses" component={CampusList} />
            <Route path="/students" component={StudentList} />
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    )
  }
}
