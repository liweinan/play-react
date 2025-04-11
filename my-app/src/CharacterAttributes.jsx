import React, { useState } from "react";
// import ReactDOM from "react-dom/client";

export default function CharacterAttributes({ totalPoints }) {
    const [tp, setTp] = useState(totalPoints);
    const [strength, setStrength] = useState(0);
    const [speed, setSpeed] = useState(0);

    const handleAttributeChange = (event, attributeName) => {
        const val = Number(event.target.value);

        console.log("target val: " + val);
        console.log("before speed val: " + speed);
        console.log("before strength val: " + strength);
        console.log("before tp val: " + tp);

        if (attributeName === "strength") {
            if (val + speed > totalPoints) {
                const diff = val + speed - totalPoints;
                setStrength(val);
                setSpeed(speed - diff);
            } else {
                const diff = val - strength;
                setStrength(val);
                setTp(tp - diff);
            }
        } else if (attributeName === "speed") {
            if (val + strength > totalPoints) {
                const diff = val + strength - totalPoints;
                setSpeed(val);
                setStrength(strength - diff, 0);
            } else {
                const diff = val - speed;
                setSpeed(val);
                setTp(tp - diff);
            }
        }

        console.log("target val: " + val);
        console.log("after speed val: " + speed);
        console.log("after strength val: " + strength);
        console.log("after tp val: " + tp);

    };

    return (
        <div>
            Character stats: <span id="points">{tp}</span> points
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

