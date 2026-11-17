
import React, { useState } from "react";
import "./SeparationOfMixtures.css";

const experiments = [
  {
    id: "sand-water",
    title: "Sand and Water",
    method: "Filtration",
    icon: "🪨",
    description: "Separate insoluble sand from water using filter paper.",
    steps: [
      "Place the sand-water mixture in the beaker.",
      "Put filter paper inside the funnel.",
      "Pour the mixture into the prepared funnel.",
      "Collect the filtrate and inspect the residue."
    ],
    actions: [
      "Place mixture in beaker",
      "Insert filter paper",
      "Pour into funnel",
      "Collect filtered water"
    ],
    result: "Sand stays on the filter paper as residue; water passes through as filtrate.",
    principle: "Filtration separates an insoluble solid from a liquid using a porous barrier."
  },
  {
    id: "salt-water",
    title: "Salt and Water",
    method: "Evaporation",
    icon: "🧂",
    description: "Recover dissolved salt by evaporating water.",
    steps: [
      "Transfer the salt solution into the evaporating dish.",
      "Switch on the virtual heater.",
      "Allow water to evaporate.",
      "Inspect the salt left in the dish."
    ],
    actions: [
      "Pour into dish",
      "Turn on heater",
      "Evaporate water",
      "Collect salt"
    ],
    result: "Salt remains in the dish after water evaporates.",
    principle: "Evaporation removes water and leaves dissolved salt behind."
  },
  {
    id: "iron-sand",
    title: "Iron Filings and Sand",
    method: "Magnetic Separation",
    icon: "🧲",
    description: "Separate magnetic iron filings from sand.",
    steps: [
      "Place the mixture on the tray.",
      "Move the magnet over the mixture.",
      "Lift the attracted iron filings.",
      "Transfer the iron to a separate container."
    ],
    actions: [
      "Place mixture on tray",
      "Bring magnet near",
      "Lift iron filings",
      "Collect iron separately"
    ],
    result: "Iron filings are collected separately; sand remains in the tray.",
    principle: "Magnetic separation uses the magnetic properties of iron."
  },
  {
    id: "oil-water",
    title: "Oil and Water",
    method: "Separating Funnel",
    icon: "🧪",
    description: "Separate immiscible liquids with different densities.",
    steps: [
      "Pour oil and water into the separating funnel.",
      "Wait for the liquids to form two layers.",
      "Open the stopcock to drain the lower water layer.",
      "Close the tap and collect the oil separately."
    ],
    actions: [
      "Fill separating funnel",
      "Allow layers to settle",
      "Drain lower water layer",
      "Collect upper oil layer"
    ],
    result: "Water and oil are collected separately.",
    principle: "Immiscible liquids form layers according to density and can be separated by controlled draining."
  }
];

const questions = [
  {
    q: "Which method separates sand from water?",
    options: ["Evaporation", "Filtration", "Magnetism", "Distillation"],
    answer: 1,
    why: "Filter paper traps insoluble sand while water passes through."
  },
  {
    q: "How is salt recovered from salt water?",
    options: ["Magnetism", "Filtration", "Evaporation", "Sieving"],
    answer: 2,
    why: "The water evaporates, leaving salt behind."
  },
  {
    q: "What attracts iron filings?",
    options: ["A filter", "A magnet", "A funnel", "A heater"],
    answer: 1,
    why: "Iron is magnetic; sand is not."
  },
  {
    q: "Which apparatus separates oil and water?",
    options: ["Thermometer", "Burette", "Separating funnel", "Filter paper"],
    answer: 2,
    why: "A separating funnel drains the denser lower liquid first."
  }
];

