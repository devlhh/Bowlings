import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import Home from "./components/Home"
import Game from "./components/Game"

class App extends Component {
    render(){
        return(
            <div className="App">
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/game" component={Game}></Route>
            </div>
        )
    }
}
export default App;
