
import React, { useState } from "react";
import "./ReactionRate.css";

const questions = [
  {
    question: "What generally happens to reaction rate when temperature increases?",
    options: ["It decreases", "It increases", "It becomes zero", "It never changes"],
    answer: 1,
    explanation: "Higher temperature generally increases particle kinetic energy and the frequency of effective collisions.",
  },
  {
    question: "How does increasing concentration usually affect reaction rate?",
    options: ["Increases the rate", "Stops the reaction", "Always decreases the rate", "Has no effect"],
    answer: 0,
    explanation: "Higher concentration means more reactant particles in a given volume, leading to more frequent collisions.",
  },
  {
    question: "Why does powdered solid often react faster than a large lump?",
    options: ["It has less mass", "It has more exposed surface area", "It is always hotter", "It has no particles"],
    answer: 1,
    explanation: "Powder exposes more surface area for collisions with other reactant particles.",
  },
  {
    question: "What is collision theory?",
    options: [
      "All collisions cause reactions",
      "Particles must collide with sufficient energy and suitable orientation",
      "Particles must stop moving",
      "Only solids can react",
    ],
    answer: 1,
    explanation: "Effective collisions need sufficient energy and a suitable orientation.",
  },
];

function calculateRate(temperature, concentration, surfaceArea) {
  // Illustrative relative-rate model, not a measured chemical rate.
  const temperatureFactor = Math.pow(1.06, temperature - 20);
  const concentrationFactor = concentration / 1;
  const surfaceFactor = surfaceArea / 1;
  const relativeRate = temperatureFactor * concentrationFactor * surfaceFactor;

  return {
    temperatureFactor,
    concentrationFactor,
    surfaceFactor,
    relativeRate,
    relativeTime: 100 / relativeRate,
  };
}

