import React, { Component } from 'react';
import {TopicWrapper,TopicItem} from '../style';
import {connect} from 'react-redux';

class Topic extends Component{
    render(){
        return(
            <TopicWrapper>
                {
                    this.props.list.map((item) => {
                        return <TopicItem key={item.get('id')}>
                        <img className='topic-pic' src={item.get('imgUrl')} alt=""/>
                        <a>{item.get('title')}</a>
                        </TopicItem>
                    })
                }
            </TopicWrapper>
        )
    }
}

const mapState = (state) => ({
    list:state.get('home').get('topicList')
}) 


export default connect(mapState,null)(Topic);