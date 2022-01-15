import "./App.css";
import React, { Component, useState, useEffect } from "react";
import Card from "./Components/Card";
import Map from "./Components/Map";
import Graph from './Components/Graph'

function App() {
  const [statsdata, setStatsData] = useState([])
  const [statsname] = useState(['cases', 'deaths', 'recovered'])

  const [graphsdata, setGraphsData] = useState([])
  const [graphsname] = useState(['cases', 'deaths'])

  const [ready, setReady] = useState(null)

  const fetchData = (url, fn) => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
    )
      .then(res => res.json())
      .then(function (data) {
        fn(data)
        if(fn === setGraphsData) {
          setReady(true)
        }
      })
  }

  useEffect(() => {
    fetchData("https://disease.sh/v3/covid-19/all", setStatsData)
    fetchData("https://disease.sh/v3/covid-19/historical/all?lastdays=30", setGraphsData)
  }, [])

  return (
    <div className="App">
      <section className="map">
        <Map />
      </section>
      <section className="stats grid">
        {
          statsname.map((key) => {
            return (
              <Card
                name={key}
                data={statsdata[key]}
              />
            )
          })
        }
      </section>
      {
        ready ? 
        <section className="graphs grid">
        {
          graphsname.map((key) => {
            return(
              <Graph
              name={`Last 30 days: ${key}`}
              data={graphsdata[key]}
              chartType="LineChart"
              />
            )
          })
        }
        </section>
        :
        <div>Fetching data...</div>
      }
    </div>
  );
}

export default App;
