import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { LoginWrapper,LoginBox,Input,Button} from './style';
import { actionCreators } from './store';
import { Redirect } from 'react-router-dom';

class Login extends PureComponent {
	
	render() {
		
		const { logindata } = this.props;

		if(!logindata){
			return(
				<LoginWrapper>
					<LoginBox>
					 <Input placeholder='账号' innerRef={(input) => {this.account = input}}/>
					 <Input placeholder='密码' type='password' innerRef={(input) => {this.password = input}}/>
					 <Button onClick={() =>{this.props.login(this.account,this.password)}}>登录</Button>
					</LoginBox>
				</LoginWrapper>
			)
		}else{
			return <Redirect to='/' />
		}
		
		
		
	}
}

const mapState = (state) => ({
	logindata:state.getIn(['login','login'])
})


const mapDispatch = (dispatch) => ({
	login(accountElement,passwordElement){
		dispatch(actionCreators.login(accountElement.value,passwordElement.value));
	}
}) 

export default connect(mapState, mapDispatch)(Login);