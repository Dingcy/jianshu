import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';

const changeList = (data) => ({
	type: constants.CHANGE_LIST,
	data:fromJS(data),
	totalPage:Math.ceil(data.length/10)
});

export const searchFocus = () => ({
	type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
	type: constants.SEARCH_BLUR
});

export const mouseIn = () => ({
	type: constants.MOUSE_IN
});

export const mouseLeave = () => ({
	type: constants.MOUSE_LEAVE
});

export const pageChange = (data) => ({
	type: constants.PAGE_CHANGE,
	data
});


export const getList = () => {
	return (dispatch) => {
		axios.get('./api/headerList.json').then((res)=>{
			const data = res.data.data;
			dispatch(changeList(data));
		}).catch((error)=>{
			console.log('error');
		})
	}
};



