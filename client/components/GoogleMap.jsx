import React, {Component} from 'react';
import { Button } from 'reactstrap';
import {Map, Marker, Circle, GoogleApiWrapper} from 'google-maps-react';
import InfoWindowEx from './InfoWindowEx';

export class MapContainer extends Component {
  state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      places: []
  };

  fetchPlaces = (mapProps, map) => {
    console.log("Fetch places", mapProps, map)
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: mapProps.initialCenter,
      radius: 1000,
      type: ['grocery_or_supermarket']
    }, (results, status) => {
      if (status !== 'OK') return;
      this.setState({ places: results });
      const bounds = new google.maps.LatLngBounds();
      for (let i = 0, place; place = results[i]; i++) {
        bounds.extend(place.geometry.location);
      }
      map.fitBounds(bounds);
    });
  }

  onMarkerClick = (place, marker, e) => {
    this.setState({
      selectedPlace: place,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  onButtonClick = () => {
    console.log("Active store", this.state.selectedPlace)
  }

  render() {

    const coords = { lat: 43.643500, lng: -79.393520 };

    const mapProps = {
      initialCenter: coords,
      google: this.props.google,
      onReady: this.fetchPlaces,
      onClick: this.onMapClicked,
      zoom: 14,
      scrollwheel: true
    };

    const infoWindowProps = {
      marker: this.state.activeMarker,
      visible: this.state.showingInfoWindow,
      onOpen: this.windowHasOpened,
      onClose: this.onInfoWindowClose
    };

    return (
      <Map className="google-map--map" style={{width: 800, height: 500, position: 'relative'}} {...mapProps}>

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

        {
          this.state.places.length > 0 &&
            this.state.places.map((place, index) => {
              const image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };
              return (
                <Marker key={place.id} name={place.name} icon={image} position={place.geometry.location} onClick={this.onMarkerClick} />
              )
            })
        }

        <InfoWindowEx marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
              <Button color="primary" onClick={this.onButtonClick}>Find products</Button>
            </div>
        </InfoWindowEx>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDboNRlvYB28UXVObFYGaP6xw0p3HJiowA'
})(MapContainer)