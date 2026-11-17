
import React, { useState } from "react";
import "./ConservationOfMass.css";

const questions = [
  {
    question: "What does the law of conservation of mass state?",
    options: [
      "Mass is always destroyed",
      "Mass is created during reactions",
      "Mass is neither created nor destroyed in a chemical reaction",
      "Mass always increases",
    ],
    answer: 2,
    explanation: "The total mass remains constant in a closed system during a chemical reaction.",
  },
  {
    question: "Why can the measured mass decrease in an open vinegar and baking soda experiment?",
    options: [
      "Matter is destroyed",
      "Carbon dioxide gas escapes",
      "Vinegar becomes heavier",
      "The balance creates mass",
    ],
    answer: 1,
    explanation: "Carbon dioxide gas can escape from an open container, so it is no longer included in the measured mass.",
  },
  {
    question: "Which system is best for measuring total mass before and after a reaction?",
    options: ["Open system", "Closed system", "Uncovered dish", "Open beaker"],
    answer: 1,
    explanation: "A closed system keeps the products, including gases, inside the measured system.",
  },
  {
    question: "In a reaction, the total mass of reactants is 50 g. What is the total mass of products in a closed system?",
    options: ["25 g", "40 g", "50 g", "60 g"],
    answer: 2,
    explanation: "The total mass of products equals the total mass of reactants in a closed system.",
  },
];

function calculateMass(vinegarMass, bakingSodaMass, systemType) {
  const initialMass = vinegarMass + bakingSodaMass;

  // Simplified teaching model: a fixed fraction of the baking soda
  // mass is represented as carbon dioxide produced.
  const co2Mass = Math.min(bakingSodaMass * 0.55, initialMass * 0.35);

  const escapedMass = systemType === "open" ? co2Mass : 0;
  const finalMeasuredMass = initialMass - escapedMass;
  const massDifference = initialMass - finalMeasuredMass;

  return {
    initialMass,
    co2Mass,
    escapedMass,
    finalMeasuredMass,
    massDifference,
  };
}

