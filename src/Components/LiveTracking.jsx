import React, { useEffect, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";


  // Required: container style for the map
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  // Required: initial center of the map
  const center = {
    lat: 25.3176, // Example: Varanasi latitude
    lng: 82.9739, // Example: Varanasi longitude
  };

function LiveTracking({ location }) {
  const [currentPosition, setCurrentPosition] = useState(center);
  

  useEffect( () => {
    navigator.geolocation.getCurrentPosition( (position) => {
      const { latitude, longitude } = position.coords;

      setCurrentPosition( {
        lat: latitude,
        lng: longitude
      });
    });
      return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect( () => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition( (position) => {
        const { latitude, longitude } = position.coords;

        console.log("Position Updated: ", latitude, longitude);
        setCurrentPosition( {
          lat: latitude,
          lng: longitude
        });
      });
    };
    updatePosition();
  
    const IntervalId = setInterval( updatePosition, 900000000);
  }, []);


  return (
    <LoadScript googleMapsApiKey={import.meta.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
      >
          <Marker position={currentPosition} />

        {/* You can add markers or other components here */}
      </GoogleMap>
    </LoadScript>
  );
}

export default LiveTracking;
