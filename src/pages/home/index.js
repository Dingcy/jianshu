import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { HomeWrapper ,HomeLeft,HomeRight,BackTop} from './style';
import Topic from './components/Topic';
import Recommend from './components/Recommend';
import List from './components/List';
import Writer from './components/Writer';
import { actionCreators } from './store';

class Home extends PureComponent {

	handleScroll(){
		window.scrollTo(0,0);
	}
	render() {
		const {showScroll} = this.props;
		return (
			<HomeWrapper>
				<HomeLeft>
					<img className='image-left' src="//upload.jianshu.io/admin_banners/web_images/4524/65fb6e8f81ccbbc7dacf5c380e0366a003ba7881.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="img"/>
					<Topic />
					<List />
				</HomeLeft>
				<HomeRight>
					<Recommend />
					<Writer />
				</HomeRight>
				{
					showScroll ? <BackTop onClick={this.handleScroll}>回到顶部</BackTop>:null
				}
			</HomeWrapper>
		)
	}

	componentDidMount(){
		this.props.changeHomeData();
		this.bindEvent();
	}

	componentWillMount(){
		window.removeEventListener('scroll',this.props.toggleScrollShow);
	}

	bindEvent(){
		window.addEventListener('scroll',this.props.toggleScrollShow);
	}
	
}



const mapDispatch = (dispatch) => ({
	changeHomeData(){
		dispatch(actionCreators.getHomeInfo());
	},
	toggleScrollShow(){
		if(document.documentElement.scrollTop > 200){
			dispatch(actionCreators.toggleTopShow(true));
		}else {
			dispatch(actionCreators.toggleTopShow(false));
		}
	}
});

const mapState = (state) => ({
	showScroll:state.get('home').get('showScroll')
})


export default connect(mapState,mapDispatch)(Home);
