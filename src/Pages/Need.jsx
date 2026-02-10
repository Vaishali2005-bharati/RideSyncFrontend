import React from "react";
import {Link} from 'react-router-dom';

function Need () {

    // here I have to send the data to the backend to the everyone that what should he selected 

        return (
            <>
            <div className=" w-full h-80 flex mt-40 p-7 bg-[url('need.jpeg')] bg-cover bg-center ">

            </div>
                <div className="w-full flex justify-center items-center fixed bottom-2 "> 
                    <Link to = '/start' className= " w-full bg-green-500 flex justify-center rounded  text-white font-bold p-3  m-2"> Accept Ride</Link>
                    <Link to = '/start' className="w-full bg-green-500 flex justify-center rounded text-white font-bold p-3  m-2 "> Book Ride  </Link>

                </div>
            </>
        )
}

export default Need;