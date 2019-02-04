import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
const GMA = require('../../../GMA.json');

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courts: []
    };
    this.fetchPlaces = this.fetchPlaces.bind(this);
  }

  fetchPlaces(mapProps, map) {
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
  }

  render() {
    const style = {
      width: '95%',
      height: '500px'
    };
    return (
      <Map google={this.props.google} style={style} zoom={14} onReady={this.fetchPlaces}>
        <Marker name={'Dolores park'} position={{ lat: 37.759703, lng: -122.428093 }} />
        <Marker
          name={'Father Alfred E. Boeddeker Park'}
          position={{ lat: 37.7843, lng: -122.4123 }}
        />

        <Marker onClick={this.onMarkerClick} name={'Current location'} />

        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{ lat: 37.778519, lng: -122.40564 }}
        />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>San Francisco</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GMA.GMA
})(MapContainer);
