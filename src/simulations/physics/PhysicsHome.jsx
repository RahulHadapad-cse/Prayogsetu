import React, { useState } from "react";

import OhmsLaw from "./OhmsLaw.jsx";
import Electromagnetism from "./electromagnetism/Electromagnetism.jsx";
import ReflectionOfLight from "./reflection/ReflectionOfLight.jsx";
import SimplePendulum from "./simple-pendulum/SimplePendulum.jsx";
import SeriesParallel from "./series-parallel/SeriesParallel.jsx";
import ConvexLens from "./convex-lens/ConvexLens.jsx";

const experiments = [
  {
    id: "ohms",
    title: "Ohm's Law",
    description: "Explore the relationship between voltage, current and resistance.",
    icon: "⚡",
  },
  {
    id: "electromagnetism",
    title: "Electromagnetic Induction",
    description: "Understand how changing magnetic flux produces induced EMF.",
    icon: "🧲",
  },
  {
    id: "reflection",
    title: "Reflection of Light",
    description: "Explore the laws of reflection using an interactive ray diagram.",
    icon: "💡",
  },
  {
    id: "pendulum",
    title: "Simple Pendulum",
    description: "Study the time period and frequency of a pendulum.",
    icon: "⏱️",
  },
  {
    id: "circuits",
    title: "Series and Parallel Circuits",
    description: "Compare current, voltage and equivalent resistance.",
    icon: "🔌",
  },
  {
    id: "lens",
    title: "Convex Lens",
    description: "Study image formation by changing object distance and focal length.",
    icon: "🔎",
  },
];

const simulationComponents = {
  ohms: OhmsLaw,
  electromagnetism: Electromagnetism,
  reflection: ReflectionOfLight,
  pendulum: SimplePendulum,
  circuits: SeriesParallel,
  lens: ConvexLens,
};

export default function PhysicsHome() {
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
          ← Back to Physics Experiments
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
          background: "linear-gradient(120deg, #172554, #2563eb)",
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
          Physics Virtual Laboratory
        </h1>

        <p style={{ lineHeight: "1.6", margin: 0 }}>
          Learn Physics through interactive experiments, simulations,
          graphs and quizzes.
        </p>
      </header>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "6px" }}>Physics Experiments</h2>
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
                color: "#2563eb",
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
                background: "#2563eb",
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