export default function ConservationOfMass() {
  const [screen, setScreen] = useState(0);
  const [vinegarMass, setVinegarMass] = useState(40);
  const [bakingSodaMass, setBakingSodaMass] = useState(10);
  const [systemType, setSystemType] = useState("closed");
  const [readings, setReadings] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const result = calculateMass(vinegarMass, bakingSodaMass, systemType);

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
        systemType,
        initialMass: result.initialMass,
        finalMass: result.finalMeasuredMass,
        escapedMass: result.escapedMass,
      },
    ]);
  }

  function resetExperiment() {
    setVinegarMass(40);
    setBakingSodaMass(10);
    setSystemType("closed");
    setReadings([]);
  }

  return (
    <main className="com-lab">
      <header className="com-header">
        <div>
          <p className="com-eyebrow">PRAYOGSETU · CHEMISTRY VIRTUAL LAB</p>
          <h1>Conservation of Mass</h1>
          <p>Compare the mass of substances before and after a chemical reaction.</p>
        </div>
        <div className="com-header-icon">⚖️</div>
      </header>

      <nav className="com-progress">
        {["Introduction", "Experiment", "Graph", "Quiz", "Results"].map((name, index) => (
          <button
            key={name}
            className={`com-step ${screen === index ? "active" : ""} ${screen > index ? "completed" : ""}`}
            onClick={() => setScreen(index)}
          >
            <span>{index + 1}</span>
            {name}
          </button>
        ))}
      </nav>

      {screen === 0 && (
        <section className="com-panel">
          <div className="com-heading">
            <span>SCREEN 1 OF 5</span>
            <h2>Introduction and Theory</h2>
            <p>Understand why total mass is conserved during a chemical reaction.</p>
          </div>

          <article className="com-info-card">
            <h3>Law of Conservation of Mass</h3>
            <p>
              The law of conservation of mass states that matter is neither
              created nor destroyed during a chemical reaction. In a closed
              system, the total mass before a reaction is equal to the total
              mass after the reaction.
            </p>
            <div className="com-equation">
              Mass of reactants = Mass of products
            </div>
          </article>

          <div className="com-three-cards">
            <article className="com-info-card">
              <div className="com-card-icon">🍶</div>
              <h3>Vinegar</h3>
              <p>Contains acetic acid, which reacts with baking soda.</p>
            </article>
            <article className="com-info-card">
              <div className="com-card-icon">🥄</div>
              <h3>Baking soda</h3>
              <p>Sodium bicarbonate reacts with the acid and releases carbon dioxide.</p>
            </article>
            <article className="com-info-card">
              <div className="com-card-icon">🫧</div>
              <h3>Carbon dioxide</h3>
              <p>A gas produced during the reaction. It stays inside a closed system.</p>
            </article>
          </div>

          <article className="com-info-card">
            <h3>Reaction equation</h3>
            <div className="com-equation">
              NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂
            </div>
            <p>
              Sodium bicarbonate + Acetic acid → Sodium acetate + Water + Carbon dioxide
            </p>
          </article>

          <article className="com-info-card">
            <h3>Closed system and open system</h3>
            <ul>
              <li><strong>Closed system:</strong> Matter cannot enter or leave. Gas remains inside, so the measured total mass stays constant.</li>
              <li><strong>Open system:</strong> Gas can escape into the surroundings, so the mass measured on the balance can decrease.</li>
            </ul>
          </article>

          <article className="com-info-card">
            <h3>Learning objectives</h3>
            <ul>
              <li>Understand the law of conservation of mass.</li>
              <li>Compare closed and open systems.</li>
              <li>Identify the role of gas in mass measurements.</li>
              <li>Compare mass before and after a reaction.</li>
            </ul>
          </article>

          <div className="com-note">
            <strong>Simulation note:</strong> This is a simplified educational
            model. The amount of carbon dioxide is estimated for illustration;
            it is not calculated from the exact chemical composition or
            concentration of real vinegar.
          </div>
        </section>
      )}

      {screen === 1 && (
        <section className="com-panel">
          <div className="com-heading">
            <span>SCREEN 2 OF 5</span>
            <h2>Interactive Experiment</h2>
            <p>Change the reactant masses and compare open and closed systems.</p>
          </div>

          <div className="com-controls">
            <article className="com-control-card">
              <h3>🍶 Vinegar</h3>
              <label>
                Mass: <strong>{vinegarMass} g</strong>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={vinegarMass}
                onChange={(event) => setVinegarMass(Number(event.target.value))}
              />
            </article>

            <article className="com-control-card">
              <h3>🥄 Baking soda</h3>
              <label>
                Mass: <strong>{bakingSodaMass} g</strong>
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={bakingSodaMass}
                onChange={(event) => setBakingSodaMass(Number(event.target.value))}
              />
            </article>
          </div>

          <article className="com-info-card">
            <h3>Select the system</h3>
            <div className="com-system-options">
              <button
                className={systemType === "closed" ? "selected" : ""}
                onClick={() => setSystemType("closed")}
              >
                <span>🔒</span>
                <strong>Closed system</strong>
                <small>Gas remains inside</small>
              </button>
              <button
                className={systemType === "open" ? "selected" : ""}
                onClick={() => setSystemType("open")}
              >
                <span>🌬️</span>
                <strong>Open system</strong>
                <small>Gas can escape</small>
              </button>
            </div>
          </article>

          <article className="com-reaction-card">
            <h3>Virtual reaction setup</h3>
            <div className="com-setup">
              <div className="com-container">
                <div className="com-vessel">
                  <div className="com-liquid" />
                  {systemType === "closed" && <div className="com-seal" />}
                  <div className="com-bubbles">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <strong>{systemType === "closed" ? "Sealed container" : "Open container"}</strong>
                <small>{systemType === "closed" ? "Gas retained" : "Gas escapes"}</small>
              </div>
              <div className="com-arrow">→</div>
              <div className="com-balance">
                <div className="com-balance-display">
                  {result.finalMeasuredMass.toFixed(2)} g
                </div>
                <div className="com-balance-base" />
                <strong>Balance reading</strong>
              </div>
            </div>
            <p className="com-visual-note">
              The illustration represents gas production. It is not a
              molecular-scale animation.
            </p>
          </article>

          <article className="com-info-card">
            <h3>Mass calculation</h3>
            <div className="com-mass-grid">
              <div>
                <span>Initial mass</span>
                <strong>{result.initialMass.toFixed(2)} g</strong>
              </div>
              <div>
                <span>Estimated CO₂ produced</span>
                <strong>{result.co2Mass.toFixed(2)} g</strong>
              </div>
              <div>
                <span>CO₂ escaped</span>
                <strong>{result.escapedMass.toFixed(2)} g</strong>
              </div>
              <div>
                <span>Final measured mass</span>
                <strong>{result.finalMeasuredMass.toFixed(2)} g</strong>
              </div>
            </div>
            <div className={`com-conclusion ${systemType}`}>
              {systemType === "closed"
                ? "Closed system: all matter remains inside. Initial and final measured mass are equal."
                : "Open system: some carbon dioxide escapes. The balance measures less mass, but matter has not been destroyed."}
            </div>
          </article>

          <div className="com-actions">
            <button className="com-button secondary" onClick={resetExperiment}>
              Reset values
            </button>
            <button className="com-button primary" onClick={recordObservation}>
              Record observation
            </button>
          </div>

          <div className="com-table-wrap">
            <h3>Observation table ({readings.length})</h3>
            {readings.length === 0 ? (
              <p>No observations recorded yet. Change the settings and record a reading.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>System</th>
                    <th>Initial mass</th>
                    <th>Final mass</th>
                    <th>Mass lost</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((reading, index) => (
                    <tr key={reading.id}>
                      <td>{index + 1}</td>
                      <td>{reading.systemType}</td>
                      <td>{reading.initialMass.toFixed(2)} g</td>
                      <td>{reading.finalMass.toFixed(2)} g</td>
                      <td>{reading.escapedMass.toFixed(2)} g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {screen === 2 && (
        <section className="com-panel">
          <div className="com-heading">
            <span>SCREEN 3 OF 5</span>
            <h2>Graph and Analysis</h2>
            <p>Compare initial and final measured mass in each recorded experiment.</p>
          </div>

          {readings.length === 0 ? (
            <div className="com-empty">
              <h3>No observations available</h3>
              <p>Record readings in the Experiment screen to display the graph.</p>
              <button className="com-button primary" onClick={() => setScreen(1)}>
                Go to experiment
              </button>
            </div>
          ) : (
            <>
              <article className="com-info-card">
                <h3>Mass comparison (grams)</h3>
                <div className="com-graph">
                  {readings.map((reading, index) => {
                    const maximum = Math.max(
                      1,
                      ...readings.map((item) => item.initialMass)
                    );
                    return (
                      <div className="com-graph-group" key={reading.id}>
                        <div className="com-graph-bars">
                          <div
                            className="com-graph-bar initial"
                            style={{ height: `${(reading.initialMass / maximum) * 150}px` }}
                            title={`Initial: ${reading.initialMass.toFixed(2)} g`}
                          />
                          <div
                            className="com-graph-bar final"
                            style={{ height: `${(reading.finalMass / maximum) * 150}px` }}
                            title={`Final: ${reading.finalMass.toFixed(2)} g`}
                          />
                        </div>
                        <strong>{index + 1}</strong>
                        <small>{reading.systemType}</small>
                      </div>
                    );
                  })}
                </div>
                <div className="com-legend">
                  <span><i className="initial-dot" /> Initial mass</span>
                  <span><i className="final-dot" /> Final measured mass</span>
                </div>
              </article>

              <article className="com-info-card">
                <h3>Analysis</h3>
                <ul>
                  <li>In a closed system, initial mass equals final mass.</li>
                  <li>In an open system, gas can escape and reduce the measured mass.</li>
                  <li>The total mass of all matter, including escaped gas, is conserved.</li>
                </ul>
              </article>
            </>
          )}
        </section>
      )}

      {screen === 3 && (
        <section className="com-panel">
          <div className="com-heading">
            <span>SCREEN 4 OF 5</span>
            <h2>Knowledge Check</h2>
            <p>Answer all four questions to test your understanding.</p>
          </div>

          {questions.map((question, index) => (
            <article className="com-question" key={index}>
              <h3>{index + 1}. {question.question}</h3>
              <div className="com-options">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`com-option ${
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
                      name={`com-question-${index}`}
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
                <p className="com-explanation">{question.explanation}</p>
              )}
            </article>
          ))}

          {submitted && (
            <div className="com-score">
              Your score: <strong>{score} / 4</strong>
            </div>
          )}

          <div className="com-actions">
            {submitted ? (
              <button
                className="com-button secondary"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
              >
                Try again
              </button>
            ) : (
              <button
                className="com-button primary"
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
        <section className="com-panel">
          <div className="com-heading">
            <span>SCREEN 5 OF 5</span>
            <h2>Results and Conclusion</h2>
            <p>Review what you learned in this experiment.</p>
          </div>

          <div className="com-complete">
            <div>⚖️</div>
            <h3>Experiment completed!</h3>
            <p>You explored conservation of mass in open and closed systems.</p>
          </div>

          <div className="com-three-cards">
            <article className="com-info-card">
              <h3>Observations</h3>
              <strong className="com-big-number">{readings.length}</strong>
              <p>Readings recorded</p>
            </article>
            <article className="com-info-card">
              <h3>Quiz score</h3>
              <strong className="com-big-number">{submitted ? `${score}/4` : "—"}</strong>
              <p>{submitted ? "Quiz completed" : "Quiz not submitted"}</p>
            </article>
            <article className="com-info-card">
              <h3>Closed system rule</h3>
              <strong className="com-big-number">Equal</strong>
              <p>Initial and final total mass</p>
            </article>
          </div>

          <article className="com-info-card">
            <h3>Conclusion</h3>
            <p>
              The total mass of matter is conserved during a chemical reaction.
              In a closed system, all products remain inside and the measured
              mass stays the same. In an open system, a gas such as carbon
              dioxide can escape, making the measured mass appear lower.
              The gas has not been destroyed; it has moved into the surroundings.
            </p>
          </article>

          <article className="com-info-card">
            <h3>Applications in daily life</h3>
            <ul>
              <li>Understanding gas production during cooking and baking.</li>
              <li>Measuring reactants and products in chemical industries.</li>
              <li>Understanding why closed containers are useful in experiments.</li>
            </ul>
          </article>

          <article className="com-info-card">
            <h3>Video learning references</h3>
            <div className="com-video-links">
              <a href="https://www.youtube.com/results?search_query=law+of+conservation+of+mass+for+students" target="_blank" rel="noreferrer">
                ▶ Introduction to Conservation of Mass
              </a>
              <a href="https://www.youtube.com/results?search_query=vinegar+baking+soda+conservation+of+mass+closed+system" target="_blank" rel="noreferrer">
                ▶ Vinegar and Baking Soda Mass Demonstration
              </a>
            </div>
          </article>

          <div className="com-actions">
            <button
              className="com-button secondary"
              onClick={() => {
                setScreen(0);
                setAnswers({});
                setSubmitted(false);
                resetExperiment();
              }}
            >
              Restart experiment
            </button>
            <button className="com-button primary" onClick={() => setScreen(1)}>
              Try again
            </button>
          </div>
        </section>
      )}

      <footer className="com-footer">
        <button
          className="com-button secondary"
          disabled={screen === 0}
          onClick={() => setScreen((value) => Math.max(0, value - 1))}
        >
          ← Previous
        </button>
        <span>Screen {screen + 1} of 5</span>
        <button
          className="com-button primary"
          disabled={screen === 4}
          onClick={() => setScreen((value) => Math.min(4, value + 1))}
        >
          Next →
        </button>
      </footer>
    </main>
  );
}
