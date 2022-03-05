import React, { Component } from 'react'

import Header from "./Header";
import Player from "./Player"

class Home extends Component {
    render(){
        return(
            <div>
                <Header></Header>
                <Player></Player>
            </div>
        )
    }
}

export default Home;