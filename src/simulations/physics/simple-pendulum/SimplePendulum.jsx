
import { useState } from "react";
import "./SimplePendulum.css";

const G = 9.81;

const questions = [
  {
    question: "What is one complete oscillation?",
    options: [
      "Motion from one side to the centre",
      "One complete to-and-fro motion",
      "Motion only in one direction",
      "One-half of a swing"
    ],
    answer: 1,
    explanation: "One complete oscillation is one full to-and-fro motion of the bob."
  },
  {
    question: "What is the SI unit of time period?",
    options: ["Metre", "Kilogram", "Second", "Hertz"],
    answer: 2,
    explanation: "Time period is the time taken for one oscillation and is measured in seconds."
  },
  {
    question: "What happens to the time period when pendulum length increases?",
    options: [
      "It decreases",
      "It increases",
      "It becomes zero",
      "It does not change"
    ],
    answer: 1,
    explanation: "The time period increases with the square root of the pendulum length."
  },
  {
    question: "Does the mass of the bob affect the ideal pendulum's time period?",
    options: [
      "Yes, always",
      "No",
      "Only for heavy bobs",
      "Only for light bobs"
    ],
    answer: 1,
    explanation: "For an ideal simple pendulum, the time period does not depend on the bob's mass."
  }
];

function calculatePeriod(length) {
  return 2 * Math.PI * Math.sqrt(length / G);
}

function PendulumDiagram({ angle, length, swinging }) {
  const stringLength = 145 + (length - 0.5) * 35;

  return (
    <svg
      className="sp-diagram"
      viewBox="0 0 500 310"
      role="img"
      aria-label="Simple pendulum showing pivot, string and bob"
    >
      <defs>
        <radialGradient id="sp-bob-gradient" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
      </defs>

      <line
        x1="170" y1="25" x2="330" y2="25"
        stroke="#475569" strokeWidth="8" strokeLinecap="round"
      />

      <circle cx="250" cy="30" r="7" fill="#334155" />

      <g
        className={swinging ? "sp-moving" : ""}
        style={{
          transformOrigin: "250px 30px",
          "--sp-angle": `${angle}deg`
        }}
      >
        <line
          x1="250"
          y1="30"
          x2="250"
          y2={30 + stringLength}
          stroke="#475569"
          strokeWidth="3"
        />

        <circle
          cx="250"
          cy={30 + stringLength}
          r="23"
          fill="url(#sp-bob-gradient)"
          stroke="#1e40af"
          strokeWidth="2"
        />
      </g>

      <line
        x1="250"
        y1="30"
        x2="250"
        y2={30 + stringLength}
        stroke="#94a3b8"
        strokeDasharray="5 5"
        strokeWidth="1.5"
        opacity="0.6"
      />

      <text x="265" y="20" fill="#475569" fontSize="13">Pivot</text>
      <text x="265" y={30 + stringLength / 2} fill="#174d88" fontSize="14">
        L = {length.toFixed(2)} m
      </text>

      <text x="250" y="295" textAnchor="middle" fill="#64748b" fontSize="13">
        Pendulum bob and string
      </text>
    </svg>
  );
}

