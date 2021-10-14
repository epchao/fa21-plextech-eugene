import React, { Component } from 'react';
import '../App.css';

export default class Button extends Component {

    render() {
        let { task, title } = this.props;

        return (
            <button className="deviator" onClick={ task }>{ title }</button>
        );
    }
}