import React, {Component} from 'react';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { Map, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';
import StoreList from './StoreList';
import InfoWindowEx from './InfoWindowEx';

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      places: []
    };
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  fetchPlaces = (mapProps, map) => {
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

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  onStoreSelection = (place) => {
    this.props.onStoreSelection(place);
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

    return (

      <MDBRow className="store-search-results">

        <MDBCol md="12" lg="5" className="store-search-results--store-list-container">
          <StoreList stores={this.state.places} onStoreSelection={this.onStoreSelection}/>
        </MDBCol>

        <MDBCol md="12" lg="7" className="store-search-results--map-container">
          <Map className="google-map--map" style={{width: 700, height: 500, position: 'relative'}} {...mapProps}>

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
                  <h5>{this.state.selectedPlace.name}</h5>
                  <MDBBtn className="btn-lighter-green" onClick={this.onButtonClick} onClick={ () => this.props.onStoreSelection(this.state.selectedPlace)}>Find products</MDBBtn>
                </div>
            </InfoWindowEx>

          </Map>
        </MDBCol>

      </MDBRow>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDboNRlvYB28UXVObFYGaP6xw0p3HJiowA'
})(MapContainer)