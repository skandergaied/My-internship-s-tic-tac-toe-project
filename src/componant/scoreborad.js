import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import './Scoreboard.css'
import {getDocumentIDs } from './Firebase';


function Scoreboard() {
    const [topPlayers, setTopPlayers] = useState([]);
    async function fetchData() {
        try {
            const book = await getDocumentIDs();
            book.sort((a, b) => b.numberOfWins - a.numberOfWins);
            const playersData = [];
            for (let i = 0; i < 10 && i < book.length; i++) {

                const player = book[i];
                playersData.push({ name: player.name, score: player.numberOfWins, numberOfGames: player.numberofgames });

            }
            playersData.sort((a, b) => b.score - a.score);

            const top10Players = playersData.slice(0, 10);
            setTopPlayers(top10Players);
            // Use the 'book' array here or do further processing with the data
        } catch (error) {
            // Handle any errors that occurred during the data retrieval
            console.error("Error:", error);
        }
    }
    useEffect(() => {

        fetchData()
    }, []);





    return (
        <div>
            <h2>Top 10 Players</h2>
            <ul>
                {topPlayers.map((player, index) => (
                    <li key={index} className="gn1">
                        {player.name} - Score: {player.score}, Number of Games: {player.numberOfGames}
                    </li>
                ))}
            </ul>
            <button  className="gamebutton1">
                <NavLink to={"/game"}>Back</NavLink>
            </button>
        </div>
    );
}

export default Scoreboard;
