import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';
import Dashboard from './Dashboard';

ReactMapGL.accessToken = 'pk.eyJ1IjoiaHllbmluaWlpIiwiYSI6ImNqcWtubmw2dTZvM2Q0MnVsNW54bmJ6aXkifQ.VTRzsYgEhe2BGUx35C3lgQ';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 640,
        height: 1622,
        latitude: 37.503555,
        longitude: 127.022127,
        zoom: 16
      },
      currCoords: [],
      allPapers: [],
      isModalOpen: false,
      targetLat: null,
      targetLon: null
    };
  }

  componentDidMount() {
    const { currCoords, allPapers } = this.state;
    // const check = navigator.geolocation.getCurrentPosition((position) => {
    //   return position;
    // });

    // if (check) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coordsObj = {};
        const copiedcurrCoords = [...currCoords];
        const copiedPapers = [...allPapers];
        coordsObj.lat = position.coords.latitude;
        coordsObj.lon = position.coords.longitude;
        copiedcurrCoords.push(coordsObj);

        axios.get(`/papers?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
          .then((response) => {
            copiedPapers.push(response);
            this.setState((prevState) => {
              return {
                ...prevState,
                viewport: {
                  ...prevState.viewport,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                },
                currCoords: copiedcurrCoords,
                allPapers: copiedPapers
              };
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    // } 
    // else {
    //   const coordsObj = {};
    //   const copiedcurrCoords = [...currCoords];
    //   const copiedPapers = [...allPapers];

    //   axios.get('http://ip-api.com/json')
    //     .then((res) => {
    //       console.log(res);
    //       coordsObj.lat = res.data.lat;
    //       coordsObj.lon = res.data.lon;
    //       copiedcurrCoords.push(coordsObj);
    //       axios.get(`/papers?lat=${res.data.lat}&lon=${res.data.lon}`)
    //         .then((response) => {
    //           copiedPapers.push(response);
    //           this.setState((prevState) => {
    //             return {
    //               ...prevState,
    //               viewport: {
    //                 ...prevState.viewport,
    //                 latitude: res.data.lat,
    //                 longitude: res.data.lon
    //               },
    //               currCoords: copiedcurrCoords,
    //               allPapers: copiedPapers
    //             };
    //           });
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     });
    // }
  }

  displayModal() {
    this.setState({
      isModalOpen: true
    });
  }

  handleClose() {
    this.setState({
      isModalOpen: false
    });
  }

  displayLists(lon, lat) {
    console.log('display');
    // axios.get(`/papers/location?lat=${lat}&lon=${lon}`)
    //   .then((response) => {
    //     console.log('rrrrr', response)
    //     // this.setState({
    //     //   isModalOpen: true
    //     // })
    //   });
  }

  render() {
    const { viewport, currCoords, allPapers } = this.state;
    let markers = null;

    if (allPapers.length) {
      markers = allPapers[0].data.map((paper) => {
        const paperLat = paper.loc.coordinates[1];
        const paperLon = paper.loc.coordinates[0];
        return (
          <Marker
            key={paper._id}
            latitude={paper.loc.coordinates[1]}
            longitude={paper.loc.coordinates[0]}
            anchor="bottom"
          >
            <button
              type="button"
              className="paperMarker"
              onClick={
                this.displayLists.bind(this, paperLon, paperLat)
              }
            />
          </Marker>
        );
      });
    }
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
                currCoords.length
                  ? currCoords.map((coords) => {
                    return (
                      <Marker
                        key={coords.lat}
                        latitude={coords.lat}
                        longitude={coords.lon}
                        anchor="bottom"
                      >
                        <button
                          type="button"
                          className="currMarker"
                          onClick={this.displayModal.bind(this, coords.lat, coords.lon)}
                        />
                        <span className="beacon" />
                      </Marker>
                    );
                  })
                  : 'wait'
              }
              {markers}
            </ReactMapGL>
          </div>
        }
        {
          this.state.isModalOpen
            ? <Dashboard {...this.props} currCoords={this.state.currCoords} handleClose={this.handleClose.bind(this)} />
            : null
        }
      </div>
    );
  }
}
