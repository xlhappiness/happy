import React, { Component } from 'react';
import './header.css';
import {connect} from 'react-redux';
import '../../iconfont/iconfont.css';
import {NavLink} from 'react-router-dom';

class HeaderUI extends Component {
	render(){
		return (
			<div className='header'>
				{this.props.isIconBack ? <NavLink to='/index' className="iconfont icon-fanhui"></NavLink> : <span className="logo"></span>}
				<div className="title">
					{this.props.musicName}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		isIconBack:state.isIconBack,
		musicName:state.musicName
	};
}
function mapDispatchToProps(dispatch){
	return{

	};
}

var Header = connect(mapStateToProps , mapDispatchToProps)(HeaderUI);

export default Header;