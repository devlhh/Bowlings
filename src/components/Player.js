import React, {Component} from 'react'
import {Link} from "react-router-dom";
import './Player.css'

class Player extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pnum: 1,
            pbtnflag : false,
            mbtnflag : false,
        };
    }

    PlusClicked = () => {
        if(this.state.pnum > 3){
            this.setState({
                pbtnflag: this.state.btnflag = true
            })
            alert("최대4명")
        }else {
            this.setState({
                pnum:this.state.pnum+1,
                mbtnflag: this.state.btnflag = false
            });
        }
    };

    MinusClicked = () => {
        if(this.state.pnum < 2){
            this.setState({
                mbtnflag: this.state.btnflag = true
            })
            alert("최소1명")
        }else {
            this.setState({
                pnum:this.state.pnum-1,
                pbtnflag: this.state.btnflag = false
            });
        }
    };

    render(){
        const { PlusClicked, MinusClicked } = this;
        const { pnum, pbtnflag, mbtnflag } = this.state;

        return(
            <section className="player-number-wrapper">
                <div className="title">
                    <p>
                        <h2>인원수</h2>
                        <h2>선택해주세요</h2>
                    </p>

                </div>
                <div>
                    <button
                        className="PlusBtn"
                        onClick={PlusClicked}
                        disabled={pbtnflag}
                    >
                        +
                    </button>
                    <span className='pnum'>{pnum}</span>
                    <button className="MinusBtn" onClick={MinusClicked} disabled={mbtnflag}>-</button>
                </div>
                <Link
                    to={{
                        pathname: "/game",
                        state: {
                            pnum: pnum,
                        }
                    }}
                >
                    <button className="PlayBtn">Play</button>
                </Link>
            </section>
        )
    }
}

export default Player;
