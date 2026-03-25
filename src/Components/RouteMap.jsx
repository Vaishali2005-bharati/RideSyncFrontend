import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function RouteMap({ location, destination, onMapClick }) {
  const [routeCoords, setRouteCoords] = useState(null);


    const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    onMapClick({ lat, lng });
  };
  // Default center (Varanasi)
  const center =
    location.lat && location.lng
      ? [location.lat, location.lng]
      : [25.3176, 82.9739];

  // Destination parsing
  let destCoords = null;
  if (destination && destination.includes(",")) {
    const [lat, lng] = destination.split(",").map(Number);
    destCoords = [lat, lng];
  }

  useEffect(() => {
    const fetchRoute = async () => {
      if (destCoords && location.lat && location.lng) {
        try {
          const response = await fetch("https://ridesyncbackend2.onrender.com/user/route", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              origin: { lat: location.lat, lng: location.lng },
              destination: { lat: destCoords[0], lng: destCoords[1] },
            }),
          });

          const data = await response.json();
          console.log("✅ ORS Route Summary:", data.summary);
          console.log("✅ ORS Route Coordinates:", data.coordinates);

          setRouteCoords(data.coordinates); // [lng, lat] pairs
        } catch (err) {
          console.error("Route fetch error:", err);
        }
      }
    };

    fetchRoute();
  }, [location, destCoords]);

  return (
    <MapContainer center={center} zoom={14} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {location.lat && location.lng && <Marker position={[location.lat, location.lng]} />}
      {destCoords && <Marker position={destCoords} />}

      {routeCoords && (
        <Polyline
          positions={routeCoords.map(([lng, lat]) => [lat, lng])} // convert [lng, lat] → [lat, lng]
          pathOptions={{ color: "blue", weight: 4 }}
        />
      )}
    </MapContainer>
  );
}

export default RouteMap;