
import React, { useState } from "react";
import "./StatesOfMatter.css";

const questions = [
  {
    question: "Which state of matter has a fixed shape and fixed volume?",
    options: ["Solid", "Liquid", "Gas", "Plasma"],
    answer: 0,
    explanation: "Solids have a fixed shape and volume because their particles are closely packed.",
  },
  {
    question: "What happens when a solid is heated to its melting point?",
    options: ["It freezes", "It melts into a liquid", "It becomes smaller", "It disappears"],
    answer: 1,
    explanation: "At its melting point, a solid changes into a liquid.",
  },
  {
    question: "Which state of matter has particles that move freely and spread out?",
    options: ["Solid", "Liquid", "Gas", "All states"],
    answer: 2,
    explanation: "Gas particles move freely and spread to fill their container.",
  },
  {
    question: "What is the change from liquid to gas called?",
    options: ["Freezing", "Melting", "Condensation", "Vaporization"],
    answer: 3,
    explanation: "Vaporization changes a liquid into a gas. It includes evaporation and boiling.",
  },
];

function getPhase(temperature) {
  if (temperature < 0) return "Solid";
  if (temperature < 100) return "Liquid";
  return "Gas";
}

function ParticleView({ phase, temperature }) {
  const particles = Array.from({ length: 36 }, (_, index) => {
    const row = Math.floor(index / 6);
    const column = index % 6;

    if (phase === "Solid") {
      return {
        x: 75 + column * 34,
        y: 65 + row * 30,
      };
    }

    if (phase === "Liquid") {
      return {
        x: 65 + column * 35 + (row % 2) * 7,
        y: 160 + row * 23 - (column % 3) * 3,
      };
    }

    return {
      x: 35 + ((index * 67 + temperature * 3) % 205),
      y: 25 + ((index * 43 + temperature * 5) % 215),
    };
  });

  return (
    <div className="som-particle-box">
      <svg viewBox="0 0 300 280" role="img" aria-label={`${phase} particle arrangement`}>
        <path
          d="M25 15 L25 255 L275 255 L275 15"
          fill="none"
          stroke="#64748b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {particles.map((particle, index) => (
          <circle
            key={index}
            cx={particle.x}
            cy={particle.y}
            r="8"
            className={`som-particle ${phase.toLowerCase()}`}
          />
        ))}
      </svg>
      <div className="som-particle-caption">
        {phase === "Solid" && "Particles are tightly packed and vibrate in fixed positions."}
        {phase === "Liquid" && "Particles stay close but can slide past one another."}
        {phase === "Gas" && "Particles are far apart and move freely."}
      </div>
    </div>
  );
}

