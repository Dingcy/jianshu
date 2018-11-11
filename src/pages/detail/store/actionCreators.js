import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const getDetail = (res) => {
	return {
		type:constants.GET_DETAIL_DATA,
		title:res.title,
		content:res.content
	}
}

export const getDetailData = (id) =>{
	return (dispatch) => {
		axios.get('/api/detail.json?id=' + id).then((res)=>{
			dispatch(getDetail(res.data.data))
		})
	}
}

