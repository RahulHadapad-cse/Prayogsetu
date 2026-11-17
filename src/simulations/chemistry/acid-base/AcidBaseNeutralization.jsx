
import React, { useState } from "react";
import "./AcidBaseNeutralization.css";

const questions = [
  {
    question: "What is formed when an acid reacts with a base?",
    options: ["Salt and water", "Oxygen and hydrogen", "Only water", "Carbon dioxide"],
    answer: 0,
    explanation: "A neutralization reaction between an acid and a base produces salt and water.",
  },
  {
    question: "Which pH value is neutral at approximately 25°C?",
    options: ["1", "5", "7", "14"],
    answer: 2,
    explanation: "A neutral aqueous solution has a pH of approximately 7 at 25°C.",
  },
  {
    question: "Which ion is responsible for acidic properties in water?",
    options: ["OH⁻", "H₃O⁺", "Na⁺", "Cl⁻"],
    answer: 1,
    explanation: "Hydronium ions (H₃O⁺) are responsible for acidic properties in aqueous solutions.",
  },
  {
    question: "What is the salt formed by HCl and NaOH?",
    options: ["Calcium chloride", "Sodium chloride", "Sodium carbonate", "Potassium chloride"],
    answer: 1,
    explanation: "Hydrochloric acid reacts with sodium hydroxide to form sodium chloride and water.",
  },
];

function calculateReaction(acidConcentration, acidVolume, baseConcentration, baseVolume) {
  const acidMoles = acidConcentration * (acidVolume / 1000);
  const baseMoles = baseConcentration * (baseVolume / 1000);
  const totalVolume = (acidVolume + baseVolume) / 1000;
  const difference = acidMoles - baseMoles;

  let pH;

  if (Math.abs(difference) < 1e-10) {
    pH = 7;
  } else if (difference > 0) {
    const hydrogenConcentration = difference / totalVolume;
    pH = -Math.log10(hydrogenConcentration);
  } else {
    const hydroxideConcentration = -difference / totalVolume;
    const pOH = -Math.log10(hydroxideConcentration);
    pH = 14 - pOH;
  }

  pH = Math.max(0, Math.min(14, pH));

  return {
    acidMoles,
    baseMoles,
    totalVolume,
    pH,
    state: pH < 6.99 ? "Acidic" : pH > 7.01 ? "Basic" : "Neutral",
    saltMoles: Math.min(acidMoles, baseMoles),
  };
}

function PHScale({ pH }) {
  const colors = [
    "#dc2626", "#ef4444", "#f97316", "#fb923c", "#facc15",
    "#a3e635", "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6",
    "#2563eb", "#4f46e5", "#7c3aed", "#9333ea", "#6b21a8",
  ];

  return (
    <div className="abn-scale">
      <div className="abn-scale-bar">
        {colors.map((color, index) => (
          <div key={index} style={{ background: color }} />
        ))}
      </div>
      <div className="abn-scale-numbers">
        {Array.from({ length: 15 }, (_, index) => <span key={index}>{index}</span>)}
      </div>
      <div className="abn-scale-pointer" style={{ left: `${(pH / 14) * 100}%` }}>
        <span>▲</span>
        <strong>{pH.toFixed(2)}</strong>
      </div>
      <div className="abn-scale-labels">
        <span>Acidic</span>
        <span>Neutral</span>
        <span>Basic</span>
      </div>
    </div>
  );
}

