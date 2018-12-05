import React , {Component} from 'react';
import './pic.css';
import {connect} from 'react-redux';

class PicUI extends Component {
	render(){
		return (
			<div className="max">
				<div className="pic" ref="pic">
					<div className="mtk">
					</div>
				</div>
				<div className="picMove" ref="picMove" onTouchStart = { this.handleToLyric.bind(this) } >
					<img src={'https://api.bzqll.com/music/netease/pic?id='+this.props.musicId+'&key=579621905'} alt=""/>
				</div>
			</div>
		);
	}
	componentDidMount(){
		this.props.handleIsIconBack();
		if(this.props.isMusicPlay){
			this.playPic();
		}else{
			this.pausePic();
		}
		this.refs.pic.style.backgroundImage= 'url(https://api.bzqll.com/music/netease/pic?id='+this.props.musicId+'&key=579621905)';
	}
	componentDidUpdate(){
		// console.log(this.state.mid);
		if(this.props.isMusicPlay){
			this.playPic();
		}else{
			// console.log(1)
			this.pausePic();
		}
	}
	playPic(){
		this.refs.picMove.style.animationPlayState = 'running';
	}
	pausePic(){
		this.refs.picMove.style.animationPlayState = 'paused';
	}
	handleToLyric(){
		this.props.history.push('/lyric/'+this.props.musicId);
	}
}

function mapStateToProps(state){
	return{
		isMusicPlay:state.isMusicPlay,
		musicId:state.musicId
	};
}

function mapDispatchToProps(dispatch){
	return{
		handleIsIconBack(){
			dispatch({type:'IS_ICON_BACK',payload:true})
		}
	};
}

var Pic = connect(mapStateToProps,mapDispatchToProps)(PicUI);

export default Pic;