import React from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';
import {appendToGraphData} from '../actions';

const client = new W3CWebSocket('wss://ws.bitstamp.net/');
const mapStateToProps = state => { 
    return {state}
}


class CryptoChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            graphData: {
                labels: [],

                datasets: [{
                    fill: false,
                    pointRadius : 3,
                    borderWidth : 3,
                    label: 'BTCUSD',
                    data: [],
                }]
            },

            graphOptions : {
                animation: false,
                layout: {
                    padding: {
                        top: 100,
                        left: 15,
                        right: 15,
                        bottom: 15
                    }
                }
            }
        }
    }

    componentDidMount(){
        client.onopen = () => {
            var subscribeMsg = {
                "event": "bts:subscribe",
                "data": {
                    "channel": "live_trades_btcusd"
                }
            };
            client.send(JSON.stringify(subscribeMsg));
          };
          client.onmessage = (message) => {
            let json = JSON.parse(message.data) 
            if (json){
                this.props.appendToGraphData(json.data)
            }
            else{
                console.log("Couldn't parse live feed data")
            }
          };
    }

    render(){
        return (
            <div>
                <Line
                    data={this.props.state.graphDataReducer}
                    width={100}
                    height={50}
                    options={this.state.graphOptions}
                />
            </div>
        );
    }   
}

export default connect(mapStateToProps, {appendToGraphData})(CryptoChart)