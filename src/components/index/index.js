import React, { Component } from 'react';
import './index.css';
import {Route,NavLink,Switch,Redirect} from 'react-router-dom';

import Recommend from '../recommend/recommend.js';
import Ranked from '../ranked/ranked.js';

class Index extends Component {
	render(){
		return (
			<div className='index'>
				<div className="nav">
					<NavLink to="/index/recommend">推荐</NavLink>
                    <NavLink to="/index/ranked">热歌榜</NavLink>
				</div>
				<Switch>
					<Route path="/index/recommend" component={Recommend}></Route>
	                <Route path="/index/ranked" component={Ranked}></Route>
	                <Redirect from='/index' to="/index/ranked"></Redirect>
				</Switch>
			</div>
		);
	}
}

export default Index;