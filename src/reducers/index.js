import graphDataReducer from './graphData'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    graphDataReducer : graphDataReducer
})

export default allReducers;