import React, {Fragment, useReducer} from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import { Map, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StoreList from './StoreList';
import GeocoderInput from './Geocoder';
import InfoWindowEx from './InfoWindowEx';

const initialState = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'onMarkerClick':
        return {
            ...state,
            showingInfoWindow: true,
            selectedPlace: action.payload.place,
            activeMarker: action.payload.marker
        };
    case 'onMapClick':
        return {
            ...state,
            showingInfoWindow: false,
            activeMarker: null
        };
    default:
        throw new Error();
    }
}

let latitude = null;
let longitude = null;

const MapContainer = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          props.updateLocated(true, lat, lng);
        }
      )
    } else {
      error => console.log(error)
    }
  }

  const fetchPlaces = (mapProps, map) => {
    let changed = false;
    if (mapProps.center.lat !== latitude || mapProps.center.lng !== longitude) {
      changed = true;
      if (!latitude && !longitude) {
        latitude = mapProps.center.lat;
        longitude = mapProps.center.lng;
      }
    }
    if (changed || props.navigatedToStepOne) {
      const {google} = mapProps;
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: mapProps.center,
        radius: 1000,
        type: ['grocery_or_supermarket']
      }, (results, status) => {
        if (status !== 'OK') return;
        props.setPlaces(results);
        const bounds = new google.maps.LatLngBounds();
        for (let i = 0, place; place = results[i]; i++) {
          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
      });
      props.updateNavigatedToStepOne(false);
    }
  }

  const onMarkerClick = (place, marker, e) => {
    dispatch({ type: 'onMarkerClick', payload: { place, marker } });
  }

  const onMapClick = () => {
    if (showingInfoWindow) {
      dispatch({ type: 'onMapClick' });
    }
  };

  const updateCoords = (lat, lng) => {
    props.updateLocated(true, lat, lng);
  }

  const coords = { lat: props.lat, lng: props.lng };

  const mapProps = {
    center: coords,
    google: props.google,
    onReady: fetchPlaces,
    onClick: onMapClick,
    onCenterChanged: fetchPlaces,
    zoom: 14,
    scrollwheel: true
  };

  return (

    <Fragment>

      <MDBRow className="store-geocoder">
        <MDBCol sm="12" md="6" className="offset-md-3" >
          <GeocoderInput updateCoords={updateCoords}/>
        </MDBCol>
      </MDBRow>

      <MDBRow className="store-geolocation">
        <MDBCol sm="12" md="6" className="offset-md-3" >
              <button className="button button-orange-red geolocation-button" onClick={showCurrentLocation} >
                  <FontAwesomeIcon icon="map-marker-alt"/> Locate Me
              </button>
        </MDBCol>
      </MDBRow>

      {
        props.located &&

        <MDBRow className="store-search-results">

        <MDBCol md="12" lg="5" className="store-search-results--store-list-container">
          <StoreList stores={props.places} onStoreSelection={props.onStoreSelection}/>
        </MDBCol>

        <MDBCol md="12" lg="7" className="store-search-results--map-container">
          <Map className="store-selection-google-map--map" style={{width: 700, height: 500, position: 'relative'}} {...mapProps}>

            <Circle
                radius={1200}
                center={coords}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#FF0000'
                fillOpacity={0.2}
            />

            {
              props.places.length > 0 &&
                props.places.map((place, index) => {
                  const image = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                  };
                  return (
                    <Marker key={place.id} name={place.name} icon={image} position={place.geometry.location} onClick={onMarkerClick} />
                  )
                })
            }

            <InfoWindowEx marker={state.activeMarker} visible={state.showingInfoWindow} selectedPlace={state.selectedPlace}>
              <div>
                <h5>{state.selectedPlace.name}</h5>
                <button className="button button-lighter-green" onClick={ () => props.onStoreSelection(state.selectedPlace)}>Find products</button>
              </div>
          </InfoWindowEx>

          </Map>
        </MDBCol>

      </MDBRow>

      }

    </Fragment>

  );
}

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY
})(MapContainer)