import React, { useState } from "react";

export function ChangeType(): JSX.Element {
    const [type, setType] = useState<string>("Short Answer");

    const changeType = () => {
        setType(type === "Short Answer" ? "Multiple Choice" : "Short Answer");
    };

    return (
        <div>
            <button onClick={changeType}>Change Type</button>
            <div>Current Type: {type}</div>
        </div>
    );
}
