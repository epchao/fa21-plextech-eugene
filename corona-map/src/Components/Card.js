import React, { Component } from 'react';
import '../App.css';

export default class Card extends Component { 
    render() {
        let { data, name } = this.props;

        return (
            <div className="card">
                <div className="data">{ data }</div>
                <div className="name">{ name }</div>
            </div>
        )
    }
}