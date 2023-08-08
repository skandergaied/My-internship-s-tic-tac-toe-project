import React, { useState } from "react";
import Cell from "./Cell";

const Board = () => {
    const initialCells = new Array(9).fill(null);

    const [cells, setCells] = useState(initialCells);
    const [go, setGo] = useState("circle"); // "circle" for player, "cross" for computer

    return (
        <div className="board">
            {cells.map((cell, index) => (
                <Cell
                    key={index}
                    id={index}
                    cell={cell}
                    setcells={setCells} // Make sure the prop name is setcells, not setCells
                    go={go}
                    setGo={setGo}
                    cells={cells}
                />
            ))}
        </div>
    );
};

export default Board;