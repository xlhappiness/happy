import {createStore, combineReducers} from 'redux';

function isIconBackReducer(state=false,action){
	if(action.type === 'IS_ICON_BACK'){
		return action.payload;
	}else{
		return state;
	}
};

function musicNameReducer(state='网易云音乐',action){
	if(action.type === 'MUSIC_NAME'){
		return action.payload
	}else{
		return state;
	}
}

function musicIdReducer(state='',action){
	if(action.type === 'MUSIC_ID'){
		return action.payload
	}else{
		return state
	}
}

function isMusicPlayReducer(state=false,action){
	if(action.type === 'IS_MUSIC_PLAY'){
		return action.payload
	}else{
		return state
	}
}

var reducer = combineReducers({
	isIconBack:isIconBackReducer,
	musicName:musicNameReducer,
	musicId:musicIdReducer,
	isMusicPlay:isMusicPlayReducer
});

var store = createStore(reducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

export default store;