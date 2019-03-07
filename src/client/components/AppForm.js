import React, { Component } from 'react';
import {
  BrowserRouter as
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import '../App.less';
import mapboxgl from 'mapbox-gl';
import MainPage from './MainPage';
import MapPage from './MapPage';

mapboxgl.accessToken = 'pk.eyJ1IjoiaHllbmluaWlpIiwiYSI6ImNqcWtubmw2dTZvM2Q0MnVsNW54bmJ6aXkifQ.VTRzsYgEhe2BGUx35C3lgQ';

export default class AppForm extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <MainPage {...props} {...this.props} />}
          />
          <Route
            exact
            path="/map"
            render={props => <MapPage {...props} {...this.props} />}
          />
        </Switch>
      </Router>
    );
  }
  
}
