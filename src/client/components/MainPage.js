import React, { Component } from 'react';
import '../App.less';
import logo from '../images/logo.svg';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    const { saveNickName } = this.props;

    saveNickName(ev.target.value);
  }

  handleSubmit(ev) {
    const { nickName, history, saveNickName } = this.props;

    ev.preventDefault();
    if (nickName.length > 0 && nickName.length <= 8) {
      history.push('/map');
    } else if (nickName.length === 0) {
      alert('Write your nick name!');
    } else {
      alert('Write your nick name within 8 letters!');
      saveNickName('');
    }
  }

  render() {
    const { nickName } = this.props;

    return (
      <div className="main_Wrap">
        <div className="main_page">
          <div className="main_page_wrapper">
            <img
              src={logo}
              className="logo"
              alt="mainLogo"
              style={{ width: '250px' }}
            />
            <div className="nickname_wrapper">
              <div className="nickname_box_wrap">
                <input
                  type="text"
                  name="nickname"
                  className="nickname_box"
                  placeholder="Write your nickname!"
                  value={nickName}
                  onChange={this.handleChange}
                />
                <span />
              </div>
              <button
                type="submit"
                value="Submit"
                className="startBtn"
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
