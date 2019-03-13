import React, { Component } from 'react';
import axios from 'axios';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      memo: '',
      lat: null,
      lon: null
    };
  }

  onChange(ev) {
    this.setState({
      memo: ev.target.value
    });
  }

  onSubmit(ev) {
    ev.preventDefault();
    console.log(this.props)
    axios.post('/papers/new', {
      nickname: this.props.nickName,
      memo: this.state.memo,
      lat: this.props.currCoords[0].lat,
      lon: this.props.currCoords[0].lon
    })
      .then((response) => {
        console.log('rrrrrrrr', response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  validateLength(ev) {
    if (ev.target.value.length > 10) {
      alert('Write memo within 10 letters!');
    }
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
              <p className="nickname-item"> nick name </p>
              <input
                type="text"
                name="nickname-input"
                className="nickname-input"
                defaultValue={this.props.nickName}
              />
              <p>memo</p>
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
