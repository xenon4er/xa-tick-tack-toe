import { Board, Winner } from "../types/types";
import { GridCell } from "./grid-cell";
import styles from "./grid.module.css";

export function Grid({
    board,
    winner,
    isGameOver,
    handleClick,
}: {
    board: Board;
    winner: Winner;
    isGameOver: boolean;
    handleClick: (idx: number) => void;
}) {
    const listCells = board.map((cell, idx) => {
        const isFaded = isGameOver && !winner.combination?.includes(idx);
        return (
            <GridCell
                isFaded={isFaded}
                key={idx}
                cell={cell}
                handleClick={() => handleClick(idx)}
            ></GridCell>
        );
    });

    return (
        <div className="w-full aspect-square relative">
            <div
                className={`
                    ${styles.grid}
                    grid grid-cols-[repeat(3,1fr)] gap-px w-full
                `}
            >
                {listCells}
            </div>
        </div>
    );
}
