import React, {Component} from 'react';
import {Map, InfoWindow, Marker, Circle, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {

    const coords = { lat: 43.6532, lng: -79.3832 };

    return (
        <Map className="google-map--map" initialCenter={coords} google={this.props.google} onClick={this.onMapClicked} style={{width: 800, height: 500, position: 'relative'}} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onOpen={this.windowHasOpened} onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>

        <Circle
            radius={1200}
            center={coords}
            onMouseover={() => console.log('mouseover')}
            onClick={() => console.log('click')}
            onMouseout={() => console.log('mouseout')}
            strokeColor='transparent'
            strokeOpacity={0}
            strokeWeight={5}
            fillColor='#FF0000'
            fillOpacity={0.2}
        />

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDboNRlvYB28UXVObFYGaP6xw0p3HJiowA'
})(MapContainer)