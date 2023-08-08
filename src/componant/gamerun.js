import React, { useState, useEffect } from "react";
import Cell from "./cell";
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {database,fetchAndFindIdByEmail,updatePlayerData,fetchAndFiDndataByEmail } from './Firebase';
import {useNavigate } from "react-router-dom";

const Game = () => {
    const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
    const [go, setGo] = useState("circle");
    const [winningMessage, setWinningMessage] = useState(null);
    const [ScoreX, setScoreX] = useState(0);
    const [ScoreO, setScoreO] = useState(0);
    const [numberofgame, setnumberofgame] = useState(0);
    const [showscorebored,setShowscorebored]=useState(false)
    const message = "It is now " + go + "'s go.";
    const playerNameInput = localStorage.getItem("playerName");
    const playerName = localStorage.getItem("playerName");

    const playerDataString = localStorage.getItem(playerName);
    const playerData = JSON.parse(playerDataString);
    const emaill = playerData.email;

    useEffect(() => {
        fetchAndFiDndataByEmail(emaill)
            .then((userData) => {
                if (userData) {
                    setScoreO(userData.numberOfWins);
                    setScoreX(userData.numberOfLosses);
                    setnumberofgame(userData.numberOfGames);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


//-----------------------------------------------------------------------------------

    const [seconds,setseconds]=useState(0);
    useEffect(() => {
        let timer;
        if (go === "circle" && seconds < 30) { // Only start the timer if it's circle's turn and timer is less than 30 seconds
            timer = setInterval(() => {
                setseconds((seconds) => seconds + 1);
            }, 1000);
        } else {
            clearInterval(timer);
            setseconds(0);
            if (go === "circle" && seconds >= 30) {
                setScoreX((ScoreX) => ScoreX + 1);
                setCells(["", "", "", "", "", "", "", "", ""]);
                setGo("circle");
                setWinningMessage(null);
                setnumberofgame((numberofgame) => numberofgame + 1);
                const initialPlayerData = { score: ScoreO, numberOfGames: numberofgame };
                localStorage.setItem(playerNameInput, JSON.stringify(initialPlayerData));
                const updatedPlayerData = {
                    ...playerData,
                    score: ScoreO,
                    numberOfGames: numberofgame,
                };
                localStorage.setItem(playerNameInput, JSON.stringify(updatedPlayerData));

                fetchAndFindIdByEmail(emaill)
                    .then((result) => {
                        updatePlayerData(result, ScoreO, numberofgame + 1,ScoreX);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }

        return () => clearInterval(timer); // Cleanup when component unmounts or effect reruns
    }, [go, seconds]);



    //------------------------------------
    const chekscore =()=>{
        const winningCombos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        if (winningCombos.some(array => array.every(cell => cells[cell] === "circle"))) {
            setWinningMessage("Circle wins!");
            setGo(' ');
            setScoreO((ScoreO) => ScoreO + 1);
            return;
        }

         if (winningCombos.some(array => array.every(cell => cells[cell] === "cross"))) {
            setWinningMessage("Cross wins!");
            setGo(' ');
            setScoreX((ScoreX) => ScoreX + 1);
            return;
        }

    };

    useEffect(() => {
        chekscore();
    }, [cells]);


    const resetGame = () => {
        setCells(["", "", "", "", "", "", "", "", ""]);
        setGo("circle");
        setWinningMessage(null);
        setScoreO(0);
        setScoreX(0);
        setnumberofgame(0);
        const initialPlayerData = { score: ScoreO, numberOfGames: numberofgame };
        localStorage.setItem(playerNameInput, JSON.stringify(initialPlayerData));
        const updatedPlayerData = {
            ...playerData,
            score: ScoreO,
            numberOfGames: numberofgame,
        };
        localStorage.setItem(playerNameInput, JSON.stringify(updatedPlayerData));

        fetchAndFindIdByEmail(emaill)
            .then((result) => {
                updatePlayerData(result, 0, 0,0);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const playAgain = (e) => {
        setCells(["", "", "", "", "", "", "", "", ""]);
        setGo("circle");
        setWinningMessage(null);
        setnumberofgame((numberofgame) => numberofgame + 1);
        e.preventDefault();

       const initialPlayerData = { score: ScoreO, numberOfGames: numberofgame };
        localStorage.setItem(playerNameInput, JSON.stringify(initialPlayerData));
        const updatedPlayerData = {
            ...playerData,
            score: ScoreO,
            numberOfGames: numberofgame,
        };
        localStorage.setItem(playerNameInput, JSON.stringify(updatedPlayerData));

        fetchAndFindIdByEmail(emaill)
            .then((result) => {
                updatePlayerData(result, ScoreO, numberofgame + 1,ScoreX);
            })
            .catch((error) => {
                console.error(error);
            });


    };
    const history = useNavigate()

    const handleClick = () =>{
        signOut(database).then(val=>{
            history('/')
        })
    }
    const scorebored = () => {
        setShowscorebored(true)
    };

    if(showscorebored){
       return <Navigate to="/scoreboard" />;

    }
    return (
        <div className="app">
            <h1>Tic tac toe </h1>
            <div className="score-container">
                <p>Score X: {ScoreX}</p>
                <p>Score O: {ScoreO}</p>
                <p>number of games: {numberofgame}</p>
                <div className="timer-container">
                    <p>Timer: {seconds} seconds</p>
                </div>


            </div>
            <button onClick={scorebored} className="game-button">
                Scoreboard
            </button>
            <div className="gamebored">
                {cells.map((cell, index) => (
                    <Cell
                        key={index}
                        id={index}
                        cell={cell}
                        setCells={setCells}
                        go={go}
                        setGo={setGo}
                        cells={cells}
                        winningMessage={winningMessage}

                    />
                ))}
            </div>
            <p>{winningMessage || message}</p>
            <button onClick={playAgain} className="game-button">
                Play Again
            </button>
            <button onClick={resetGame} className="game-button">Reset Game</button>
            <button onClick={handleClick} className="logout-button">Log out</button>


        </div>
    );
};
export default Game;
