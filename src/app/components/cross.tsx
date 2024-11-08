import styles from "./cross.module.css";

export function Cross() {
    return (
        <div className="flex justify-center h-full">
            <div
                className={`flex relative justify-center ${styles.shape}`}
            ></div>
        </div>
    );
}
