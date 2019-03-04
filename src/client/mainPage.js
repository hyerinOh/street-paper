import React, { Component } from 'react';
import './App.less';
import logo from './logo_1.png';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    this.setState({
      nickName: ev.target.value
    });
  }

  handleSubmit(ev) {
    console.log(this.state.nickName);
    ev.preventDefault();
    this.setState({
      nickName: ''
    });
  }

  render() {
    const { nickName } = this.state;

    return (
      <div className="main_page_wrapper">
        <img
          src={logo}
          className="logo"
          alt="mainLogo"
        />
        <div className="nickname_wrapper">
          <input
            type="text"
            name="nickname"
            className="nickname_box"
            placeholder="Write your nickname!"
            value={nickName}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            value="Submit"
            className="startBtn"
            onClick={this.handleSubmit}
          >
          START!
          </button>
        </div>
      </div>
    );
  }
}
