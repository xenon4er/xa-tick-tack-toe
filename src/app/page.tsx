"use client";
import { useCallback, useReducer, useState } from "react";
import { Grid } from "./components/grid";
import { getIsGameOver } from "./utils/board";
import { StatusPanel } from "./components/status-panel";
import { DifficultyLevel, XPlayer, ZeroPlayer } from "./types/types";
import { findBestMove } from "./utils/ai";
import useInterval from "./hooks/useInterval";
import clsx from "clsx";
import { boardStateReducer } from "./reducers/board-reducer";
import { BoardState, getInitialBoardState } from "./types/board-state";

export default function Home() {
    const [boardState, dispatch] = useReducer(
        boardStateReducer,
        undefined,
        () => getInitialBoardState()
    );
    const [aiIsThinking, setAiIsThinking] = useState(false);
    const [difficultyLevel, setDifficultyLevel] =
        useState<DifficultyLevel>("hard");

    const isGameOver = getIsGameOver(boardState.winner, boardState.board);

    const doMove = useCallback((index: number): void => {
        dispatch({
            type: "move",
            payload: {
                index: index,
            },
        });
    }, []);

    function handleClick(index: number) {
        if (boardState.turn !== XPlayer || boardState.board[index] !== null) {
            return;
        }
        doMove(index);
    }

    const doAiAction = useCallback(
        (boardState: BoardState, difficultyLevel: DifficultyLevel) => {
            setAiIsThinking(true);
            const bestMove = findBestMove(boardState.board, difficultyLevel);
            if (bestMove !== -1) {
                setTimeout(() => {
                    doMove(bestMove);
                    setAiIsThinking(false);
                }, 500);
            }
        },
        [doMove]
    );

    function handleRestartGame() {
        dispatch({
            type: "restart",
        });
    }

    function handleDifficultyLevelChange(difficultyLevel: DifficultyLevel) {
        setDifficultyLevel(difficultyLevel);
    }

    const runGame = useCallback(
        (
            boardState: BoardState,
            aiIsThinking: boolean,
            difficultyLevel: DifficultyLevel
        ) => {
            if (
                boardState.turn === ZeroPlayer &&
                !aiIsThinking &&
                !getIsGameOver(boardState.winner, boardState.board)
            ) {
                doAiAction(boardState, difficultyLevel);
            }
        },
        [doAiAction]
    );

    useInterval(() => {
        runGame(boardState, aiIsThinking, difficultyLevel);
    }, 150);

    return (
        <div
            className={clsx("grid justify-center", {
                "_game-over": isGameOver,
            })}
        >
            <StatusPanel
                turn={boardState.turn}
                score={boardState.score}
                difficultyLevel={difficultyLevel}
                handleChange={handleDifficultyLevelChange}
            ></StatusPanel>
            <div className="relative p-5 w-[min(100vw,calc(100vh-150px))] ">
                <Grid
                    board={boardState.board}
                    winner={boardState.winner}
                    isGameOver={isGameOver}
                    handleClick={handleClick}
                ></Grid>
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
        </div>
    );
}
