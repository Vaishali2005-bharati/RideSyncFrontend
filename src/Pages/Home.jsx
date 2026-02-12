import React from "react";
import { Link } from "react-router-dom";

function Home () {

    return (
        <>
            <div className="h-full w-full flex flex-col justify-center items-center p-2 "> 
                <div className="bg-orange-400 w-9/10 h-auto rounded mt-5">
                <h1 className=" text-white  text-5xl  w-full text-center font-bold p-3 mb-2 mt-2 rounded "> Ride Sync </h1>
                </div>
                <div className=" w-full h-90 mt-20  bg-[url('/Home.jpeg')] bg-cover bg-center">
                  
                </div>
                    <Link to = "/login"  className="bg-orange-400 rounded w-9/10 mx-auto text-white flex justify-center flex position fixed bottom-4 text-center m-2 p-2 mx-auto font-bold p-3 mb-2 mt-2 "> Continue</Link>
            </div>
           
        </>
    )
}

export default Home;