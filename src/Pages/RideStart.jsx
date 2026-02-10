import React from "react";
import { useState, useRef } from "react";
import LiveTracking from './../Components/LiveTracking.jsx'
import thor from "../../assets/thor.jpg";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import axios from "axios";
import LocationSearchPanel from '../Components/LocationSearchPanel.jsx';

function RideStart () {

    const [ start, setStart ] = useState('');
    const [ destination, setDestination ] = useState('');
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [panelOpen , setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const [activeField, setActiveField] = useState(null);
    const suggestionRef = useRef(null);

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
    }, [panelOpen])



    const handleStartChange = async (e) => {
        setStart(e.target.value);

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: {
                    input: e.target.value
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setStartSuggestions(response.data);

        }   catch {
            console.log("Error is in the handleStartChange");
        }


    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value);

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: {
                    input: e.target.value
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        }   catch {
            console.log("Error is in the handleDestinationChange");
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <>
           <div>
                <div className="w-full h-500px bg-green-400 border " onClick={() =>  setPanelOpen(false)}>
                   <img className="w-full h-800px bg-cover" src = {thor} />
                    <img className="w-full h-800px bg-cover" src = {thor} />
                    {/* <LiveTracking   /> */}
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

export default RideStart;