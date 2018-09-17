import { combineReducers } from 'redux';
import selectedProperty from './selectedProperty';
import coordinates from './coordinates';

const reducers = { selectedProperty, coordinates };
const combined = combineReducers(reducers);
export default combined;