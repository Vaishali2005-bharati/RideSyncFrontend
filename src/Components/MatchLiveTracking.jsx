// import React from 'react';
// import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

// function MatchLiveTracking({ matches, myLocation }) {
//   const center = myLocation || { lat: 25.3176, lng: 82.9739 };

//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap
//         mapContainerStyle={{ width: "100%", height: "500px" }}
//         center={center}
//         zoom={14}
//       >
//         {/* ✅ Show your own live location */}
//         {myLocation && (
//           <Marker position={myLocation} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}>
//             <InfoWindow position={myLocation}>
//               <div><strong>You</strong> — Current Location</div>
//             </InfoWindow>
//           </Marker>
//         )}

//         {/* ✅ Show matched users */}
//         {matches.map((m) => (
//           <React.Fragment key={m._id}>
//             {m.origin && (
//               <Marker
//                 position={{
//                   lat: m.origin.coordinates[1],
//                   lng: m.origin.coordinates[0]
//                 }}
//               >
//                 <InfoWindow
//                   position={{
//                     lat: m.origin.coordinates[1],
//                     lng: m.origin.coordinates[0]
//                   }}
//                 >
//                   <div>{m.fullname.firstName} {m.fullname.lastName} — Live Location</div>
//                 </InfoWindow>
//               </Marker>
//             )}

//             {m.destination && (
//               <Marker
//                 position={{
//                   lat: m.destination.coordinates[1],
//                   lng: m.destination.coordinates[0]
//                 }}
//               >
//                 <InfoWindow
//                   position={{
//                     lat: m.destination.coordinates[1],
//                     lng: m.destination.coordinates[0]
//                   }}
//                 >
//                   <div>{m.fullname.firstName} {m.fullname.lastName} — Destination</div>
//                 </InfoWindow>
//               </Marker>
//             )}
//           </React.Fragment>
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// }

// export default MatchLiveTracking;

import React, { useState } from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

function MatchLiveTracking({ matches, myLocation }) {
  const center = myLocation || { lat: 25.3176, lng: 82.9739 };
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (markerId) => {
    if (markerId === activeMarker) {
      return; // agar same marker click hua to ignore
    }
    setActiveMarker(markerId);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "500px" }}
        center={center}
        zoom={14}
      >
        {/* ✅ Show your own live location */}
        {myLocation && (
          <Marker
            position={myLocation}
            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
            onClick={() => handleActiveMarker("me")}
          >
            {activeMarker === "me" && (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div><strong>You</strong> — Current Location</div>
              </InfoWindow>
            )}
          </Marker>
        )}

        {/* ✅ Show matched users */}
        {matches.map((m) => (
          <React.Fragment key={m._id}>
            {m.origin && (
              <Marker
                position={{
                  lat: m.origin.coordinates[1],
                  lng: m.origin.coordinates[0]
                }}
                onClick={() => handleActiveMarker(m._id + "-origin")}
              >
                {activeMarker === m._id + "-origin" && (
                  <InfoWindow
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div>{m.fullname.firstName} {m.fullname.lastName} — Live Location</div>
                  </InfoWindow>
                )}
              </Marker>
            )}

            {m.destination && (
              <Marker
                position={{
                  lat: m.destination.coordinates[1],
                  lng: m.destination.coordinates[0]
                }}
                onClick={() => handleActiveMarker(m._id + "-dest")}
              >
                {activeMarker === m._id + "-dest" && (
                  <InfoWindow
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div>{m.fullname.firstName} {m.fullname.lastName} — Destination</div>
                  </InfoWindow>
                )}
              </Marker>
            )}
          </React.Fragment>
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MatchLiveTracking;