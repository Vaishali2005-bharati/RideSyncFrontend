
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Need() {
  const navigate = useNavigate();

  const handleRoleSelect = async (role) => {
    const userId = localStorage.getItem("userId"); // assume login ke baad save hai

    await axios.put(`http://localhost:5000/user/${userId}/role`, {
      role,
    });

    // ✅ Redirect to start page
    navigate("/start");
  };

  return (
    <>
      <div className="w-full h-80 flex mt-40 p-7 bg-[url('/need.jpeg')] bg-cover bg-center"></div>
      <div className="w-full flex justify-center items-center fixed bottom-2">
        <button
          onClick={() => handleRoleSelect("driver")}
          className="w-full bg-green-500 flex justify-center rounded text-white font-bold p-3 m-2"
        >
          Accept Ride
        </button>
        <button
          onClick={() => handleRoleSelect("passenger")}
          className="w-full bg-green-500 flex justify-center rounded text-white font-bold p-3 m-2"
        >
          Book Ride
        </button>
      </div>
    </>
  );
}

export default Need;