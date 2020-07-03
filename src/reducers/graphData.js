import moment from 'moment';

const graphData = {
    labels: [],

    datasets: [{
        fill: false,
        pointRadius : 3,
        borderWidth : 3,
        label: 'BTCUSD',
        data: [],
    }]
}

const graphDataReducer = (state = graphData, action) => {
    if (action.type === 'appendToGraphData'){ 
        let date = moment();
        let timestamp = date.format('YYYY-MM-DD HH:mm:ss.SSS'); 
        if (state.labels.length > 500){
            return {
                labels: [...state.labels.filter((elem, idx) => {
                    return idx !== 0
                }), timestamp],
                datasets: [{
                    fill: false,
                    pointRadius : 3,
                    borderWidth : 3,
                    label: 'BTCUSD',
                    data: [...state.datasets[0].data.filter((elem, idx) => {
                        return idx !== 0
                    }), {x : parseInt(timestamp), y : action.newAddedValue.price}],
                }]
            }
        }

        return {
            
            labels: [...state.labels, timestamp],
        
            datasets: [{
                fill: false,
                pointRadius : 3,
                borderWidth : 3,
                label: 'BTCUSD',
                data: [...state.datasets[0].data, {x : parseInt(timestamp), y : action.newAddedValue.price}],
            }]
        }
    }
    return state
}

export default graphDataReducer;