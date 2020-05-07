import React, { useEffect, useRef } from 'react';
import {InfoWindow} from 'google-maps-react';
import ReactDOM from 'react-dom';

const InfoWindowEx = (props) => {
  const infoWindowRef = useRef(null);
  const contentElement = document.createElement(`div`);

  const { marker, visible, selectedPlace, children } = props;

  useEffect( () => {
      ReactDOM.render(
        React.Children.only(children),
        contentElement
      );
      infoWindowRef.current.infowindow.setContent(contentElement);
      },
    [marker, visible, selectedPlace],
  );

  return (
    <InfoWindow ref={infoWindowRef} {...props} />
  )

}

export default InfoWindowEx;