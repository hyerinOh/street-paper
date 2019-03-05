import React, { Component } from 'react';
import {
  BrowserRouter as
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.less';
import mapboxgl from 'mapbox-gl';
import MainPage from './components/MainPage';
import MapPage from './components/MapPage';

console.log('this is HTTPS: ' + process.env.REACT_APP_HTTPS);
mapboxgl.accessToken = 'pk.eyJ1IjoiaHllbmluaWlpIiwiYSI6ImNqcWtubmw2dTZvM2Q0MnVsNW54bmJ6aXkifQ.VTRzsYgEhe2BGUx35C3lgQ';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={MainPage}
          />
          <Route
            exact
            path="/map"
            component={MapPage}
          />
        </Switch>
      </Router>
    );
  }
}
