import React, {Component} from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import CustomPopup from './Popup';
export default class Map extends Component{
    constructor(){
        super();

        this.state = ({
            countries: {}
        })
    }

    componentDidMount() {
        fetch('https://disease.sh/v3/covid-19/countries/')
            .then(res => res.json())
            .then(data =>{
                let dict = {}
                for(let i = 0; i < data.length; i++){
                    let country = data[i]["country"];
                    let lon = data[i]["countryInfo"]["long"]
                    let lat = data[i]["countryInfo"]["lat"]
                    let total_cases = data[i]["cases"]
                    let daily_cases = data[i]["todayCases"]
                    let total_deaths = data[i]["deaths"]
                    let recovery_rate = data[i]["recoveredPerOneMillion"]
                    
                    dict[country] = {"lat": lat, "long": lon, "cases": total_cases, "todayCases": daily_cases, "deaths": total_deaths, "recovery_rate": recovery_rate, }
                }
                
                this.setState({
                    countries: dict
                })
            })
            .catch(err => {
                // error catching
                console.log(err)
            })
    }
    render(){
        return(
            <div>
                <MapContainer center={[20,0]} zoom={2} scrollWheelZoom={false} className="mapcontainer">
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        Object.keys(this.state.countries).map((key, i) => {
                        return (
                            <Marker position = {[this.state.countries[key].lat, this.state.countries[key].long]}>
                                <CustomPopup 
                                country = {key}
                                total_cases = {this.state.countries[key].cases}
                                daily_cases = {this.state.countries[key].todayCases}
                                total_deaths = {this.state.countries[key].deaths}
                                recovery_rate = {this.state.countries[key].recovery_rate}
                                />
                            </Marker>
                        )}
                    )}
                </MapContainer>
            </div>
        );
    }
}