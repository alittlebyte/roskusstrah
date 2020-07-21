import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//DB request
const fetchRepos = (state) => {
	return axios.get(`https://api.github.com/users/${state.name}/repos`)
}

//initial state
const initState = {
	repos: [],
	errMessage:''
}

//actions
const loadRepos = request => {
	return {
		type: 'LOAD_REPOS',
		payload:request
	}
}
const errRepos = err => {
	return {
		type: 'ERR_REPOS',
		payload:err
	}
}

//reducers
const reduceRepos = (state = initState, action) => {
	switch(action.type){
		case 'LOAD_REPOS':
			return {
				repos: action.payload
			}
		case 'ERR_REPOS':
			return{
				errMessage: action.payload
			}
		default:
			return state;
	}
}

//action creators
export const listRepos = usr => dispatch => {
	return fetchRepos(usr).then(res => dispatch(loadRepos(res.data))).catch(err => dispatch(errRepos(err.response)))
}

//store
const store = createStore(
	reduceRepos, 
	applyMiddleware(thunk)
);

export default store;