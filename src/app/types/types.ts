export type Player = 1 | 0;

export const XPlayer: Player = 1;

export const ZeroPlayer: Player = 0;

export type Cell = Player | null;

export type Board = Cell[];

export function generateBoard(): Board {
    return Array(9).fill(null);
}

export type Score = [number, number];

export type Winner = {
    player: Player | null;
    combination: [number, number, number] | null;
};

export type DifficultyLevel = "hard" | "medium" | "easy";

export const DifficultyLevelList: DifficultyLevel[] = ["hard", "medium", "easy"];

export const DifficultyLevelMap: Record<DifficultyLevel, number> = {
    hard: 1,
    medium: 0.7,
    easy: 0.5,
};