export default function StatesOfMatter() {
  const [screen, setScreen] = useState(0);
  const [temperature, setTemperature] = useState(-20);
  const [readings, setReadings] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const phase = getPhase(temperature);
  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  const recordReading = () => {
    setReadings((previous) => [
      ...previous,
      {
        id: Date.now(),
        temperature,
        phase,
      },
    ]);
  };

  const resetExperiment = () => {
    setTemperature(-20);
    setReadings([]);
  };

  return (
    <main className="som-lab">
      <header className="som-header">
        <div>
          <p className="som-eyebrow">PRAYOGSETU · CHEMISTRY VIRTUAL LAB</p>
          <h1>States of Matter</h1>
          <p>Explore how temperature affects the arrangement and movement of particles.</p>
        </div>
        <div className="som-header-icon">🧪</div>
      </header>

      <nav className="som-progress">
        {["Introduction", "Experiment", "Graph", "Quiz", "Results"].map((name, index) => (
          <button
            key={name}
            className={`som-step ${screen === index ? "active" : ""} ${screen > index ? "completed" : ""}`}
            onClick={() => setScreen(index)}
          >
            <span>{index + 1}</span>
            {name}
          </button>
        ))}
      </nav>

      {screen === 0 && (
        <section className="som-panel">
          <div className="som-heading">
            <span>SCREEN 1 OF 5</span>
            <h2>Introduction and Theory</h2>
            <p>Learn about the three common states of matter.</p>
          </div>

          <div className="som-three-cards">
            <article className="som-info-card">
              <div className="som-state-icon">🧊</div>
              <h3>Solid</h3>
              <p>Has a fixed shape and fixed volume. Particles are tightly packed.</p>
            </article>
            <article className="som-info-card">
              <div className="som-state-icon">💧</div>
              <h3>Liquid</h3>
              <p>Has a fixed volume but takes the shape of its container.</p>
            </article>
            <article className="som-info-card">
              <div className="som-state-icon">☁️</div>
              <h3>Gas</h3>
              <p>Has no fixed shape or volume. It spreads to fill its container.</p>
            </article>
          </div>

          <article className="som-info-card">
            <h3>How does temperature affect matter?</h3>
            <p>
              Heating gives particles more energy, so they move faster.
              Cooling removes thermal energy, so particle motion generally slows.
              A substance can change from solid to liquid and from liquid to gas
              when suitable conditions are reached.
            </p>
            <div className="som-formula">
              Heating: Solid → Liquid → Gas
            </div>
            <div className="som-formula">
              Cooling: Gas → Liquid → Solid
            </div>
          </article>

          <article className="som-info-card">
            <h3>Learning objectives</h3>
            <ul>
              <li>Identify the properties of solids, liquids and gases.</li>
              <li>Understand melting, freezing and vaporization.</li>
              <li>Observe how particle arrangement changes.</li>
              <li>Relate temperature to particle movement.</li>
            </ul>
          </article>

          <div className="som-note">
            <strong>Note:</strong> The simulation uses water as a simple example
            at approximately normal atmospheric pressure. Its model uses
            0°C as the melting point and 100°C as the boiling point.
          </div>
        </section>
      )}

      {screen === 1 && (
        <section className="som-panel">
          <div className="som-heading">
            <span>SCREEN 2 OF 5</span>
            <h2>Interactive Experiment</h2>
            <p>Move the temperature slider and observe the particle arrangement.</p>
          </div>

          <div className="som-simulation">
            <div className="som-current-phase">
              <span>Current state</span>
              <strong className={`som-phase-label ${phase.toLowerCase()}`}>
                {phase}
              </strong>
              <div className="som-temperature">{temperature}°C</div>
            </div>
            <ParticleView phase={phase} temperature={temperature} />
          </div>

          <div className="som-temperature-control">
            <label htmlFor="som-temperature">
              Temperature <strong>{temperature}°C</strong>
            </label>
            <input
              id="som-temperature"
              type="range"
              min="-50"
              max="150"
              step="1"
              value={temperature}
              onChange={(event) => setTemperature(Number(event.target.value))}
            />
            <div className="som-range-labels">
              <span>-50°C</span>
              <span>0°C · Melting point</span>
              <span>100°C · Boiling point</span>
              <span>150°C</span>
            </div>
          </div>

          <div className="som-phase-explanation">
            <h3>{phase} state</h3>
            {phase === "Solid" && (
              <p>At this temperature, the water is represented as ice. Its particles are closely packed and vibrate around fixed positions.</p>
            )}
            {phase === "Liquid" && (
              <p>At this temperature, water is represented as a liquid. Its particles remain close but can move around each other.</p>
            )}
            {phase === "Gas" && (
              <p>At this temperature, water is represented as water vapour. Its particles are far apart and move freely.</p>
            )}
          </div>

          <div className="som-actions">
            <button className="som-button secondary" onClick={resetExperiment}>
              Reset
            </button>
            <button className="som-button primary" onClick={recordReading}>
              Record observation
            </button>
          </div>

          <div className="som-table-wrap">
            <h3>Observation table ({readings.length})</h3>
            {readings.length === 0 ? (
              <p>No observations yet. Change the temperature and record a reading.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Temperature</th>
                    <th>State of matter</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((reading, index) => (
                    <tr key={reading.id}>
                      <td>{index + 1}</td>
                      <td>{reading.temperature}°C</td>
                      <td>{reading.phase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {screen === 2 && (
        <section className="som-panel">
          <div className="som-heading">
            <span>SCREEN 3 OF 5</span>
            <h2>Graph and Analysis</h2>
            <p>View your recorded temperatures and the corresponding states.</p>
          </div>

          {readings.length === 0 ? (
            <div className="som-empty">
              <h3>No observations available</h3>
              <p>Record readings in the Experiment screen to see them here.</p>
              <button className="som-button primary" onClick={() => setScreen(1)}>
                Go to experiment
              </button>
            </div>
          ) : (
            <>
              <article className="som-info-card">
                <h3>Recorded temperature readings</h3>
                <div className="som-graph-wrap">
                  <svg viewBox="0 0 620 340" role="img" aria-label="Temperature readings graph">
                    {[-50, 0, 50, 100, 150].map((value, index) => {
                      const y = 275 - index * 55;
                      return (
                        <g key={value}>
                          <line x1="75" y1={y} x2="570" y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />
                          <text x="65" y={y + 4} textAnchor="end" fontSize="11" fill="#64748b">
                            {value}°C
                          </text>
                        </g>
                      );
                    })}
                    <line x1="75" y1="55" x2="75" y2="275" stroke="#475569" strokeWidth="2" />
                    <line x1="75" y1="275" x2="570" y2="275" stroke="#475569" strokeWidth="2" />
                    {readings.map((reading, index) => {
                      const x = 100 + (index % 8) * 60;
                      const y = 275 - ((reading.temperature + 50) / 200) * 220;
                      const color = reading.phase === "Solid"
                        ? "#2563eb"
                        : reading.phase === "Liquid"
                          ? "#0d9488"
                          : "#ea580c";
                      return (
                        <g key={reading.id}>
                          <circle cx={x} cy={y} r="7" fill={color} />
                          <text x={x} y={y - 12} textAnchor="middle" fontSize="11" fill={color}>
                            {reading.temperature}°
                          </text>
                        </g>
                      );
                    })}
                    <text x="320" y="320" textAnchor="middle" fontSize="13" fill="#475569">
                      Observation number
                    </text>
                  </svg>
                </div>
                <div className="som-legend">
                  <span><i className="solid-dot" /> Solid</span>
                  <span><i className="liquid-dot" /> Liquid</span>
                  <span><i className="gas-dot" /> Gas</span>
                </div>
              </article>

              <article className="som-info-card">
                <h3>What did you learn?</h3>
                <ul>
                  <li>Below 0°C, water is represented as solid ice.</li>
                  <li>Between 0°C and 100°C, water is represented as liquid.</li>
                  <li>Above 100°C, water is represented as water vapour.</li>
                  <li>Particle motion generally increases as temperature increases.</li>
                </ul>
              </article>
            </>
          )}
        </section>
      )}

      {screen === 3 && (
        <section className="som-panel">
          <div className="som-heading">
            <span>SCREEN 4 OF 5</span>
            <h2>Knowledge Check</h2>
            <p>Answer all four questions to test your understanding.</p>
          </div>

          {questions.map((question, index) => (
            <article className="som-question" key={index}>
              <h3>{index + 1}. {question.question}</h3>
              <div className="som-options">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`som-option ${
                      answers[index] === optionIndex ? "selected" : ""
                    } ${
                      submitted && optionIndex === question.answer ? "correct" : ""
                    } ${
                      submitted &&
                      answers[index] === optionIndex &&
                      optionIndex !== question.answer
                        ? "incorrect"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`som-question-${index}`}
                      checked={answers[index] === optionIndex}
                      disabled={submitted}
                      onChange={() =>
                        setAnswers((previous) => ({
                          ...previous,
                          [index]: optionIndex,
                        }))
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
              {submitted && (
                <p className="som-explanation">{question.explanation}</p>
              )}
            </article>
          ))}

          {submitted && (
            <div className="som-score">
              Your score: <strong>{score} / 4</strong>
            </div>
          )}

          <div className="som-actions">
            {submitted ? (
              <button
                className="som-button secondary"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
              >
                Try again
              </button>
            ) : (
              <button
                className="som-button primary"
                disabled={Object.keys(answers).length !== questions.length}
                onClick={() => setSubmitted(true)}
              >
                Submit answers
              </button>
            )}
          </div>
        </section>
      )}

      {screen === 4 && (
        <section className="som-panel">
          <div className="som-heading">
            <span>SCREEN 5 OF 5</span>
            <h2>Results and Conclusion</h2>
            <p>Review what you learned from this experiment.</p>
          </div>

          <div className="som-complete">
            <div>🧪</div>
            <h3>Experiment completed!</h3>
            <p>You explored the three common states of matter.</p>
          </div>

          <div className="som-three-cards">
            <div className="som-info-card">
              <h3>Observations</h3>
              <strong className="som-big-number">{readings.length}</strong>
              <p>Readings recorded</p>
            </div>
            <div className="som-info-card">
              <h3>Quiz score</h3>
              <strong className="som-big-number">{submitted ? `${score}/4` : "—"}</strong>
              <p>{submitted ? "Quiz completed" : "Quiz not submitted"}</p>
            </div>
          </div>

          <article className="som-info-card">
            <h3>Conclusion</h3>
            <p>
              Matter commonly exists as solid, liquid and gas. These states
              differ in particle arrangement, movement, shape and volume.
              Heating and cooling can cause changes of state. The simulation
              demonstrated these changes using water as an example.
            </p>
          </article>

          <article className="som-info-card">
            <h3>Applications in daily life</h3>
            <ul>
              <li>Ice melting in drinks.</li>
              <li>Water boiling during cooking.</li>
              <li>Water vapour condensing on a cold surface.</li>
              <li>Freezing water to make ice.</li>
            </ul>
          </article>

          <article className="som-info-card">
            <h3>Video learning references</h3>
            <div className="som-video-links">
              <a href="https://www.youtube.com/results?search_query=states+of+matter+for+students" target="_blank" rel="noreferrer">
                ▶ Introduction to States of Matter
              </a>
              <a href="https://www.youtube.com/results?search_query=particle+model+of+matter+solid+liquid+gas" target="_blank" rel="noreferrer">
                ▶ Particle Model Demonstration
              </a>
            </div>
          </article>

          <div className="som-actions">
            <button
              className="som-button secondary"
              onClick={() => {
                setScreen(0);
                setAnswers({});
                setSubmitted(false);
                resetExperiment();
              }}
            >
              Restart experiment
            </button>
            <button className="som-button primary" onClick={() => setScreen(1)}>
              Try again
            </button>
          </div>
        </section>
      )}

      <footer className="som-footer">
        <button
          className="som-button secondary"
          disabled={screen === 0}
          onClick={() => setScreen((current) => Math.max(0, current - 1))}
        >
          ← Previous
        </button>
        <span>Screen {screen + 1} of 5</span>
        <button
          className="som-button primary"
          disabled={screen === 4}
          onClick={() => setScreen((current) => Math.min(4, current + 1))}
        >
          Next →
        </button>
      </footer>
    </main>
  );
}