export default function AcidBaseNeutralization() {
  const [screen, setScreen] = useState(0);
  const [acidConcentration, setAcidConcentration] = useState(0.5);
  const [acidVolume, setAcidVolume] = useState(50);
  const [baseConcentration, setBaseConcentration] = useState(0.5);
  const [baseVolume, setBaseVolume] = useState(50);
  const [readings, setReadings] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const result = calculateReaction(
    acidConcentration,
    acidVolume,
    baseConcentration,
    baseVolume
  );

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  function recordObservation() {
    setReadings((previous) => [
      ...previous,
      {
        id: Date.now(),
        acidMoles: result.acidMoles,
        baseMoles: result.baseMoles,
        pH: result.pH,
        state: result.state,
      },
    ]);
  }

  function resetExperiment() {
    setAcidConcentration(0.5);
    setAcidVolume(50);
    setBaseConcentration(0.5);
    setBaseVolume(50);
    setReadings([]);
  }

  return (
    <main className="abn-lab">
      <header className="abn-header">
        <div>
          <p className="abn-eyebrow">PRAYOGSETU · CHEMISTRY VIRTUAL LAB</p>
          <h1>Acid-Base Neutralization</h1>
          <p>Explore how an acid reacts with a base and how pH changes.</p>
        </div>
        <div className="abn-header-icon">⚗️</div>
      </header>

      <nav className="abn-progress">
        {["Introduction", "Experiment", "Graph", "Quiz", "Results"].map((name, index) => (
          <button
            key={name}
            className={`abn-step ${screen === index ? "active" : ""} ${screen > index ? "completed" : ""}`}
            onClick={() => setScreen(index)}
          >
            <span>{index + 1}</span>
            {name}
          </button>
        ))}
      </nav>

      {screen === 0 && (
        <section className="abn-panel">
          <div className="abn-heading">
            <span>SCREEN 1 OF 5</span>
            <h2>Introduction and Theory</h2>
            <p>Understand how acids and bases react with each other.</p>
          </div>

          <article className="abn-info-card">
            <h3>What is neutralization?</h3>
            <p>
              Neutralization is a chemical reaction in which an acid reacts
              with a base to form salt and water. The reaction between
              hydrochloric acid and sodium hydroxide is a common example.
            </p>
            <div className="abn-equation">
              HCl + NaOH → NaCl + H₂O
            </div>
            <p>
              Hydrochloric acid + Sodium hydroxide → Sodium chloride + Water
            </p>
          </article>

          <div className="abn-three-cards">
            <article className="abn-info-card">
              <div className="abn-card-icon">🧪</div>
              <h3>Acid</h3>
              <p>HCl is an acid. It produces hydronium ions in water.</p>
            </article>
            <article className="abn-info-card">
              <div className="abn-card-icon">⚗️</div>
              <h3>Base</h3>
              <p>NaOH is a base. It produces hydroxide ions in water.</p>
            </article>
            <article className="abn-info-card">
              <div className="abn-card-icon">💧</div>
              <h3>Products</h3>
              <p>Sodium chloride and water are formed in this reaction.</p>
            </article>
          </div>

          <article className="abn-info-card">
            <h3>Understanding the pH scale</h3>
            <ul>
              <li>pH below 7: acidic solution.</li>
              <li>pH equal to 7: neutral solution.</li>
              <li>pH above 7: basic solution.</li>
            </ul>
            <PHScale pH={7} />
          </article>

          <article className="abn-info-card">
            <h3>Learning objectives</h3>
            <ul>
              <li>Understand acid-base neutralization.</li>
              <li>Identify reactants and products.</li>
              <li>Observe how concentration and volume affect the final pH.</li>
              <li>Interpret pH values as acidic, neutral or basic.</li>
            </ul>
          </article>

          <div className="abn-note">
            <strong>Simulation note:</strong> This virtual model assumes strong
            acid HCl and strong base NaOH, complete dissociation, a temperature
            of approximately 25°C and ideal solution behaviour. It calculates
            pH from the excess acid or base after mixing.
          </div>
        </section>
      )}

      {screen === 1 && (
        <section className="abn-panel">
          <div className="abn-heading">
            <span>SCREEN 2 OF 5</span>
            <h2>Interactive Experiment</h2>
            <p>Change the concentration and volume of acid and base.</p>
          </div>

          <div className="abn-controls-grid">
            <article className="abn-control-card">
              <h3>🔴 Hydrochloric Acid (HCl)</h3>
              <label>
                Concentration: <strong>{acidConcentration.toFixed(2)} M</strong>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={acidConcentration}
                onChange={(event) => setAcidConcentration(Number(event.target.value))}
              />
              <label>
                Volume: <strong>{acidVolume} mL</strong>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={acidVolume}
                onChange={(event) => setAcidVolume(Number(event.target.value))}
              />
            </article>

            <article className="abn-control-card">
              <h3>🔵 Sodium Hydroxide (NaOH)</h3>
              <label>
                Concentration: <strong>{baseConcentration.toFixed(2)} M</strong>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={baseConcentration}
                onChange={(event) => setBaseConcentration(Number(event.target.value))}
              />
              <label>
                Volume: <strong>{baseVolume} mL</strong>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={baseVolume}
                onChange={(event) => setBaseVolume(Number(event.target.value))}
              />
            </article>
          </div>

          <article className="abn-reaction-card">
            <h3>Virtual mixing beaker</h3>
            <div className="abn-beaker-scene">
              <div className="abn-beaker">
                <div
                  className={`abn-liquid ${result.state.toLowerCase()}`}
                  style={{ height: `${Math.min(85, 25 + (acidVolume + baseVolume) / 5)}%` }}
                />
                <div className="abn-beaker-label">HCl + NaOH</div>
              </div>
              <div className="abn-mixing-arrow">→</div>
              <div className="abn-product-beaker">
                <div className={`abn-product-liquid ${result.state.toLowerCase()}`} />
                <span>Mixed solution</span>
              </div>
            </div>
            <p className="abn-visual-note">
              The liquid colour indicates the calculated pH category. It is a
              visual teaching aid, not a measured indicator colour.
            </p>
          </article>

          <article className="abn-info-card">
            <h3>Calculated results</h3>
            <div className="abn-results-grid">
              <div>
                <span>Acid amount</span>
                <strong>{(result.acidMoles * 1000).toFixed(2)} mmol</strong>
              </div>
              <div>
                <span>Base amount</span>
                <strong>{(result.baseMoles * 1000).toFixed(2)} mmol</strong>
              </div>
              <div>
                <span>Final pH</span>
                <strong>{result.pH.toFixed(2)}</strong>
              </div>
              <div>
                <span>Solution nature</span>
                <strong>{result.state}</strong>
              </div>
            </div>
            <PHScale pH={result.pH} />
            <p className="abn-result-message">
              {result.state === "Neutral"
                ? "The acid and base have reacted in equal amounts in this model."
                : result.state === "Acidic"
                  ? "Acid is in excess, so the final solution is acidic."
                  : "Base is in excess, so the final solution is basic."}
            </p>
          </article>

          <div className="abn-actions">
            <button className="abn-button secondary" onClick={resetExperiment}>
              Reset values
            </button>
            <button className="abn-button primary" onClick={recordObservation}>
              Record observation
            </button>
          </div>

          <div className="abn-table-wrap">
            <h3>Observation table ({readings.length})</h3>
            {readings.length === 0 ? (
              <p>No observations recorded. Change the values and record a reading.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Acid (mmol)</th>
                    <th>Base (mmol)</th>
                    <th>pH</th>
                    <th>Nature</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((reading, index) => (
                    <tr key={reading.id}>
                      <td>{index + 1}</td>
                      <td>{(reading.acidMoles * 1000).toFixed(2)}</td>
                      <td>{(reading.baseMoles * 1000).toFixed(2)}</td>
                      <td>{reading.pH.toFixed(2)}</td>
                      <td>{reading.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {screen === 2 && (
        <section className="abn-panel">
          <div className="abn-heading">
            <span>SCREEN 3 OF 5</span>
            <h2>Graph and Analysis</h2>
            <p>Compare the pH values from your recorded mixtures.</p>
          </div>

          {readings.length === 0 ? (
            <div className="abn-empty">
              <h3>No observations available</h3>
              <p>Record readings in the Experiment screen to display the graph.</p>
              <button className="abn-button primary" onClick={() => setScreen(1)}>
                Go to experiment
              </button>
            </div>
          ) : (
            <>
              <article className="abn-info-card">
                <h3>Recorded pH values</h3>
                <div className="abn-chart">
                  {readings.map((reading, index) => (
                    <div className="abn-chart-column" key={reading.id}>
                      <div className="abn-chart-value">{reading.pH.toFixed(1)}</div>
                      <div className="abn-chart-track">
                        <div
                          className={`abn-chart-bar ${reading.state.toLowerCase()}`}
                          style={{ height: `${(reading.pH / 14) * 100}%` }}
                        />
                      </div>
                      <span>Mix {index + 1}</span>
                      <small>{reading.state}</small>
                    </div>
                  ))}
                </div>
                <div className="abn-chart-scale">
                  <span>0 · Strongly acidic</span>
                  <span>7 · Neutral</span>
                  <span>14 · Strongly basic</span>
                </div>
              </article>

              <article className="abn-info-card">
                <h3>Analysis</h3>
                <ul>
                  <li>Equal reacting amounts of HCl and NaOH give pH approximately 7 in this model.</li>
                  <li>Excess acid produces an acidic solution.</li>
                  <li>Excess base produces a basic solution.</li>
                  <li>The number of moles depends on concentration multiplied by volume in litres.</li>
                </ul>
              </article>
            </>
          )}
        </section>
      )}

      {screen === 3 && (
        <section className="abn-panel">
          <div className="abn-heading">
            <span>SCREEN 4 OF 5</span>
            <h2>Knowledge Check</h2>
            <p>Answer all four questions to test your understanding.</p>
          </div>

          {questions.map((question, index) => (
            <article className="abn-question" key={index}>
              <h3>{index + 1}. {question.question}</h3>
              <div className="abn-options">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`abn-option ${
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
                      name={`abn-question-${index}`}
                      checked={answers[index] === optionIndex}
                      disabled={submitted}
                      onChange={() => setAnswers((previous) => ({
                        ...previous,
                        [index]: optionIndex,
                      }))}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {submitted && (
                <p className="abn-explanation">{question.explanation}</p>
              )}
            </article>
          ))}

          {submitted && (
            <div className="abn-score">
              Your score: <strong>{score} / 4</strong>
            </div>
          )}

          <div className="abn-actions">
            {submitted ? (
              <button
                className="abn-button secondary"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
              >
                Try again
              </button>
            ) : (
              <button
                className="abn-button primary"
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
        <section className="abn-panel">
          <div className="abn-heading">
            <span>SCREEN 5 OF 5</span>
            <h2>Results and Conclusion</h2>
            <p>Review what you learned in this virtual experiment.</p>
          </div>

          <div className="abn-complete">
            <div>⚗️</div>
            <h3>Experiment completed!</h3>
            <p>You explored the reaction between hydrochloric acid and sodium hydroxide.</p>
          </div>

          <div className="abn-three-cards">
            <article className="abn-info-card">
              <h3>Observations</h3>
              <strong className="abn-big-number">{readings.length}</strong>
              <p>Readings recorded</p>
            </article>
            <article className="abn-info-card">
              <h3>Quiz score</h3>
              <strong className="abn-big-number">{submitted ? `${score}/4` : "—"}</strong>
              <p>{submitted ? "Quiz completed" : "Quiz not submitted"}</p>
            </article>
            <article className="abn-info-card">
              <h3>Latest pH</h3>
              <strong className="abn-big-number">
                {readings.length ? readings[readings.length - 1].pH.toFixed(2) : "—"}
              </strong>
              <p>Last recorded mixture</p>
            </article>
          </div>

          <article className="abn-info-card">
            <h3>Conclusion</h3>
            <p>
              Neutralization occurs when an acid reacts with a base. In this
              experiment, hydrochloric acid and sodium hydroxide form sodium
              chloride and water. The final pH depends on the relative amounts
              of acid and base present after the reaction.
            </p>
          </article>

          <article className="abn-info-card">
            <h3>Applications in daily life</h3>
            <ul>
              <li>Antacids help neutralize excess stomach acid.</li>
              <li>Farmers may add lime to reduce soil acidity.</li>
              <li>Wastewater treatment can use neutralization to control pH.</li>
            </ul>
          </article>

          <article className="abn-info-card">
            <h3>Video learning references</h3>
            <div className="abn-video-links">
              <a href="https://www.youtube.com/results?search_query=acid+base+neutralization+reaction+for+students" target="_blank" rel="noreferrer">
                ▶ Introduction to Acid-Base Neutralization
              </a>
              <a href="https://www.youtube.com/results?search_query=pH+scale+acid+base+experiment" target="_blank" rel="noreferrer">
                ▶ Understanding the pH Scale
              </a>
            </div>
          </article>

          <div className="abn-actions">
            <button
              className="abn-button secondary"
              onClick={() => {
                setScreen(0);
                setAnswers({});
                setSubmitted(false);
                resetExperiment();
              }}
            >
              Restart experiment
            </button>
            <button className="abn-button primary" onClick={() => setScreen(1)}>
              Try again
            </button>
          </div>
        </section>
      )}

      <footer className="abn-footer">
        <button
          className="abn-button secondary"
          disabled={screen === 0}
          onClick={() => setScreen((value) => Math.max(0, value - 1))}
        >
          ← Previous
        </button>
        <span>Screen {screen + 1} of 5</span>
        <button
          className="abn-button primary"
          disabled={screen === 4}
          onClick={() => setScreen((value) => Math.min(4, value + 1))}
        >
          Next →
        </button>
      </footer>
    </main>
  );
}
