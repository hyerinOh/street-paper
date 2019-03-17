import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';
import CreateModal from './CreateModal';
import DisplayListsModal from './DisplayListsModal';
import Loading from './Loading';

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
      isDisplayModalOpen: false,
      targetLat: null,
      targetLon: null
    };
  }

  componentDidMount() {
    const { currCoords, allPapers } = this.state;
    const { onLoadData } = this.props;

    onLoadData(true);

    new Promise((resolve, reject) => {
      // navigator.geolocation.getCurrentPosition((position) => {
      //   resolve(position);
      // });
      resolve({
        coords: {
          accuracy: 20,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          latitude: 37.5032999,
          longitude: 127.02209020000001,
          speed: null
        },
        timestamp: 1552801578160
      });
    }).then((positionData) => {
      if (positionData) {
        const coordsObj = {};
        const copiedcurrCoords = [...currCoords];
        const copiedPapers = [...allPapers];
        coordsObj.lat = positionData.coords.latitude;
        coordsObj.lon = positionData.coords.longitude;
        copiedcurrCoords.push(coordsObj);

        axios.get(`/papers?lat=${positionData.coords.latitude}&lon=${positionData.coords.longitude}`)
          .then((response) => {
            copiedPapers.push(response);
            onLoadData(false);

            this.setState((prevState) => {
              return {
                ...prevState,
                viewport: {
                  ...prevState.viewport,
                  latitude: positionData.coords.latitude,
                  longitude: positionData.coords.longitude
                },
                currCoords: copiedcurrCoords,
                allPapers: copiedPapers
              };
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const coordsObj = {};
        const copiedcurrCoords = [...currCoords];
        const copiedPapers = [...allPapers];

        axios.get('http://ip-api.com/json')
          .then((res) => {
            coordsObj.lat = res.data.lat;
            coordsObj.lon = res.data.lon;
            copiedcurrCoords.push(coordsObj);

            axios.get(`/papers?lat=${res.data.lat}&lon=${res.data.lon}`)
              .then((response) => {
                copiedPapers.push(response);
                this.setState((prevState) => {
                  return {
                    ...prevState,
                    viewport: {
                      ...prevState.viewport,
                      latitude: res.data.lat,
                      longitude: res.data.lon
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
      }
    });
  }

  handleClose() {
    this.setState({
      isModalOpen: false
    });
  }

  displayModal() {
    this.setState({
      isModalOpen: true
    });
  }

  displayLists(lat, lon) {
    this.setState({
      isDisplayModalOpen: true,
      targetLat: lat,
      targetLon: lon
    });
  }

  handleListModal() {
    this.setState({
      isDisplayModalOpen: false
    });
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
          this.props.isLoading
            ? <Loading />
            : null
        }
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
            ? <CreateModal {...this.props} currCoords={this.state.currCoords} handleClose={this.handleClose.bind(this)} />
            : null
        }
        {
          this.state.isDisplayModalOpen
            ? <DisplayListsModal {...this.props} targetLat={this.state.targetLat} targetLon={this.state.targetLon} allPapers={this.state.allPapers} handleListModal={this.handleListModal.bind(this)} />
            : null
        }
      </div>
    );
  }
}
