import React, { useState } from "react";

export function StartAttempt(): JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [inProgress, setInProgress] = useState<boolean>(false);

    const startQuiz = () => {
        setInProgress(true);
        setAttempts(attempts - 1);
    };

    const stopQuiz = () => {
        setInProgress(false);
    };

    const mulligan = () => {
        setAttempts(attempts + 1);
    };

    return (
        <div>
            <div>Attempts: {attempts}</div>
            <button 
                onClick={startQuiz} 
                disabled={inProgress || attempts === 0}
            >
                Start Quiz
            </button>
            <button 
                onClick={stopQuiz} 
                disabled={!inProgress}
            >
                Stop Quiz
            </button>
            <button 
                onClick={mulligan} 
                disabled={inProgress}
            >
                Mulligan
            </button>
        </div>
    );
}
