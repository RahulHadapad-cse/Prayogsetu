
import React, { useState } from "react";

import PhysicsHome from "./simulations/physics/PhysicsHome.jsx";
import ChemistryHome from "./simulations/chemistry/ChemistryHome.jsx";
import MathematicsHome from "./simulations/mathematics/MathematicsHome.jsx";

function App() {
  const [selectedSubject, setSelectedSubject] = useState("physics");

  const buttonStyle = (subject, activeColor) => ({
    padding: "11px 25px",
    border: "none",
    borderRadius: "8px",
    background:
      selectedSubject === subject ? activeColor : "white",
    color:
      selectedSubject === subject ? "white" : "#172554",
    fontWeight: "bold",
    cursor: "pointer",
  });

  return (
    <div>
      <header
        style={{
          padding: "20px",
          background: "#172554",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: "0 0 15px" }}>PrayogSetu</h1>

        <p style={{ margin: "0 0 15px" }}>
          Virtual STEM Laboratory
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setSelectedSubject("physics")}
            style={buttonStyle("physics", "#2563eb")}
          >
            ⚡ Physics
          </button>

          <button
            onClick={() => setSelectedSubject("chemistry")}
            style={buttonStyle("chemistry", "#059669")}
          >
            🧪 Chemistry
          </button>

          <button
            onClick={() => setSelectedSubject("mathematics")}
            style={buttonStyle("mathematics", "#7c3aed")}
          >
            📐 Mathematics
          </button>
        </div>
      </header>

      {selectedSubject === "physics" && <PhysicsHome />}

      {selectedSubject === "chemistry" && <ChemistryHome />}

      {selectedSubject === "mathematics" && <MathematicsHome />}
    </div>
  );
}

export default App;