function SimplePendulum() {
  const [slide, setSlide] = useState(1);
  const [length, setLength] = useState(1);
  const [releaseAngle, setReleaseAngle] = useState(15);
  const [mass, setMass] = useState(100);
  const [swinging, setSwinging] = useState(false);
  const [readings, setReadings] = useState([]);

  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const period = calculatePeriod(length);
  const frequency = 1 / period;
  const currentQuestion = questions[quizIndex];
  const quizScore = quizAnswers.filter(Boolean).length;

  function recordReading() {
    setReadings((previous) => [
      ...previous,
      {
        trial: previous.length + 1,
        length,
        period,
        frequency,
        periodSquared: period * period
      }
    ]);
  }

  function submitAnswer() {
    if (selectedOption === null) return;

    setQuizAnswers((previous) => {
      const updated = [...previous];
      updated[quizIndex] = selectedOption === currentQuestion.answer;
      return updated;
    });

    setSubmitted(true);
  }

  function nextQuestion() {
    if (quizIndex < questions.length - 1) {
      setQuizIndex((previous) => previous + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setSlide(5);
    }
  }

  function restartExperiment() {
    setSlide(1);
    setLength(1);
    setReleaseAngle(15);
    setMass(100);
    setSwinging(false);
    setReadings([]);
    setQuizIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setQuizAnswers([]);
  }

  const averagePeriod = readings.length
    ? readings.reduce((sum, item) => sum + item.period, 0) / readings.length
    : 0;

  return (
    <main className="simple-pendulum-lab">

      {/* HEADER */}
      <header className="sp-header">
        <h1>Simple Pendulum Virtual Lab</h1>
        <p>Predict, Experiment, Observe and Learn</p>
        <span>Physics Experiment</span>
      </header>

      {/* PROGRESS */}
      <section className="sp-progress">
        <div className="sp-progress-heading">
          <strong>Experiment Progress</strong>
          <span>Slide {slide} of 5</span>
        </div>

        <div className="sp-progress-track">
          <div
            className="sp-progress-fill"
            style={{ width: `${slide * 20}%` }}
          />
        </div>

        <div className="sp-slide-labels">
          {["Introduction", "Experiment", "Graph", "Quiz", "Results"].map(
            (label, index) => (
              <span
                key={label}
                className={slide === index + 1 ? "active" : ""}
              >
                {index + 1}. {label}
              </span>
            )
          )}
        </div>
      </section>

      {/* SCREEN 1: INTRODUCTION */}
      {slide === 1 && (
        <section className="sp-card">
          <h2>1. Introduction to Simple Pendulum</h2>

          <p className="sp-subtitle">
            Study the periodic motion of a simple pendulum.
          </p>

          <div className="sp-section">
            <h3>Learning Objectives</h3>
            <ul>
              <li>Understand oscillatory and periodic motion.</li>
              <li>Identify the pivot, string, bob and length.</li>
              <li>Understand time period and frequency.</li>
              <li>Study how pendulum length affects its time period.</li>
              <li>Verify the relationship between length and time period.</li>
            </ul>
          </div>

          <div className="sp-section">
            <h3>What is a Simple Pendulum?</h3>
            <p>
              A simple pendulum consists of a small heavy bob suspended
              from a fixed point by a light, inextensible string. When
              displaced and released, the bob moves to and fro about its
              mean position.
            </p>
          </div>

          <div className="sp-section">
            <h3>Important Terms</h3>
            <ul>
              <li><strong>Bob:</strong> The suspended mass.</li>
              <li><strong>Length (L):</strong> Distance from the pivot to the centre of the bob.</li>
              <li><strong>Oscillation:</strong> One complete to-and-fro motion.</li>
              <li><strong>Time period (T):</strong> Time taken for one complete oscillation.</li>
              <li><strong>Frequency (f):</strong> Number of oscillations per second.</li>
            </ul>
          </div>

          <div className="sp-section">
            <h3>Simple Pendulum Diagram</h3>
            <PendulumDiagram angle={15} length={1} swinging={false} />
            <p className="sp-note">
              The bob swings about its mean position after being displaced.
            </p>
          </div>

          <div className="sp-formula">
            <p>Time Period</p>
            <strong>T ≈ 2π √(L / g)</strong>
            <p>Frequency: f = 1 / T</p>
            <p>g = 9.81 m/s²</p>
          </div>

          <div className="sp-section">
            <h3>Principle</h3>
            <p>
              For small oscillations, the time period of an ideal simple
              pendulum depends on its length and the acceleration due
              to gravity. It does not depend on the mass of the bob.
            </p>
          </div>

          <div className="sp-actions">
            <button className="sp-primary" onClick={() => setSlide(2)}>
              Next: Start Experiment →
            </button>
          </div>
        </section>
      )}

      {/* SCREEN 2: EXPERIMENT */}
      {slide === 2 && (
        <section className="sp-card">
          <h2>2. Interactive Pendulum Experiment</h2>

          <p className="sp-subtitle">
            Change the pendulum settings and observe its motion and time period.
          </p>

          <div className="sp-section">
            <h3>Adjust Pendulum Length</h3>
            <div className="sp-value">{length.toFixed(2)} m</div>
            <input
              className="sp-slider"
              type="range"
              min="0.5"
              max="2"
              step="0.05"
              value={length}
              onChange={(event) => setLength(Number(event.target.value))}
            />
            <div className="sp-slider-labels">
              <span>0.5 m</span>
              <span>2.0 m</span>
            </div>
          </div>

          <div className="sp-section">
            <h3>Adjust Release Angle</h3>
            <div className="sp-value">{releaseAngle}°</div>
            <input
              className="sp-slider"
              type="range"
              min="5"
              max="30"
              step="1"
              value={releaseAngle}
              onChange={(event) => setReleaseAngle(Number(event.target.value))}
            />
            <div className="sp-slider-labels">
              <span>5°</span>
              <span>30°</span>
            </div>
            <p className="sp-note">
              Small angles are used for the simple pendulum time-period approximation.
            </p>
          </div>

          <div className="sp-section">
            <h3>Bob Mass</h3>
            <div className="sp-value">{mass} g</div>
            <input
              className="sp-slider"
              type="range"
              min="50"
              max="200"
              step="10"
              value={mass}
              onChange={(event) => setMass(Number(event.target.value))}
            />
            <div className="sp-slider-labels">
              <span>50 g</span>
              <span>200 g</span>
            </div>
            <p className="sp-note">
              Changing mass does not change the ideal pendulum time period.
            </p>
          </div>

          <div className="sp-section">
            <h3>Live Pendulum Simulation</h3>
            <PendulumDiagram
              angle={releaseAngle}
              length={length}
              swinging={swinging}
            />

            <div className="sp-actions sp-center">
              <button
                className="sp-primary"
                onClick={() => setSwinging(!swinging)}
              >
                {swinging ? "Stop Swinging" : "Start Swinging"}
              </button>
            </div>
            <p className="sp-note">
              The animation illustrates the swinging motion. The calculated
              time period is based on the ideal small-angle model.
            </p>
          </div>

          <div className="sp-measurements">
            <div>
              <span>Time Period</span>
              <strong>{period.toFixed(3)} s</strong>
            </div>
            <div>
              <span>Frequency</span>
              <strong>{frequency.toFixed(3)} Hz</strong>
            </div>
          </div>

          <div className="sp-formula">
            T ≈ 2π √({length.toFixed(2)} / 9.81) = {period.toFixed(3)} s
          </div>

          <div className="sp-section">
            <h3>Record Your Observation</h3>
            <button className="sp-primary" onClick={recordReading}>
              + Record Reading
            </button>

            {readings.length > 0 && (
              <div className="sp-table-wrap">
                <table className="sp-table">
                  <thead>
                    <tr>
                      <th>Trial</th>
                      <th>Length (m)</th>
                      <th>Time Period (s)</th>
                      <th>Frequency (Hz)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.map((item) => (
                      <tr key={item.trial}>
                        <td>{item.trial}</td>
                        <td>{item.length.toFixed(2)}</td>
                        <td>{item.period.toFixed(3)}</td>
                        <td>{item.frequency.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="sp-actions">
            <button className="sp-secondary" onClick={() => setSlide(1)}>
              ← Previous
            </button>
            <button className="sp-primary" onClick={() => setSlide(3)}>
              Next: Graph →
            </button>
          </div>
        </section>
      )}

      {/* SCREEN 3: GRAPH */}
      {slide === 3 && (
        <section className="sp-card">
          <h2>3. Observation and Graph</h2>

          <p className="sp-subtitle">
            Study the relationship between pendulum length and the square
            of its time period.
          </p>

          <div className="sp-section">
            <h3>Graph: Length (L) vs Time Period Squared (T²)</h3>

            <svg
              className="sp-graph"
              viewBox="0 0 500 340"
              role="img"
              aria-label="Graph showing time period squared against pendulum length"
            >
              {Array.from({ length: 9 }, (_, index) => {
                const value = index * 0.25;
                const x = 65 + value * 180;
                const y = 270 - value * (4 * Math.PI * Math.PI / G) * 25;

                return (
                  <g key={index}>
                    <line x1={x} y1="65" x2={x} y2="270" stroke="#e2e8f0" />
                    <line x1="65" y1={y} x2="425" y2={y} stroke="#e2e8f0" />
                    <text x={x} y="289" textAnchor="middle" fontSize="10">
                      {value.toFixed(2)}
                    </text>
                    <text x="55" y={y + 4} textAnchor="end" fontSize="10">
                      {(value * 4 * Math.PI * Math.PI / G).toFixed(1)}
                    </text>
                  </g>
                );
              })}

              <line x1="65" y1="65" x2="65" y2="270" stroke="#334155" strokeWidth="2" />
              <line x1="65" y1="270" x2="425" y2="270" stroke="#334155" strokeWidth="2" />

              <line
                x1="65"
                y1="270"
                x2="425"
                y2={270 - 2 * (4 * Math.PI * Math.PI / G) * 25}
                stroke="#16a34a"
                strokeWidth="3"
                strokeDasharray="7 5"
              />

              {readings.map((item) => (
                <circle
                  key={item.trial}
                  cx={65 + item.length * 180}
                  cy={270 - item.periodSquared * 25}
                  r="6"
                  fill="#2563eb"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}

              <text x="245" y="325" textAnchor="middle" fontSize="13">
                Length L (metres)
              </text>

              <text
                x="15"
                y="165"
                textAnchor="middle"
                fontSize="13"
                transform="rotate(-90 15 165)"
              >
                Time Period Squared T² (s²)
              </text>
            </svg>

            <p className="sp-note">
              Green dashed line: theoretical relationship. Blue points: your recorded readings.
            </p>
          </div>

          <div className="sp-section">
            <h3>Observation Table</h3>

            {readings.length === 0 ? (
              <p>
                No readings recorded. Return to the experiment screen and
                record different pendulum lengths.
              </p>
            ) : (
              <div className="sp-table-wrap">
                <table className="sp-table">
                  <thead>
                    <tr>
                      <th>Trial</th>
                      <th>Length (m)</th>
                      <th>T (s)</th>
                      <th>T² (s²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.map((item) => (
                      <tr key={item.trial}>
                        <td>{item.trial}</td>
                        <td>{item.length.toFixed(2)}</td>
                        <td>{item.period.toFixed(3)}</td>
                        <td>{item.periodSquared.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="sp-actions">
            <button className="sp-secondary" onClick={() => setSlide(2)}>
              ← Previous
            </button>
            <button className="sp-primary" onClick={() => setSlide(4)}>
              Next: Quiz →
            </button>
          </div>
        </section>
      )}

      {/* SCREEN 4: QUIZ */}
      {slide === 4 && (
        <section className="sp-card">
          <h2>4. Knowledge Check</h2>

          <p className="sp-subtitle">
            Test your understanding of the simple pendulum.
          </p>

          <div className="sp-quiz-progress">
            Question {quizIndex + 1} of {questions.length}
          </div>

          <div className="sp-section">
            <h3>{currentQuestion.question}</h3>

            <div className="sp-options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`sp-option ${
                    selectedOption === index ? "selected" : ""
                  } ${
                    submitted && index === currentQuestion.answer
                      ? "correct"
                      : ""
                  } ${
                    submitted &&
                    selectedOption === index &&
                    index !== currentQuestion.answer
                      ? "incorrect"
                      : ""
                  }`}
                  disabled={submitted}
                  onClick={() => setSelectedOption(index)}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>

            {submitted && (
              <div className="sp-feedback">
                <strong>
                  {selectedOption === currentQuestion.answer
                    ? "Correct answer!"
                    : "Incorrect answer."}
                </strong>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>

          <div className="sp-actions">
            <button className="sp-secondary" onClick={() => setSlide(3)}>
              ← Previous
            </button>

            {!submitted ? (
              <button
                className="sp-primary"
                onClick={submitAnswer}
                disabled={selectedOption === null}
              >
                Submit Answer
              </button>
            ) : (
              <button className="sp-primary" onClick={nextQuestion}>
                {quizIndex === questions.length - 1
                  ? "View Results →"
                  : "Next Question →"}
              </button>
            )}
          </div>
        </section>
      )}

      {/* SCREEN 5: RESULTS */}
      {slide === 5 && (
        <section className="sp-card">
          <h2>5. Experiment Results</h2>

          <p className="sp-subtitle">
            Review your pendulum observations and quiz performance.
          </p>

          <div className="sp-result-box">
            <h3>Experimental Conclusion</h3>
            <p>
              The time period of an ideal simple pendulum increases as its
              length increases. For small oscillations, the square of the
              time period is directly proportional to the length.
            </p>

            <div className="sp-formula">
              T² ∝ L
            </div>
          </div>

          <div className="sp-measurements">
            <div>
              <span>Total Readings</span>
              <strong>{readings.length}</strong>
            </div>
            <div>
              <span>Quiz Score</span>
              <strong>{quizScore} / {questions.length}</strong>
            </div>
            <div>
              <span>Average Time Period</span>
              <strong>{averagePeriod ? `${averagePeriod.toFixed(3)} s` : "—"}</strong>
            </div>
          </div>

          <div className="sp-section">
            <h3>Final Observations</h3>
            {readings.length === 0 ? (
              <p>No readings were recorded during the experiment.</p>
            ) : (
              <div className="sp-table-wrap">
                <table className="sp-table">
                  <thead>
                    <tr>
                      <th>Trial</th>
                      <th>Length (m)</th>
                      <th>Time Period (s)</th>
                      <th>T² (s²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.map((item) => (
                      <tr key={item.trial}>
                        <td>{item.trial}</td>
                        <td>{item.length.toFixed(2)}</td>
                        <td>{item.period.toFixed(3)}</td>
                        <td>{item.periodSquared.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="sp-section">
            <h3>Video Learning References</h3>
            <ul className="sp-video-list">
              <li>
                <a
                  href="https://www.youtube.com/results?search_query=simple+pendulum+introduction+physics"
                  target="_blank"
                  rel="noreferrer"
                >
                  Simple Pendulum – Introduction
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/results?search_query=simple+pendulum+experiment+time+period"
                  target="_blank"
                  rel="noreferrer"
                >
                  Simple Pendulum – Experiment Demonstration
                </a>
              </li>
            </ul>
            <p className="sp-note">Video links require an internet connection.</p>
          </div>

          <div className="sp-actions">
            <button className="sp-secondary" onClick={() => setSlide(4)}>
              ← Previous
            </button>
            <button className="sp-primary" onClick={restartExperiment}>
              Restart Experiment
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default SimplePendulum;
