import {getEmptyWinner} from "../utils/board";
import {Board, generateBoard, Player, Score, Winner, XPlayer} from "./types";

export type BoardState = {
    turn: Player;
    board: Board;
    score: Score;
    winner: Winner;
}

export function getInitialBoardState(): BoardState {
    return {
        turn: XPlayer,
        score: [0, 0],
        board: generateBoard(),
        // board: [null, 1, null, null, null, 1, 0, 0, null],
        winner: getEmptyWinner(),
    };
}