
import { useState } from "react";
import "./ReflectionOfLight.css";

const questions = [
  {
    question: "What is reflection of light?",
    options: [
      "Bending of light",
      "Bouncing back of light",
      "Absorption of light",
      "Splitting of light"
    ],
    answer: 1,
    explanation: "Reflection occurs when light bounces back after striking a surface."
  },
  {
    question: "What is the first law of reflection?",
    options: [
      "Angle of incidence is greater than reflection",
      "Angle of incidence is less than reflection",
      "Angle of incidence equals angle of reflection",
      "Both angles are always zero"
    ],
    answer: 2,
    explanation: "The angle of incidence is always equal to the angle of reflection."
  },
  {
    question: "From which line are the angles of incidence and reflection measured?",
    options: [
      "Mirror surface",
      "Normal",
      "Incident ray",
      "Reflected ray"
    ],
    answer: 1,
    explanation: "Both angles are measured from the normal, which is perpendicular to the mirror."
  },
  {
    question: "Which three lie in the same plane?",
    options: [
      "Mirror, battery and normal",
      "Incident ray, reflected ray and normal",
      "Mirror, object and image",
      "Only incident and reflected rays"
    ],
    answer: 1,
    explanation: "The incident ray, reflected ray and normal lie in the same plane."
  }
];

function RayDiagram({ angle }) {
  const radians = (angle * Math.PI) / 180;
  const x = 150 * Math.sin(radians);
  const y = 150 * Math.cos(radians);

  return (
    <svg
      className="rl-ray-diagram"
      viewBox="0 0 500 300"
      role="img"
      aria-label={`Incident angle ${angle} degrees and reflected angle ${angle} degrees`}
    >
      <defs>
        <marker
          id="rl-blue-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L0 6 L6 3 Z" fill="#2563eb" />
        </marker>
        <marker
          id="rl-green-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L0 6 L6 3 Z" fill="#16a34a" />
        </marker>
      </defs>

      {/* Mirror */}
      <line
        x1="55" y1="235" x2="445" y2="235"
        stroke="#475569" strokeWidth="7"
      />
      <text x="250" y="270" textAnchor="middle" fill="#334155">
        Plane Mirror
      </text>

      {/* Normal */}
      <line
        x1="250" y1="30" x2="250" y2="235"
        stroke="#64748b" strokeWidth="2" strokeDasharray="7 6"
      />
      <text x="263" y="42" fill="#475569">Normal</text>

      {/* Incident ray */}
      <line
        x1={250 - x}
        y1={235 - y}
        x2="250"
        y2="235"
        stroke="#2563eb"
        strokeWidth="4"
        markerEnd="url(#rl-blue-arrow)"
      />

      {/* Reflected ray */}
      <line
        x1="250"
        y1="235"
        x2={250 + x}
        y2={235 - y}
        stroke="#16a34a"
        strokeWidth="4"
        markerEnd="url(#rl-green-arrow)"
      />

      {/* Angle labels */}
      <text x="65" y="65" fill="#2563eb">Incident Ray</text>
      <text x="350" y="65" fill="#16a34a">Reflected Ray</text>
      <text x="170" y="205" fill="#b45309">i = {angle}°</text>
      <text x="305" y="205" fill="#b45309">r = {angle}°</text>

      <circle cx="250" cy="235" r="5" fill="#dc2626" />
    </svg>
  );
}

