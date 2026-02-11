import React from "react";
import { useState, useRef } from "react";
import LiveTracking from './../Components/LiveTracking.jsx'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import axios from "axios";
import LocationSearchPanel from '../Components/LocationSearchPanel.jsx';

function Start () {

    const [ start, setStart ] = useState('');
    const [ destination, setDestination ] = useState('');
    const [ location, setLocation ] = useState({ lat:null, lng: null})
    const [locationLoading, setLocationLoading] = useState(false);
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [rideData, setRideData] = useState(null);
    const [panelOpen , setPanelOpen] = useState(false);
    const [activeField, setActiveField] = useState(null);

    // reference variables
        const panelRef = useRef(null);
        const suggestionRef = useRef(null);

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

   const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setLocation(coords);
        resolve(coords);
      },
      (error) => {
        console.error("Location Error: ", error);
        reject(error);
      }
    );
  });
};


    // for suggestions
    const handleStartChange = async (e) => {
        setStart(e.target.value);

        try {
            const response = await axios.get(`https://ridesyncbackend2.onrender.com/maps/get-suggestions`, { 
                params: {
                    input: e.target.value
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setStartSuggestions(response.data);

        }   catch (error) {
            console.log("Error is in the handleStartChange");
            console.error(error);

        }


    }
  // for suggestions
    const handleDestinationChange = async (e) => {
        setDestination(e.target.value);

        try {
            const response = await axios.get(`https://ridesyncbackend2.onrender.com/maps/get-suggestions`, {
                params: {
                    input: e.target.value
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

             setDestinationSuggestions(response.data);
        }   catch (error) {
            console.log("Error is in the handleDestinationChange");
            console.error(error);
        }
    }

    // trip finder

    const submitHandler = async (e) => {
        e.preventDefault();

      const coords = await getUserLocation();

            const userDetails = {
            start,
            destination,
            location: coords
            };

        try {
            const response = await axios.post( `https://ridesyncbackend2.onrender.com/rides/createRide`, userDetails, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        console.log(response.data);
        setRideData(response.data);

        }   catch (err) {
            console.log(" Error is in the submitHandler");
            console.log("Error is :", err);
        }


    }

    return (
        <>
           <div>
                <div className="w-full h-500px bg-green-400 border " onClick={() =>  setPanelOpen(false)}>
                   
                    <LiveTracking   location = { location} />
                </div>
                <div ref= {panelRef} className=" w-full h-screen flex flex-col flex-between items-center bg-white" >

                    <form onSubmit={submitHandler}>

                         <input
                        type="text"
                        className="bg-gray-200 p-3 w-[80%] h-30px  rounded mt-6 "
                        id="presentAddress"
                        value = {start}
                        onChange={handleStartChange}
                        onClick={ () => {
                            setPanelOpen(true);
                            setActiveField('start');
                        }
                            
                        }
                        placeholder="Please Enter your present Address" />
                        <div className="text-5xl my-2">⬇️</div> {/* Unicode arrow */}


                      <input
                        type="text"
                        className="bg-gray-200 p-3 w-[80%] h-30px rounded"
                        id="destinationAddress"
                        value = {destination}
                        onChange={ handleDestinationChange}

                        onClick={ () => {
                             setPanelOpen(true)
                            setActiveField('destination')
                        }
                           
                        }
                        placeholder="Please Enter your Destination Address" />

                        <button className="bg-green-700 text-white rounded-[20%] center p-3 m-3 mt-5" onClick={submitHandler}> Search </button>

                    </form>

                    <div ref = {suggestionRef} className="w-full m-3 h-[60%] overflow-hidden">
                        <LocationSearchPanel 
                        suggestions= {activeField === 'start'? startSuggestions: destinationSuggestions}
                        setStart= {setStart}
                        setDestination= {setDestination}
                        activeField= {activeField}
                         />
                    </div>
                    
                </div>

           </div>
        </>
    )
}

export default Start;