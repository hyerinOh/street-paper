import React, { Component } from 'react';
import '../App.less';
import { connect } from 'react-redux';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import { Action } from '../actions/action';

class Modal extends Component {
  render() {
    return {};
  }
}

const mapStateToProps = (state) => {
  return {
    nickName: state.userNickName
  };
};

export default connect(mapStateToProps)(Modal);
