import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';

import Header from './components/header/header.js';
import Audio from './components/audio/audio.js';
import Index from './components/index/index.js';
import Lyric from './components/lyric/lyric.js';
import Pic from './components/pic/pic.js';

class App extends Component {
    render(){
        return (
            <Router>
                <div className="main">
                    <Header/>
                    <Switch>
                        <Route path="/index" component={Index}></Route>
                        <Route path="/lyric/:mid" component={Lyric}></Route>
                        <Route path="/pic/:mid" component={Pic}></Route>
                        <Redirect from="/*" to="/index"></Redirect>
                    </Switch>
                    <Audio />
                </div>
            </Router>
        );
    }
}

export default App;
