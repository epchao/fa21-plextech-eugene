import "./App.css";
import React, { Component, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Card from "./Components/Card";
import Map from "./Components/Map";

function App() {
  const [statsdata, setStatsData] = useState([])
  const [statsname, setStatsName] = useState(['cases', 'deaths', 'recovered'])

  const getGlobalData = () => {
    fetch("https://disease.sh/v3/covid-19/all", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
    )
    .then(function(res){
      return res.json()
    })
    .then(function(data){
      setStatsData(data)
    }) 
  }

  useEffect(() => {
    getGlobalData()
  }, [])

  return (
    <div>
      <section className="Map">
        <Map />
      </section>
      <section className="stats grid">
        {
        statsname.map((key) => {
          return(
            <Card
            name={key}
            data={statsdata[key]}
            />
          )
        })
        }
      </section>
    </div>
  );
}

// async function getGlobalData() {
//   try {
//     let url = 'https://disease.sh/v3/covid-19/all';
//     let response = fetch(url);
//     let data = await response.json();
//     setStatsData(data);
//   } catch (error) {
//       console.error('Cant fetch Global Data');
//   }
// }

// async function getHistoricalData() {
//   try {
//     let url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all';
//     let response = fetch(url);
//     let responseJson = await response.json;
//     return responseJson.cases;
//   } catch (error) {
//       console.error('Cant fetch Historical Data');
//   }
// }

export default App;
