import React, {Component, PureComponent} from 'react';
import './FrameTemplate.css';

const frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class FrameTemplate extends PureComponent {
    render(){
        const { player: pArray, pnum } = this.props;
        const player = pArray[pnum - 1];
        const frameList = frames.map((frame, i) => (<span key={i}>{frame}Frame</span>));

        return(
            <div className="Frame-main-template">
                <div className="player-wrapper">
                    <span>Player {pnum} </span>
                </div>

                <div className='tframe-wrapper'>
                    {frames.map((x) => (
                        <div className='tframe-box'>
                            <div className='tframe-name'>
                                {frameList[x - 1]}
                            </div>
                            <div className='tscore-box'>
                                <div className="left-box">
                                    <span>{player.scoreview[(x - 1) * 2]}</span>
                                </div>
                                <div className="right-box">
                                    <span>{player.scoreview[(x - 1) * 2 + 1]}</span>
                                </div>
                            </div>
                            <div className="tframe-total-box">
                                <span>{player.framescoreview[x - 1]}</span>
                            </div>
                        </div>
                    ))}
                    <div className='tframe-box'>
                        <div className='tframe-name'>
                            Total
                        </div>
                        <div className="total-box">
                            <span>{player.totalScore}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FrameTemplate;
