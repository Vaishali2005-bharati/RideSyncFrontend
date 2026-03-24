import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MatchLiveTracking from "../Components/MatchLiveTracking";
import axios from "axios";

function Match() {
  const { state } = useLocation();
  console.log('State in the Match:', state);
  const initialMatches = state?.matches || [];
  const [matches, setMatches] = useState(initialMatches);
  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
   const [myLocation, setMyLocation] = useState(null);


  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setMyLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error fetching live location:", error);
          // fallback Jaunpur
          setMyLocation({ lat: 25.75, lng: 82.68 });
        },
        { enableHighAccuracy: true }
      );

      // cleanup watcher
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);


  //  having the location of the matched users. 
  useEffect(() => {
  const intervalId = setInterval(async () => {
    try {
      // collect all matched user IDs
      const ids = matches.map(m => m._id);

      if (ids.length > 0) {
        const response = await axios.post("http://localhost:5000/user/liveLocations", { ids });
        console.log("Updated live locations:", response.data);

        // merge updated locations into matches
        setMatches(prevMatches =>
          prevMatches.map(m => {
            const updated = response.data.find(u => u._id === m._id);
            return updated ? { ...m, liveLocation: updated.liveLocation } : m;
          })
        );
      }
    } catch (err) {
      console.error("Error updating live locations:", err);
    }
  }, 60000); // every 60 seconds

  return () => clearInterval(intervalId);
}, [matches]);



  const handleRating = (matchId, rating) => {
    setRatings((prev) => ({ ...prev, [matchId]: rating }));
  };

  const handleFeedbackChange = (matchId, text) => {
    setFeedbacks((prev) => ({ ...prev, [matchId]: text }));
  };

  const submitFeedback = async (matchId) => {
    const rating = ratings[matchId] || 0;
    const feedback = feedbacks[matchId] || "";
    console.log(`Feedback for ${matchId}: ${rating} stars, "${feedback}"`);
    // send to backend
     const response = await axios.post("http://localhost:5000/user/feedback", { matchId, rating, feedback });
     console.log( ' The response of the feedback of the backend:', response.data);
     setRatings('');
     setFeedbacks('');
  };

  return (
    <>
    <h1 className="w-full h-auto font-bold text-2xl flex justify-center text-white bg-orange-600 mb-2 p-3"> <i> Ride Sync </i></h1>
    <MatchLiveTracking matches = {matches} myLocation={myLocation} />
    
    <div className="m-2 ">
      <h2 className="font-bold text-2xl italic">Matched Users</h2>
      {matches.length > 0 ? (
        <ul>
          {matches.map((m) => (
            <li key={m._id} style={{ marginBottom: "20px" }}>
              <div>
                <hr />
                <strong>{m.fullname.firstName  || "Name Error"} { m.fullname.lastName || ''} </strong> - Origin:{" "}
                {m.origin.coordinates.join(", ")} — Destination:{" "}
                {m.destination.coordinates.join(", ")}
                <div className="font-bold italic"> Vehicle Details: 
                  <div>
                    <h3> Capacity: {m.vehicleDetails.capacity}</h3>
                    <h3> Number Plate: {m.vehicleDetails.numberPlate}</h3>
                    <h3> Vehicle Color: {m.vehicleDetails.vehicleColor} </h3>
                    <h3> Vehicle Type: { m.vehicleDetails.vehicleType} </h3>
                    <h3> Email: { m.email} </h3>
                    <h3> Number: {m.number} </h3>
                    <h3> Payment Number: {m.number} </h3>
                  </div>
                </div>
              </div>

              {/* ⭐ Rating */}
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(m._id, star)}
                    style={{
                      cursor: "pointer",
                      color: ratings[m._id] >= star ? "gold" : "gray",
                      fontSize: "20px",
                      marginRight: "5px"
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* 📝 Feedback */}
              <textarea
                placeholder="Write feedback..."
                value={feedbacks[m._id] || ""}
                onChange={(e) => handleFeedbackChange(m._id, e.target.value)}
                style={{ width: "300px", height: "60px", marginTop: "5px", border:'2px solid black', display: 'flex', justifyContent: 'center', marginX:'auto'
                
                 }}
              />
              <button className="bg-orange-400 border rounded p-2 m-2 text-white font-bold italic flex justify-center h-auto " onClick={() => submitFeedback(m._id)}>Submit</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found</p>
      )}
    </div>
    <div className="flex justify-center">
      <button className="bg-orange-500 w-full p-2 border text-white font-bold italic mx-4 flex justify-center "> Log Out</button>
    
    </div>
    </>
    
  );
}

export default Match;