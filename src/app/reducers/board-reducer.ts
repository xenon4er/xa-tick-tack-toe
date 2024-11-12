import {BoardState} from "../types/board-state";
import {generateBoard, Score, XPlayer, ZeroPlayer} from "../types/types";
import {getEmptyWinner, getIsGameOver, getWinner} from "../utils/board";

type MoveAction = {
    type: "move";
    payload: {
        index: number
    };
};

type RestartAction = {
    type: "restart";
};

type Action = MoveAction | RestartAction

export function boardStateReducer(boardState: BoardState, action: Action): BoardState {
    switch (action.type) {
        case "move":
            const board = boardState.board.map((cell, idx) =>
                idx === action.payload.index ? boardState.turn : cell
            );
            const winner = getWinner(board);
            const score: Score = [...boardState.score];

            if (winner.player !== null && getIsGameOver(winner, board)) {
                score[winner.player] += 1;
            }

            return {
                ...boardState,
                board: board,
                turn: boardState.turn === XPlayer
                    ? ZeroPlayer
                    : XPlayer,
                winner: winner,
                score: score
            };
        case "restart":
            return {
                ...boardState,
                board: generateBoard(),
                winner: getEmptyWinner()
            };
    }
}