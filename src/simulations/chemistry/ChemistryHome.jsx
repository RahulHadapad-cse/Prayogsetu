
import React, { useState } from "react";

import StatesOfMatter from "./states-of-matter/StatesOfMatter.jsx";
import SeparationOfMixtures from "./separation-of-mixtures/SeparationOfMixtures.jsx";
import AcidBaseNeutralization from "./acid-base/AcidBaseNeutralization.jsx";
import ConservationOfMass from "./conservation-of-mass/ConservationOfMass.jsx";
import ReactionRate from "./reaction-rate/ReactionRate.jsx";
import ElectrolysisOfWater from "./electrolysis-water/ElectrolysisOfWater.jsx";

const experiments = [
  {
    id: "states",
    title: "States of Matter",
    description: "Explore how particles behave in solids, liquids and gases by changing temperature.",
    icon: "🧊",
  },
  {
    id: "separation",
    title: "Separation of Mixtures",
    description: "Learn different techniques to separate mixtures such as filtration and evaporation.",
    icon: "🧪",
  },
  {
    id: "acid-base",
    title: "Acid-Base Neutralization",
    description: "Understand how acids and bases react to form salt and water.",
    icon: "⚗️",
  },
  {
    id: "conservation",
    title: "Conservation of Mass",
    description: "Study the conservation of mass during chemical reactions in open and closed systems.",
    icon: "⚖️",
  },
  {
    id: "reaction-rate",
    title: "Factors Affecting Reaction Rate",
    description: "Explore how temperature, concentration and surface area affect reaction speed.",
    icon: "🔥",
  },
  {
    id: "electrolysis",
    title: "Electrolysis of Water",
    description: "Understand how electrical energy decomposes water into hydrogen and oxygen.",
    icon: "⚡",
  },
];

const simulationComponents = {
  states: StatesOfMatter,
  separation: SeparationOfMixtures,
  "acid-base": AcidBaseNeutralization,
  conservation: ConservationOfMass,
  "reaction-rate": ReactionRate,
  electrolysis: ElectrolysisOfWater,
};

export default function ChemistryHome() {
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
          ← Back to Chemistry Experiments
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
          background: "linear-gradient(120deg, #064e3b, #059669)",
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
          Chemistry Virtual Laboratory
        </h1>

        <p style={{ lineHeight: "1.6", margin: 0 }}>
          Learn Chemistry through interactive experiments, simulations,
          graphs and quizzes.
        </p>
      </header>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "6px" }}>Chemistry Experiments</h2>
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
                color: "#059669",
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
                background: "#059669",
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
