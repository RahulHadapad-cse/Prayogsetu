
import React, { useMemo, useState } from "react";
import "./ElectrolysisOfWater.css";

const FARADAY = 96485;
const MOLAR_VOLUME = 24.0; // L/mol at approximately 25°C and 1 atm

const quizQuestions = [
  {
    question: "What is the chemical process of breaking water using electricity called?",
    options: ["Filtration", "Electrolysis", "Evaporation", "Condensation"],
    answer: "Electrolysis",
    explanation: "Electrolysis uses electrical energy to decompose a compound."
  },
  {
    question: "Which gas is produced at the cathode?",
    options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon dioxide"],
    answer: "Hydrogen",
    explanation: "Hydrogen gas is produced at the negative electrode (cathode)."
  },
  {
    question: "Which gas is produced at the anode?",
    options: ["Hydrogen", "Oxygen", "Nitrogen", "Helium"],
    answer: "Oxygen",
    explanation: "Oxygen gas is produced at the positive electrode (anode)."
  },
  {
    question: "What is the volume ratio of hydrogen to oxygen?",
    options: ["1:1", "1:2", "2:1", "3:1"],
    answer: "2:1",
    explanation: "Two volumes of hydrogen are produced for every one volume of oxygen."
  },
  {
    question: "What is the chemical equation for electrolysis of water?",
    options: [
      "H₂ + O₂ → H₂O",
      "2H₂O → 2H₂ + O₂",
      "H₂O → H₂O₂",
      "2H₂ + O₂ → 2H₂O"
    ],
    answer: "2H₂O → 2H₂ + O₂",
    explanation: "Water decomposes into hydrogen and oxygen when electrical energy is supplied."
  }
];

