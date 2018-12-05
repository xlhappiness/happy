import React, { Component } from 'react';
import './lyric.css';
import axios from 'axios';
import {connect} from 'react-redux';

class LyricUI extends Component {
	constructor(){
		super();
		this.state={
			lyricList:[],
			isActive:-1
		}
	}
	render(){
		return (
			<div className='lyric' ref='lyric'>
				<div className="mtk">
					
				</div>
				<ul ref="lyricUl" onTouchStart={ this.handleToPic.bind(this) } >
					{
						this.state.lyricList.map((item,index)=>{
							return(
								<li ref="lyricLi" className={this.state.isActive === index ? 'active' : '' } key={index}>{item.lyric}</li>
							);
						})
					}
				</ul>
			</div>
		);
	}
	componentDidMount(){
		this.props.handleIsMusicPlay();
		if(this.props.musicId){
			this.refs.lyric.style.backgroundImage= 'url(https://api.bzqll.com/music/netease/pic?id='+this.props.musicId+'&key=579621905)'
		}
		this.props.handleIsIconBack();
		var mid = this.props.match.params.mid;
		this.props.handleMuisicId(mid);
		axios.get('/music/netease/lrc?id='+mid+'&key=579621905').then((res)=>{
			this.setState({
				lyricList:this.formatLyric(res.data)
			})
			if(this.props.isMusicPlay){
				this.playLyric();
			}
		})
	}
	componentWillUnmount(){
		this.pauseLyric();
	}
	formatLyric(data){
		var result = [];
		var re = /\[([^\]]+)\]([^[\n]+)/g;
		data.replace(re,($0,$1,$2)=>{
			result.push({time:this.formatTime($1) , lyric:$2});
		});
		return result;
	}
	formatTime(time){
		var timeAll = time.split(':');
		return (parseFloat(timeAll[0]*60)+parseFloat(timeAll[1])).toFixed(2);
	}
	playLyric(){
		this.lyricRunning();
		this.timer = setInterval(this.lyricRunning.bind(this),500);
	}
	pauseLyric(){
		clearInterval(this.timer);
	}
	lyricRunning(){
		var lyricList = this.state.lyricList;
		var lyricUl = this.refs.lyricUl;
		var lyricLi = this.refs.lyricLi;
		var audioElem = document.getElementsByClassName('audioElem')[0];
		for(var i=0;i<lyricList.length;i++){
			if(audioElem.currentTime > lyricList[i].time ){
				this.setState({
					isActive:i
				});
				if(i>5 && lyricUl){
					lyricUl.style.top = -(i-5)*(lyricLi.offsetHeight+15) + 'px';
				}
			}
		}
	}
	handleToPic(){
		this.props.history.push('/pic/'+this.props.match.params.mid);
	}
}

function mapStateToProps(state){
	return{
		musicId:state.musicId,
		isMusicPlay:state.isMusicPlay
	};
}
function mapDispatchToProps(dispatch){
	return{
		handleIsIconBack(){
			dispatch({type:'IS_ICON_BACK',payload:true});
		},
		handleIsMusicPlay(){
			dispatch({type:'IS_MUSIC_PLAY',payload:true});
		},
		handleMuisicId(id){
			dispatch({type:'MUSIC_ID',payload:id});
		}
	};
}
var Lyric = connect(mapStateToProps , mapDispatchToProps)(LyricUI);

export default Lyric;