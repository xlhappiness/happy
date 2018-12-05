import React, { Component } from 'react';
import './ranked.css';
import axios from 'axios';
import Loading from '../loading/loading.js';
import {connect} from 'react-redux';
import {setSessionStorage , getSessionStorage} from '../../tools/index.js';

class RankedUI extends Component {
	constructor(){
		super();
		this.state={
			songs:[],
			songPic:'',
			isLoading:false
		};
		this.isMove = false;
		this.handleTouchMove = this.handleTouchMove.bind(this);
	}
	render(){
		return (
			<div className='ranked'>
				<div className="songPic">
					<img src={this.state.songPic} alt=""/>
				</div>
				{
					this.state.isLoading ? 
					<ul>
						{
							this.state.songs.map((item,index)=>{
								return(
									<li key={item.id} className={ this.props.musicId === item.id ? 'active' : '' }  onTouchMove={this.handleTouchMove} onTouchEnd={()=>this.handleTouchEnd(item.id,item.name)}>
										<div className="left">{(index+1)<10?'0'+(index+1) : (index+1)}</div>
										<div className="center">
											<div className="text">
												<h3>{item.name}</h3>
												<p>{item.singer}</p>
											</div>
											<div className="right">
										</div>
										</div>
									</li>
								);
							})
						}
					</ul> :<Loading />
				}
			</div>
		);
	}
	componentDidMount(){
		this.props.handleIsIconBack();
		var data = getSessionStorage('songList');
		// console.log(JSON.parse(data))
		if(data){
			this.setState({
				songs:JSON.parse(data).songs,
				songPic:JSON.parse(data).songListPic,
				isLoading:true
			})
		}else{
			axios.post('/music/netease/songList?key=579621905&id=3778678&limit=30&offset=0').then((res)=>{
				var code = res.data.code;
				if(code === 200){
					this.setState({
						songs:res.data.data.songs,
						songPic:res.data.data.songListPic,
						isLoading:true
					})
				}
				setSessionStorage('songList' , JSON.stringify(res.data.data))
			})
		}
	}
	handleTouchMove(){
		this.isMove = true;
	}
	handleTouchEnd(id,musicName){
		if(this.isMove){
			this.isMove = false;
		}else{
			this.props.handleIsMusicPlay();
			this.props.handleMusicId(id);
			this.props.handleMusicName(musicName);
			this.props.history.push('/pic/'+id);
			this.handleNext(id);
		}
	}
	handleNext(id){
		var _this = this;
		var audioElem = document.getElementsByClassName('audioElem')[0];
		var songs = this.state.songs;
		var idList=[];
		var j=0;
		for(var i=0; i<songs.length;i++){
			idList.push(songs[i].id);
		}
		audioElem.addEventListener('ended', function () {  
			j = idList.indexOf(id);
			j++;
			if(j===songs.length){
				j=0;
			}
			id = idList[j];
			var musicName = songs[j].name
			_this.props.handleIsMusicPlay();
			_this.props.handleMusicId(id);
			_this.props.handleMusicName(musicName);
		},false)
	}
}

function mapStateToProps(state){
	return{
		musicId:state.musicId
	};
}
function mapDispatchToProps(dispatch){
	return{
		handleIsIconBack(){
			dispatch({type:'IS_ICON_BACK',payload:false});
		},
		handleMusicName(musicName){
			dispatch({type:'MUSIC_NAME',payload:musicName})
		},
		handleMusicId(id){
			dispatch({type:'MUSIC_ID',payload:id})
		},
		handleIsMusicPlay(){
			dispatch({type:'IS_MUSIC_PLAY',payload:true})
		}
	};
}
var Ranked = connect(mapStateToProps , mapDispatchToProps)(RankedUI);
export default Ranked;