export default function ElectrolysisOfWater() {
  const [screen, setScreen] = useState(0);
  const [current, setCurrent] = useState(1);
  const [voltage, setVoltage] = useState(6);
  const [time, setTime] = useState(5);
  const [observations, setObservations] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Educational model: current is an illustrative selected cell current.
  // The ideal gas volumes are calculated using Faraday's law.
  const currentAmps = useMemo(
    () => voltage / 6 * 0.5,
    [voltage]
  );

  const charge = currentAmps * time * 60;
  const hydrogenMoles = charge / (2 * FARADAY);
  const oxygenMoles = charge / (4 * FARADAY);

  const hydrogenMl = hydrogenMoles * MOLAR_VOLUME * 1000;
  const oxygenMl = oxygenMoles * MOLAR_VOLUME * 1000;

  const formatMl = (value) => value.toFixed(2);

  const recordObservation = () => {
    setObservations((previous) => [
      ...previous,
      {
        voltage,
        time,
        current: currentAmps,
        hydrogen: hydrogenMl,
        oxygen: oxygenMl
      }
    ]);
  };

  const selectAnswer = (questionIndex, option) => {
    if (submitted) return;
    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: option
    }));
  };

  const score = quizQuestions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  const next = () => setScreen((value) => Math.min(value + 1, 4));
  const previous = () => setScreen((value) => Math.max(value - 1, 0));

  const restart = () => {
    setScreen(0);
    setObservations([]);
    setAnswers({});
    setSubmitted(false);
    setVoltage(6);
    setTime(5);
  };

  return (
    <div className="electro-page">
      <header className="electro-header">
        <div>
          <span className="electro-tag">CHEMISTRY VIRTUAL LAB</span>
          <h1>Electrolysis of Water</h1>
          <p>Explore how electrical energy separates water into hydrogen and oxygen.</p>
        </div>
        <div className="electro-header-icon">⚡</div>
      </header>

      <nav className="electro-steps">
        {["Introduction", "Experiment", "Graph", "Quiz", "Results"].map(
          (label, index) => (
            <button
              key={label}
              className={screen === index ? "active" : ""}
              onClick={() => setScreen(index)}
            >
              <span>{index + 1}</span>
              {label}
            </button>
          )
        )}
      </nav>

      <main className="electro-content">
        {screen === 0 && (
          <section className="electro-panel">
            <h2>1. Introduction</h2>
            <p>
              Electrolysis of water is a chemical process in which electrical
              energy is used to break water into hydrogen and oxygen gases.
            </p>

            <div className="electro-equation">
              2H₂O(l) → 2H₂(g) + O₂(g)
            </div>

            <h3>Learning objectives</h3>
            <ul>
              <li>Understand the meaning of electrolysis.</li>
              <li>Identify the cathode and anode.</li>
              <li>Observe the production of hydrogen and oxygen.</li>
              <li>Understand the 2:1 gas volume ratio.</li>
              <li>Calculate gas production using Faraday's law.</li>
            </ul>

            <h3>Working principle</h3>
            <div className="electro-info-grid">
              <article>
                <span className="electro-symbol hydrogen">H₂</span>
                <h4>Hydrogen</h4>
                <p>Produced at the negative electrode (cathode).</p>
              </article>
              <article>
                <span className="electro-symbol oxygen">O₂</span>
                <h4>Oxygen</h4>
                <p>Produced at the positive electrode (anode).</p>
              </article>
            </div>

            <div className="electro-note">
              <strong>Important:</strong> Pure water conducts electricity
              poorly. Real electrolysis experiments use a suitable electrolyte
              to improve conductivity. This virtual model assumes an
              appropriately prepared electrolysis cell.
            </div>
          </section>
        )}

        {screen === 1 && (
          <section className="electro-panel">
            <h2>2. Interactive Experiment</h2>
            <p>Adjust the voltage and time, then run the virtual experiment.</p>

            <div className="electro-controls">
              <div>
                <label>Supply voltage: {voltage} V</label>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="1"
                  value={voltage}
                  onChange={(e) => setVoltage(Number(e.target.value))}
                />
                <small>Range: 3–12 volts</small>
              </div>

              <div>
                <label>Electrolysis time: {time} minutes</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                />
                <small>Range: 1–10 minutes</small>
              </div>
            </div>

            <div className="electro-apparatus">
              <div className="electro-battery">
                <strong>DC POWER</strong>
                <span>{voltage} V</span>
                <small>− &nbsp;&nbsp;&nbsp; +</small>
              </div>

              <div className="electro-wires">
                <span className="wire-negative">−</span>
                <span className="wire-positive">+</span>
              </div>

              <div className="electro-cell">
                <div className="electro-tube">
                  <div
                    className="gas hydrogen-gas"
                    style={{ height: `${Math.min(20 + hydrogenMl * 1.5, 85)}%` }}
                  >
                    <b>H₂</b>
                  </div>
                  <div className="tube-label">Cathode (−)</div>
                </div>

                <div className="electro-tube">
                  <div
                    className="gas oxygen-gas"
                    style={{ height: `${Math.min(20 + oxygenMl * 3, 85)}%` }}
                  >
                    <b>O₂</b>
                  </div>
                  <div className="tube-label">Anode (+)</div>
                </div>

                <div className="electro-water">Water + electrolyte</div>
              </div>
            </div>

            <div className="electro-results-grid">
              <div>
                <span>Current (model)</span>
                <strong>{currentAmps.toFixed(2)} A</strong>
              </div>
              <div>
                <span>Hydrogen collected</span>
                <strong>{formatMl(hydrogenMl)} mL</strong>
              </div>
              <div>
                <span>Oxygen collected</span>
                <strong>{formatMl(oxygenMl)} mL</strong>
              </div>
            </div>

            <div className="electro-note">
              The selected voltage is mapped to an illustrative current
              (0.25–1.00 A). Gas volumes are ideal theoretical estimates
              assuming 100% current efficiency.
            </div>

            <button className="electro-primary" onClick={recordObservation}>
              + Record Observation
            </button>

            <h3>Observation Table</h3>
            <div className="electro-table-wrap">
              <table className="electro-table">
                <thead>
                  <tr>
                    <th>Trial</th>
                    <th>Voltage</th>
                    <th>Time</th>
                    <th>Hydrogen</th>
                    <th>Oxygen</th>
                  </tr>
                </thead>
                <tbody>
                  {observations.length === 0 ? (
                    <tr>
                      <td colSpan="5">No observations recorded yet.</td>
                    </tr>
                  ) : (
                    observations.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.voltage} V</td>
                        <td>{item.time} min</td>
                        <td>{formatMl(item.hydrogen)} mL</td>
                        <td>{formatMl(item.oxygen)} mL</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {screen === 2 && (
          <section className="electro-panel">
            <h2>3. Graph and Analysis</h2>
            <p>
              The graph shows the theoretical gas volumes from your recorded
              observations.
            </p>

            {observations.length === 0 ? (
              <div className="electro-empty">
                <span>📊</span>
                <h3>No data available</h3>
                <p>Go to the Experiment screen and record at least one observation.</p>
                <button className="electro-primary" onClick={() => setScreen(1)}>
                  Go to Experiment
                </button>
              </div>
            ) : (
              <>
                <div className="electro-chart">
                  <div className="chart-y-label">Gas volume (mL)</div>
                  <div className="chart-bars">
                    {observations.map((item, index) => {
                      const maximum = Math.max(
                        ...observations.map((x) => x.hydrogen),
                        1
                      );
                      return (
                        <div className="chart-group" key={index}>
                          <div className="chart-pair">
                            <div
                              className="chart-bar hydrogen-bar"
                              style={{
                                height: `${(item.hydrogen / maximum) * 180}px`
                              }}
                              title={`Hydrogen: ${formatMl(item.hydrogen)} mL`}
                            />
                            <div
                              className="chart-bar oxygen-bar"
                              style={{
                                height: `${(item.oxygen / maximum) * 180}px`
                              }}
                              title={`Oxygen: ${formatMl(item.oxygen)} mL`}
                            />
                          </div>
                          <small>Trial {index + 1}</small>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="electro-legend">
                  <span><i className="legend-h"></i> Hydrogen</span>
                  <span><i className="legend-o"></i> Oxygen</span>
                </div>
              </>
            )}

            <div className="electro-analysis">
              <h3>Analysis</h3>
              <ul>
                <li>Increasing current or electrolysis time increases theoretical gas production.</li>
                <li>Hydrogen volume is twice the oxygen volume.</li>
                <li>Hydrogen forms at the cathode and oxygen forms at the anode.</li>
              </ul>
            </div>
          </section>
        )}

        {screen === 3 && (
          <section className="electro-panel">
            <h2>4. Knowledge Quiz</h2>
            <p>Choose the correct answer for each question.</p>

            {quizQuestions.map((question, index) => (
              <div className="electro-question" key={index}>
                <h3>{index + 1}. {question.question}</h3>
                <div className="electro-options">
                  {question.options.map((option) => {
                    const selected = answers[index] === option;
                    const correct = option === question.answer;

                    let className = selected ? "selected" : "";
                    if (submitted && correct) className += " correct";
                    if (submitted && selected && !correct) className += " wrong";

                    return (
                      <button
                        key={option}
                        className={className}
                        onClick={() => selectAnswer(index, option)}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <p className="electro-explanation">
                    {answers[index] === question.answer ? "✓ Correct. " : "✗ Incorrect. "}
                    {question.explanation}
                  </p>
                )}
              </div>
            ))}

            {!submitted ? (
              <button
                className="electro-primary"
                disabled={Object.keys(answers).length !== quizQuestions.length}
                onClick={() => setSubmitted(true)}
              >
                Submit Quiz
              </button>
            ) : (
              <div className="electro-score">
                Your score: {score} / {quizQuestions.length}
              </div>
            )}
          </section>
        )}

        {screen === 4 && (
          <section className="electro-panel">
            <h2>5. Results and Conclusion</h2>

            <div className="electro-conclusion">
              <span>⚡</span>
              <h3>Experiment Completed!</h3>
              <p>
                You have explored the electrolysis of water and the production
                of hydrogen and oxygen gases.
              </p>
            </div>

            <h3>Key observations</h3>
            <ul>
              <li>Hydrogen gas is produced at the cathode.</li>
              <li>Oxygen gas is produced at the anode.</li>
              <li>The theoretical volume ratio is 2:1.</li>
              <li>Gas production increases with current and time.</li>
            </ul>

            <h3>Applications</h3>
            <ul>
              <li>Hydrogen production for fuel cells.</li>
              <li>Industrial hydrogen production.</li>
              <li>Renewable energy storage research.</li>
              <li>Scientific study of chemical reactions.</li>
            </ul>

            <div className="electro-final-score">
              <strong>Quiz score</strong>
              <span>
                {submitted ? `${score} / 5` : "Quiz not submitted"}
              </span>
            </div>

            <div className="electro-note">
              This is a virtual educational model. Actual gas production can
              differ because of electrode material, electrolyte, temperature,
              pressure and current efficiency. Hydrogen and oxygen mixtures
              can be explosive; do not attempt to collect or ignite mixed gases.
            </div>

            <button className="electro-primary" onClick={restart}>
              Restart Experiment
            </button>
          </section>
        )}

        <div className="electro-navigation">
          <button onClick={previous} disabled={screen === 0}>
            ← Previous
          </button>
          <span>Step {screen + 1} of 5</span>
          <button onClick={next} disabled={screen === 4}>
            Next →
          </button>
        </div>
      </main>
    </div>
  );
}
