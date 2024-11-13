import { Cell } from "../types/types";
import { Cross } from "./cross";
import { Zero } from "./zero";
import clsx from "clsx";

export function GridCell({
    cell,
    isFaded,
    handleClick,
}: {
    cell: Cell;
    isFaded: boolean;
    handleClick: () => void;
}) {
    return (
        <div
            className={clsx(
                "grid-cell flex flex-col aspect-square p-5 cursor-pointer transition hover:bg-gray-400/10",
                {
                    "opacity-10": isFaded,
                }
            )}
            onClick={handleClick}
        >
            {cell !== null && (cell ? <Cross></Cross> : <Zero></Zero>)}
        </div>
    );
}
