import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const axios = require('axios');

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
      },
      coordsArr: []
    };
  }

  componentDidMount() {

    const { coordsArr } = this.state;

    navigator.geolocation.getCurrentPosition((position) => {
      const coordsObj = {};
      const copiedCoordsArr = [...coordsArr];
      coordsObj.lat = position.coords.latitude;
      coordsObj.lon = position.coords.longitude;
      copiedCoordsArr.push(coordsObj);

      axios.get(`http://localhost:8081/papers?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then((response) => {
          console.log('client', response);
        })
        .catch((error) => {
          console.log(error);
        });

      this.setState((prevState) => {
        return {
          ...prevState,
          viewport: {
            ...prevState.viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          coordsArr: copiedCoordsArr
        };
      });
    });
  }

  render() {
    const { viewport, coordsArr } = this.state;
    return (
      <div>
        {
          <div>
            <ReactMapGL
              mapboxApiAccessToken={ReactMapGL.accessToken}
              {...viewport}
              onViewportChange={(viewports) => {
                this.setState({ viewport: viewports });
              }}
            >
              {
                coordsArr.length
                  ? coordsArr.map((coords) => {
                    return (
                      <Marker
                        latitude={coords.lat}
                        longitude={coords.lon}
                        anchor="bottom"
                      >
                        <div>you are here!</div>
                      </Marker>
                    );
                  })
                  : 'wait'
              }
            </ReactMapGL>
          </div>
        }
      </div>
    );
  }
}
