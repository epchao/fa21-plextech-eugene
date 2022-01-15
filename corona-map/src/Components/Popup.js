import React from 'react'
import { Popup } from 'react-leaflet'
export default class CustomPopup {
    render(){
        let { country, total_cases, daily_cases, total_deaths, recovery_rate } = this.props;
        return (
            <Popup>
            <div>Country: { country }</div>
            <div>Total Cases: {total_cases }</div>
            <div>Daily Cases: { daily_cases}</div>
            <div>Total Deaths: {total_deaths}</div>
            <div>Rate of Recovery: {recovery_rate }</div>
            </Popup>
        );
    }
}