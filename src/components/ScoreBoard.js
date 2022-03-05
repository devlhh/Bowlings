import React, { Component } from 'react'
import FrameTemplate from "./Frame/FrameTemplate";
import './ScoreBoard.css'
import Game from "./Game";
import {Link} from "react-router-dom";

class ScoreBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerTurn:1,
            player: [
                {
                    gamecount: 1,
                    firstScore: [],
                    secondScore: [],
                    thirdScore: 0,
                    totalScore: '',
                    frameScore: [],
                    scoreview: [],
                    framescoreview: [],
                    strike: 0,
                    roll:0,
                    isStrike:false,
                    isSpare:false,
                },
                {
                    gamecount: 1,
                    firstScore: [],
                    secondScore: [],
                    thirdScore: 0,
                    totalScore: '',
                    frameScore: [],
                    scoreview: [],
                    framescoreview: [],
                    strike: 0,
                    roll:0,
                    isStrike:false,
                    isSpare:false,
                },
                {
                    gamecount:1,
                    firstScore:[],
                    secondScore:[],
                    thirdScore: 0,
                    totalScore: '',
                    frameScore:[],
                    scoreview:[],
                    framescoreview:[],
                    strike:0,
                    roll:0,
                    isStrike:false,
                    isSpare:false,
                },
                {
                    gamecount:1,
                    firstScore:[],
                    secondScore:[],
                    thirdScore: 0,
                    totalScore: '',
                    frameScore:[],
                    scoreview:[],
                    framescoreview:[],
                    strike:0,
                    roll:0,
                    isStrike:false,
                    isSpare:false,
                }
            ]
        }
    }

    //랜덤 점수 계산 및 화면
    randomScore = (player, player_turn, frame) => {
        console.log("Random Score")
        let strike = player[player_turn - 1].strike

        //1Frame
        if(frame + 1 === 1){
            //1Frame 게임카운트 1
            if(player[player_turn - 1].gamecount === 1){
                console.log("Random game 1")
                //첫번째 랜덤 점수
                let firstrand = Math.floor(Math.random() * 11)
                player[player_turn - 1].firstScore[frame] = firstrand
                console.log("첫번째 랜덤점수 --> " + player[player_turn - 1].firstScore[frame])
                this.state.roll = firstrand

                if(firstrand === 10){
                    this.strikeScore(player, player_turn, frame, strike)

                    //player가 1명이면 그대로, 2명이상이면 player턴 증가
                    if(this.props.pnum !== player_turn){
                        this.state.playerTurn += 1
                    }else {
                        this.state.playerTurn = 1
                    }

                    this.setState({
                        player:[...player]
                    })
                }
                else if(firstrand === 0){
                    player[player_turn - 1].scoreview[(frame * 2)] = '-'
                    player[player_turn - 1].gamecount += 1
                }else {
                    //첫번째점수, 왼쪽 화면에 보여질 점수, 게임카운트 증가
                    player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                    player[player_turn - 1].gamecount += 1
                }
                console.log("==========================================")
            }
            //1Frame 게임카운트 2
            else if(player[player_turn - 1].gamecount === 2){
                console.log("Random game 2")

                //두번째 랜덤 점수
                let secondrand = Math.floor(Math.random() * (11 - this.state.roll))
                player[player_turn - 1].secondScore[frame] = secondrand
                console.log("두번째 랜덤 점수 ---> " + player[player_turn - 1].secondScore[frame])
                this.state.roll = 0
                console.log("======================================")

                //스페어 일 때
                if(player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame] === 10){
                    console.log("스페어 입니다")
                    this.spareScore(player, player_turn, frame)
                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                //스트라이크 스페어 아닐 때
                else {
                    console.log("스트라이크 스페어 아님")
                    if(secondrand === 0){
                        player[player_turn - 1].scoreview[(frame * 2) + 1] = '-'
                    }else {
                        player[player_turn - 1].scoreview[(frame * 2) + 1] = secondrand
                    }
                    player[player_turn - 1].frameScore[frame] = player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame]
                    player[player_turn - 1].framescoreview[frame] = player[player_turn - 1].frameScore[frame]
                    player[player_turn - 1].gamecount = 1
                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }

                console.log("GameCount 초기화--> " + player[player_turn - 1].gamecount)
                console.log("frameScore --> " + player[player_turn - 1].frameScore)
                console.log("scoreview --> " + player[player_turn - 1].scoreview)
                console.log("frameview --> " + player[player_turn - 1].framescoreview)
                console.log("===================================================")

                //player가 1명이면 그대로, 2명이상이면 player턴 증가
                if(this.props.pnum !== player_turn){
                    this.state.playerTurn += 1
                }
                else {
                    this.state.playerTurn = 1
                }
            }
        }
        //1~9Frame
        else if(frame < 9){
            //첫번째 게임
            if(player[player_turn - 1].gamecount === 1){
                console.log("================================")
                console.log("1~9Frame Random game 1")

                //첫번째 랜덤 점수
                let firstrand = Math.floor(Math.random() * 11)
                player[player_turn - 1].firstScore[frame] = firstrand
                console.log("첫번째 랜덤 점수 -- > " + player[player_turn - 1].firstScore[frame])

                this.state.roll = firstrand
                console.log("==================================")

                //이전 프레임에 스트라이크 있으면 처리
                if(player[player_turn - 1].isStrike === true){
                    console.log("이전 프레임 스트라이크 처리")
                    console.log("Strike 개수 --> " + player[player_turn - 1].strike)

                    //스트라이크 한개일 때
                    if(player[player_turn - 1].strike === 1){
                        console.log("스트라이크 1개")

                        //스페어 처리
                        if(player[player_turn - 1].isSpare === true){
                            console.log("스페어 처리")
                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + 10 + player[player_turn - 1].firstScore[frame]
                            player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                            player[player_turn - 1].isSpare = false
                        }
                        //현재프레임 상태
                        if(firstrand === 10){
                            console.log("Random Click Strike !! ")
                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 1] + 10
                            player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + 10
                            player[player_turn - 1].scoreview[(frame * 2)] = ''
                            player[player_turn - 1].scoreview[(frame * 2) + 1] = 'X'
                            player[player_turn - 1].gamecount = 1
                            player[player_turn - 1].strike += 1
                            player[player_turn - 1].isStrike = true
                            player[player_turn - 1].isSpare = false

                            //player가 1명이면 그대로, 2명이상이면 player턴 증가
                            if(this.props.pnum !== player_turn){
                                this.state.playerTurn += 1
                            }
                            else {
                                this.state.playerTurn = 1
                            }
                        }
                        else if(firstrand === 0) {
                            player[player_turn - 1].scoreview[(frame * 2)] = '-'
                            player[player_turn - 1].gamecount += 1
                        }
                        else {
                            //첫번째점수, 왼쪽 화면에 보여질 점수, 게임카운트 증가
                            player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                            player[player_turn - 1].gamecount += 1
                        }

                        console.log(player[player_turn - 1].frameScore)
                        console.log(player[player_turn - 1].scoreview)

                    }
                    else if (player[player_turn - 1].strike === 2){
                        console.log("스트라이크 2개")

                        //스페어 처리
                        if(player[player_turn - 1].isSpare === true){
                            console.log("스페어 처리")
                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + 10 + player[player_turn - 1].firstScore[frame]
                            player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                            player[player_turn - 1].isSpare = false
                        }

                        //현재프레임 상태
                        if(firstrand === 10){
                            console.log("스트라이크 입니다.")
                            player[player_turn - 1].scoreview[(frame * 2)] = ''
                            player[player_turn - 1].scoreview[(frame * 2) + 1] = 'X'
                            player[player_turn - 1].gamecount = 1
                            player[player_turn - 1].strike += 1
                            player[player_turn - 1].isStrike = true
                            player[player_turn - 1].isSpare = false

                            player[player_turn - 1].frameScore[frame - 2] += 10
                            player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                            player[player_turn - 1].frameScore[frame] = player[player_turn - 1].firstScore[frame - 1] + 10

                            //player가 1명이면 그대로, 2명이상이면 player턴 증가
                            if(this.props.pnum !== player_turn){
                                this.state.playerTurn += 1
                            }else {
                                this.state.playerTurn = 1
                            }
                        }
                        else if(firstrand === 0) {
                            player[player_turn - 1].scoreview[(frame * 2)] = '-'
                            player[player_turn - 1].gamecount += 1

                            player[player_turn - 1].frameScore[frame - 2] += 0
                            player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                        }
                        else {
                            //첫번째점수, 왼쪽 화면에 보여질 점수, 게임카운트 증가
                            player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                            player[player_turn - 1].gamecount += 1

                            player[player_turn - 1].frameScore[frame - 2] += firstrand
                            player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                        }
                    }
                    else {
                        console.log("스트라이크 2개 이상")

                        //현재프레임 상태
                        if(firstrand === 10){
                            console.log("스트라이크 입니다.")
                            player[player_turn - 1].scoreview[(frame * 2)] = ''
                            player[player_turn - 1].scoreview[(frame * 2) + 1] = 'X'
                            player[player_turn - 1].gamecount = 1
                            player[player_turn - 1].strike += 1
                            player[player_turn - 1].isStrike = true
                            player[player_turn - 1].isSpare = false

                            player[player_turn - 1].frameScore[frame - 2] += 10
                            player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                            player[player_turn - 1].frameScore[frame] = player[player_turn - 1].firstScore[frame - 1] + 10

                            //player가 1명이면 그대로, 2명이상이면 player턴 증가
                            if(this.props.pnum !== player_turn){
                                this.state.playerTurn += 1
                            }else {
                                this.state.playerTurn = 1
                            }
                        }
                        else if(firstrand === 0) {
                            player[player_turn - 1].scoreview[(frame * 2)] = '-'
                            player[player_turn - 1].gamecount += 1

                            player[player_turn - 1].frameScore[frame - 2] += 0
                            player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                        }
                        else {
                            //첫번째점수, 왼쪽 화면에 보여질 점수, 게임카운트 증가
                            player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                            player[player_turn - 1].gamecount += 1

                            player[player_turn - 1].frameScore[frame - 2] += firstrand
                            player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                        }

                    }
                }
                //전프레임 스페어
                else if(player[player_turn - 1].isSpare === true){
                    console.log("1~9프레임 Spare 점수 처리")
                    console.log("점수 계산전 FrameScore --> " + player[player_turn - 1].frameScore)

                    //전프레임 스페어 총합
                    player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].firstScore[frame]
                    player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    console.log("스페어 계산 후 FrameScore --> " + player[player_turn - 1].frameScore)

                    //현재프레임 상태
                    if(firstrand === 10){
                        console.log("스트라이크..!")
                        player[player_turn - 1].scoreview[(frame * 2) + 1] = 'X'
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + 10
                        player[player_turn - 1].gamecount = 1
                        player[player_turn - 1].strike += 1
                        player[player_turn - 1].isStrike = true

                        console.log("FrameScore --> " + player[player_turn - 1].frameScore)

                        //player가 1명이면 그대로, 2명이상이면 player턴 증가
                        if(this.props.pnum !== player_turn){
                            this.state.playerTurn += 1
                        }else {
                            this.state.playerTurn = 1
                        }
                    }
                    else if(firstrand === 0) {
                        player[player_turn - 1].scoreview[(frame * 2)] = '-'
                        player[player_turn - 1].gamecount += 1
                        player[player_turn - 1].isStrike = false
                    }
                    else {
                        //첫번째점수, 왼쪽 화면에 보여질 점수, 게임카운트 증가
                        player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                        player[player_turn - 1].gamecount += 1
                        player[player_turn - 1].isStrike = false
                    }
                    player[player_turn - 1].isSpare = false
                }
                //이전프레임 스트라이크, 스페어 아닐시
                else {
                    console.log("이전 프레임 스트라이크 스페어 없음")
                    if(player[player_turn - 1].strike === 1){
                        this.strikeScore(player, player_turn, frame, strike)
                    }
                    else if(this.state.player[player_turn - 1].strike > 1){
                        console.log("스트라이크 2개이상")

                        console.log(player[player_turn - 1].frameScore)

                        player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]
                        player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]

                    }
                    //현재프레임 스트라이크
                    if(firstrand === 10){
                        this.strikeScore(player, player_turn, frame, strike)

                        //player가 1명이면 그대로, 2명이상이면 player턴 증가
                        if(this.props.pnum !== player_turn){
                            this.setState({
                                player_turn: this.state.playerTurn += 1
                            })
                        }
                        else {
                            this.setState({
                                player_turn: this.state.playerTurn = 1
                            })
                        }
                    }
                    else if(firstrand === 0) {
                        player[player_turn - 1].scoreview[(frame * 2)] = '-'
                        player[player_turn - 1].gamecount += 1
                    }
                    else {
                        //첫번째점수, 왼쪽 화면에 보여질 점수, 게임카운트 증가
                        player[player_turn - 1].scoreview[(frame * 2) ] = firstrand
                        player[player_turn - 1].gamecount += 1
                    }
                }

                console.log("GameCount 초기화--> " + player[player_turn - 1].gamecount)
                console.log("frameScore --> " + player[player_turn - 1].frameScore)
                console.log("scoreview --> " + player[player_turn - 1].scoreview)
                console.log("frameview --> " + player[player_turn - 1].framescoreview)
                console.log("===================================================")
            }

            //1~9Frame 두번째 게임
            else if(player[player_turn - 1].gamecount === 2){
                console.log("game 2")
                let secondrand = Math.floor(Math.random() * (11 - this.state.roll))
                player[player_turn - 1].secondScore[frame] = secondrand
                console.log("2번째 랜덤 점수 --> " + secondrand)
                this.state.roll = 0;

                //이전 스트라이크 처리
                if(this.state.player[player_turn - 1].isStrike === true){
                    console.log("이전 스트라이크임")

                    //이전 프레임 스트라이크 처리
                    if(this.state.player[player_turn - 1].strike === 1){
                        console.log("스트라이크 1개 ")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(this.state.player[player_turn - 1].strike > 1){

                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }

                    if(player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame] === 10){
                        console.log("이전스트라크 이후 스페어입니다")
                        this.spareScore(player, player_turn, frame, strike)
                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].strike = 0
                    }else {
                        console.log("노 스페어")
                        if(secondrand === 0){
                            player[player_turn - 1].scoreview[(frame * 2) + 1] = "-"
                        }else {
                            player[player_turn - 1].scoreview[(frame * 2) + 1] = secondrand
                        }

                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame] = player[player_turn - 1].frameScore[frame]
                        player[player_turn - 1].gamecount = 1
                        player[player_turn - 1].strike = 0
                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].isSpare = false

                        console.log(player[player_turn - 1].frameScore)
                        console.log(player[player_turn - 1].scoreview)
                    }
                }
                else if(player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame] === 10){
                    console.log("스페어입니다")
                    this.spareScore(player, player_turn, frame, strike)
                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                else {
                    console.log("스트,스페어아님")

                    if(secondrand === 0) {
                        player[player_turn - 1].scoreview[(frame * 2) + 1] = '-'
                    }
                    else {
                        //첫번째점수, 왼쪽 화면에 보여질 점수, 게임카운트 증가
                        player[player_turn - 1].scoreview[(frame * 2) + 1] = secondrand
                    }
                    player[player_turn - 1].secondScore[frame] = secondrand
                    player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame]
                    player[player_turn - 1].framescoreview[frame] = player[player_turn - 1].frameScore[frame]
                    player[player_turn - 1].gamecount = 1
                    player[player_turn - 1].isSpare = false

                    console.log(player[player_turn - 1].frameScore)
                    console.log(player[player_turn - 1].scoreview)
                }
                //player가 1명이면 그대로, 2명이상이면 player턴 증가
                if (this.props.pnum !== player_turn) {
                    this.state.playerTurn += 1
                } else {
                    this.state.playerTurn = 1
                }

                this.setState({
                    player:[...player]
                })
            }
        }
        //마지막 프레임
        else {
            console.log("===========마지막프레임=============")
            frame = 9
            if(player[player_turn - 1].gamecount === 1){
                console.log("Random game 1")
                let firstrand = Math.floor(Math.random() * 11)
                player[player_turn - 1].firstScore[frame] = firstrand
                console.log("첫번째 랜덤 점수 --> " + player[player_turn - 1].firstScore[frame])
                this.state.roll = firstrand

                if(player[player_turn - 1].isSpare === true){
                    console.log("스페어 처리")
                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + 10 + player[player_turn - 1].firstScore[frame]
                    player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                }

                player[player_turn - 1].isSpare = false

                //10프레임전 스트라이크확인
                if(player[player_turn - 1].isStrike === true){
                    console.log("isStrike")

                    if(player[player_turn - 1].strike === 1) {
                        console.log("9Frame만 스트라이크 처리")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1]  + player[player_turn - 1].firstScore[frame]

                        console.log(player[player_turn - 1].frameScore)
                    }
                    else if(player[player_turn - 1].strike > 1) {
                        console.log("st 2개")

                        player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                        player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]

                        console.log(player[player_turn - 1].frameScore)
                    }

                    //10프레임 첫번째 스트라이크
                    if(firstrand === 10){
                        console.log("Strike")
                        player[player_turn - 1].scoreview[(frame * 2)] = 'X'
                        player[player_turn - 1].strike += 1
                    }
                    //첫번째 게임 스트라이크 아닐시
                    else {
                        console.log("No Strike")


                        if(firstrand === 0){
                            player[player_turn - 1].scoreview[(frame * 2)] = '-'
                            player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                            player[player_turn - 1].isStrike = false
                        }
                        else {
                            player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                            player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                            player[player_turn - 1].isStrike = false
                        }
                    }
                    player[player_turn - 1].gamecount += 1
                }
                //9프레임 스트라이크 아닐시
                else {
                    console.log("No Prev Strike")
                    //10프레임 첫번째 스트라이크
                    if(firstrand === 10){
                        console.log("Strike")
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + 10
                        player[player_turn - 1].scoreview[(frame * 2)] = 'X'
                        player[player_turn - 1].isStrike = true

                    }
                    else {
                        console.log("No Strike")

                        if(firstrand === 0){
                            player[player_turn - 1].scoreview[(frame * 2)] = '-'
                        }else {
                            player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                        }
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + firstrand
                        console.log(player[player_turn - 1].frameScore)
                        console.log(player[player_turn - 1].framescoreview)
                        player[player_turn - 1].isStrike = false
                    }

                    player[player_turn - 1].gamecount += 1
                    player[player_turn - 1].isSpare = false
                }

                console.log(player[player_turn - 1].scoreview)
                console.log(player[player_turn - 1].framescoreview)
                console.log(player[player_turn - 1].frameScore)
            }
            //마지막 프레임 두번째 게임
            else if(player[player_turn - 1].gamecount === 2){
                console.log("=================")
                console.log("Random game 2")
                let secondrand = Math.floor(Math.random() * (11 - this.state.roll))
                player[player_turn - 1].secondScore[frame] = secondrand
                console.log("두번째 랜덤 점수 --> " + secondrand)
                this.state.roll = 0;

                console.log(player[player_turn - 1].strike)

                if(player[player_turn - 1].isStrike === true){
                    console.log("이전 스트라이크")

                    if(player[player_turn - 1].strike === 1){
                        console.log("1개")
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("2개")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]

                        player[player_turn - 1].frameScore[frame] += player[player_turn - 1].secondScore[frame]
                    }

                    if(secondrand === 10){
                        console.log("Strike")
                        player[player_turn - 1].frameScore[frame] += secondrand
                        player[player_turn - 1].scoreview[(frame * 2) + 1] = 'X'
                        player[player_turn - 1].isStrike = true
                    }
                    else {
                        console.log("No Strike")

                        if(secondrand === 0){
                            player[player_turn - 1].scoreview[(frame * 2) + 1] = '-'
                        }else {
                            player[player_turn - 1].scoreview[(frame * 2) + 1] = secondrand
                        }
                        player[player_turn - 1].frameScore[frame] += secondrand
                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].isSpare = false
                    }
                    player[player_turn - 1].gamecount += 1
                    console.log(player[player_turn - 1].frameScore)
                    console.log(player[player_turn - 1].framescoreview)
                }
                else if(player[player_turn - 1].firstScore[frame] !== 10 && player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame] === 10){
                    console.log("10프레임 두번째 스페어")

                    if(player[player_turn - 1].strike === 1){
                        console.log("1개")

                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("2개")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }

                    player[player_turn - 1].scoreview[(frame*2) + 1] = '/'
                    player[player_turn - 1].gamecount += 1
                    player[player_turn - 1].frameScore[frame] += player[player_turn - 1].secondScore[frame]
                    player[player_turn - 1].isSpare = true
                    player[player_turn - 1].isStrike = false
                }
                else {
                    console.log("10프레임 스트,스페어아님")
                    if(player[player_turn - 1].strike === 1){
                        console.log("1개")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                    }

                    if(secondrand === 0){
                        player[player_turn - 1].scoreview[(frame*2) + 1] = '-'
                    }
                    else {
                        player[player_turn - 1].scoreview[(frame*2) + 1] = player[player_turn - 1].secondScore[frame]
                    }
                    if(player[player_turn - 1].firstScore[frame - 1] === 10){
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    player[player_turn - 1].frameScore[frame] += player[player_turn - 1].secondScore[frame]
                    player[player_turn - 1].framescoreview[frame] = player[player_turn - 1].frameScore[frame]
                    player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame]
                    player[player_turn - 1].gamecount = 0
                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].isSpare = false

                    //player가 1명이면 그대로, 2명이상이면 player턴 증가
                    if(this.props.pnum !== player_turn){
                        this.state.playerTurn += 1
                    }else {
                        this.state.playerTurn = 1
                    }
                }
                console.log(player[player_turn - 1].scoreview)
                console.log(player[player_turn - 1].framescoreview)
                console.log(player[player_turn - 1].frameScore)
            }
            else if(player[player_turn - 1].gamecount === 3){
                console.log("3번째 게임이다")

                let thirdrand = 0


                if(player[player_turn - 1].firstScore[frame] === 10 && player[player_turn - 1].secondScore[frame] === 10){
                    thirdrand = Math.floor(Math.random() * 11)
                    player[player_turn - 1].thirdScore = thirdrand
                    console.log("3번째 랜덤 숫자 --- > " + player[player_turn - 1].thirdScore)

                    if(thirdrand === 10){
                        player[player_turn - 1].scoreview[(frame*2) + 2] = 'X'
                    }
                    else if(thirdrand === 0){
                        player[player_turn - 1].scoreview[(frame*2) + 2] = '-'
                    }else {
                        player[player_turn - 1].scoreview[(frame*2) + 2] = player[player_turn - 1].thirdScore
                    }
                }
                else if(player[player_turn - 1].firstScore[frame] !== 10 && player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame] === 10){
                    thirdrand = Math.floor(Math.random() * 11)
                    player[player_turn - 1].thirdScore = thirdrand
                    console.log("3번째 랜덤 숫자 --- > " + player[player_turn - 1].thirdScore)

                    if(thirdrand === 10){
                        player[player_turn - 1].scoreview[(frame*2) + 2] = 'X'
                    }
                    else if(thirdrand === 0){
                        player[player_turn - 1].scoreview[(frame*2) + 2] = '-'
                    }else {
                        player[player_turn - 1].scoreview[(frame*2) + 2] = player[player_turn - 1].thirdScore
                    }
                }
                else {
                    thirdrand = Math.floor(Math.random() * (11 - player[player_turn - 1].secondScore[frame]))
                    player[player_turn - 1].thirdScore = thirdrand
                    console.log("3번째 랜덤 숫자 --- > " + player[player_turn - 1].thirdScore)

                    if(player[player_turn - 1].secondScore[frame] + thirdrand === 10){
                        player[player_turn - 1].scoreview[(frame*2) + 2] = '/'
                    }
                    else if(thirdrand === 0){
                        player[player_turn - 1].scoreview[(frame*2) + 2] = '-'
                    }else {
                        player[player_turn - 1].scoreview[(frame*2) + 2] = player[player_turn - 1].thirdScore
                    }
                }
                console.log(player[player_turn - 1].frameScore)

                player[player_turn - 1].frameScore[frame] += player[player_turn - 1].thirdScore
                player[player_turn - 1].framescoreview[frame] = player[player_turn - 1].frameScore[frame]
                player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame]
                player[player_turn - 1].gamecount = 0
                player[player_turn - 1].isStrike = false
                player[player_turn - 1].isSpare = false
                player[player_turn - 1].strike = 0

                //player가 1명이면 그대로, 2명이상이면 player턴 증가
                if(this.props.pnum !== player_turn){
                    this.state.playerTurn += 1
                }else {
                    this.state.playerTurn = 1
                }
            }
        }
        this.setState({
            player:[...this.state.player]
        })
    }

    randomBtn = () => {
        console.log("random clicked")

        const {player, playerTurn} = this.state
        let player_turn = playerTurn
        let frame = player[player_turn - 1].frameScore.length
        console.log("현재프레임 -- > " + (frame + 1))
        console.log("GameCount -- > " + player[player_turn - 1].gamecount)

        if(player_turn === 1){
            this.randomScore(player, player_turn, frame)
        }else if(player_turn === 2){
            this.randomScore(player, player_turn, frame)
        }else if(player_turn === 3){
            this.randomScore(player, player_turn, frame)
        }else if(player_turn === 4){
            this.randomScore(player, player_turn, frame)
        }

        this.setState({});
    }

    strikeScore = (player, player_turn, frame, strike) => {
        console.log("frame --> " + frame)

        player[player_turn - 1].strike += 1
        strike += 1
        console.log("strike 개수 --> " + strike)

        player[player_turn - 1].isStrike = true

        if(player[player_turn - 1].isSpare === true){
            player[player_turn - 1].frameScore[frame - 1] += 10
            player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
            player[player_turn - 1].isSpare = false
        }

        if(frame < 9){
            player[player_turn - 1].scoreview[frame * 2] = ''
            player[player_turn - 1].scoreview[(frame * 2) + 1] = 'X'
            console.log(player[player_turn - 1].scoreview)
        }else {
            frame = 9
            player[player_turn - 1].scoreview[(frame  * 2) + player[player_turn - 1].gamecount - 1] = 'X'
            console.log(player[player_turn - 1].scoreview)
        }
        //스트라이크 일 때
        if(player[player_turn - 1].gamecount === 1){
            console.log("gamecount --> 1")

            //1Frame
            if(frame + 1 === 1){
                //10점 추가
                player[player_turn - 1].firstScore[frame] = 10
                player[player_turn - 1].secondScore[frame] = 0

                player[player_turn - 1].frameScore[frame] = player[player_turn - 1].firstScore[frame]
                player[player_turn - 1].framescoreview[frame] = '';

                console.log(player[player_turn - 1].framescoreview)
                console.log(player[player_turn - 1].scoreview)
            }
            else if(frame + 1 <= 9){
                player[player_turn - 1].firstScore[frame] = 10
                player[player_turn - 1].secondScore[frame] = 0

                //스트라이크 1개일때
                if(strike === 1){
                    console.log("1Strike")
                    player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                    player[player_turn - 1].framescoreview[frame] = '';
                }
                //스트라이크 2개일때
                else if(strike === 2){
                    console.log("2strike")
                    //첫 스트라이크에 대한 점수
                    player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].firstScore[frame]

                    //두번째 스트라이크에 대한 점수
                    player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                    player[player_turn - 1].framescoreview[frame] = '';
                }
                //스트라이크 3개이상
                else {
                    console.log("strike 3개이상 ")
                    //첫 스트라이크에 대한 점수
                    player[player_turn - 1].frameScore[frame - 2] +=  player[player_turn - 1].firstScore[frame];
                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2];
                    console.log(player[player_turn - 1].frameScore)

                    //두번째 스트라이크에 대한 점수
                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]

                    //세번째 스트라이크에 대한 점수
                    player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                }
                player[player_turn - 1].gamecount = 1
                console.log(player[player_turn - 1].gamecount)
                console.log(player[player_turn - 1].scoreview)
                console.log(player[player_turn - 1].frameScore)
            }
            //마지막프레임
            else{
                if(frame + 1 === 10){
                    console.log("스트라이크 버튼 마지막 프레임 첫번째")
                    player[player_turn - 1].firstScore[frame] = 10

                    //10Frame이전에 스트라이크 없을 시
                    if(strike === 1) {
                        console.log("스트라이크 1개")
                        player[player_turn - 1].frameScore[frame] =  player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame];
                    }
                    else if(strike === 2){
                        console.log("스트라이크 2개")
                        player[player_turn - 1].frameScore[frame - 1] +=  player[player_turn - 1].firstScore[frame];
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame];
                    }
                    else if(strike > 2){
                        console.log("스트라이크 2개 이상")
                        //첫 스트라이크에 대한 점수
                        player[player_turn - 1].frameScore[frame - 2] +=  player[player_turn - 1].firstScore[frame];
                        player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2];

                        //두번째 스트라이크에 대한 점수
                        player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]

                        //세번째 스트라이크에 대한 점수
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame];
                    }
                    player[player_turn - 1].gamecount += 1
                    console.log(player[player_turn - 1].scoreview)
                    console.log(player[player_turn - 1].frameScore)
                }
            }
        }
        //스페어/ 마지막프레임 스트라이크 처리
        else if(player[player_turn - 1].gamecount === 2){
            if(player[player_turn - 1].firstScore[frame] !== 10){
                console.log("spare")
            }
            else {
                if(frame + 1 === 10){
                    player[player_turn - 1].secondScore[frame] = 10
                    console.log("gamecount -- > 2")
                    if(strike === 2){
                        console.log("스트라이크 2개임")
                        player[player_turn - 1].frameScore[frame] += 10
                        console.log(player[player_turn - 1].frameScore)
                    }
                    else if(strike > 2){
                        //첫 스트라이크에 대한 점수
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].firstScore[frame - 1]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1];

                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame] + player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame];
                    }
                    player[player_turn - 1].gamecount += 1
                }
            }
        }
        else if(player[player_turn - 1].gamecount === 3){
            this.state.thirdScore = 10;

            if(strike > 2){
                player[player_turn - 1].frameScore[frame] += this.state.thirdScore
                player[player_turn - 1].framescoreview[frame] = player[player_turn - 1].frameScore[frame];
                player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame]
            }
            player[player_turn - 1].gamecount += 1
        }

        //값변경후 setState
        this.setState({
            player:[...player],
        })
    }

    spareScore = (player, player_turn, frame, strike) => {
        console.log("Spare Score In")
        console.log("현재 스페어 프레임 --> " + (frame + 1))

        if(frame < 9){
            player[player_turn - 1].scoreview[(frame * 2) + 1] = '/'
        }

        player[player_turn - 1].isSpare = true

        if(frame + 1 === 1){
            player[player_turn - 1].frameScore[frame] = 10
            player[player_turn - 1].gamecount = 1
        }else if(frame < 9 ){
            player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + 10
            player[player_turn - 1].gamecount = 1
        }
        else {
            console.log("일로옴")
            console.log(player[player_turn - 1].frameScore)

            if(strike === 1){
                console.log("스트라이크 한개?")
                player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + 10
                console.log(player[player_turn - 1].frameScore)
            }else {
                player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame - 1]
                player[player_turn - 1].scoreview[(frame * 2) - 1] = '/'
                console.log(player[player_turn - 1].frameScore)
            }

            player[player_turn - 1].gamecount += 1
        }

        player[player_turn - 1].isStrike = false
        console.log(player[player_turn - 1].frameScore)

        this.setState({
            player: [...player]
        })
    }


    //스트라이크 버튼 클릭시
    strikeBtn = () => {
        console.log("Strike Clicked")
        const { player, playerTurn } = this.state
        //몇번째 플레이어인지, 몇프레임인지
        let player_turn = playerTurn
        let frame = player[player_turn - 1].frameScore.length
        console.log("frame --> " + frame)
        let strike = player[player_turn - 1].strike

        //첫번째 플레이어
        if(player_turn === 1){
            console.log("1번째 플레이어")
            console.log("strikeBtn gameCount" + player[player_turn - 1].gamecount)

            //1~9Frame
            if(frame < 9 ){
                console.log("1~9Frame")
                //1~9프레임 첫번째 게임
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn gameccount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    player[player_turn - 1].isSpare = false
                }
                //1~9프레임 두번째 게임
                else {
                    player[player_turn - 1].secondScore[frame] = 10 - player[player_turn - 1].firstScore[frame]

                    if(player[player_turn - 1].strike === 1){
                        console.log("스트라이크 1개 ")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame] + player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("스트라이크 2개")

                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }

                    this.spareScore(player, player_turn, frame, strike)

                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                //player가 1명이면 그대로, 2명이상이면 player턴 증가
                if(this.props.pnum !== player_turn){
                    this.state.playerTurn += 1
                }else {
                    this.state.playerTurn = 1
                }
            }
            //10프레임
            else {
                console.log("Strike btn 10프레임")
                console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                //10프레임 첫번째 게임
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn GameCount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                }
                //10프레임 두번째 게임
                else if(player[player_turn - 1].gamecount === 2) {
                    console.log("Strike btn GameCount 2")

                    //10프레임 첫번째결과 스트라이크이면
                    if(player[player_turn - 1].firstScore[frame - 1] === 10){
                        console.log("Strike..")
                        this.strikeScore(player, player_turn, frame, strike)
                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //10프레임 첫번째 스트라이크 아닐시
                    else {
                        console.log("chk")


                        if(player[player_turn - 1].firstScore[frame] === 10){
                            console.log("여긴 언제오나")

                            this.strikeScore(player, player_turn, frame, strike)
                            console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                        }
                        //스페어 처리
                        else {
                            console.log("spare..")

                            player[player_turn - 1].secondScore[frame - 1] = 10 - player[player_turn - 1].firstScore[frame - 1]
                            console.log("두번째 점수 --> " + player[player_turn - 1].secondScore[frame - 1])

                            if(frame === 10){
                                console.log("10프레임")

                                //9프레임 스트라이크 처리
                                if(player[player_turn - 1].strike === 1){
                                    console.log("스트라이크 1개 ")
                                    console.log(player[player_turn - 1].frameScore)

                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                                else if(player[player_turn - 1].strike > 1){
                                    console.log("스트라이크 2개")
                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]
                                    player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                            }
                            player[player_turn - 1].scoreview[(frame * 2) - 1] = '/'
                            player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame - 1]

                            console.log(player[player_turn - 1].frameScore)

                            player[player_turn - 1].gamecount += 1
                            player[player_turn - 1].isStrike = false
                            player[player_turn - 1].strike = 0
                        }
                    }
                }
                //10프레임 세번째 게임
                else if(player[player_turn - 1].gamecount === 3){
                    console.log("game count -- > 3")
                    console.log("계산전FrameScore ----> " + player[player_turn - 1].frameScore)

                    //스트라이크 처리
                    if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] === 10){
                        console.log("3번째 게임 Strike..")

                        player[player_turn - 1].scoreview[(frame * 2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //스페어 처리
                    else if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] !== 10){
                        console.log("3번째 게임 spare..")

                        player[player_turn - 1].scoreview[(frame * 2)] = '/'
                        player[player_turn - 1].frameScore[frame - 1] += 10 - player[player_turn - 1].secondScore[frame - 1]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].strike = 0
                    }
                    //둘다 아닐때
                    else {
                        console.log("스트 스페어아님")
                        player[player_turn - 1].scoreview[(frame*2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]
                    }
                    //player가 1명이면 그대로, 2명이상이면 player턴 증가
                    if(this.props.pnum !== player_turn){
                        this.state.playerTurn += 1
                    }else {
                        this.state.playerTurn = 1
                    }
                    player[player_turn - 1].gamecount = 0
                }
            }

        }

        //두번째 플레이어
        else if(player_turn === 2){
            console.log("2번째 플레이어")
            //1~9Frame
            if(frame < 9 ){
                console.log("1~9Frame")
                //1~9프레임 첫번째 게임
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn gameccount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    player[player_turn - 1].isSpare = false
                }
                //1~9프레임 두번째 게임
                else {
                    player[player_turn - 1].secondScore[frame] = 10 - player[player_turn - 1].firstScore[frame]

                    if(player[player_turn - 1].strike === 1){
                        console.log("스트라이크 1개 ")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame] + player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("스트라이크 2개")

                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }

                    this.spareScore(player, player_turn, frame, strike)

                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                //player가 1명이면 그대로, 2명이상이면 player턴 증가
                if(this.props.pnum !== player_turn){
                    this.state.playerTurn += 1
                }else {
                    this.state.playerTurn = 1
                }
            }
            //10프레임
            else {
                console.log("Strike btn 10프레임")
                console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                //10프레임 첫번째 게임
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn GameCount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                }
                //10프레임 두번째 게임
                else if(player[player_turn - 1].gamecount === 2) {
                    console.log("Strike btn GameCount 2")

                    //10프레임 첫번째결과 스트라이크이면
                    if(player[player_turn - 1].firstScore[frame - 1] === 10){
                        console.log("Strike..")
                        this.strikeScore(player, player_turn, frame, strike)
                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //10프레임 첫번째 스트라이크 아닐시
                    else {
                        console.log("chk")


                        if(player[player_turn - 1].firstScore[frame] === 10){
                            console.log("여긴 언제오나")

                            this.strikeScore(player, player_turn, frame, strike)
                            console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                        }
                        //스페어 처리
                        else {
                            console.log("spare..")

                            player[player_turn - 1].secondScore[frame - 1] = 10 - player[player_turn - 1].firstScore[frame - 1]
                            console.log("두번째 점수 --> " + player[player_turn - 1].secondScore[frame - 1])

                            if(frame === 10){
                                console.log("10프레임")

                                //9프레임 스트라이크 처리
                                if(player[player_turn - 1].strike === 1){
                                    console.log("스트라이크 1개 ")
                                    console.log(player[player_turn - 1].frameScore)

                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                                else if(player[player_turn - 1].strike > 1){
                                    console.log("스트라이크 2개")
                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]
                                    player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                            }
                            player[player_turn - 1].scoreview[(frame * 2) - 1] = '/'
                            player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame - 1]

                            console.log(player[player_turn - 1].frameScore)

                            player[player_turn - 1].gamecount += 1
                            player[player_turn - 1].isStrike = false
                            player[player_turn - 1].strike = 0
                        }
                    }
                }
                //10프레임 세번째 게임
                else if(player[player_turn - 1].gamecount === 3){
                    console.log("game count -- > 3")
                    console.log("계산전FrameScore ----> " + player[player_turn - 1].frameScore)

                    //스트라이크 처리
                    if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] === 10){
                        console.log("3번째 게임 Strike..")

                        player[player_turn - 1].scoreview[(frame * 2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //스페어 처리
                    else if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] !== 10){
                        console.log("3번째 게임 spare..")

                        player[player_turn - 1].scoreview[(frame * 2)] = '/'
                        player[player_turn - 1].frameScore[frame - 1] += 10 - player[player_turn - 1].secondScore[frame - 1]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].strike = 0
                    }
                    //둘다 아닐때
                    else {
                        console.log("스트 스페어아님")
                        player[player_turn - 1].scoreview[(frame*2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]
                    }
                    //player가 1명이면 그대로, 2명이상이면 player턴 증가
                    if(this.props.pnum !== player_turn){
                        this.state.playerTurn += 1
                    }else {
                        this.state.playerTurn = 1
                    }
                    player[player_turn - 1].gamecount = 0
                }
            }

        }
        else if(player_turn === 3){
            console.log("3번째 플레이어")
            //1~9Frame
            if(frame < 9 ){
                console.log("1~9Frame")
                //1~9프레임 첫번째 게임
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn gameccount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    player[player_turn - 1].isSpare = false
                }
                //1~9프레임 두번째 게임
                else {
                    player[player_turn - 1].secondScore[frame] = 10 - player[player_turn - 1].firstScore[frame]

                    if(player[player_turn - 1].strike === 1){
                        console.log("스트라이크 1개 ")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame] + player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("스트라이크 2개")

                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }

                    this.spareScore(player, player_turn, frame, strike)

                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                //player가 1명이면 그대로, 2명이상이면 player턴 증가
                if(this.props.pnum !== player_turn){
                    this.state.playerTurn += 1
                }else {
                    this.state.playerTurn = 1
                }
            }
            //10프레임
            else {
                console.log("Strike btn 10프레임")
                console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                //10프레임 첫번째 게임
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn GameCount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                }
                //10프레임 두번째 게임
                else if(player[player_turn - 1].gamecount === 2) {
                    console.log("Strike btn GameCount 2")

                    //10프레임 첫번째결과 스트라이크이면
                    if(player[player_turn - 1].firstScore[frame - 1] === 10){
                        console.log("Strike..")
                        this.strikeScore(player, player_turn, frame, strike)
                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //10프레임 첫번째 스트라이크 아닐시
                    else {
                        console.log("chk")


                        if(player[player_turn - 1].firstScore[frame] === 10){
                            console.log("여긴 언제오나")

                            this.strikeScore(player, player_turn, frame, strike)
                            console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                        }
                        //스페어 처리
                        else {
                            console.log("spare..")

                            player[player_turn - 1].secondScore[frame - 1] = 10 - player[player_turn - 1].firstScore[frame - 1]
                            console.log("두번째 점수 --> " + player[player_turn - 1].secondScore[frame - 1])

                            if(frame === 10){
                                console.log("10프레임")

                                //9프레임 스트라이크 처리
                                if(player[player_turn - 1].strike === 1){
                                    console.log("스트라이크 1개 ")
                                    console.log(player[player_turn - 1].frameScore)

                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                                else if(player[player_turn - 1].strike > 1){
                                    console.log("스트라이크 2개")
                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]
                                    player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                            }
                            player[player_turn - 1].scoreview[(frame * 2) - 1] = '/'
                            player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame - 1]

                            console.log(player[player_turn - 1].frameScore)

                            player[player_turn - 1].gamecount += 1
                            player[player_turn - 1].isStrike = false
                            player[player_turn - 1].strike = 0
                        }
                    }
                }
                //10프레임 세번째 게임
                else if(player[player_turn - 1].gamecount === 3){
                    console.log("game count -- > 3")
                    console.log("계산전FrameScore ----> " + player[player_turn - 1].frameScore)

                    //스트라이크 처리
                    if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] === 10){
                        console.log("3번째 게임 Strike..")

                        player[player_turn - 1].scoreview[(frame * 2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //스페어 처리
                    else if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] !== 10){
                        console.log("3번째 게임 spare..")

                        player[player_turn - 1].scoreview[(frame * 2)] = '/'
                        player[player_turn - 1].frameScore[frame - 1] += 10 - player[player_turn - 1].secondScore[frame - 1]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].strike = 0
                    }
                    //둘다 아닐때
                    else {
                        console.log("스트 스페어아님")
                        player[player_turn - 1].scoreview[(frame*2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]
                    }
                    //player가 1명이면 그대로, 2명이상이면 player턴 증가
                    if(this.props.pnum !== player_turn){
                        this.state.playerTurn += 1
                    }else {
                        this.state.playerTurn = 1
                    }
                    player[player_turn - 1].gamecount = 0
                }
            }

        }
        else {
            console.log("4번째 플레이어")
            //1~9Frame
            if(frame < 9 ){
                console.log("1~9Frame")
                //1~9프레임 첫번째 게임
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn gameccount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    player[player_turn - 1].isSpare = false
                }
                //1~9프레임 두번째 게임
                else {
                    player[player_turn - 1].secondScore[frame] = 10 - player[player_turn - 1].firstScore[frame]

                    if(player[player_turn - 1].strike === 1){
                        console.log("스트라이크 1개 ")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame] + player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("스트라이크 2개")

                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }

                    this.spareScore(player, player_turn, frame, strike)

                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                //player가 1명이면 그대로, 2명이상이면 player턴 증가
                if(this.props.pnum !== player_turn){
                    this.state.playerTurn += 1
                }else {
                    this.state.playerTurn = 1
                }
            }
            //10프레임
            else {
                console.log("Strike btn 10프레임")
                console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                //10프레임 첫번째 게임
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn GameCount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                }
                //10프레임 두번째 게임
                else if(player[player_turn - 1].gamecount === 2) {
                    console.log("Strike btn GameCount 2")

                    //10프레임 첫번째결과 스트라이크이면
                    if(player[player_turn - 1].firstScore[frame - 1] === 10){
                        console.log("Strike..")
                        this.strikeScore(player, player_turn, frame, strike)
                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //10프레임 첫번째 스트라이크 아닐시
                    else {
                        console.log("chk")


                        if(player[player_turn - 1].firstScore[frame] === 10){
                            console.log("여긴 언제오나")

                            this.strikeScore(player, player_turn, frame, strike)
                            console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                        }
                        //스페어 처리
                        else {
                            console.log("spare..")

                            player[player_turn - 1].secondScore[frame - 1] = 10 - player[player_turn - 1].firstScore[frame - 1]
                            console.log("두번째 점수 --> " + player[player_turn - 1].secondScore[frame - 1])

                            if(frame === 10){
                                console.log("10프레임")

                                //9프레임 스트라이크 처리
                                if(player[player_turn - 1].strike === 1){
                                    console.log("스트라이크 1개 ")
                                    console.log(player[player_turn - 1].frameScore)

                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                                else if(player[player_turn - 1].strike > 1){
                                    console.log("스트라이크 2개")
                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]
                                    player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                            }
                            player[player_turn - 1].scoreview[(frame * 2) - 1] = '/'
                            player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame - 1]

                            console.log(player[player_turn - 1].frameScore)

                            player[player_turn - 1].gamecount += 1
                            player[player_turn - 1].isStrike = false
                            player[player_turn - 1].strike = 0
                        }
                    }
                }
                //10프레임 세번째 게임
                else if(player[player_turn - 1].gamecount === 3){
                    console.log("game count -- > 3")
                    console.log("계산전FrameScore ----> " + player[player_turn - 1].frameScore)

                    //스트라이크 처리
                    if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] === 10){
                        console.log("3번째 게임 Strike..")

                        player[player_turn - 1].scoreview[(frame * 2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //스페어 처리
                    else if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] !== 10){
                        console.log("3번째 게임 spare..")

                        player[player_turn - 1].scoreview[(frame * 2)] = '/'
                        player[player_turn - 1].frameScore[frame - 1] += 10 - player[player_turn - 1].secondScore[frame - 1]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].strike = 0
                    }
                    //둘다 아닐때
                    else {
                        console.log("스트 스페어아님")
                        player[player_turn - 1].scoreview[(frame*2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]
                    }
                    //player가 1명이면 그대로, 2명이상이면 player턴 증가
                    if(this.props.pnum !== player_turn){
                        this.state.playerTurn += 1
                    }else {
                        this.state.playerTurn = 1
                    }
                    player[player_turn - 1].gamecount = 0
                }
            }
        }

        this.setState({
            player: JSON.parse(JSON.stringify(player)),
        })
    }

    render(){
        console.log(123456);
        const {strikeBtn, randomBtn} = this;

        return(
            <section className="scoreboard-wrapper">
                {[...Array(this.props.pnum)].map((n, i) => {
                    return <FrameTemplate key={i} pnum={i + 1} player={this.state.player}></FrameTemplate>
                })}
                <div className="game-btn">
                    <button className="random-btn" onClick={randomBtn}>Random</button>
                    <button className="strike-btn" onClick={strikeBtn}>Strike</button>
                </div>
                <div className="select-game">
                    <Link to={{
                        pathname: "/",
                    }} className="sd"><span className="exit">Exit</span></Link>
                </div>
            </section>
        )
    }
}

export default ScoreBoard;
