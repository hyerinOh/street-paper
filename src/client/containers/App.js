import React, { Component } from 'react';
import '../App.less';
import { connect } from 'react-redux';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import Action from '../actions/action';
import AppForm from '../components/AppForm';

// stateless?
class App extends Component {
  render() {
    return <AppForm {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return {
    nickName: state.nickName
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveNickName: (nickName) => {
      dispatch(Action(nickName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
