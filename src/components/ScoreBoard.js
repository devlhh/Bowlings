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

    //?????? ?????? ?????? ??? ??????
    randomScore = (player, player_turn, frame) => {
        console.log("Random Score")
        let strike = player[player_turn - 1].strike

        //1Frame
        if(frame + 1 === 1){
            //1Frame ??????????????? 1
            if(player[player_turn - 1].gamecount === 1){
                console.log("Random game 1")
                //????????? ?????? ??????
                let firstrand = Math.floor(Math.random() * 11)
                player[player_turn - 1].firstScore[frame] = firstrand
                console.log("????????? ???????????? --> " + player[player_turn - 1].firstScore[frame])
                this.state.roll = firstrand

                if(firstrand === 10){
                    this.strikeScore(player, player_turn, frame, strike)

                    //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
                    //???????????????, ?????? ????????? ????????? ??????, ??????????????? ??????
                    player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                    player[player_turn - 1].gamecount += 1
                }
                console.log("==========================================")
            }
            //1Frame ??????????????? 2
            else if(player[player_turn - 1].gamecount === 2){
                console.log("Random game 2")

                //????????? ?????? ??????
                let secondrand = Math.floor(Math.random() * (11 - this.state.roll))
                player[player_turn - 1].secondScore[frame] = secondrand
                console.log("????????? ?????? ?????? ---> " + player[player_turn - 1].secondScore[frame])
                this.state.roll = 0
                console.log("======================================")

                //????????? ??? ???
                if(player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame] === 10){
                    console.log("????????? ?????????")
                    this.spareScore(player, player_turn, frame)
                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                //??????????????? ????????? ?????? ???
                else {
                    console.log("??????????????? ????????? ??????")
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

                console.log("GameCount ?????????--> " + player[player_turn - 1].gamecount)
                console.log("frameScore --> " + player[player_turn - 1].frameScore)
                console.log("scoreview --> " + player[player_turn - 1].scoreview)
                console.log("frameview --> " + player[player_turn - 1].framescoreview)
                console.log("===================================================")

                //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
            //????????? ??????
            if(player[player_turn - 1].gamecount === 1){
                console.log("================================")
                console.log("1~9Frame Random game 1")

                //????????? ?????? ??????
                let firstrand = Math.floor(Math.random() * 11)
                player[player_turn - 1].firstScore[frame] = firstrand
                console.log("????????? ?????? ?????? -- > " + player[player_turn - 1].firstScore[frame])

                this.state.roll = firstrand
                console.log("==================================")

                //?????? ???????????? ??????????????? ????????? ??????
                if(player[player_turn - 1].isStrike === true){
                    console.log("?????? ????????? ??????????????? ??????")
                    console.log("Strike ?????? --> " + player[player_turn - 1].strike)

                    //??????????????? ????????? ???
                    if(player[player_turn - 1].strike === 1){
                        console.log("??????????????? 1???")

                        //????????? ??????
                        if(player[player_turn - 1].isSpare === true){
                            console.log("????????? ??????")
                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + 10 + player[player_turn - 1].firstScore[frame]
                            player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                            player[player_turn - 1].isSpare = false
                        }
                        //??????????????? ??????
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

                            //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
                            //???????????????, ?????? ????????? ????????? ??????, ??????????????? ??????
                            player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                            player[player_turn - 1].gamecount += 1
                        }

                        console.log(player[player_turn - 1].frameScore)
                        console.log(player[player_turn - 1].scoreview)

                    }
                    else if (player[player_turn - 1].strike === 2){
                        console.log("??????????????? 2???")

                        //????????? ??????
                        if(player[player_turn - 1].isSpare === true){
                            console.log("????????? ??????")
                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + 10 + player[player_turn - 1].firstScore[frame]
                            player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                            player[player_turn - 1].isSpare = false
                        }

                        //??????????????? ??????
                        if(firstrand === 10){
                            console.log("??????????????? ?????????.")
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

                            //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
                            //???????????????, ?????? ????????? ????????? ??????, ??????????????? ??????
                            player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                            player[player_turn - 1].gamecount += 1

                            player[player_turn - 1].frameScore[frame - 2] += firstrand
                            player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                        }
                    }
                    else {
                        console.log("??????????????? 2??? ??????")

                        //??????????????? ??????
                        if(firstrand === 10){
                            console.log("??????????????? ?????????.")
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

                            //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
                            //???????????????, ?????? ????????? ????????? ??????, ??????????????? ??????
                            player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                            player[player_turn - 1].gamecount += 1

                            player[player_turn - 1].frameScore[frame - 2] += firstrand
                            player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                            player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                        }

                    }
                }
                //???????????? ?????????
                else if(player[player_turn - 1].isSpare === true){
                    console.log("1~9????????? Spare ?????? ??????")
                    console.log("?????? ????????? FrameScore --> " + player[player_turn - 1].frameScore)

                    //???????????? ????????? ??????
                    player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].firstScore[frame]
                    player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    console.log("????????? ?????? ??? FrameScore --> " + player[player_turn - 1].frameScore)

                    //??????????????? ??????
                    if(firstrand === 10){
                        console.log("???????????????..!")
                        player[player_turn - 1].scoreview[(frame * 2) + 1] = 'X'
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + 10
                        player[player_turn - 1].gamecount = 1
                        player[player_turn - 1].strike += 1
                        player[player_turn - 1].isStrike = true

                        console.log("FrameScore --> " + player[player_turn - 1].frameScore)

                        //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
                        //???????????????, ?????? ????????? ????????? ??????, ??????????????? ??????
                        player[player_turn - 1].scoreview[(frame * 2)] = firstrand
                        player[player_turn - 1].gamecount += 1
                        player[player_turn - 1].isStrike = false
                    }
                    player[player_turn - 1].isSpare = false
                }
                //??????????????? ???????????????, ????????? ?????????
                else {
                    console.log("?????? ????????? ??????????????? ????????? ??????")
                    if(player[player_turn - 1].strike === 1){
                        this.strikeScore(player, player_turn, frame, strike)
                    }
                    else if(this.state.player[player_turn - 1].strike > 1){
                        console.log("??????????????? 2?????????")

                        console.log(player[player_turn - 1].frameScore)

                        player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]
                        player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]

                    }
                    //??????????????? ???????????????
                    if(firstrand === 10){
                        this.strikeScore(player, player_turn, frame, strike)

                        //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
                        //???????????????, ?????? ????????? ????????? ??????, ??????????????? ??????
                        player[player_turn - 1].scoreview[(frame * 2) ] = firstrand
                        player[player_turn - 1].gamecount += 1
                    }
                }

                console.log("GameCount ?????????--> " + player[player_turn - 1].gamecount)
                console.log("frameScore --> " + player[player_turn - 1].frameScore)
                console.log("scoreview --> " + player[player_turn - 1].scoreview)
                console.log("frameview --> " + player[player_turn - 1].framescoreview)
                console.log("===================================================")
            }

            //1~9Frame ????????? ??????
            else if(player[player_turn - 1].gamecount === 2){
                console.log("game 2")
                let secondrand = Math.floor(Math.random() * (11 - this.state.roll))
                player[player_turn - 1].secondScore[frame] = secondrand
                console.log("2?????? ?????? ?????? --> " + secondrand)
                this.state.roll = 0;

                //?????? ??????????????? ??????
                if(this.state.player[player_turn - 1].isStrike === true){
                    console.log("?????? ??????????????????")

                    //?????? ????????? ??????????????? ??????
                    if(this.state.player[player_turn - 1].strike === 1){
                        console.log("??????????????? 1??? ")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(this.state.player[player_turn - 1].strike > 1){

                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }

                    if(player[player_turn - 1].firstScore[frame] + player[player_turn - 1].secondScore[frame] === 10){
                        console.log("?????????????????? ?????? ??????????????????")
                        this.spareScore(player, player_turn, frame, strike)
                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].strike = 0
                    }else {
                        console.log("??? ?????????")
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
                    console.log("??????????????????")
                    this.spareScore(player, player_turn, frame, strike)
                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                else {
                    console.log("??????,???????????????")

                    if(secondrand === 0) {
                        player[player_turn - 1].scoreview[(frame * 2) + 1] = '-'
                    }
                    else {
                        //???????????????, ?????? ????????? ????????? ??????, ??????????????? ??????
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
                //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
        //????????? ?????????
        else {
            console.log("===========??????????????????=============")
            frame = 9
            if(player[player_turn - 1].gamecount === 1){
                console.log("Random game 1")
                let firstrand = Math.floor(Math.random() * 11)
                player[player_turn - 1].firstScore[frame] = firstrand
                console.log("????????? ?????? ?????? --> " + player[player_turn - 1].firstScore[frame])
                this.state.roll = firstrand

                if(player[player_turn - 1].isSpare === true){
                    console.log("????????? ??????")
                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + 10 + player[player_turn - 1].firstScore[frame]
                    player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                }

                player[player_turn - 1].isSpare = false

                //10???????????? ?????????????????????
                if(player[player_turn - 1].isStrike === true){
                    console.log("isStrike")

                    if(player[player_turn - 1].strike === 1) {
                        console.log("9Frame??? ??????????????? ??????")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1]  + player[player_turn - 1].firstScore[frame]

                        console.log(player[player_turn - 1].frameScore)
                    }
                    else if(player[player_turn - 1].strike > 1) {
                        console.log("st 2???")

                        player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                        player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]

                        console.log(player[player_turn - 1].frameScore)
                    }

                    //10????????? ????????? ???????????????
                    if(firstrand === 10){
                        console.log("Strike")
                        player[player_turn - 1].scoreview[(frame * 2)] = 'X'
                        player[player_turn - 1].strike += 1
                    }
                    //????????? ?????? ??????????????? ?????????
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
                //9????????? ??????????????? ?????????
                else {
                    console.log("No Prev Strike")
                    //10????????? ????????? ???????????????
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
            //????????? ????????? ????????? ??????
            else if(player[player_turn - 1].gamecount === 2){
                console.log("=================")
                console.log("Random game 2")
                let secondrand = Math.floor(Math.random() * (11 - this.state.roll))
                player[player_turn - 1].secondScore[frame] = secondrand
                console.log("????????? ?????? ?????? --> " + secondrand)
                this.state.roll = 0;

                console.log(player[player_turn - 1].strike)

                if(player[player_turn - 1].isStrike === true){
                    console.log("?????? ???????????????")

                    if(player[player_turn - 1].strike === 1){
                        console.log("1???")
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("2???")
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
                    console.log("10????????? ????????? ?????????")

                    if(player[player_turn - 1].strike === 1){
                        console.log("1???")

                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("2???")
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
                    console.log("10????????? ??????,???????????????")
                    if(player[player_turn - 1].strike === 1){
                        console.log("1???")
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

                    //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
                console.log("3?????? ????????????")

                let thirdrand = 0


                if(player[player_turn - 1].firstScore[frame] === 10 && player[player_turn - 1].secondScore[frame] === 10){
                    thirdrand = Math.floor(Math.random() * 11)
                    player[player_turn - 1].thirdScore = thirdrand
                    console.log("3?????? ?????? ?????? --- > " + player[player_turn - 1].thirdScore)

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
                    console.log("3?????? ?????? ?????? --- > " + player[player_turn - 1].thirdScore)

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
                    console.log("3?????? ?????? ?????? --- > " + player[player_turn - 1].thirdScore)

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

                //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
        console.log("??????????????? -- > " + (frame + 1))
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
        console.log("strike ?????? --> " + strike)

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
        //??????????????? ??? ???
        if(player[player_turn - 1].gamecount === 1){
            console.log("gamecount --> 1")

            //1Frame
            if(frame + 1 === 1){
                //10??? ??????
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

                //??????????????? 1?????????
                if(strike === 1){
                    console.log("1Strike")
                    player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                    player[player_turn - 1].framescoreview[frame] = '';
                }
                //??????????????? 2?????????
                else if(strike === 2){
                    console.log("2strike")
                    //??? ?????????????????? ?????? ??????
                    player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].firstScore[frame]

                    //????????? ?????????????????? ?????? ??????
                    player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                    player[player_turn - 1].framescoreview[frame] = '';
                }
                //??????????????? 3?????????
                else {
                    console.log("strike 3????????? ")
                    //??? ?????????????????? ?????? ??????
                    player[player_turn - 1].frameScore[frame - 2] +=  player[player_turn - 1].firstScore[frame];
                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2];
                    console.log(player[player_turn - 1].frameScore)

                    //????????? ?????????????????? ?????? ??????
                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]

                    //????????? ?????????????????? ?????? ??????
                    player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame]
                }
                player[player_turn - 1].gamecount = 1
                console.log(player[player_turn - 1].gamecount)
                console.log(player[player_turn - 1].scoreview)
                console.log(player[player_turn - 1].frameScore)
            }
            //??????????????????
            else{
                if(frame + 1 === 10){
                    console.log("??????????????? ?????? ????????? ????????? ?????????")
                    player[player_turn - 1].firstScore[frame] = 10

                    //10Frame????????? ??????????????? ?????? ???
                    if(strike === 1) {
                        console.log("??????????????? 1???")
                        player[player_turn - 1].frameScore[frame] =  player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame];
                    }
                    else if(strike === 2){
                        console.log("??????????????? 2???")
                        player[player_turn - 1].frameScore[frame - 1] +=  player[player_turn - 1].firstScore[frame];
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame];
                    }
                    else if(strike > 2){
                        console.log("??????????????? 2??? ??????")
                        //??? ?????????????????? ?????? ??????
                        player[player_turn - 1].frameScore[frame - 2] +=  player[player_turn - 1].firstScore[frame];
                        player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2];

                        //????????? ?????????????????? ?????? ??????
                        player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1] + player[player_turn - 1].firstScore[frame]

                        //????????? ?????????????????? ?????? ??????
                        player[player_turn - 1].frameScore[frame] = player[player_turn - 1].frameScore[frame - 1] + player[player_turn - 1].firstScore[frame];
                    }
                    player[player_turn - 1].gamecount += 1
                    console.log(player[player_turn - 1].scoreview)
                    console.log(player[player_turn - 1].frameScore)
                }
            }
        }
        //?????????/ ?????????????????? ??????????????? ??????
        else if(player[player_turn - 1].gamecount === 2){
            if(player[player_turn - 1].firstScore[frame] !== 10){
                console.log("spare")
            }
            else {
                if(frame + 1 === 10){
                    player[player_turn - 1].secondScore[frame] = 10
                    console.log("gamecount -- > 2")
                    if(strike === 2){
                        console.log("??????????????? 2??????")
                        player[player_turn - 1].frameScore[frame] += 10
                        console.log(player[player_turn - 1].frameScore)
                    }
                    else if(strike > 2){
                        //??? ?????????????????? ?????? ??????
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

        //???????????? setState
        this.setState({
            player:[...player],
        })
    }

    spareScore = (player, player_turn, frame, strike) => {
        console.log("Spare Score In")
        console.log("?????? ????????? ????????? --> " + (frame + 1))

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
            console.log("?????????")
            console.log(player[player_turn - 1].frameScore)

            if(strike === 1){
                console.log("??????????????? ???????")
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


    //??????????????? ?????? ?????????
    strikeBtn = () => {
        console.log("Strike Clicked")
        const { player, playerTurn } = this.state
        //????????? ??????????????????, ??????????????????
        let player_turn = playerTurn
        let frame = player[player_turn - 1].frameScore.length
        console.log("frame --> " + frame)
        let strike = player[player_turn - 1].strike

        //????????? ????????????
        if(player_turn === 1){
            console.log("1?????? ????????????")
            console.log("strikeBtn gameCount" + player[player_turn - 1].gamecount)

            //1~9Frame
            if(frame < 9 ){
                console.log("1~9Frame")
                //1~9????????? ????????? ??????
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn gameccount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    player[player_turn - 1].isSpare = false
                }
                //1~9????????? ????????? ??????
                else {
                    player[player_turn - 1].secondScore[frame] = 10 - player[player_turn - 1].firstScore[frame]

                    if(player[player_turn - 1].strike === 1){
                        console.log("??????????????? 1??? ")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame] + player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("??????????????? 2???")

                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }

                    this.spareScore(player, player_turn, frame, strike)

                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                //player??? 1????????? ?????????, 2??????????????? player??? ??????
                if(this.props.pnum !== player_turn){
                    this.state.playerTurn += 1
                }else {
                    this.state.playerTurn = 1
                }
            }
            //10?????????
            else {
                console.log("Strike btn 10?????????")
                console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                //10????????? ????????? ??????
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn GameCount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                }
                //10????????? ????????? ??????
                else if(player[player_turn - 1].gamecount === 2) {
                    console.log("Strike btn GameCount 2")

                    //10????????? ??????????????? ?????????????????????
                    if(player[player_turn - 1].firstScore[frame - 1] === 10){
                        console.log("Strike..")
                        this.strikeScore(player, player_turn, frame, strike)
                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //10????????? ????????? ??????????????? ?????????
                    else {
                        console.log("chk")


                        if(player[player_turn - 1].firstScore[frame] === 10){
                            console.log("?????? ????????????")

                            this.strikeScore(player, player_turn, frame, strike)
                            console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                        }
                        //????????? ??????
                        else {
                            console.log("spare..")

                            player[player_turn - 1].secondScore[frame - 1] = 10 - player[player_turn - 1].firstScore[frame - 1]
                            console.log("????????? ?????? --> " + player[player_turn - 1].secondScore[frame - 1])

                            if(frame === 10){
                                console.log("10?????????")

                                //9????????? ??????????????? ??????
                                if(player[player_turn - 1].strike === 1){
                                    console.log("??????????????? 1??? ")
                                    console.log(player[player_turn - 1].frameScore)

                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                                else if(player[player_turn - 1].strike > 1){
                                    console.log("??????????????? 2???")
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
                //10????????? ????????? ??????
                else if(player[player_turn - 1].gamecount === 3){
                    console.log("game count -- > 3")
                    console.log("?????????FrameScore ----> " + player[player_turn - 1].frameScore)

                    //??????????????? ??????
                    if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] === 10){
                        console.log("3?????? ?????? Strike..")

                        player[player_turn - 1].scoreview[(frame * 2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //????????? ??????
                    else if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] !== 10){
                        console.log("3?????? ?????? spare..")

                        player[player_turn - 1].scoreview[(frame * 2)] = '/'
                        player[player_turn - 1].frameScore[frame - 1] += 10 - player[player_turn - 1].secondScore[frame - 1]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].strike = 0
                    }
                    //?????? ?????????
                    else {
                        console.log("?????? ???????????????")
                        player[player_turn - 1].scoreview[(frame*2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]
                    }
                    //player??? 1????????? ?????????, 2??????????????? player??? ??????
                    if(this.props.pnum !== player_turn){
                        this.state.playerTurn += 1
                    }else {
                        this.state.playerTurn = 1
                    }
                    player[player_turn - 1].gamecount = 0
                }
            }

        }

        //????????? ????????????
        else if(player_turn === 2){
            console.log("2?????? ????????????")
            //1~9Frame
            if(frame < 9 ){
                console.log("1~9Frame")
                //1~9????????? ????????? ??????
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn gameccount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    player[player_turn - 1].isSpare = false
                }
                //1~9????????? ????????? ??????
                else {
                    player[player_turn - 1].secondScore[frame] = 10 - player[player_turn - 1].firstScore[frame]

                    if(player[player_turn - 1].strike === 1){
                        console.log("??????????????? 1??? ")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame] + player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("??????????????? 2???")

                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }

                    this.spareScore(player, player_turn, frame, strike)

                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                //player??? 1????????? ?????????, 2??????????????? player??? ??????
                if(this.props.pnum !== player_turn){
                    this.state.playerTurn += 1
                }else {
                    this.state.playerTurn = 1
                }
            }
            //10?????????
            else {
                console.log("Strike btn 10?????????")
                console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                //10????????? ????????? ??????
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn GameCount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                }
                //10????????? ????????? ??????
                else if(player[player_turn - 1].gamecount === 2) {
                    console.log("Strike btn GameCount 2")

                    //10????????? ??????????????? ?????????????????????
                    if(player[player_turn - 1].firstScore[frame - 1] === 10){
                        console.log("Strike..")
                        this.strikeScore(player, player_turn, frame, strike)
                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //10????????? ????????? ??????????????? ?????????
                    else {
                        console.log("chk")


                        if(player[player_turn - 1].firstScore[frame] === 10){
                            console.log("?????? ????????????")

                            this.strikeScore(player, player_turn, frame, strike)
                            console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                        }
                        //????????? ??????
                        else {
                            console.log("spare..")

                            player[player_turn - 1].secondScore[frame - 1] = 10 - player[player_turn - 1].firstScore[frame - 1]
                            console.log("????????? ?????? --> " + player[player_turn - 1].secondScore[frame - 1])

                            if(frame === 10){
                                console.log("10?????????")

                                //9????????? ??????????????? ??????
                                if(player[player_turn - 1].strike === 1){
                                    console.log("??????????????? 1??? ")
                                    console.log(player[player_turn - 1].frameScore)

                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                                else if(player[player_turn - 1].strike > 1){
                                    console.log("??????????????? 2???")
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
                //10????????? ????????? ??????
                else if(player[player_turn - 1].gamecount === 3){
                    console.log("game count -- > 3")
                    console.log("?????????FrameScore ----> " + player[player_turn - 1].frameScore)

                    //??????????????? ??????
                    if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] === 10){
                        console.log("3?????? ?????? Strike..")

                        player[player_turn - 1].scoreview[(frame * 2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //????????? ??????
                    else if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] !== 10){
                        console.log("3?????? ?????? spare..")

                        player[player_turn - 1].scoreview[(frame * 2)] = '/'
                        player[player_turn - 1].frameScore[frame - 1] += 10 - player[player_turn - 1].secondScore[frame - 1]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].strike = 0
                    }
                    //?????? ?????????
                    else {
                        console.log("?????? ???????????????")
                        player[player_turn - 1].scoreview[(frame*2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]
                    }
                    //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
            console.log("3?????? ????????????")
            //1~9Frame
            if(frame < 9 ){
                console.log("1~9Frame")
                //1~9????????? ????????? ??????
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn gameccount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    player[player_turn - 1].isSpare = false
                }
                //1~9????????? ????????? ??????
                else {
                    player[player_turn - 1].secondScore[frame] = 10 - player[player_turn - 1].firstScore[frame]

                    if(player[player_turn - 1].strike === 1){
                        console.log("??????????????? 1??? ")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame] + player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("??????????????? 2???")

                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }

                    this.spareScore(player, player_turn, frame, strike)

                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                //player??? 1????????? ?????????, 2??????????????? player??? ??????
                if(this.props.pnum !== player_turn){
                    this.state.playerTurn += 1
                }else {
                    this.state.playerTurn = 1
                }
            }
            //10?????????
            else {
                console.log("Strike btn 10?????????")
                console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                //10????????? ????????? ??????
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn GameCount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                }
                //10????????? ????????? ??????
                else if(player[player_turn - 1].gamecount === 2) {
                    console.log("Strike btn GameCount 2")

                    //10????????? ??????????????? ?????????????????????
                    if(player[player_turn - 1].firstScore[frame - 1] === 10){
                        console.log("Strike..")
                        this.strikeScore(player, player_turn, frame, strike)
                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //10????????? ????????? ??????????????? ?????????
                    else {
                        console.log("chk")


                        if(player[player_turn - 1].firstScore[frame] === 10){
                            console.log("?????? ????????????")

                            this.strikeScore(player, player_turn, frame, strike)
                            console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                        }
                        //????????? ??????
                        else {
                            console.log("spare..")

                            player[player_turn - 1].secondScore[frame - 1] = 10 - player[player_turn - 1].firstScore[frame - 1]
                            console.log("????????? ?????? --> " + player[player_turn - 1].secondScore[frame - 1])

                            if(frame === 10){
                                console.log("10?????????")

                                //9????????? ??????????????? ??????
                                if(player[player_turn - 1].strike === 1){
                                    console.log("??????????????? 1??? ")
                                    console.log(player[player_turn - 1].frameScore)

                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                                else if(player[player_turn - 1].strike > 1){
                                    console.log("??????????????? 2???")
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
                //10????????? ????????? ??????
                else if(player[player_turn - 1].gamecount === 3){
                    console.log("game count -- > 3")
                    console.log("?????????FrameScore ----> " + player[player_turn - 1].frameScore)

                    //??????????????? ??????
                    if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] === 10){
                        console.log("3?????? ?????? Strike..")

                        player[player_turn - 1].scoreview[(frame * 2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //????????? ??????
                    else if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] !== 10){
                        console.log("3?????? ?????? spare..")

                        player[player_turn - 1].scoreview[(frame * 2)] = '/'
                        player[player_turn - 1].frameScore[frame - 1] += 10 - player[player_turn - 1].secondScore[frame - 1]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].strike = 0
                    }
                    //?????? ?????????
                    else {
                        console.log("?????? ???????????????")
                        player[player_turn - 1].scoreview[(frame*2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]
                    }
                    //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
            console.log("4?????? ????????????")
            //1~9Frame
            if(frame < 9 ){
                console.log("1~9Frame")
                //1~9????????? ????????? ??????
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn gameccount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    player[player_turn - 1].isSpare = false
                }
                //1~9????????? ????????? ??????
                else {
                    player[player_turn - 1].secondScore[frame] = 10 - player[player_turn - 1].firstScore[frame]

                    if(player[player_turn - 1].strike === 1){
                        console.log("??????????????? 1??? ")
                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame] + player[player_turn - 1].firstScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }
                    else if(player[player_turn - 1].strike > 1){
                        console.log("??????????????? 2???")

                        player[player_turn - 1].frameScore[frame - 1] += player[player_turn - 1].secondScore[frame]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                    }

                    this.spareScore(player, player_turn, frame, strike)

                    player[player_turn - 1].isStrike = false
                    player[player_turn - 1].strike = 0
                }
                //player??? 1????????? ?????????, 2??????????????? player??? ??????
                if(this.props.pnum !== player_turn){
                    this.state.playerTurn += 1
                }else {
                    this.state.playerTurn = 1
                }
            }
            //10?????????
            else {
                console.log("Strike btn 10?????????")
                console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                //10????????? ????????? ??????
                if(player[player_turn - 1].gamecount === 1){
                    console.log("Strike btn GameCount 1")
                    this.strikeScore(player, player_turn, frame, strike)
                    console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                }
                //10????????? ????????? ??????
                else if(player[player_turn - 1].gamecount === 2) {
                    console.log("Strike btn GameCount 2")

                    //10????????? ??????????????? ?????????????????????
                    if(player[player_turn - 1].firstScore[frame - 1] === 10){
                        console.log("Strike..")
                        this.strikeScore(player, player_turn, frame, strike)
                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //10????????? ????????? ??????????????? ?????????
                    else {
                        console.log("chk")


                        if(player[player_turn - 1].firstScore[frame] === 10){
                            console.log("?????? ????????????")

                            this.strikeScore(player, player_turn, frame, strike)
                            console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                        }
                        //????????? ??????
                        else {
                            console.log("spare..")

                            player[player_turn - 1].secondScore[frame - 1] = 10 - player[player_turn - 1].firstScore[frame - 1]
                            console.log("????????? ?????? --> " + player[player_turn - 1].secondScore[frame - 1])

                            if(frame === 10){
                                console.log("10?????????")

                                //9????????? ??????????????? ??????
                                if(player[player_turn - 1].strike === 1){
                                    console.log("??????????????? 1??? ")
                                    console.log(player[player_turn - 1].frameScore)

                                    player[player_turn - 1].frameScore[frame - 2] += player[player_turn - 1].secondScore[frame - 1]
                                    player[player_turn - 1].framescoreview[frame - 2] = player[player_turn - 1].frameScore[frame - 2]

                                    player[player_turn - 1].frameScore[frame - 1] = player[player_turn - 1].frameScore[frame - 2] + player[player_turn - 1].firstScore[frame - 1]

                                    console.log(player[player_turn - 1].frameScore)
                                }
                                else if(player[player_turn - 1].strike > 1){
                                    console.log("??????????????? 2???")
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
                //10????????? ????????? ??????
                else if(player[player_turn - 1].gamecount === 3){
                    console.log("game count -- > 3")
                    console.log("?????????FrameScore ----> " + player[player_turn - 1].frameScore)

                    //??????????????? ??????
                    if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] === 10){
                        console.log("3?????? ?????? Strike..")

                        player[player_turn - 1].scoreview[(frame * 2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)
                    }
                    //????????? ??????
                    else if(player[player_turn - 1].firstScore[frame - 1] === 10 && player[player_turn - 1].secondScore[frame - 1] !== 10){
                        console.log("3?????? ?????? spare..")

                        player[player_turn - 1].scoreview[(frame * 2)] = '/'
                        player[player_turn - 1].frameScore[frame - 1] += 10 - player[player_turn - 1].secondScore[frame - 1]
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]

                        console.log("FrameScore ----> " + player[player_turn - 1].frameScore)

                        player[player_turn - 1].isStrike = false
                        player[player_turn - 1].strike = 0
                    }
                    //?????? ?????????
                    else {
                        console.log("?????? ???????????????")
                        player[player_turn - 1].scoreview[(frame*2)] = 'X'
                        player[player_turn - 1].frameScore[frame - 1] += 10
                        player[player_turn - 1].framescoreview[frame - 1] = player[player_turn - 1].frameScore[frame - 1]
                        player[player_turn - 1].totalScore = player[player_turn - 1].frameScore[frame - 1]
                    }
                    //player??? 1????????? ?????????, 2??????????????? player??? ??????
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
