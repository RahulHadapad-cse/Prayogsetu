import React, { useMemo, useState } from "react";
import "./Electromagnetism.css";

const screens = ["Introduction", "Experiment", "Graph", "Quiz", "Results"];

const questions = [
  {
    question: "What is electromagnetic induction?",
    options: [
      "Production of electric current due to a changing magnetic flux",
      "Production of heat in a resistor",
      "Flow of current through an open circuit",
      "Attraction between two magnets",
    ],
    answer: 0,
    explanation:
      "Electromagnetic induction is the production of an EMF when the magnetic flux linked with a coil changes.",
  },
  {
    question: "Which law explains electromagnetic induction?",
    options: ["Ohm's Law", "Faraday's Law", "Newton's Law", "Hooke's Law"],
    answer: 1,
    explanation:
      "Faraday's Law states that the induced EMF depends on the rate of change of magnetic flux linkage.",
  },
  {
    question: "What happens when a magnet is moved faster towards a coil?",
    options: [
      "Induced EMF generally increases",
      "Induced EMF becomes zero",
      "The coil disappears",
      "Resistance becomes infinite",
    ],
    answer: 0,
    explanation:
      "A faster change in magnetic flux produces a greater magnitude of induced EMF.",
  },
  {
    question: "What is the SI unit of magnetic flux?",
    options: ["Tesla", "Volt", "Weber", "Ampere"],
    answer: 2,
    explanation: "The SI unit of magnetic flux is the Weber (Wb).",
  },
];

function CoilDiagram({ direction, emf }) {
  return (
    <div className="em-diagram">
      <svg viewBox="0 0 640 300" role="img" aria-label="Magnet moving near a wire coil">
        <defs>
          <marker
            id="em-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill="#2563eb" />
          </marker>
        </defs>

        <line x1="35" y1="155" x2="605" y2="155" stroke="#94a3b8" strokeDasharray="6 6" />

        <g>
          <rect x="75" y="105" width="105" height="100" rx="8" fill="#2563eb" />
          <rect x="127" y="105" width="53" height="100" rx="5" fill="#dc2626" />
          <text x="100" y="160" fill="white" fontSize="24" fontWeight="bold">N</text>
          <text x="145" y="160" fill="white" fontSize="24" fontWeight="bold">S</text>
          <text x="128" y="235" fill="currentColor" fontSize="14" textAnchor="middle">Bar magnet</text>
        </g>

        <g fill="none" stroke="#0f766e" strokeWidth="5">
          {Array.from({ length: 7 }, (_, i) => (
            <ellipse key={i} cx={350 + i * 13} cy="155" rx="12" ry="75" />
          ))}
        </g>

        <path d="M210 155 L285 155" stroke="#2563eb" strokeWidth="3" markerEnd="url(#em-arrow)" />
        <text x="245" y="135" fill="#2563eb" fontSize="14" textAnchor="middle">
          {direction === "towards" ? "Towards coil" : "Away from coil"}
        </text>

        <g>
          <rect x="470" y="95" width="100" height="65" rx="8" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
          <text x="520" y="121" fill="#0f172a" fontSize="14" textAnchor="middle">EMF</text>
          <text x="520" y="145" fill="#0f172a" fontSize="17" fontWeight="bold" textAnchor="middle">
            {emf.toFixed(3)} V
          </text>
          <path d="M430 155 L470 155" stroke="#0f766e" strokeWidth="3" />
        </g>

        <text x="350" y="255" fill="currentColor" fontSize="14" textAnchor="middle">
          Coil connected to a measuring device
        </text>
      </svg>
    </div>
  );
}

function getMagneticValues(distanceCm, speed, direction) {
  // Simplified educational model of the magnetic field near the coil.
  const distance = distanceCm / 100;
  const fieldAtCoil = 0.02;
  const characteristicDistance = 0.08;
  const turns = 200;
  const coilArea = 0.001;

  const ratio = distance / characteristicDistance;
  const magneticField = fieldAtCoil / (1 + ratio * ratio);

  const flux = magneticField * coilArea;
  const fluxLinkage = turns * flux;

  const dBdx =
    (-2 * fieldAtCoil * distance) /
    (characteristicDistance * characteristicDistance * Math.pow(1 + ratio * ratio, 2));

  const velocity = direction === "towards" ? -speed : speed;
  const dBdt = dBdx * velocity;
  const emf = -turns * coilArea * dBdt;

  return {
    magneticField,
    flux,
    fluxLinkage,
    emf,
    emfMagnitude: Math.abs(emf),
  };
}

