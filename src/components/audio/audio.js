import React, { Component } from 'react';
import './audio.css';
import {connect} from 'react-redux'
import '../../iconfont/iconfont.css';

class AudioUI extends Component {
	render(){
		return (
			<div className="audio">
				<div className="audioPlay" ref="audioPlay" onTouchStart={this.handlePlayBtn.bind(this)}></div>
				<div className="audioProgress" ref="audioProgress">
					<div className="audioBar" ref="audioBar"></div>
					<div className="audioNow" ref="audioNow"></div>
				</div>
				<audio className="audioElem" ref="audioElem" src={ this.props.musicId && 'https://api.bzqll.com/music/netease/url?id='+this.props.musicId+'&key=579621905'}></audio>
			</div>
		);
	}
	componentDidUpdate(){
		if(this.props.isMusicPlay){
			this.playMusic();
			this.musicBarDrag();
		}else{
			this.pauseMusic();
		}
	}
	playMusic(){
		this.refs.audioPlay.style.backgroundImage = 'url(/images/list_audioPause.png)';
		this.refs.audioElem.play();
		this.playRunning();
		this.timer = setInterval(this.playRunning.bind(this),1000);
	}
	pauseMusic(){
		this.refs.audioPlay.style.backgroundImage = 'url(/images/list_audioPlay.png)';
		this.refs.audioElem.pause();
		clearInterval(this.timer);
	}
	handlePlayBtn(){
		if(!this.refs.audioElem.getAttribute('src')){
			return;
		}
		if(this.refs.audioElem.paused){
			this.playMusic();
			this.props.handleIsMusicPlay(true);
		}else{
			this.pauseMusic();
			this.props.handleIsMusicPlay(false);
		}
	}
	playRunning(){
		var audioNow = this.refs.audioNow;
		var audioBar = this.refs.audioBar;
		var audioElem = this.refs.audioElem;
		var scale = audioElem.currentTime / audioElem.duration;
		audioBar.style.left = scale*audioBar.parentNode.offsetWidth-7+'px';
		audioNow.style.width = scale*100 + '%';
		if(audioElem.currentTime === audioElem.duration){
			this.pauseMusic();
			this.props.handleIsMusicPlay(false);
		}
	}
	musicBarDrag(){
		var disX = 0;
		var audioNow = this.refs.audioNow;
		var audioBar = this.refs.audioBar;
		var audioElem = this.refs.audioElem;
		audioBar.ontouchstart = function(e){
			var touch = e.changedTouches[0];
			disX = touch.pageX - this.offsetLeft;
			document.ontouchmove = (e)=>{
				var touch = e.changedTouches[0];
				var L = touch.pageX - disX;
				if(L<-7){
					L = -7
				}else if(L>this.parentNode.offsetWidth-7){
					L = this.parentNode.offsetWidth-7
				}
				this.style.left = L + 'px';
				var scale = (L+7)/this.parentNode.offsetWidth;
				audioNow.style.width = scale*100 + '%';
				audioElem.currentTime = scale*audioElem.duration;
			}
			document.ontouchend = function(){
				document.ontouchmove = document.ontouchend = null;
			};
			return false;
		};
	}
}

function mapStateToProps(state){
	return {
		musicId : state.musicId,
		isMusicPlay:state.isMusicPlay
	};
}
function mapDispatchToProps(dispatch){
	return {
		handleIsMusicPlay(bool){
			dispatch({ type : 'IS_MUSIC_PLAY' , payload : bool });	
		}
	};
}


var Audio = connect(mapStateToProps , mapDispatchToProps)(AudioUI);

export default Audio;