function Apparatus({ id, stage, onDrop }) {
  if (id === "sand-water") {
    return (
      <div className="somv-scene">
        <div className="somv-station">
          <strong>Mixture container</strong>
          <div
            className="somv-source"
            draggable={stage === 0}
            onDragStart={(e) =>
              e.dataTransfer.setData("text/plain", "mixture")
            }
          >
            🪨 + 💧
          </div>
          <small>Drag mixture into the beaker</small>
        </div>

        <div className="somv-station">
          <strong>Beaker</strong>
          <div
            className="somv-beaker"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (
                e.dataTransfer.getData("text/plain") === "mixture"
              ) onDrop();
            }}
          >
            {stage >= 1 ? (
              <div className="somv-liquid somv-muddy" />
            ) : (
              <span>Drop here</span>
            )}
          </div>
        </div>

        <div className="somv-station">
          <strong>Funnel and filter</strong>
          <div className="somv-funnel">
            {stage >= 2 && <div className="somv-paper" />}
            {stage >= 3 && <span>● ● ●</span>}
          </div>
          <div className="somv-stem" />
          <div className="somv-beaker somv-small">
            {stage >= 4 && <div className="somv-liquid somv-clear" />}
          </div>
          <small>Filtered water collection</small>
        </div>
      </div>
    );
  }

  if (id === "salt-water") {
    return (
      <div className="somv-scene">
        <div className="somv-station">
          <strong>Evaporating dish</strong>
          <div className="somv-dish">
            {stage >= 3 ? (
              <span className="somv-crystals">✧ ✧ ✧</span>
            ) : stage >= 1 ? (
              <span className="somv-water">Salt water</span>
            ) : "Empty"}
          </div>
          <div className="somv-heat">
            {stage >= 2 && stage < 4 ? "🔥 Heater ON" : "Heater OFF"}
          </div>
          <small>
            {stage >= 4 ? "Salt collected" : "Virtual apparatus"}
          </small>
        </div>
      </div>
    );
  }

  if (id === "iron-sand") {
    return (
      <div className="somv-scene">
        <div className="somv-station">
          <strong>Magnet</strong>
          <div className={`somv-magnet ${stage >= 2 ? "somv-lowered" : ""}`}>
            🧲 {stage >= 3 && "⚫⚫⚫"}
          </div>
        </div>
        <div className="somv-station">
          <strong>Mixture tray</strong>
          <div className="somv-tray">
            {stage >= 1 ? (
              <>
                <span>🟤 🟤 🟤</span>
                {stage < 3 && <span>⚫ ⚫ ⚫</span>}
              </>
            ) : "Empty tray"}
          </div>
          <small>
            {stage >= 4
              ? "Iron collected separately"
              : "Sand remains in the tray"}
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="somv-scene">
      <div className="somv-station">
        <strong>Separating funnel</strong>
        <div className="somv-separating">
          {stage >= 1 && <div className="somv-oil">Oil</div>}
          {stage >= 1 && stage < 3 && (
            <div className="somv-water-layer">Water</div>
          )}
        </div>
        <div className="somv-tap">
          {stage >= 3 ? "Tap opened: water drained" : "Tap closed"}
        </div>
      </div>
      <div className="somv-station">
        <strong>Collection vessels</strong>
        <div className="somv-collection">
          {stage >= 3 ? "💧 Water collected" : "Empty"}
        </div>
        <div className="somv-collection">
          {stage >= 4 ? "🟡 Oil collected" : "Empty"}
        </div>
      </div>
    </div>
  );
}

