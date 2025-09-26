import React, { useState } from "react";

export function RevealAnswer(): JSX.Element {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <button onClick={toggleVisibility}>Reveal Answer</button>
            {isVisible && <div>42</div>}
        </div>
    );
}
