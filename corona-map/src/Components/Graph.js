import React, { Component } from 'react';
import Chart from 'react-google-charts';
import '../App.css';

export default class Graph extends Component { 
    render() {
        const [ width, height ] = [ 400, 300 ];
        let { name, chartType } = this.props;
        let chartData = [['Name', 'Numbers']]
        for (let i = 0; i < name.length; i++) {
            chartData.push([name, name[i]])
        }
        

        return (
            <div className="card">
                <div className="name">{ name }</div>
                <div className="graph">
                    <Chart
                    width={ width }
                    height={ height }
                    chartType={ chartType }
                    loader={<div>Loading Chart</div>}
                    data={[
                        

                    ]}
                    options={{
                        title={ name },
                        chartArea: { width: '30%' },
                    }}
                    />
                </div>
            </div>
        )
    }
}