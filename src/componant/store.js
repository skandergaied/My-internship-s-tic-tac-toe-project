import { createStore } from 'redux';
import myReducer from './myReducer'; // Adjust the path based on your project structure

const store = createStore(myReducer);

export default store;