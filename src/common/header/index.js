import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginactionCreators } from '../../pages/login/store';
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	SearchWrapper,
	NavSearch,
	Addition,
	Button,
	SearchInfo, 
	SearchInfoTitle, 
	SearchInfoSwitch, 
	SearchInfoItem,
	SearchInfoList
} from './style';

class Header extends Component {

	 getListArea = () => {
		 const {focused,list,page,totalPage,mouseIn,handleMouseEnter,handleMouseLeave,handlePageChange} = this.props;
		 const newList  = [];
		 const newL = list.toJS();
		 if(newL.length){
		 for (let index = (page - 1)*10; index < page*10; index++) {
			 newList.push(
				<SearchInfoItem key={index}>{newL[index]}</SearchInfoItem>
			 )	 
		 }
		} 
		if(focused || mouseIn){
			return (
				<SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					 <SearchInfoTitle>热门搜索</SearchInfoTitle>
					 <SearchInfoSwitch  onClick={() =>{handlePageChange(page,totalPage)} }>换一批</SearchInfoSwitch>
					 <SearchInfoList>
						{
							newList
						}
					 </SearchInfoList>
					</SearchInfo>
			)
		}else{
			return null;
		}
	}

	render() {
		const { focused, handleInputFocus, handleInputBlur, list, login, handleLogout } = this.props;
		return (
			<HeaderWrapper>
				<Link to='/'>
					<Logo/>
				</Link>
				<Nav>
					<NavItem className='left active'>首页</NavItem>
					<NavItem className='left'>下载App</NavItem>
					{
						login?
						<NavItem className='right' onClick={handleLogout}>退出</NavItem>:
						<Link to='/login'><NavItem className='right'>登陆</NavItem></Link> 
					}
					<NavItem className='right'>
						<i className="iconfont">&#xe636;</i>
					</NavItem>
					<SearchWrapper>
						<CSSTransition
							in={focused}
							timeout={200}
							classNames="slide"
						>
							<NavSearch
								className={focused ? 'focused': ''}
								onFocus={() => handleInputFocus(list)}
								onBlur={handleInputBlur}
							></NavSearch>
						</CSSTransition>
						<i className={focused ? 'focused iconfont zoom': 'iconfont zoom'}>
							&#xe614;
						</i>
						{this.getListArea()}
					</SearchWrapper>
				</Nav>
				<Addition>
					<Link to='/write'>
						<Button className='writting'>
							<i className="iconfont">&#xe615;</i>
							写文章
						</Button>
					</Link>
					<Button className='reg'>注册</Button>
				</Addition>
			</HeaderWrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		focused: state.getIn(['header', 'focused']),
		list:state.getIn(['header','list']),
		page:state.getIn(['header','page']),
		totalPage:state.getIn(['header','totalPage']),
		mouseIn:state.getIn(['header','mouseIn']),
		login:state.getIn(['login','login']),
	}
}

const mapDispathToProps = (dispatch) => {
	return {
		handleInputFocus(list) {
			dispatch(actionCreators.getList());
			dispatch(actionCreators.searchFocus());
		},
		handleInputBlur() {
			dispatch(actionCreators.searchBlur());
		},
		handleMouseEnter(){
			dispatch(actionCreators.mouseIn());
		},
		handleMouseLeave(){
			dispatch(actionCreators.mouseLeave());
		},
		handlePageChange(page,totalPage){
			if(page < totalPage){
				page++
			}else{
				page = 1;
			}
			dispatch(actionCreators.pageChange(page));
		},
		handleLogout(){
			dispatch(loginactionCreators.logout());
		}
	}
}

export default connect(mapStateToProps, mapDispathToProps)(Header);
