import React, { Component } from 'react';
import '../App.less';
import { connect } from 'react-redux';
import { Action, LoadingAction } from '../actions/action';
import AppForm from '../components/AppForm';

class App extends Component {
  render() {
    return <AppForm {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    nickName: state.nickName,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveNickName: (nickName) => {
      dispatch(Action(nickName));
    },
    onLoadData: (loadingType) => {
      dispatch(LoadingAction(loadingType));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
