import React, { Component } from 'react';
import './BowlingTemplate.css'
import FrameTemplate from "./Frame/FrameTemplate";
import { Route } from 'react-router-dom';
import main from './main'

class BowlingTemplate extends Component {
        state = {
            pnum : 1,
            pbtnflag : false,
            mbtnflag : false,
        };

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

        return(
            <main>
                <Route exact path="/" component={main}></Route>
                <Route exact path="/game" component={FrameTemplate}></Route>
            </main>
        )
    }
}


export default BowlingTemplate;