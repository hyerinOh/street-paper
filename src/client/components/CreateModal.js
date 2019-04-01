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
    const { nickName, currCoords, handleClose } = this.props;
    const { memo } = this.state;
    ev.preventDefault();

    axios.post('/papers/new', {
      nickname: nickName,
      memo,
      lat: currCoords[0].lat,
      lon: currCoords[0].lon
    })
      .then(() => {
        alert('save!');
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { handleClose, nickName } = this.props;
    const { memo } = this.state;

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="modal display-block">
          <div className="modal-main">
            <button
              type="button"
              className="closeBtn"
              onClick={handleClose}
            >
            x
            </button>
            <div className="nickname-form">
              <p className="nickname-title">Make Your Paper, </p>
              <p className="nickname-item">"{nickName}"</p>
              <input
                type="text"
                name="memo"
                className="memo-form"
                placeholder="What's on your mind?"
                value={memo}
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
