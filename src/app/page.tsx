"use client";
import { useCallback, useState } from "react";
import { Grid } from "./components/grid";
import { getEmptyWinner, getIsGameOver, getWinner } from "./utils/board";
import { StatusPanel } from "./components/status-panel";
import {
    Board,
    DifficultyLevel,
    generateBoard,
    Player,
    Score,
    Winner,
    XPlayer,
    ZeroPlayer,
} from "./types/types";
import { findBestMove } from "./utils/ai";
import useInterval from "./hooks/useInterval";
import clsx from "clsx";

export default function Home() {
    const [turn, setTurn] = useState<Player>(1);
    const [board, setBoard] = useState<Board>(() => generateBoard());
    const [score, setScore] = useState<Score>([0, 0]);
    const [winner, setWinner] = useState<Winner>(getEmptyWinner());
    const [aiIsThinking, setAiIsThinking] = useState(false);
    const [difficultyLevel, setDifficultyLevel] =
        useState<DifficultyLevel>("hard");

    const doMove = useCallback(
        (player: Player, index: number, board: Board, score: Score): Board => {
            const newBoard: Board = board.map((cell, idx) =>
                idx === index ? player : cell
            );
            setBoard(newBoard);
            setTurn(player === 1 ? ZeroPlayer : XPlayer);
            const winner = getWinner(newBoard);
            setWinner(winner);
            if (winner.player !== null && getIsGameOver(winner, newBoard)) {
                const newScore: [number, number] = [...score];
                newScore[winner.player] += 1;
                setScore(newScore);
            }
            return newBoard;
        },
        []
    );

    function handleClick(index: number) {
        if (turn !== XPlayer || board[index] !== null) {
            return;
        }
        doMove(XPlayer, index, board, score);
    }

    const doAiAction = useCallback(
        (board: Board, score: Score, difficultyLevel: DifficultyLevel) => {
            setAiIsThinking(true);
            const bestMove = findBestMove(board, difficultyLevel);
            if (bestMove !== -1) {
                setTimeout(() => {
                    doMove(ZeroPlayer, bestMove, board, score);
                    setAiIsThinking(false);
                }, 500);
            }
        },
        [doMove]
    );

    function handleRestartGame() {
        const newBoard = generateBoard();
        setBoard(newBoard);
        setWinner(getEmptyWinner());
    }

    function handleDifficultyLevelChange(difficultyLevel: DifficultyLevel) {
        setDifficultyLevel(difficultyLevel);
    }

    const runGame = useCallback(
        (
            turn: Player,
            board: Board,
            winner: Winner,
            aiIsThinking: boolean,
            score: Score,
            difficultyLevel: DifficultyLevel
        ) => {
            if (
                turn === ZeroPlayer &&
                !aiIsThinking &&
                !getIsGameOver(winner, board)
            ) {
                doAiAction(board, score, difficultyLevel);
            }
        },
        [doAiAction]
    );

    useInterval(() => {
        runGame(turn, board, winner, aiIsThinking, score, difficultyLevel);
    }, 150);

    return (
        <div
            className={clsx("grid justify-center", {
                "_game-over": getIsGameOver(winner, board),
            })}
        >
            <StatusPanel
                turn={turn}
                score={score}
                difficultyLevel={difficultyLevel}
                handleChange={handleDifficultyLevelChange}
            ></StatusPanel>
            <div className="grid grid-rows-[150px,auto] justify-items-center p-5 w-[min(100vw,calc(100vh-150px))] ">
                <Grid
                    board={board}
                    winner={winner}
                    handleClick={handleClick}
                    handleRestartGame={handleRestartGame}
                ></Grid>
            </div>
        </div>
    );
}