export default function ReactionRate() {
  const [screen, setScreen] = useState(0);
  const [temperature, setTemperature] = useState(20);
  const [concentration, setConcentration] = useState(1);
  const [surfaceArea, setSurfaceArea] = useState(1);
  const [readings, setReadings] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const result = calculateRate(temperature, concentration, surfaceArea);
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
        temperature,
        concentration,
        surfaceArea,
        rate: result.relativeRate,
        time: result.relativeTime,
      },
    ]);
  }

  function resetExperiment() {
    setTemperature(20);
    setConcentration(1);
    setSurfaceArea(1);
    setReadings([]);
  }

  return (
    <main className="rr-lab">
      <header className="rr-header">
        <div>
          <p className="rr-eyebrow">PRAYOGSETU · CHEMISTRY VIRTUAL LAB</p>
          <h1>Factors Affecting Reaction Rate</h1>
          <p>Explore how temperature, concentration and surface area affect reaction speed.</p>
        </div>
        <div className="rr-header-icon">⚗️</div>
      </header>

      <nav className="rr-progress">
        {["Introduction", "Experiment", "Graph", "Quiz", "Results"].map((name, index) => (
          <button
            key={name}
            className={`rr-step ${screen === index ? "active" : ""} ${screen > index ? "completed" : ""}`}
            onClick={() => setScreen(index)}
          >
            <span>{index + 1}</span>
            {name}
          </button>
        ))}
      </nav>

      {screen === 0 && (
        <section className="rr-panel">
          <div className="rr-heading">
            <span>SCREEN 1 OF 5</span>
            <h2>Introduction and Theory</h2>
            <p>Learn why some chemical reactions happen faster than others.</p>
          </div>

          <article className="rr-info-card">
            <h3>What is reaction rate?</h3>
            <p>
              Reaction rate describes how quickly reactants are converted into
              products. It can be measured by observing the change in
              concentration of a reactant or product over time.
            </p>
            <div className="rr-equation">
              Reaction rate = Change in concentration ÷ Time
            </div>
          </article>

          <div className="rr-three-cards">
            <article className="rr-info-card">
              <div className="rr-card-icon">🌡️</div>
              <h3>Temperature</h3>
              <p>Higher temperature usually makes particles move faster and increases effective collisions.</p>
            </article>
            <article className="rr-info-card">
              <div className="rr-card-icon">🧪</div>
              <h3>Concentration</h3>
              <p>Higher concentration usually means more particles are available to collide.</p>
            </article>
            <article className="rr-info-card">
              <div className="rr-card-icon">🪨</div>
              <h3>Surface area</h3>
              <p>Smaller solid pieces expose more surface area for reactions.</p>
            </article>
          </div>

          <article className="rr-info-card">
            <h3>Collision theory</h3>
            <p>
              Reactant particles must collide with sufficient energy and
              suitable orientation for a reaction to occur. These are called
              effective collisions.
            </p>
            <div className="rr-collision-visual">
              <span>●</span><span>●</span><b>→</b><span>✦</span>
              <p>Particles collide and form products</p>
            </div>
          </article>

          <article className="rr-info-card">
            <h3>Learning objectives</h3>
            <ul>
              <li>Understand the meaning of reaction rate.</li>
              <li>Identify factors affecting reaction speed.</li>
              <li>Understand collision theory.</li>
              <li>Compare relative reaction rates using a simulation.</li>
            </ul>
          </article>

          <div className="rr-note">
            <strong>Simulation note:</strong> The interactive rate value is an
            illustrative relative-rate model. It helps compare settings; it is
            not an experimentally measured rate or a prediction for a specific
            chemical reaction.
          </div>
        </section>
      )}

      {screen === 1 && (
        <section className="rr-panel">
          <div className="rr-heading">
            <span>SCREEN 2 OF 5</span>
            <h2>Interactive Experiment</h2>
            <p>Adjust the three factors and observe the relative reaction rate.</p>
          </div>

          <div className="rr-controls">
            <article className="rr-control-card">
              <h3>🌡️ Temperature</h3>
              <label>Temperature: <strong>{temperature} °C</strong></label>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={temperature}
                onChange={(event) => setTemperature(Number(event.target.value))}
              />
              <small>Range: 10°C to 60°C</small>
            </article>

            <article className="rr-control-card">
              <h3>🧪 Concentration</h3>
              <label>Concentration: <strong>{concentration.toFixed(1)} M</strong></label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={concentration}
                onChange={(event) => setConcentration(Number(event.target.value))}
              />
              <small>Range: 0.5 M to 2.0 M</small>
            </article>

            <article className="rr-control-card">
              <h3>🪨 Surface area</h3>
              <label>Relative surface area: <strong>{surfaceArea.toFixed(1)}×</strong></label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={surfaceArea}
                onChange={(event) => setSurfaceArea(Number(event.target.value))}
              />
              <small>Higher value represents smaller pieces or more exposed area.</small>
            </article>
          </div>

          <article className="rr-reaction-card">
            <h3>Virtual reaction observation</h3>
            <div className="rr-particles">
              {Array.from({ length: 18 }, (_, index) => (
                <span key={index} style={{ animationDelay: `${index * 0.12}s` }}>
                  {index % 2 === 0 ? "●" : "○"}
                </span>
              ))}
            </div>
            <p>Particle movement is illustrated for learning; it is not a molecular-scale physical simulation.</p>
          </article>

          <article className="rr-info-card">
            <h3>Calculated comparison</h3>
            <div className="rr-results-grid">
              <div>
                <span>Relative rate</span>
                <strong>{result.relativeRate.toFixed(2)}×</strong>
              </div>
              <div>
                <span>Relative time</span>
                <strong>{result.relativeTime.toFixed(1)}</strong>
              </div>
              <div>
                <span>Temperature factor</span>
                <strong>{result.temperatureFactor.toFixed(2)}</strong>
              </div>
            </div>
            <p className="rr-result-message">
              {result.relativeRate > 2
                ? "The selected conditions give a higher relative reaction rate in this model."
                : result.relativeRate < 0.8
                  ? "The selected conditions give a lower relative reaction rate in this model."
                  : "The selected conditions give a moderate relative reaction rate in this model."}
            </p>
            <div className="rr-rate-track">
              <div style={{ width: `${Math.min(100, result.relativeRate / 8 * 100)}%` }} />
            </div>
            <small>Relative-rate display (scaled for this simulation)</small>
          </article>

          <div className="rr-actions">
            <button className="rr-button secondary" onClick={resetExperiment}>Reset values</button>
            <button className="rr-button primary" onClick={recordObservation}>Record observation</button>
          </div>

          <div className="rr-table-wrap">
            <h3>Observation table ({readings.length})</h3>
            {readings.length === 0 ? (
              <p>No observations recorded yet. Change the settings and record a reading.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Temperature</th>
                    <th>Concentration</th>
                    <th>Surface area</th>
                    <th>Relative rate</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((reading, index) => (
                    <tr key={reading.id}>
                      <td>{index + 1}</td>
                      <td>{reading.temperature} °C</td>
                      <td>{reading.concentration.toFixed(1)} M</td>
                      <td>{reading.surfaceArea.toFixed(1)}×</td>
                      <td>{reading.rate.toFixed(2)}×</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {screen === 2 && (
        <section className="rr-panel">
          <div className="rr-heading">
            <span>SCREEN 3 OF 5</span>
            <h2>Graph and Analysis</h2>
            <p>Compare the relative rates recorded under different conditions.</p>
          </div>

          {readings.length === 0 ? (
            <div className="rr-empty">
              <h3>No observations available</h3>
              <p>Record readings in the Experiment screen to display the graph.</p>
              <button className="rr-button primary" onClick={() => setScreen(1)}>Go to experiment</button>
            </div>
          ) : (
            <>
              <article className="rr-info-card">
                <h3>Relative reaction rate graph</h3>
                <div className="rr-chart">
                  {readings.map((reading, index) => {
                    const maximum = Math.max(1, ...readings.map((item) => item.rate));
                    return (
                      <div className="rr-chart-column" key={reading.id}>
                        <strong>{reading.rate.toFixed(1)}</strong>
                        <div className="rr-chart-track">
                          <div style={{ height: `${reading.rate / maximum * 150}px` }} />
                        </div>
                        <span>Test {index + 1}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="rr-chart-caption">Each bar represents the relative-rate value for one recorded test.</p>
              </article>

              <article className="rr-info-card">
                <h3>Analysis</h3>
                <ul>
                  <li>Increasing temperature generally increases reaction rate.</li>
                  <li>Increasing concentration generally increases collision frequency.</li>
                  <li>Increasing the exposed surface area of a solid generally increases reaction rate.</li>
                  <li>These trends depend on the particular reaction and experimental conditions.</li>
                </ul>
              </article>
            </>
          )}
        </section>
      )}

      {screen === 3 && (
        <section className="rr-panel">
          <div className="rr-heading">
            <span>SCREEN 4 OF 5</span>
            <h2>Knowledge Check</h2>
            <p>Answer all four questions to test your understanding.</p>
          </div>

          {questions.map((question, index) => (
            <article className="rr-question" key={index}>
              <h3>{index + 1}. {question.question}</h3>
              <div className="rr-options">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`rr-option ${
                      answers[index] === optionIndex ? "selected" : ""
                    } ${
                      submitted && optionIndex === question.answer ? "correct" : ""
                    } ${
                      submitted && answers[index] === optionIndex && optionIndex !== question.answer
                        ? "incorrect"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`rr-question-${index}`}
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
              {submitted && <p className="rr-explanation">{question.explanation}</p>}
            </article>
          ))}

          {submitted && <div className="rr-score">Your score: <strong>{score} / 4</strong></div>}

          <div className="rr-actions">
            {submitted ? (
              <button className="rr-button secondary" onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}>Try again</button>
            ) : (
              <button
                className="rr-button primary"
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
        <section className="rr-panel">
          <div className="rr-heading">
            <span>SCREEN 5 OF 5</span>
            <h2>Results and Conclusion</h2>
            <p>Review what you learned in this virtual experiment.</p>
          </div>

          <div className="rr-complete">
            <div>⚗️</div>
            <h3>Experiment completed!</h3>
            <p>You explored three factors that affect reaction rate.</p>
          </div>

          <div className="rr-three-cards">
            <article className="rr-info-card">
              <h3>Observations</h3>
              <strong className="rr-big-number">{readings.length}</strong>
              <p>Readings recorded</p>
            </article>
            <article className="rr-info-card">
              <h3>Quiz score</h3>
              <strong className="rr-big-number">{submitted ? `${score}/4` : "—"}</strong>
              <p>{submitted ? "Quiz completed" : "Quiz not submitted"}</p>
            </article>
            <article className="rr-info-card">
              <h3>Factors studied</h3>
              <strong className="rr-big-number">3</strong>
              <p>Temperature, concentration and surface area</p>
            </article>
          </div>

          <article className="rr-info-card">
            <h3>Conclusion</h3>
            <p>
              Reaction rate is affected by temperature, concentration and
              surface area. These factors influence how often particles
              collide and how many collisions are effective. The relative-rate
              simulation illustrates these trends using a simplified model.
            </p>
          </article>

          <article className="rr-info-card">
            <h3>Applications in daily life</h3>
            <ul>
              <li>Food is often stored at low temperatures to slow chemical changes.</li>
              <li>Powdered materials can react faster because they expose more surface area.</li>
              <li>Industrial processes control temperature and concentration to manage reaction rates.</li>
            </ul>
          </article>

          <article className="rr-info-card">
            <h3>Video learning references</h3>
            <div className="rr-video-links">
              <a href="https://www.youtube.com/results?search_query=factors+affecting+rate+of+reaction+chemistry" target="_blank" rel="noreferrer">
                ▶ Factors Affecting Rate of Reaction
              </a>
              <a href="https://www.youtube.com/results?search_query=collision+theory+reaction+rate+explained" target="_blank" rel="noreferrer">
                ▶ Collision Theory Explained
              </a>
            </div>
          </article>

          <div className="rr-actions">
            <button className="rr-button secondary" onClick={() => {
              setScreen(0);
              setAnswers({});
              setSubmitted(false);
              resetExperiment();
            }}>Restart experiment</button>
            <button className="rr-button primary" onClick={() => setScreen(1)}>Try again</button>
          </div>
        </section>
      )}

      <footer className="rr-footer">
        <button className="rr-button secondary" disabled={screen === 0} onClick={() => setScreen((value) => Math.max(0, value - 1))}>← Previous</button>
        <span>Screen {screen + 1} of 5</span>
        <button className="rr-button primary" disabled={screen === 4} onClick={() => setScreen((value) => Math.min(4, value + 1))}>Next →</button>
      </footer>
    </main>
  );
}
