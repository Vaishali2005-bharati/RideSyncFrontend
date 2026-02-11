import React from "react";
import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ number, setNumber ] = useState('');
    const [ vehicleType, setVehicleType ] = useState('');
    const [ vehicleColor, setVehicleColor ] = useState('');
    const [ numberPlate, setNumberPlate] = useState('');
    const [seat, setSeat] = useState('');

   
    const navigate = useNavigate();

    const submitHandler = async  (e) => {
        e.preventDefault();

        const userData = {
            fullName: {
                firstName: firstName,
                lastName: lastName,
            },
            email: email,
            number: number,
            password: password,
            vehicleDetails: {
                vehicleType: vehicleType,
                vehicleColor: vehicleColor,
                numberPlate: numberPlate,
                capacity: seat,
            },
        };

       
        const response = await axios.post(`https://ridesyncbackend.onrender.com/register`, userData);

        if( response.status === 200)
        {
            const data = response.data;
            localStorage.setItem('token', data.token);
            navigate('/start');
        }

        setEmail('');
        setFirstName('');
        setLastName('');
        setNumber('');
        setPassword('');
        setVehicleColor('');
        setVehicleType('');
        setNumberPlate('');
        setSeat('');

        
    }

    const resetHandler = (e) => {

        e.preventDefault();

        setEmail('');
        setFirstName('');
        setLastName('');
        setNumber('');
        setPassword('');
        setVehicleColor('');
        setVehicleType('');
        setNumberPlate('');
        setSeat('');

    }


    return (
        <>


            <div className="bg-[url('https://www.pexels.com/photo/biker-on-an-asphalt-road-winding-between-hills-on-a-foggy-autumn-day-19786924')] bg-cover bg-center  w-full h-screen"> 
                <hr />

                <form >

                     <h1 className="font-bold text-center text-xl"> Ride Sync </h1>
                <h3 className="mx-2"> What is Your Name? </h3>
                <input 
                type = "text"
                name= "firstName"
                class = "name input"
                value = {firstName}
                onChange={ (e) => setFirstName(e.target.value)}
                className="bg-white text-black w-1/2 border rounded m-2 px-2 py-1 "
                placeholder="First Name" />

                <input 
                type = "text"
                name = "lastName"
                class = "name input"
                value = { lastName }
                onChange={ (e) => setLastName(e.target.value)}
                className="bg-white text-black w-1/2 border rounded m-2 px-2 py-1"
                placeholder=" Last Name " />

                <h3 className="mx-2"> Email </h3>
                <input 
                type = "text"
                name = "email"
                id = "email"
                class = "input"
                value = {email}
                onChange={ (e) => setEmail(e.target.value)}
                className="bg-white text-black w-1/2 border rounded m-2 px-2 py-1"
                placeholder="example@gmail.com" />

                <h3 className="mx-2"> Phone No. </h3>
                <input 
                type = "number"
                name = "number"
                id = "number"
                class = "input"
                value = {number}
                onChange={(e) => setNumber(e.target.value)}
                className="bg-white text-black w-1/2 border rounded m-2 px-2 py-1"
                placeholder="Phone No." />

                <h3 className="mx-2"> Password </h3>
                <input 
                type = "password"
                name= "password"
                id = "password"
                class = "input"
                value = {password}
                onChange = { (e) => setPassword(e.target.value)}
                className="bg-white text-black w-1/2 border rounded m-2 px-2 py-1"
                placeholder="password" />

                

                <fieldset className="border rounded px-5 py-2 mx-5 my-3">
                    <h3 className="mx-2"> Vehicle Details (optional) </h3>
                    <h3 className="mx-2"> Vehicle Type </h3>
                    <input
                    type = "text"
                    name = "vehicleType"
                    id = "vehicleType"
                     class = "input"
                     value = {vehicleType}
                     onChange={(e) => setVehicleType(e.target.value )}
                     className="bg-white text-black w-1/2 border rounded m-2 px-2 py-1"
                    placeholder="car, motorcycle, jeep " />

                    <h3 className="mx-2"> Vehicle Color </h3>
                    <input 
                    type = "text"
                    id = "vehicleColor"
                    name = "vehicleColor"
                     class = "input"
                     value = {vehicleColor}
                     onChange = {(e) => setVehicleColor(e.target.value)}
                     className="bg-white text-black w-1/2 border rounded m-2 px-2 py-1"
                    placeholder="Vehicle Color" />

                    <h3 className="mx-2"> Vehicle Number Plate </h3>
                    <input 
                    type = "text"
                    id = "numberPlate"
                    name = "numberPlate"
                     class = "input"
                     value = {numberPlate}
                     onChange={ (e) => setNumberPlate(e.target.value)}
                     className="bg-white text-black w-1/2 border rounded m-2 px-2 py-1"
                    placeholder="Vehicle Number Plate" />

                    <h3 className="mx-2"> Vehicle Total Seat </h3>
                    <input 
                    type = "text"
                    id = "seat"
                    name = "seat"
                     class = "input"
                     value = {seat}
                     onChange={ (e) => setSeat(e.target.value)}
                     className="bg-white text-black w-1/2 border rounded m-2 px-2 py-1"
                    placeholder="Total seat available" />

                </fieldset>

                <div className="flex flex-row py-4">
                    <button onClick={resetHandler} className="mx-2 px-2 py-1 w-1/2 text-center bg-blue-300 rounded"> Reset </button>
                     <button onClick={submitHandler} className="mx-2 px-2 py-1 w-1/2 text-center bg-red-300 rounded"> Submit </button>
                        
                
                </div>
                </form>
               

                
               
            </div>
        </>
    )
}

export default Register;

// name , email , phone no. , password, Dob, profile picture, gender, address, vehicle details,  It is all of the things. that I should take from the user. 

