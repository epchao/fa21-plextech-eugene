import React, { Component } from 'react';
import Chart from 'react-google-charts';
import '../App.css';
import Card from './Card';

export default class Graph extends Component { 
    constructor(props){
        super(props);

        this.state = ({
            dataLoadingStatus: 'loading',
            filteredData: []
        })

    }

    componentDidMount() { 
        const dataDates = Object.keys(this.props.data)
        const dataNumbers = Object.values(this.props.data)
        const filteredData = [['Dates', 'Numbers']]
        for(let i = 0; i < Object.keys(this.props.data).length; i++) {
            filteredData.push([dataDates[i], dataNumbers[i]])
        }

        this.setState({
            filteredData: filteredData,
            dataLoadingStatus: 'ready'
        })
    }

    render() {
        const [ width, height ] = [ 600, 300 ];
        let { name, chartType } = this.props;

        {return this.state.dataLoadingStatus === 'ready' ? (
                <Card 
                data={
                    <Chart 
                        width={ width }
                        height={ height }
                        chartType={chartType}
                        loader={<div>Loading Chart</div>}
                        data={this.state.filteredData}
                        options={{
                            title: { name },
                            chartArea: { width: '50%' },
                        }}
                    />
                }
                name={name}
                />
            ) : (
                <div>Fetching Data</div>
            )
        }
    }
}