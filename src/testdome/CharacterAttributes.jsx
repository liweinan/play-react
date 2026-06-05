import { useState } from "react";

// https://www.testdome.com/library?page=1&skillArea=48&questionId=129894
export default function CharacterPoints({ totalPoints }) {
  const [strength, setStrength] = useState(0);
  const [speed, setSpeed] = useState(0);

  const remainingPoints = totalPoints - (strength + speed);

  const increaseStrength = () => {
    if (remainingPoints > 0) {
      setStrength(strength + 1);
    }
  };

  const decreaseStrength = () => {
    if (strength > 0) {
      setStrength(strength - 1);
    }
  };

  const increaseSpeed = () => {
    if (remainingPoints > 0) {
      setSpeed(speed + 1);
    }
  };

  const decreaseSpeed = () => {
    if (speed > 0) {
      setSpeed(speed - 1);
    }
  };

  return (
    <div>
      Character stats: <span>{remainingPoints}</span> points
      <div>
        <button onClick={decreaseStrength}>-</button>
        <input
          type="number"
          step="1"
          style={{ width: "50px", textAlign: "center" }}
          readOnly
          value={strength}
        />
        <button onClick={increaseStrength}>+</button>
        Strength
      </div>
      <div>
        <button onClick={decreaseSpeed}>-</button>
        <input
          type="number"
          step="1"
          style={{ width: "50px", textAlign: "center" }}
          readOnly
          value={speed}
        />
        <button onClick={increaseSpeed}>+</button>
        Speed
      </div>
    </div>
  );
}

// document.body.innerHTML = "<div id='root'></div>";
// const root = createRoot(document.getElementById("root"));
// root.render(<CharacterPoints totalPoints={5} />);
