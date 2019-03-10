import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';

ReactMapGL.accessToken = 'pk.eyJ1IjoiaHllbmluaWlpIiwiYSI6ImNqcWtubmw2dTZvM2Q0MnVsNW54bmJ6aXkifQ.VTRzsYgEhe2BGUx35C3lgQ';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: 640,
        height: 800,
        latitude: 37.503555,
        longitude: 127.022127,
        zoom: 16
      },
      currCoords: [],
      allPapers: []
    };
  }

  componentDidMount() {
    const { currCoords, allPapers } = this.state;

    navigator.geolocation.getCurrentPosition((position) => {
      const coordsObj = {};
      const copiedcurrCoords = [...currCoords];
      const copiedPapers = [...allPapers];
      coordsObj.lat = position.coords.latitude;
      coordsObj.lon = position.coords.longitude;
      copiedcurrCoords.push(coordsObj);

      axios.get(`/papers?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then((response) => {
          copiedPapers.push(response.data);

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
  }

  createPaper(ev) {
    ev.preventDefault();
    axios.post('/papers/new', {
      nickname: 'vaco',
      createdAt: '2019-03-09T05:13:45.444Z',
      memo: 'vanilla coding',
      loc: {
        type: 'Point',
        coordinates: [127.022105, 37.503444]
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  displayLists(lon, lat) {
    // console.log(this.state)
    // console.log(id);
    axios.get(`/papers/location?lat=${lat}&lon=${lon}`)
      .then((response) => {
        console.log('rrrrr', response)
      })
  }

  render() {
    const { viewport, currCoords, allPapers } = this.state;
    let markers = null;

    if (allPapers.length) {
      markers = allPapers.map(papers => (
        papers.map((paper) => {
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
                onClick={this.displayLists.bind(this, paper.loc.coordinates[0], paper.loc.coordinates[1])}
              />
            </Marker>
          );
        })
      ));
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
                          onClick={this.createPaper.bind(this)}
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
      </div>
    );
  }
}
