import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	login:false
});


export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.LOGIN_DATA:
		
			return state.set('login',action.login);
		case constants.LOGOUT:
		console.log(action.data);
			return state.merge({
				'login':action.data
			})	
		default:
			return state;
	}
}