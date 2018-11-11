import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	topicList: [],
	articleList: [],
	recommendList: [],
	articlePage: 1,
	showScroll: false
});


export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_HOME_DATA:
			return state.merge({
				topicList:fromJS(action.topicList),
				recommendList:fromJS(action.recommendList),
				articleList:fromJS(action.articleList)
			});
		case 'add_home_list':
			return state.merge({
				articleList:state.get('articleList').concat(action.data),
				articlePage:action.nextPage
			});
		case constants.TOGGLE_SCROLL_TOP:
			return state.set('showScroll',action.show);
		default:
			return state;
	}
}