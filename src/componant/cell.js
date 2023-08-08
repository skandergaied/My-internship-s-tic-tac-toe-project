import React, { useState, useEffect } from "react";

const Cell = ({ id, cell, setCells, go, setGo, cells, winningMessage }) => {
    const [moveNumber, setMoveNumber] = useState(0);

    const placeAICross = () => {
        if (go !== "cross") return;

        const emptyCellIndexes = cells.reduce((acc, cell, index) => {
            if (!cell) acc.push(index);
            return acc;
        }, []);

        if (emptyCellIndexes.length === 0) return;

        const randomIndex = Math.floor(Math.random() * emptyCellIndexes.length);
        const randomEmptyCell = emptyCellIndexes[randomIndex];

        const nextCells = cells.map((cell, index) =>
            index === randomEmptyCell ? "cross" : cell
        );

        setCells(nextCells);
        setGo("circle");
    };

    useEffect(() => {
        if (moveNumber % 2 === 1 && go === "cross") {
            placeAICross();
            setMoveNumber((prevMoveNumber) => prevMoveNumber + 1);
        } else if (moveNumber % 2 === 0 && go === "circle") {
            setMoveNumber((prevMoveNumber) => prevMoveNumber + 1);
            setGo("circle");

        }
    }, [go, moveNumber, cells, setGo]);

    const handleClick = () => {
        if (!cell && go === "circle" && !winningMessage) {
            const nextCells = [...cells];
            nextCells[id] = "circle";
            setCells(nextCells);
            setGo("cross");
        }
    };

    return (
        <div className="square" id={id} onClick={handleClick}>
            <div className={cell}></div>
        </div>
    );
};

export default Cell;