import { ReactNode } from "react";
import { Cross } from "./cross";
import { Zero } from "./zero";
import { DifficultyLevel, DifficultyLevelList, Score } from "../types/types";
import clsx from "clsx";

function StatusPlayer({
    score,
    isActive,
    children,
}: {
    score: number;
    isActive: boolean;
    children: ReactNode;
}) {
    return (
        <div
            className={clsx(
                "grid grid-cols-[repeat(2,1fr)] p-2 h-full rounded-xl items-center",
                {
                    "shadow-[0_0_10px_0_currentColor]": isActive,
                }
            )}
        >
            {children}
            <div className="text-5xl text-center">{score}</div>
        </div>
    );
}

function DifficultyLevelPanel({
    difficultyLevel,
    handleChange,
}: {
    difficultyLevel: DifficultyLevel;
    handleChange: (difficultyLevel: DifficultyLevel) => void;
}) {
    function getRadio(id: DifficultyLevel) {
        return (
            <div key={id}>
                <input
                    type="radio"
                    id={id}
                    name={id}
                    value={id}
                    checked={difficultyLevel === id}
                    onChange={() => handleChange(id)}
                />
                <label className="p-2" htmlFor={id}>
                    {id}
                </label>
            </div>
        );
    }

    return (
        <fieldset>
            {DifficultyLevelList.map((level) => getRadio(level))}
        </fieldset>
    );
}

export function StatusPanel({
    turn,
    score,
    difficultyLevel,
    handleChange,
}: {
    turn: number;
    score: Score;
    difficultyLevel: DifficultyLevel;
    handleChange: (difficultyLevel: DifficultyLevel) => void;
}) {
    return (
        <div className="grid w-full p-5 grid-cols-[repeat(3,1fr)] gap-x-4">
            <StatusPlayer score={score[1]} isActive={turn === 1}>
                <Cross></Cross>
            </StatusPlayer>
            <StatusPlayer score={score[0]} isActive={turn === 0}>
                <Zero></Zero>
            </StatusPlayer>
            <DifficultyLevelPanel
                difficultyLevel={difficultyLevel}
                handleChange={handleChange}
            ></DifficultyLevelPanel>
        </div>
    );
}