export default function SeparationOfMixtures() {
  const [screen, setScreen] = useState(0);
  const [selectedId, setSelectedId] = useState("sand-water");
  const [progress, setProgress] = useState({});
  const [readings, setReadings] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const experiment = experiments.find((x) => x.id === selectedId);
  const stage = progress[selectedId] || 0;
  const complete = stage === experiment.steps.length;
  const recorded = readings.some((r) => r.id === selectedId);

  const score = questions.filter(
    (q, i) => answers[i] === q.answer
  ).length;

  const advance = () => {
    setProgress((p) => ({
      ...p,
      [selectedId]: Math.min(
        (p[selectedId] || 0) + 1,
        experiment.steps.length
      )
    }));
  };

  const restartCurrent = () => {
    setProgress((p) => ({ ...p, [selectedId]: 0 }));
    setReadings((r) => r.filter((x) => x.id !== selectedId));
  };

  const record = () => {
    if (complete && !recorded) {
      setReadings((r) => [
        ...r,
        {
          id: selectedId,
          title: experiment.title,
          method: experiment.method
        }
      ]);
    }
  };

  const restartAll = () => {
    setScreen(0);
    setSelectedId("sand-water");
    setProgress({});
    setReadings([]);
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <main className="somv-lab">
      <header className="somv-header">
        <span>PRAYOGSETU · CHEMISTRY VIRTUAL LAB</span>
        <h1>🧪 Separation of Mixtures</h1>
        <p>
          Perform each separation by interacting with virtual
          laboratory equipment.
        </p>
      </header>

      <nav className="somv-tabs">
        {["Introduction", "Experiment", "Graph", "Quiz", "Results"].map(
          (label, i) => (
            <button
              key={label}
              className={screen === i ? "active" : ""}
              onClick={() => setScreen(i)}
            >
              {i + 1}. {label}
            </button>
          )
        )}
      </nav>

      {screen === 0 && (
        <section className="somv-panel">
          <h2>1. Introduction and Theory</h2>
          <p>
            A mixture contains two or more physically combined
            substances. Different properties help us separate them.
          </p>

          <div className="somv-grid">
            {experiments.map((x) => (
              <article className="somv-card" key={x.id}>
                <div className="somv-emoji">{x.icon}</div>
                <h3>{x.method}</h3>
                <p>{x.description}</p>
              </article>
            ))}
          </div>

          <h3>Learning objectives</h3>
          <ul>
            <li>Choose the correct method for each mixture.</li>
            <li>Understand the use of laboratory apparatus.</li>
            <li>Identify the separated materials.</li>
            <li>Record observations and analyse results.</li>
          </ul>

          <button className="somv-primary" onClick={() => setScreen(1)}>
            Start experiment →
          </button>
        </section>
      )}

      {screen === 1 && (
        <section className="somv-panel">
          <h2>2. Interactive Experiment</h2>
          <p>Select a mixture and perform the laboratory actions.</p>

          <div className="somv-choices">
            {experiments.map((x) => (
              <button
                key={x.id}
                className={selectedId === x.id ? "selected" : ""}
                onClick={() => setSelectedId(x.id)}
              >
                <span>{x.icon}</span>
                <strong>{x.title}</strong>
                <small>{x.method}</small>
                {(progress[x.id] || 0) === 4 && <em>✓ Completed</em>}
              </button>
            ))}
          </div>

          <article className="somv-workbench">
            <div className="somv-workhead">
              <div>
                <h3>{experiment.title}</h3>
                <p>{experiment.description}</p>
              </div>
              <span className="somv-pill">{experiment.method}</span>
            </div>

            <Apparatus
              id={selectedId}
              stage={stage}
              onDrop={() => {
                if (selectedId === "sand-water" && stage === 0) {
                  advance();
                }
              }}
            />

            <div className="somv-task">
              {complete ? (
                <>
                  <h3>✓ Separation completed!</h3>
                  <p>{experiment.result}</p>
                </>
              ) : (
                <>
                  <span>
                    STEP {stage + 1} OF {experiment.steps.length}
                  </span>
                  <h3>{experiment.steps[stage]}</h3>
                  <p>Perform the action below to continue.</p>
                  <button className="somv-primary" onClick={advance}>
                    {experiment.actions[stage]} →
                  </button>
                </>
              )}
            </div>

            {selectedId === "sand-water" && stage === 0 && (
              <p className="somv-hint-text">
                You can also drag the mixture container into the beaker.
              </p>
            )}

            <div className="somv-actions">
              <button className="somv-secondary" onClick={restartCurrent}>
                ↻ Reset this mixture
              </button>
              <button
                className="somv-primary"
                onClick={record}
                disabled={!complete || recorded}
              >
                {recorded ? "✓ Observation recorded" : "Record observation"}
              </button>
            </div>

            <div className="somv-note">
              <strong>Scientific principle:</strong> {experiment.principle}
            </div>
          </article>

          <h3>Observation table ({readings.length}/4)</h3>
          <div className="somv-tablewrap">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Mixture</th>
                  <th>Method</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {readings.length ? (
                  readings.map((r, i) => (
                    <tr key={r.id}>
                      <td>{i + 1}</td>
                      <td>{r.title}</td>
                      <td>{r.method}</td>
                      <td>Completed</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      Complete an experiment and record its observation.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {screen === 2 && (
        <section className="somv-panel">
          <h2>3. Graph and Analysis</h2>
          <p>Completed and recorded separation methods.</p>

          <div className="somv-chart">
            {experiments.map((x) => {
              const count = readings.some((r) => r.id === x.id) ? 1 : 0;
              return (
                <div className="somv-barrow" key={x.id}>
                  <span>{x.method}</span>
                  <div className="somv-track">
                    <div style={{ width: count ? "100%" : "0%" }} />
                  </div>
                  <strong>{count}</strong>
                </div>
              );
            })}
          </div>

          <p>
            Each completed experiment contributes one observation.
            This chart shows completion counts, not measured separation
            efficiency.
          </p>

          <div className="somv-note">
            Filtration removes insoluble particles; evaporation
            recovers dissolved salt; magnetism separates iron; density
            differences separate oil and water.
          </div>
        </section>
      )}

      {screen === 3 && (
        <section className="somv-panel">
          <h2>4. Knowledge Quiz</h2>

          {questions.map((q, i) => (
            <article className="somv-question" key={i}>
              <h3>{i + 1}. {q.q}</h3>

              <div className="somv-options">
                {q.options.map((opt, j) => (
                  <label
                    key={j}
                    className={`
                      ${answers[i] === j ? "chosen" : ""}
                      ${submitted && j === q.answer ? "correct" : ""}
                      ${
                        submitted &&
                        answers[i] === j &&
                        j !== q.answer
                          ? "wrong"
                          : ""
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={`somv-q-${i}`}
                      checked={answers[i] === j}
                      disabled={submitted}
                      onChange={() =>
                        setAnswers((a) => ({ ...a, [i]: j }))
                      }
                    />
                    {opt}
                  </label>
                ))}
              </div>

              {submitted && <p>{q.why}</p>}
            </article>
          ))}

          {submitted ? (
            <>
              <h3>Score: {score}/4</h3>
              <button
                className="somv-secondary"
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                }}
              >
                Try quiz again
              </button>
            </>
          ) : (
            <button
              className="somv-primary"
              disabled={Object.keys(answers).length !== questions.length}
              onClick={() => setSubmitted(true)}
            >
              Submit answers
            </button>
          )}
        </section>
      )}

      {screen === 4 && (
        <section className="somv-panel">
          <h2>5. Results and Conclusion</h2>

          <div className="somv-summary">
            <article>
              <strong>{readings.length}/4</strong>
              <span>Experiments recorded</span>
            </article>
            <article>
              <strong>{submitted ? `${score}/4` : "—"}</strong>
              <span>Quiz score</span>
            </article>
          </div>

          <h3>Conclusion</h3>
          <p>
            Different mixtures require different separation methods
            based on particle size, solubility, magnetism and density.
            Each completed virtual action demonstrates the physical
            principle of its method.
          </p>

          <h3>Daily-life applications</h3>
          <ul>
            <li>Filtering tea leaves from tea.</li>
            <li>Obtaining salt from seawater.</li>
            <li>Separating iron from nonmagnetic materials.</li>
            <li>Separating immiscible liquids.</li>
          </ul>

          <h3>Video learning references (internet required)</h3>
          <p>
            <a
              href="https://www.youtube.com/results?search_query=separation+of+mixtures+chemistry"
              target="_blank"
              rel="noreferrer"
            >
              ▶ Separation of mixtures
            </a>
          </p>
          <p>
            <a
              href="https://www.youtube.com/results?search_query=filtration+evaporation+magnetic+separation+experiment"
              target="_blank"
              rel="noreferrer"
            >
              ▶ Demonstrations of separation methods
            </a>
          </p>

          <button className="somv-primary" onClick={restartAll}>
            Restart all experiments
          </button>
        </section>
      )}

      <footer className="somv-footer">
        <button
          className="somv-secondary"
          disabled={screen === 0}
          onClick={() => setScreen((s) => s - 1)}
        >
          ← Previous
        </button>

        <span>Screen {screen + 1} of 5</span>

        <button
          className="somv-primary"
          disabled={screen === 4}
          onClick={() => setScreen((s) => s + 1)}
        >
          Next →
        </button>
      </footer>
    </main>
  );
}
