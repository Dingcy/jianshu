import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Write extends PureComponent {
	
	render() {
		
		const { logindata } = this.props;

		if(logindata){
			return(
				<div>写文章</div>
			)
		}else{
			return <Redirect to='/login' />
		}
		
		
		
	}
}

const mapState = (state) => ({
	logindata:state.getIn(['login','login'])
})




export default connect(mapState, null)(Write);