function ReflectionOfLight() {
  const [slide, setSlide] = useState(1);
  const [angle, setAngle] = useState(30);
  const [readings, setReadings] = useState([]);

  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const currentQuestion = questions[quizIndex];

  const quizScore = quizAnswers.filter(Boolean).length;

  function recordReading() {
    setReadings((previous) => [
      ...previous,
      {
        trial: previous.length + 1,
        incidence: angle,
        reflection: angle
      }
    ]);
  }

  function submitAnswer() {
    if (selectedOption === null) return;

    setQuizAnswers((previous) => {
      const updated = [...previous];
      updated[quizIndex] =
        selectedOption === currentQuestion.answer;
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
    setAngle(30);
    setReadings([]);
    setQuizIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setQuizAnswers([]);
  }

  return (
    <main className="reflection-lab">

      {/* HEADER */}
      <header className="rl-header">
        <h1>Reflection of Light Virtual Lab</h1>
        <p>Predict, Experiment, Observe and Learn</p>
        <span>Physics Experiment</span>
      </header>

      {/* PROGRESS */}
      <section className="rl-progress">
        <div className="rl-progress-heading">
          <strong>Experiment Progress</strong>
          <span>Slide {slide} of 5</span>
        </div>

        <div className="rl-progress-track">
          <div
            className="rl-progress-fill"
            style={{ width: `${slide * 20}%` }}
          />
        </div>

        <div className="rl-slide-labels">
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
        <section className="rl-card">
          <h2>1. Introduction to Reflection of Light</h2>

          <p className="rl-subtitle">
            Understand how light behaves when it strikes a plane mirror.
          </p>

          <div className="rl-section">
            <h3>Learning Objectives</h3>
            <ul>
              <li>Understand the meaning of reflection of light.</li>
              <li>Identify incident ray, reflected ray and normal.</li>
              <li>Understand the laws of reflection.</li>
              <li>Compare angles of incidence and reflection.</li>
            </ul>
          </div>

          <div className="rl-section">
            <h3>Theory</h3>
            <p>
              Reflection is the phenomenon in which light bounces back
              into the same medium after striking a surface. A plane
              mirror is a common example of reflection.
            </p>
          </div>

          <div className="rl-section">
            <h3>Laws of Reflection</h3>
            <ol>
              <li>
                The angle of incidence is equal to the angle of reflection.
              </li>
              <li>
                The incident ray, reflected ray and normal lie in the same plane.
              </li>
            </ol>
          </div>

          <div className="rl-section">
            <h3>Ray Diagram</h3>
            <RayDiagram angle={30} />
            <p className="rl-note">
              i = Angle of Incidence | r = Angle of Reflection
            </p>
          </div>

          <div className="rl-formula">
            Angle of Incidence (i) = Angle of Reflection (r)
          </div>

          <div className="rl-actions">
            <button
              className="rl-primary"
              onClick={() => setSlide(2)}
            >
              Next: Start Experiment →
            </button>
          </div>
        </section>
      )}

      {/* SCREEN 2: EXPERIMENT */}
      {slide === 2 && (
        <section className="rl-card">
          <h2>2. Interactive Experiment</h2>

          <p className="rl-subtitle">
            Change the angle and observe the reflection of light.
          </p>

          <div className="rl-section">
            <h3>Adjust Angle of Incidence</h3>

            <div className="rl-angle-value">{angle}°</div>

            <input
              className="rl-slider"
              type="range"
              min="0"
              max="80"
              value={angle}
              onChange={(event) => setAngle(Number(event.target.value))}
            />

            <div className="rl-slider-labels">
              <span>0°</span>
              <span>80°</span>
            </div>
          </div>

          <div className="rl-section">
            <h3>Live Ray Diagram</h3>
            <RayDiagram angle={angle} />
          </div>

          <div className="rl-measurements">
            <div>
              <span>Angle of Incidence</span>
              <strong>{angle}°</strong>
            </div>
            <div>
              <span>Angle of Reflection</span>
              <strong>{angle}°</strong>
            </div>
          </div>

          <div className="rl-formula">
            i = r → {angle}° = {angle}°
          </div>

          <div className="rl-section">
            <h3>Record Your Observation</h3>

            <button className="rl-primary" onClick={recordReading}>
              + Record Reading
            </button>

            {readings.length > 0 && (
              <div className="rl-table-wrap">
                <table className="rl-table">
                  <thead>
                    <tr>
                      <th>Trial</th>
                      <th>Incidence</th>
                      <th>Reflection</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.map((item) => (
                      <tr key={item.trial}>
                        <td>{item.trial}</td>
                        <td>{item.incidence}°</td>
                        <td>{item.reflection}°</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rl-actions">
            <button className="rl-secondary" onClick={() => setSlide(1)}>
              ← Previous
            </button>
            <button className="rl-primary" onClick={() => setSlide(3)}>
              Next: Graph →
            </button>
          </div>
        </section>
      )}

      {/* SCREEN 3: GRAPH */}
      {slide === 3 && (
        <section className="rl-card">
          <h2>3. Observation and Graph</h2>

          <p className="rl-subtitle">
            Compare the angle of incidence with the angle of reflection.
          </p>

          <div className="rl-section">
            <h3>Incidence vs Reflection Graph</h3>

            <svg
              className="rl-graph"
              viewBox="0 0 500 330"
              role="img"
              aria-label="Graph of angle of incidence against angle of reflection"
            >
              {Array.from({ length: 9 }, (_, index) => {
                const value = index * 10;
                const x = 65 + value * 4;
                const y = 265 - value * 2.5;

                return (
                  <g key={value}>
                    <line
                      x1={x}
                      y1="65"
                      x2={x}
                      y2="265"
                      stroke="#e2e8f0"
                    />
                    <line
                      x1="65"
                      y1={y}
                      x2="385"
                      y2={y}
                      stroke="#e2e8f0"
                    />
                    <text x={x} y="282" textAnchor="middle" fontSize="11">
                      {value}
                    </text>
                    <text x="52" y={y + 4} textAnchor="end" fontSize="11">
                      {value}
                    </text>
                  </g>
                );
              })}

              <line x1="65" y1="65" x2="65" y2="265" stroke="#334155" strokeWidth="2" />
              <line x1="65" y1="265" x2="385" y2="265" stroke="#334155" strokeWidth="2" />

              <line
                x1="65"
                y1="265"
                x2="385"
                y2="65"
                stroke="#16a34a"
                strokeWidth="3"
                strokeDasharray="7 5"
              />

              {readings.map((item) => (
                <circle
                  key={item.trial}
                  cx={65 + item.incidence * 4}
                  cy={265 - item.reflection * 2.5}
                  r="6"
                  fill="#2563eb"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}

              <text x="225" y="315" textAnchor="middle" fontSize="13">
                Angle of Incidence (degrees)
              </text>
              <text
                x="15"
                y="165"
                textAnchor="middle"
                fontSize="13"
                transform="rotate(-90 15 165)"
              >
                Angle of Reflection (degrees)
              </text>
            </svg>

            <p className="rl-note">
              Green dashed line represents i = r. Blue points represent your recorded readings.
            </p>
          </div>

          <div className="rl-section">
            <h3>Observation Table</h3>

            {readings.length === 0 ? (
              <p>
                No readings recorded yet. Go back to the experiment and
                record at least one observation.
              </p>
            ) : (
              <div className="rl-table-wrap">
                <table className="rl-table">
                  <thead>
                    <tr>
                      <th>Trial</th>
                      <th>Incidence</th>
                      <th>Reflection</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.map((item) => (
                      <tr key={item.trial}>
                        <td>{item.trial}</td>
                        <td>{item.incidence}°</td>
                        <td>{item.reflection}°</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rl-actions">
            <button className="rl-secondary" onClick={() => setSlide(2)}>
              ← Previous
            </button>
            <button className="rl-primary" onClick={() => setSlide(4)}>
              Next: Quiz →
            </button>
          </div>
        </section>
      )}

      {/* SCREEN 4: QUIZ */}
      {slide === 4 && (
        <section className="rl-card">
          <h2>4. Knowledge Check</h2>

          <p className="rl-subtitle">
            Answer the following questions about reflection of light.
          </p>

          <div className="rl-quiz-progress">
            Question {quizIndex + 1} of {questions.length}
          </div>

          <div className="rl-section">
            <h3>{currentQuestion.question}</h3>

            <div className="rl-options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`rl-option ${
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
              <div className="rl-feedback">
                <strong>
                  {selectedOption === currentQuestion.answer
                    ? "Correct answer!"
                    : "Incorrect answer."}
                </strong>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>

          <div className="rl-actions">
            <button className="rl-secondary" onClick={() => setSlide(3)}>
              ← Previous
            </button>

            {!submitted ? (
              <button
                className="rl-primary"
                onClick={submitAnswer}
                disabled={selectedOption === null}
              >
                Submit Answer
              </button>
            ) : (
              <button className="rl-primary" onClick={nextQuestion}>
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
        <section className="rl-card">
          <h2>5. Experiment Results</h2>

          <p className="rl-subtitle">
            Review your observations and learning progress.
          </p>

          <div className="rl-result-box">
            <h3>Experimental Conclusion</h3>
            <p>
              The angle of incidence is equal to the angle of reflection.
              Therefore, the experiment demonstrates the first law of
              reflection of light.
            </p>
            <div className="rl-formula">
              Angle of Incidence = Angle of Reflection
            </div>
          </div>

          <div className="rl-measurements">
            <div>
              <span>Total Recorded Readings</span>
              <strong>{readings.length}</strong>
            </div>
            <div>
              <span>Quiz Score</span>
              <strong>{quizScore} / {questions.length}</strong>
            </div>
          </div>

          <div className="rl-section">
            <h3>Final Observations</h3>
            {readings.length === 0 ? (
              <p>No readings were recorded during the experiment.</p>
            ) : (
              <div className="rl-table-wrap">
                <table className="rl-table">
                  <thead>
                    <tr>
                      <th>Trial</th>
                      <th>Incidence</th>
                      <th>Reflection</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.map((item) => (
                      <tr key={item.trial}>
                        <td>{item.trial}</td>
                        <td>{item.incidence}°</td>
                        <td>{item.reflection}°</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rl-section">
            <h3>Video Learning References</h3>
            <ul className="rl-video-list">
              <li>
                <a
                  href="https://www.youtube.com/results?search_query=reflection+of+light+physics+introduction"
                  target="_blank"
                  rel="noreferrer"
                >
                  Introduction to Reflection of Light – Video lessons
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/results?search_query=laws+of+reflection+of+light+experiment"
                  target="_blank"
                  rel="noreferrer"
                >
                  Laws of Reflection – Experiment demonstration
                </a>
              </li>
            </ul>
            <p className="rl-note">
              Video links require an internet connection.
            </p>
          </div>

          <div className="rl-actions">
            <button className="rl-secondary" onClick={() => setSlide(4)}>
              ← Previous
            </button>
            <button className="rl-primary" onClick={restartExperiment}>
              Restart Experiment
            </button>
          </div>
        </section>
      )}

    </main>
  );
}

export default ReflectionOfLight;
