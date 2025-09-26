import React, { useState } from "react";

export function TwoDice(): JSX.Element {
    const [leftDie, setLeftDie] = useState<number>(1);
    const [rightDie, setRightDie] = useState<number>(2);

    const rollLeft = () => {
        setLeftDie(Math.floor(Math.random() * 6) + 1);
    };

    const rollRight = () => {
        setRightDie(Math.floor(Math.random() * 6) + 1);
    };

    const getMessage = () => {
        if (leftDie === 1 && rightDie === 1) {
            return "Lose! Snake Eyes!";
        } else if (leftDie === rightDie) {
            return "Win!";
        }
        return "";
    };

    return (
        <div>
            <div>
                <span data-testid="left-die">Left Die: {leftDie}</span>
                <button onClick={rollLeft}>Roll Left</button>
            </div>
            <div>
                <span data-testid="right-die">Right Die: {rightDie}</span>
                <button onClick={rollRight}>Roll Right</button>
            </div>
            <div>{getMessage()}</div>
        </div>
    );
}
