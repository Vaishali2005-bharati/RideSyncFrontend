import React, { useState } from "react";
import { LoadScript, GoogleMap, Marker, Polyline } from "@react-google-maps/api";

function LiveTracking({ location, destination, onMapClick }) {
  const [routeCoords, setRouteCoords] = useState(null); // ✅ declare state

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    onMapClick({ lat, lng });
  };

  const center = location.lat && location.lng
    ? { lat: location.lat, lng: location.lng }
    : { lat: 25.3176, lng: 82.9739 };

let destCoords = null;
if (destination && destination.includes(",")) {
  const [lat, lng] = destination.split(",").map(Number);
  destCoords = { lat, lng };
} else {
  // ✅ Default destination: Banaras (Varanasi)
  destCoords = { lat: 25.3176, lng: 82.9739 };
}
React.useEffect(() => {
  const fetchRoute = async () => {
   
  };

  fetchRoute();
}, [location, destCoords]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "500px" }}
        center={center}
        zoom={14}
        onClick={handleMapClick}
      >
        {location.lat && location.lng && (
          <Marker position={{ lat: location.lat, lng: location.lng }} />
        )}

        {destCoords && (
          <Marker
            position={destCoords}
          />
        )}
              </GoogleMap>
    </LoadScript>
  );
}

export default LiveTracking;