export default function Electromagnetism() {
  const [screen, setScreen] = useState(0);
  const [distance, setDistance] = useState(8);
  const [speed, setSpeed] = useState(0.5);
  const [direction, setDirection] = useState("towards");
  const [readings, setReadings] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const values = useMemo(
    () => getMagneticValues(distance, speed, direction),
    [distance, speed, direction]
  );

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
        distance,
        speed,
        direction,
        flux: values.fluxLinkage,
        emf: values.emfMagnitude,
      },
    ]);
  };

  const resetExperiment = () => {
    setDistance(8);
    setSpeed(0.5);
    setDirection("towards");
    setReadings([]);
  };

  const nextScreen = () => setScreen((current) => Math.min(current + 1, 4));
  const previousScreen = () => setScreen((current) => Math.max(current - 1, 0));

  return (
    <main className="em-lab">
      <header className="em-header">
        <div>
          <p className="em-eyebrow">PRAYOGSETU · PHYSICS VIRTUAL LAB</p>
          <h1>Electromagnetic Induction</h1>
          <p className="em-subtitle">
            Explore how a changing magnetic field produces an induced EMF.
          </p>
        </div>
        <div className="em-header-icon">⚡</div>
      </header>

      <nav className="em-progress" aria-label="Experiment steps">
        {screens.map((name, index) => (
          <button
            key={name}
            className={`em-step ${screen === index ? "active" : ""} ${
              screen > index ? "completed" : ""
            }`}
            onClick={() => setScreen(index)}
          >
            <span>{index + 1}</span>
            {name}
          </button>
        ))}
      </nav>

      {screen === 0 && (
        <section className="em-panel">
          <div className="em-section-heading">
            <span className="em-tag">SCREEN 1 OF 5</span>
            <h2>Introduction and Theory</h2>
            <p>Understand the basic principle before starting the experiment.</p>
          </div>

          <div className="em-intro-grid">
            <article className="em-info-card">
              <h3>What is electromagnetic induction?</h3>
              <p>
                Electromagnetic induction is the process of producing an
                electromotive force (EMF) in a conductor when the magnetic
                flux linked with it changes.
              </p>
              <p>
                When a magnet moves near a coil, the magnetic field through
                the coil changes. This change can produce an induced voltage.
              </p>
            </article>

            <article className="em-info-card em-highlight">
              <h3>Faraday's Law</h3>
              <div className="em-formula">ε = −N × (ΔΦ / Δt)</div>
              <p>Where:</p>
              <ul>
                <li>ε = Induced EMF (volts)</li>
                <li>N = Number of turns in the coil</li>
                <li>ΔΦ = Change in magnetic flux (webers)</li>
                <li>Δt = Time taken (seconds)</li>
              </ul>
            </article>
          </div>

          <article className="em-info-card">
            <h3>Learning objectives</h3>
            <ul className="em-objectives">
              <li>Understand electromagnetic induction.</li>
              <li>Explore the effect of magnet speed on induced EMF.</li>
              <li>Observe how distance affects magnetic flux.</li>
              <li>Understand Faraday's Law and Lenz's Law.</li>
            </ul>
          </article>

          <div className="em-note">
            <strong>Remember:</strong> Lenz's Law tells us that the induced
            current produces a magnetic effect that opposes the change in
            magnetic flux that caused it.
          </div>
        </section>
      )}

      {screen === 1 && (
        <section className="em-panel">
          <div className="em-section-heading">
            <span className="em-tag">SCREEN 2 OF 5</span>
            <h2>Interactive Experiment</h2>
            <p>Change the magnet's distance, speed and direction.</p>
          </div>

          <CoilDiagram direction={direction} emf={values.emfMagnitude} />

          <div className="em-controls-grid">
            <div className="em-control-card">
              <label htmlFor="em-distance">
                Magnet distance <strong>{distance} cm</strong>
              </label>
              <input
                id="em-distance"
                type="range"
                min="1"
                max="20"
                step="1"
                value={distance}
                onChange={(event) => setDistance(Number(event.target.value))}
              />
              <div className="em-range-labels"><span>1 cm</span><span>20 cm</span></div>
            </div>

            <div className="em-control-card">
              <label htmlFor="em-speed">
                Magnet speed <strong>{speed.toFixed(1)} m/s</strong>
              </label>
              <input
                id="em-speed"
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={speed}
                onChange={(event) => setSpeed(Number(event.target.value))}
              />
              <div className="em-range-labels"><span>0.1 m/s</span><span>2 m/s</span></div>
            </div>

            <div className="em-control-card">
              <label htmlFor="em-direction">Magnet movement direction</label>
              <select
                id="em-direction"
                value={direction}
                onChange={(event) => setDirection(event.target.value)}
              >
                <option value="towards">Towards the coil</option>
                <option value="away">Away from the coil</option>
              </select>
            </div>
          </div>

          <div className="em-results-grid">
            <div className="em-result-card">
              <span>Magnetic field (model)</span>
              <strong>{values.magneticField.toFixed(5)} T</strong>
            </div>
            <div className="em-result-card">
              <span>Flux linkage</span>
              <strong>{values.fluxLinkage.toFixed(6)} Wb-turn</strong>
            </div>
            <div className="em-result-card em-result-main">
              <span>Induced EMF magnitude</span>
              <strong>{values.emfMagnitude.toFixed(4)} V</strong>
            </div>
          </div>

          <p className="em-small-note">
            This is a simplified educational model. It estimates the magnetic
            field and induced EMF to demonstrate the relationship; it is not
            a precision model of a real bar magnet.
          </p>

          <div className="em-actions">
            <button className="em-button secondary" onClick={resetExperiment}>
              Reset experiment
            </button>
            <button className="em-button primary" onClick={recordReading}>
              Record observation
            </button>
          </div>

          <div className="em-observations">
            <h3>Recorded observations ({readings.length})</h3>
            {readings.length === 0 ? (
              <p>No observations recorded yet. Adjust the controls and record a reading.</p>
            ) : (
              <div className="em-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Distance</th>
                      <th>Speed</th>
                      <th>Direction</th>
                      <th>Flux linkage</th>
                      <th>EMF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.map((reading, index) => (
                      <tr key={reading.id}>
                        <td>{index + 1}</td>
                        <td>{reading.distance} cm</td>
                        <td>{reading.speed.toFixed(1)} m/s</td>
                        <td>{reading.direction}</td>
                        <td>{reading.flux.toFixed(6)}</td>
                        <td>{reading.emf.toFixed(4)} V</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {screen === 2 && (
        <section className="em-panel">
          <div className="em-section-heading">
            <span className="em-tag">SCREEN 3 OF 5</span>
            <h2>Graph and Analysis</h2>
            <p>Compare the recorded flux linkage and induced EMF.</p>
          </div>

          {readings.length < 1 ? (
            <div className="em-empty">
              <div className="em-empty-icon">📊</div>
              <h3>No readings available</h3>
              <p>Go to the Experiment screen and record at least one observation.</p>
              <button className="em-button primary" onClick={() => setScreen(1)}>
                Go to experiment
              </button>
            </div>
          ) : (
            <>
              <div className="em-graph-card">
                <h3>Flux linkage vs induced EMF</h3>
                <p className="em-graph-caption">
                  Each point represents one recorded observation.
                </p>
                <div className="em-graph">
                  <div className="em-y-label">Induced EMF (V)</div>
                  <svg viewBox="0 0 600 340" role="img" aria-label="Graph of flux linkage against induced EMF">
                    {Array.from({ length: 6 }, (_, index) => {
                      const maxEmf = Math.max(
                        0.001,
                        ...readings.map((reading) => reading.emf)
                      );
                      const y = 275 - (index / 5) * 230;
                      const value = (maxEmf * index) / 5;
                      return (
                        <g key={index}>
                          <line x1="75" y1={y} x2="555" y2={y} stroke="#dbe3ee" strokeDasharray="4 4" />
                          <text x="64" y={y + 4} fontSize="11" fill="#64748b" textAnchor="end">
                            {value.toFixed(3)}
                          </text>
                        </g>
                      );
                    })}
                    <line x1="75" y1="45" x2="75" y2="275" stroke="#64748b" strokeWidth="2" />
                    <line x1="75" y1="275" x2="555" y2="275" stroke="#64748b" strokeWidth="2" />
                    {readings.map((reading, index) => {
                      const maxFlux = Math.max(
                        0.000001,
                        ...readings.map((item) => item.flux)
                      );
                      const maxEmf = Math.max(
                        0.001,
                        ...readings.map((item) => item.emf)
                      );
                      const x = 85 + (reading.flux / maxFlux) * 450;
                      const y = 275 - (reading.emf / maxEmf) * 230;
                      return (
                        <g key={reading.id}>
                          <circle cx={x} cy={y} r="6" fill="#2563eb" />
                          <text x={x} y={y - 12} fontSize="11" fill="#1e40af" textAnchor="middle">
                            {index + 1}
                          </text>
                        </g>
                      );
                    })}
                    <text x="315" y="320" fontSize="13" fill="#475569" textAnchor="middle">
                      Flux linkage (Wb-turn)
                    </text>
                  </svg>
                </div>
              </div>

              <div className="em-info-card">
                <h3>What can you observe?</h3>
                <ul>
                  <li>Changing magnetic flux produces an induced EMF.</li>
                  <li>Increasing magnet speed generally increases the magnitude of induced EMF.</li>
                  <li>Moving the magnet away reverses the sign of the induced EMF in this model.</li>
                  <li>The induced EMF depends on the rate of change of magnetic flux linkage.</li>
                </ul>
              </div>
            </>
          )}
        </section>
      )}

      {screen === 3 && (
        <section className="em-panel">
          <div className="em-section-heading">
            <span className="em-tag">SCREEN 4 OF 5</span>
            <h2>Knowledge Check</h2>
            <p>Answer the following questions to test your understanding.</p>
          </div>

          {questions.map((question, index) => (
            <article className="em-question-card" key={index}>
              <h3>{index + 1}. {question.question}</h3>
              <div className="em-options">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`em-option ${
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
                      name={`question-${index}`}
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
                <p className="em-explanation">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              )}
            </article>
          ))}

          {submitted && (
            <div className="em-score">
              Your score: <strong>{score} / {questions.length}</strong>
            </div>
          )}

          <div className="em-actions">
            {submitted ? (
              <button
                className="em-button secondary"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
              >
                Try again
              </button>
            ) : (
              <button
                className="em-button primary"
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(answers).length !== questions.length}
              >
                Submit answers
              </button>
            )}
          </div>
        </section>
      )}

      {screen === 4 && (
        <section className="em-panel">
          <div className="em-section-heading">
            <span className="em-tag">SCREEN 5 OF 5</span>
            <h2>Results and Conclusion</h2>
            <p>Review what you learned from the virtual experiment.</p>
          </div>

          <div className="em-completion-card">
            <div className="em-completion-icon">⚡</div>
            <h3>Experiment completed!</h3>
            <p>You explored electromagnetic induction using a magnet and coil.</p>
          </div>

          <div className="em-results-grid">
            <div className="em-result-card">
              <span>Observations recorded</span>
              <strong>{readings.length}</strong>
            </div>
            <div className="em-result-card">
              <span>Quiz score</span>
              <strong>{submitted ? `${score}/4` : "Not submitted"}</strong>
            </div>
            <div className="em-result-card">
              <span>Latest EMF magnitude</span>
              <strong>{values.emfMagnitude.toFixed(4)} V</strong>
            </div>
          </div>

          <article className="em-info-card">
            <h3>Conclusion</h3>
            <p>
              The experiment demonstrates that an EMF can be induced in a coil
              when the magnetic flux linked with it changes. The magnitude of
              induced EMF depends on how quickly the flux linkage changes.
              This is the principle of electromagnetic induction described by
              Faraday's Law.
            </p>
          </article>

          <article className="em-info-card">
            <h3>Applications in real life</h3>
            <ul>
              <li>Electric generators</li>
              <li>Transformers</li>
              <li>Induction cooktops</li>
              <li>Wireless charging systems</li>
              <li>Electromagnetic sensors</li>
            </ul>
          </article>

          <article className="em-info-card">
            <h3>Video learning references</h3>
            <p>Open these learning searches to find introductory and demonstration videos.</p>
            <div className="em-video-links">
              <a
                href="https://www.youtube.com/results?search_query=electromagnetic+induction+introduction"
                target="_blank"
                rel="noreferrer"
              >
                ▶ Introduction to Electromagnetic Induction
              </a>
              <a
                href="https://www.youtube.com/results?search_query=faradays+law+electromagnetic+induction+experiment"
                target="_blank"
                rel="noreferrer"
              >
                ▶ Faraday's Law Experiment Demonstration
              </a>
            </div>
          </article>

          <div className="em-actions">
            <button
              className="em-button secondary"
              onClick={() => {
                setScreen(0);
                setAnswers({});
                setSubmitted(false);
                resetExperiment();
              }}
            >
              Restart experiment
            </button>
            <button className="em-button primary" onClick={() => setScreen(1)}>
              Try experiment again
            </button>
          </div>
        </section>
      )}

      <footer className="em-footer">
        <button
          className="em-button secondary"
          onClick={previousScreen}
          disabled={screen === 0}
        >
          ← Previous
        </button>
        <span>Screen {screen + 1} of 5</span>
        <button
          className="em-button primary"
          onClick={nextScreen}
          disabled={screen === 4}
        >
          Next →
        </button>
      </footer>
    </main>
  );
}