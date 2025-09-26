import React, { useState } from "react";

export function CycleHoliday(): JSX.Element {
    type Holiday = "🎄 Christmas" | "🎃 Halloween" | "🦃 Thanksgiving" | "🐇 Easter" | "🎆 New Year";
    
    const holidayOrder: Holiday[] = [
        "🎄 Christmas",
        "🎃 Halloween", 
        "🦃 Thanksgiving",
        "🐇 Easter",
        "🎆 New Year"
    ];

    const [currentHoliday, setCurrentHoliday] = useState<Holiday>("🎄 Christmas");

    const cycleByAlphabet = () => {
        const currentIndex = holidayOrder.indexOf(currentHoliday);
        const nextIndex = (currentIndex + 1) % holidayOrder.length;
        setCurrentHoliday(holidayOrder[nextIndex]);
    };

    const cycleByYear = () => {
        const yearOrder: Holiday[] = [
            "🎆 New Year",    // January
            "🐇 Easter",      // Spring 
            "🎃 Halloween",   // October
            "🦃 Thanksgiving", // November
            "🎄 Christmas"    // December
        ];
        const currentIndex = yearOrder.indexOf(currentHoliday);
        const nextIndex = (currentIndex + 1) % yearOrder.length;
        setCurrentHoliday(yearOrder[nextIndex]);
    };

    return (
        <div>
            <div>Holiday: {currentHoliday}</div>
            <button onClick={cycleByAlphabet}>Advance by Alphabet</button>
            <button onClick={cycleByYear}>Advance by Year</button>
        </div>
    );
}
