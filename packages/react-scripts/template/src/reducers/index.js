import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import helloWorldReducers from '../micro-uis/helloworld/reducers';

export default combineReducers(Object.assign({ router }, helloWorldReducers));
