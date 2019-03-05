import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

ReactMapGL.accessToken = 'pk.eyJ1IjoiaHllbmluaWlpIiwiYSI6ImNqcWtubmw2dTZvM2Q0MnVsNW54bmJ6aXkifQ.VTRzsYgEhe2BGUx35C3lgQ';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.503555,
        longitude: 127.022127,
        zoom: 16
      }
    };
  }

  // componentDidMount() {
  //   fetch('http://ip-api.com/json')
  //     .then(res => res.json())
  //     .then((result) => {
  //       this.setState((prevState) => {
  //         return {
  //           viewport: {
  //             ...prevState.viewport,
  //             latitude: result.lat,
  //             longitude: result.lon
  //           }
  //         };
  //       });
  //     });
  // }

  render() {
    return (
      <ReactMapGL 
        mapboxApiAccessToken={ReactMapGL.accessToken}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}
