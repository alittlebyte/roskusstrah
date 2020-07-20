import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//DB request
const fetchRepos = (user = 'alittlebyte') => {
	return axios.get(`https://api.github.com/users/${user}/repos`)
}
//initial state
const initState = {
	repos: []
}

//actions
const loadRepos = request => {
	return {
		type: 'LOAD_REPOS',
		payload:request
	}
}

//reducers
const reduceRepos = (state = initState, action) => {
	switch(action.type){
		case 'LOAD_REPOS':
			return {
				repos: action.payload
			}
		default:
			return state;
	}
}

//action creators
export const listRepos = (usr) => dispatch => {
	return fetchRepos(usr).then(res => dispatch(loadRepos(res.data)))
}

//store
const store = createStore(
	reduceRepos, 
	applyMiddleware(thunk)
);

export default store;