import { getIsGameOver } from "../utils/board";
import { Board, Winner } from "../types/types";
import { GridCell } from "./grid-cell";
import styles from "./grid.module.css";

export function Grid({
    board,
    winner,
    handleClick,
    handleRestartGame,
}: {
    board: Board;
    winner: Winner;
    handleClick: (idx: number) => void;
    handleRestartGame: () => void;
}) {
    const isGameOver = getIsGameOver(winner, board);
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
            {isGameOver && (
                <div className="absolute inset-0 flex justify-center items-center bg-neutral-950/60">
                    <button
                        type="button"
                        className="p-3 bg-indigo-500 text-white text-3xl font-semibold rounded-md shadow focus:outline-none"
                        onClick={handleRestartGame}
                    >
                        Restart
                    </button>
                </div>
            )}
        </div>
    );
}
