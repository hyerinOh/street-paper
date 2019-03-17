import React, { Component } from 'react';
import axios from 'axios';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memo: ''
    };
  }

  onChange(ev) {
    this.setState({
      memo: ev.target.value
    });
  }

  onSubmit(ev) {
    ev.preventDefault();

    axios.post('/papers/new', {
      nickname: this.props.nickName,
      memo: this.state.memo,
      lat: this.props.currCoords[0].lat,
      lon: this.props.currCoords[0].lon
    })
      .then((response) => {
        alert('save!');
        this.props.handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="modal display-block">
          <div className="modal-main">
            <button
              type="button"
              className="closeBtn"
              onClick={this.props.handleClose}
            >
            x
            </button>

            <div className="nickname-form">
              <p>Make Your Paper, </p>
              <p className="nickname-item">{this.props.nickName}</p>
              {/* <input
                type="text"
                name="nickname-input"
                className="nickname-input"
                defaultValue={this.props.nickName}
              /> */}
              <input
                type="text"
                name="memo"
                className="memo-form"
                placeholder="What's on your mind?"
                value={this.state.memo}
                onChange={this.onChange.bind(this)}
              />
            </div>
            <div className="saveBtn-wrapper">
              <button
                type="submit"
                value="Submit"
                className="saveBtn"
              >
                save
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
