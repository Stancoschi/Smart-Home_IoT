import React, { useState, useEffect } from "react";

function SmartHome() {
  const [light, setLight] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const toggleLight = () => {
    setLight(!light);
  };

  useEffect(() => {
    const fetchData = () => {
      fetch("/api")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => setData(data.payload))
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setError(error.toString());
        });
    };
    fetchData();
    const intervalId = setInterval(fetchData, 500);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="SmartHome">
      <h1>Smart Home Interface</h1>
      <div>
        <h2>Light Control</h2>
        <button onClick={toggleLight}>
          {light ? "Turn off" : "Turn on"} light
        </button>
      </div>
      <div>
        <h2>{error ? `Error: ${error}` : !data ? "Loading..." : data}</h2>
      </div>
    </div>
  );
}

export default SmartHome;
