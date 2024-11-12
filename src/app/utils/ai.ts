import {getWinner, getIsMovesLeft} from "./board";
import {Board, DifficultyLevel, DifficultyLevelMap, XPlayer, ZeroPlayer} from "../types/types";

function evaluate(board: Board): number {
    const winner = getWinner(board).player;
    switch(winner) {
        case ZeroPlayer:
            return - 10;
        case XPlayer:
            return 10;
        default:
            return 0;
    }
}

function minimax(board: Board, depth: number, isMax: boolean): number {
    const score = evaluate(board);
    if (score === 10 || score === -10) {
        return score;
    }
    if (!getIsMovesLeft(board)) {
        return 0;
    }

    if (isMax) {
        let best = -1000;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = XPlayer;
                best = Math.max(best, minimax(board, depth, !isMax));
                board[i] = null;
            }
        }
        return best;
    } else {
        let best = 1000;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = ZeroPlayer;
                best = Math.min(best, minimax(board, depth, !isMax));
                board[i] = null;
            }
        }
        return best;
    }
}

export function findBestMove(board: Board, difficultyLevel: DifficultyLevel): number {
    let bestMove = 1000;
    let idx = -1;
    let firsPossibleMove;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            if (firsPossibleMove === undefined) {
                firsPossibleMove = i;
            }
            board[i] = ZeroPlayer;
            const move = minimax(board, 0, true);
            board[i] = null;
            if (move < bestMove && Math.random() < DifficultyLevelMap[difficultyLevel]) {
                bestMove = move;
                idx = i;
            }
        }
    }
    return idx !== -1
        ? idx
        : (firsPossibleMove ?? idx);
}