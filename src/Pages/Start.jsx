import React from "react";
import { useState, useRef, useEffect } from "react";
import LiveTracking from './../Components/LiveTracking.jsx'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import axios from "axios";
import RouteMap from "../Components/RouteMap.jsx";
import { useNavigate } from 'react-router-dom'

function Start () {

    const [ location, setLocation ] = useState({ lat:null, lng: null})
    const [start, setStart] = useState(""); // for origin text
    const [destination, setDestination] = useState(""); // for destination text

    const [panelOpen , setPanelOpen] = useState(false);

    // reference variables
        const panelRef = useRef(null);
        const navigate = useNavigate();

// animation
    useGSAP ( function () {
        if(panelOpen){
            gsap.to(panelRef.current, {
                transform: 'translateY(-300px)',
                duration: '0.5',
                ease: "power2.out"
            })
        }   else {
            gsap.to(panelRef.current, {
                transform: 'translateY(0px)',
                duration: '0.5',
                ease: "power2.out"
            })

          
        }
    }, [panelOpen]);


useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log("User Location:", coords);
      setLocation(coords);
      setStart(`${coords.lat}, ${coords.lng}`);
    },
    (error) => {
      console.error("Location Error:", error);
      // fallback Jaunpur
      setLocation({ lat: 25.75, lng: 82.68 });
      setStart("25.75, 82.68");
    },
    { enableHighAccuracy: true } // ✅ GPS ko force karo
  );
}, []);
   
   // Trip finder using fetch
const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const userId = localStorage.getItem("userId"); // assume login ke baad save hai
    console.log("It is the page Start");
    console.log("userId:", userId);

    // Convert string "lat, lng" into numbers
    const originCoords = start.split(",").map(Number);       // [lat, lng]
    const destinationCoords = destination.split(",").map(Number); // [lat, lng]

    const response = await fetch(`https://ridesyncbackend2.onrender.com/user/${userId}/trip`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: { type: "Point", coordinates: [originCoords[1], originCoords[0]] }, // [lng, lat]
        destination: { type: "Point", coordinates: [destinationCoords[1], destinationCoords[0]] },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Trip Response:", data);
    console.log("✅ Trip saved successfully");
      // try {
      //   const response = await axios.post(
      //     "http://localhost:5000/user/route",
      //     {
      //       origin: { lat: location.lat, lng: location.lng },
      //       destination: { lat: destinationCoords[1], lng: destinationCoords[0] },
      //     },
      //     {
      //       headers: { "Content-Type": "application/json" }
      //     }
      //   );

      //   const data = response.data;
      //   console.log("✅ ORS Route Summary:", data.summary);
      //   console.log("✅ ORS Route Coordinates:", data.coordinates);

      //   // setRouteCoords(data.coordinates); // [lng, lat] pairs
      // } catch (err) {
      //   console.error("Route fetch error:", err);
      // }
//       const response2 = await axios.get("http://localhost:5000/user/route", {
//   params: {
//     start: `${location.lng},${location.lat}`,
//     // end: `${destCoords.lng},${destCoords.lat}`
//     end: `${destinationCoords[1]},${destinationCoords[0]}`
//   }
// });
    
  } catch (err) {
    console.log("Error is in the trip point and sending the location to the backend");
    console.error(err);
  }
      try {
            const userId = localStorage.getItem("userId"); 
            const roleResponse = await axios.get(`https://ridesyncbackend2.onrender.com/user/findrole/${userId}`);

            const role = roleResponse.data.role; 
            console.log('It is the frontends Role printing in the Start.jsx Role:' , role);
             const destinationCoords = destination.split(",").map(Number);
          const response3 = await axios.post("https://ridesyncbackend2.onrender.com/user/match", {
                userId,
                role,
                location: {
                  type: "Point",
                  coordinates: [location.lng, location.lat]
                },
                destination: {
                  type: "Point",
                  coordinates: [destinationCoords[1], destinationCoords[0]]
                }
              });

            // setMatch(response3.data); // array of matched passengers/drivers
            console.log("Matched Users:", response3.data);
            // Navigate to Match page with data
            navigate("/match", { state: { matches: response3.data } });


          } catch (err) {
            console.error("Error fetching matches:", err);
          }

};

    return (
        <>
           <div>
                <div className="w-full h-500px bg-green-400 border " onClick={() =>  setPanelOpen(false)}>
                   
                         <LiveTracking 
                        location={location} 
                        onMapClick={(coords) => {
                            setDestination(`${coords.lat}, ${coords.lng}`);
                        }} 
                        />

                        {/* <RouteMap
                             location={location} 
                        onMapClick={(coords) => {
                            setDestination(`${coords.lat}, ${coords.lng}`);
                        }} /> */}

                </div>
                <div ref= {panelRef} className=" w-full h-screen flex flex-col flex-between items-center bg-white" >

                    <form onSubmit={submitHandler}>

                        <input
                            type="text"
                            className="bg-gray-200 p-3 w-[80%] h-30px rounded mt-6"
                            id="presentAddress"
                            value={start}
                            readOnly
                            />

                            <input
                            type="text"
                            className="bg-gray-200 p-3 w-[80%] h-30px rounded"
                            id="destinationAddress"
                            value={destination}
                            readOnly
                            />

                        <button className="bg-green-700 text-white rounded-[20%] center p-3 m-3 mt-5" onClick={submitHandler}> Search </button>

                        <button className="bg-green-700 text-white rounded-[20%] center p-3 m-3 mt-5" onClick={() => navigate('/match')} > Match </button>

                    </form>
                    
                </div>



           </div>
        </>
    )
}

export default Start;