import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const userId = localStorage.getItem("userId");

    // Reset role + origin + destination in DB
    await fetch(`https://ridesyncbackend2.onrender.com/users/${userId}/logout`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirect to login
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;