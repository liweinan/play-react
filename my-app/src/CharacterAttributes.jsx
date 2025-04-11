import React, { useState } from "react";
// import ReactDOM from "react-dom/client";

export default function CharacterAttributes({ totalPoints }) {
    const [strength, setStrength] = useState(0);
    const [speed, setSpeed] = useState(0);

    const handleAttributeChange = (event, attributeName) => {
        const val = Number(event.target.value);
        console.log('before...', attributeName, val, speed, strength)

        if (attributeName === "strength") {
            setStrength(Math.min(val, totalPoints))
            setSpeed(Math.min(totalPoints - val, speed))
        } else if (attributeName === "speed") {
            setSpeed(Math.min(val, totalPoints))
            setStrength(Math.min(totalPoints - val, strength))
        }
        console.log('after...', speed, strength)
    };

    return (
        <div>
            Character stats: <span id="points">{totalPoints - speed - strength}</span> points
            <div>
                <input
                    type="range"
                    id="strength"
                    min="0"
                    max={totalPoints}
                    value={strength}
                    step="1"
                    onChange={(event) => handleAttributeChange(event, "strength")}
                />
                Strength {strength}
            </div>
            <div>
                <input
                    type="range"
                    id="speed"
                    min="0"
                    max={totalPoints}
                    value={speed}
                    step="1"
                    onChange={(event) => handleAttributeChange(event, "speed")}
                />
                Speed {speed}
            </div>
        </div>
    );
}

// document.body.innerHTML = "<div id='root'></div>";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<CharacterAttributes totalPoints={15} />);

