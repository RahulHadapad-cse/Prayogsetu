
import React, { useState } from "react";

import Fractions from "./fractions/Fractions.jsx";
import AreaPerimeter from "./area-perimeter/AreaPerimeter.jsx";
import RatioProportion from "./ratio-proportion/RatioProportion.jsx";
import LinearEquations from "./linear-equations/LinearEquations.jsx";
import PythagoreanTheorem from "./pythagorean-theorem/PythagoreanTheorem.jsx";
import Probability from "./probability/Probability.jsx";

const experiments = [
  {
    id: "fractions",
    title: "Fractions",
    description: "Understand fractions using visual models and interactive activities.",
    icon: "🍕",
  },
  {
    id: "area",
    title: "Area and Perimeter",
    description: "Explore how to calculate the area and perimeter of different shapes.",
    icon: "📐",
  },
  {
    id: "ratio",
    title: "Ratio and Proportion",
    description: "Learn to compare quantities using ratios and proportions.",
    icon: "⚖️",
  },
  {
    id: "linear",
    title: "Linear Equations and Graphs",
    description: "Understand linear equations and explore their graphs.",
    icon: "📈",
  },
  {
    id: "pythagorean",
    title: "Pythagorean Theorem",
    description: "Discover the relationship between the sides of a right triangle.",
    icon: "📏",
  },
  {
    id: "probability",
    title: "Probability",
    description: "Explore probability through interactive dice experiments.",
    icon: "🎲",
  },
];

const simulationComponents = {
  fractions: Fractions,
  area: AreaPerimeter,
  ratio: RatioProportion,
  linear: LinearEquations,
  pythagorean: PythagoreanTheorem,
  probability: Probability,
};

export default function MathematicsHome() {
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  if (selectedExperiment) {
    const SelectedComponent = simulationComponents[selectedExperiment];

    return (
      <div>
        <button
          onClick={() => setSelectedExperiment(null)}
          style={{
            margin: "16px",
            padding: "10px 18px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            background: "#ffffff",
            color: "#1e293b",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ← Back to Mathematics Experiments
        </button>

        <SelectedComponent />
      </div>
    );
  }

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "30px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#1e293b",
      }}
    >
      <header
        style={{
          padding: "35px 25px",
          borderRadius: "16px",
          background: "linear-gradient(120deg, #4c1d95, #7c3aed)",
          color: "white",
          marginBottom: "25px",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "2px",
            fontWeight: "bold",
          }}
        >
          PRAYOGSETU · VIRTUAL STEM LAB
        </p>

        <h1 style={{ fontSize: "32px", margin: "10px 0" }}>
          Mathematics Virtual Laboratory
        </h1>

        <p style={{ lineHeight: "1.6", margin: 0 }}>
          Learn Mathematics through interactive experiments, simulations,
          graphs and quizzes.
        </p>
      </header>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "6px" }}>
          Mathematics Experiments
        </h2>

        <p style={{ color: "#64748b" }}>
          Select an experiment to start learning.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px",
        }}
      >
        {experiments.map((experiment, index) => (
          <article
            key={experiment.id}
            style={{
              padding: "22px",
              border: "1px solid #dbe3ee",
              borderRadius: "14px",
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div style={{ fontSize: "35px", marginBottom: "12px" }}>
              {experiment.icon}
            </div>

            <p
              style={{
                color: "#7c3aed",
                fontSize: "12px",
                fontWeight: "bold",
                margin: "0 0 8px",
              }}
            >
              EXPERIMENT {index + 1}
            </p>

            <h3 style={{ margin: "0 0 10px", fontSize: "19px" }}>
              {experiment.title}
            </h3>

            <p
              style={{
                color: "#64748b",
                fontSize: "14px",
                lineHeight: "1.6",
                minHeight: "65px",
              }}
            >
              {experiment.description}
            </p>

            <button
              onClick={() => setSelectedExperiment(experiment.id)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                border: "none",
                borderRadius: "8px",
                background: "#7c3aed",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Start Experiment →
            </button>
          </article>
        ))}
      </div>

      <footer
        style={{
          marginTop: "30px",
          padding: "16px",
          borderTop: "1px solid #dbe3ee",
          textAlign: "center",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        PrayogSetu – Making STEM Learning Interactive
      </footer>
    </main>
  );
}
