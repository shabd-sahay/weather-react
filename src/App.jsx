import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Weather from './components/weather';
import { Dimmer, Loader } from 'semantic-ui-react';
export default function App() {
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });

      await fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${long}&appid=9fa4538d89c017aa11b1911414554fef`)
      .then(res => res.json())
      .then(result => {
        setData(result);
      });
    }
    fetchData();
  }, [lat,long])
  
  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div>
            <Dimmer active>
              <Loader>Loading..</Loader>
            </Dimmer>
        </div>
      )}
    </div>
  );
}