import {createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import user from './user';
import avatar from './avatar';

export default createStore(combineReducers({
	user,
	avatar
}),applyMiddleware(thunk,promise))