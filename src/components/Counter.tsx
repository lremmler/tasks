import React, { useState } from "react";

export function Counter(): JSX.Element {
    const [value, setValue] = useState<number>(0);
    return (
        <div>
            <h3>Counter Value: {value}</h3>
            <button onClick={() => setValue(value + 1)}>Increment</button>
            <button onClick={() => setValue(value - 1)}>Decrement</button>
            <button onClick={() => setValue(0)}>Reset</button>
        </div>
    );
}
