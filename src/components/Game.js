import React, {Component} from 'react'
import Header from "./Header";
import ScoreBoard from "./ScoreBoard";

class Game extends Component {
    constructor(props) {
        super(props);

        console.log(props.location.state.pnum);
    }

    render() {
        return(
            <div>
                <Header></Header>
                <ScoreBoard pnum={this.props.location.state.pnum}></ScoreBoard>
            </div>
        )
    }
}

export default Game;