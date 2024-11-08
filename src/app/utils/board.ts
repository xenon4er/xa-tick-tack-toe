import {Board, Winner} from "../types/types";

export function getEmptyWinner(): Winner {
    return {
        player: null,
        combination: null,
    };
}

export function getWinner(board: Board): Winner {
    const lines: Array<[number, number, number]> = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            board[a] !== null &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return {
                player: board[a],
                combination: lines[i],
            };
        }
    }
    return getEmptyWinner();
}

export function getIsGameOver(winner: Winner, board: Board): boolean {
    return winner.player !== null || !getIsMovesLeft(board);
}

export function getIsMovesLeft(board: Board): boolean {
        return board.some(c => c === null);
}
