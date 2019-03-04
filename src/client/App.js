import React, { Component } from 'react';
import {
  BrowserRouter as
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.less';
import mainPage from './mainPage';

export default class App extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   themeType: 'defaultTheme'
    // };

    // this.chooseType = this.chooseType.bind(this);
  }

  // chooseType(type) {
  //   this.setState({
  //     themeType: type
  //   });
  // }

  render() {
    // const { themeType } = this.state;

    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={mainPage}
          />
        </Switch>
      </Router>
    );
  }
}
