import React, { Component } from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import '../App.less';
import logo from '../images/logo_1.png';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: ''
    };

    this.nickNameRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    if (this.nickNameRef.current.value.length <= 8) {
      this.setState({
        nickName: this.nickNameRef.current.value
      }, () => {
        this.nickNameRef.current.value = '';
        this.props.history.push('/map');
      });
    } else {
      alert('Write your nickName within 8 letters!');
      this.nickNameRef.current.value = '';
    }
  }

  render() {
    const { nickName } = this.state;
    console.log(nickName);
    return (
      <div className="main_page">
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
              ref={this.nickNameRef}
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
      </div>
    );
  }
}
