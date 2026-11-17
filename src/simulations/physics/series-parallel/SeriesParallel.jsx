
import { useState } from "react";
import "./SeriesParallel.css";

const questions = [
  {
    question: "How many paths are available for current in a series circuit?",
    options: ["One", "Two", "Three", "Unlimited"],
    answer: 0,
    explanation: "A series circuit has only one path for current."
  },
  {
    question: "What remains the same across all components in a parallel circuit?",
    options: ["Current", "Resistance", "Voltage", "Power"],
    answer: 2,
    explanation: "Each parallel branch has the same voltage as the supply."
  },
  {
    question: "How is total resistance calculated in a series circuit?",
    options: [
      "R1 × R2",
      "R1 + R2",
      "R1 / R2",
      "R1 - R2"
    ],
    answer: 1,
    explanation: "Series resistances are added to obtain total resistance."
  },
  {
    question: "What happens if one bulb breaks in a simple parallel circuit?",
    options: [
      "All bulbs stop working",
      "The battery stops working",
      "Other branches can continue working",
      "Resistance becomes zero"
    ],
    answer: 2,
    explanation: "Each parallel branch has a separate path, so another working branch can remain active."
  }
];

function calculateCircuit(type, voltage, r1, r2) {
  if (type === "series") {
    const totalResistance = r1 + r2;
    const current = voltage / totalResistance;

    return {
      totalResistance,
      totalCurrent: current,
      current1: current,
      current2: current,
      voltage1: current * r1,
      voltage2: current * r2
    };
  }

  const totalResistance = 1 / (1 / r1 + 1 / r2);
  const current1 = voltage / r1;
  const current2 = voltage / r2;

  return {
    totalResistance,
    totalCurrent: current1 + current2,
    current1,
    current2,
    voltage1: voltage,
    voltage2: voltage
  };
}

function CircuitDiagram({ type, voltage }) {
  const parallel = type === "parallel";

  return (
    <svg
      className="spc-diagram"
      viewBox="0 0 560 300"
      role="img"
      aria-label={`${type} circuit with a battery and two resistors`}
    >
      <defs>
        <marker
          id="spc-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L0 6 L6 3 Z" fill="#2563eb" />
        </marker>
      </defs>

      {parallel ? (
        <>
          <path
            d="M90 75 H470 V225 H90 V75"
            fill="none"
            stroke="#475569"
            strokeWidth="3"
          />
          <path
            d="M90 75 H190 V75 H220 V105 H300 V75 H470"
            fill="none"
            stroke="#475569"
            strokeWidth="3"
          />
          <path
            d="M190 225 V195 H220 V225 H300 V195 H470"
            fill="none"
            stroke="#475569"
            strokeWidth="3"
          />
          <rect x="220" y="55" width="80" height="40" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <rect x="220" y="205" width="80" height="40" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="260" y="80" textAnchor="middle" fill="#174d88" fontSize="15">R1</text>
          <text x="260" y="230" textAnchor="middle" fill="#174d88" fontSize="15">R2</text>
          <text x="330" y="45" fill="#16a34a" fontSize="13">Branch 1</text>
          <text x="330" y="270" fill="#16a34a" fontSize="13">Branch 2</text>
        </>
      ) : (
        <>
          <path
            d="M90 75 H160 V75 H190 V75 H250 V75 H280 V75 H340 V75 H470 V225 H90 V75"
            fill="none"
            stroke="#475569"
            strokeWidth="3"
          />
          <rect x="190" y="55" width="80" height="40" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <rect x="340" y="55" width="80" height="40" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="230" y="80" textAnchor="middle" fill="#174d88" fontSize="15">R1</text>
          <text x="380" y="80" textAnchor="middle" fill="#174d88" fontSize="15">R2</text>
        </>
      )}

      {/* Battery */}
      <line x1="65" y1="125" x2="65" y2="175" stroke="#dc2626" strokeWidth="4"/>
      <line x1="82" y1="135" x2="82" y2="165" stroke="#dc2626" strokeWidth="2"/>
      <text x="25" y="120" fill="#dc2626" fontSize="13">Battery</text>
      <text x="20" y="195" fill="#334155" fontSize="13">{voltage} V</text>

      <line x1="100" y1="75" x2="150" y2="75" stroke="#2563eb" strokeWidth="3" markerEnd="url(#spc-arrow)"/>
      <text x="110" y="55" fill="#2563eb" fontSize="12">Current</text>

      <text x="280" y="290" textAnchor="middle" fill="#64748b" fontSize="13">
        {parallel ? "Two separate current paths" : "One continuous current path"}
      </text>
    </svg>
  );
}

function SeriesParallel() {
  const [slide, setSlide] = useState(1);
  const [type, setType] = useState("series");
  const [voltage, setVoltage] = useState(12);
  const [r1, setR1] = useState(4);
  const [r2, setR2] = useState(6);
  const [readings, setReadings] = useState([]);

  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const result = calculateCircuit(type, voltage, r1, r2);
  const currentQuestion = questions[quizIndex];
  const quizScore = quizAnswers.filter(Boolean).length;

  function recordReading() {
    setReadings((previous) => [
      ...previous,
      {
        trial: previous.length + 1,
        type,
        voltage,
        r1,
        r2,
        resistance: result.totalResistance,
        current: result.totalCurrent
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
    setType("series");
    setVoltage(12);
    setR1(4);
    setR2(6);
    setReadings([]);
    setQuizIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setQuizAnswers([]);
  }

  return (
    <main className="series-parallel-lab">

      {/* HEADER */}
      <header className="spc-header">
        <h1>Series and Parallel Circuits Virtual Lab</h1>
        <p>Predict, Experiment, Observe and Learn</p>
        <span>Physics Experiment</span>
      </header>

      {/* PROGRESS */}
      <section className="spc-progress">
        <div className="spc-progress-heading">
          <strong>Experiment Progress</strong>
          <span>Slide {slide} of 5</span>
        </div>

        <div className="spc-progress-track">
          <div
            className="spc-progress-fill"
            style={{ width: `${slide * 20}%` }}
          />
        </div>

        <div className="spc-slide-labels">
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

      {/* SCREEN 1 */}
      {slide === 1 && (
        <section className="spc-card">
          <h2>1. Introduction to Series and Parallel Circuits</h2>

          <p className="spc-subtitle">
            Learn how electrical components are connected and how current flows.
          </p>

          <div className="spc-section">
            <h3>Learning Objectives</h3>
            <ul>
              <li>Understand series and parallel circuit connections.</li>
              <li>Identify current, voltage and resistance.</li>
              <li>Calculate equivalent resistance.</li>
              <li>Compare current and voltage in both circuits.</li>
              <li>Understand Ohm's law in electrical circuits.</li>
            </ul>
          </div>

          <div className="spc-section">
            <h3>What is a Series Circuit?</h3>
            <p>
              A series circuit connects components one after another
              in a single path. The same current flows through every
              component. The supply voltage is divided across the
              resistors.
            </p>
            <CircuitDiagram type="series" voltage={12}/>
            <div className="spc-formula">
              R = R1 + R2
            </div>
          </div>

          <div className="spc-section">
            <h3>What is a Parallel Circuit?</h3>
            <p>
              A parallel circuit connects components in separate
              branches. Each branch has the same voltage as the
              supply, while the current divides between branches.
            </p>
            <CircuitDiagram type="parallel" voltage={12}/>
            <div className="spc-formula">
              1 / R = 1 / R1 + 1 / R2
            </div>
          </div>

          <div className="spc-section">
            <h3>Ohm's Law</h3>
            <p>
              Ohm's law states that current is equal to voltage divided
              by resistance, when physical conditions remain constant.
            </p>
            <div className="spc-formula">V = I × R</div>
          </div>

          <div className="spc-actions">
            <button className="spc-primary" onClick={() => setSlide(2)}>
              Next: Start Experiment →
            </button>
          </div>
        </section>
      )}

      {/* SCREEN 2 */}
      {slide === 2 && (
        <section className="spc-card">
          <h2>2. Interactive Circuit Experiment</h2>

          <p className="spc-subtitle">
            Select a circuit and change the voltage and resistance values.
          </p>

          <div className="spc-section">
            <h3>Select Circuit Type</h3>
            <div className="spc-choice-row">
              <button
                className={type === "series" ? "spc-choice active" : "spc-choice"}
                onClick={() => setType("series")}
              >
                Series Circuit
              </button>
              <button
                className={type === "parallel" ? "spc-choice active" : "spc-choice"}
                onClick={() => setType("parallel")}
              >
                Parallel Circuit
              </button>
            </div>
          </div>

          <div className="spc-section">
            <h3>Supply Voltage</h3>
            <div className="spc-value">{voltage} V</div>
            <input
              className="spc-slider"
              type="range"
              min="1"
              max="24"
              step="1"
              value={voltage}
              onChange={(event) => setVoltage(Number(event.target.value))}
            />
            <div className="spc-slider-labels">
              <span>1 V</span>
              <span>24 V</span>
            </div>
          </div>

          <div className="spc-section">
            <h3>Resistance R1</h3>
            <div className="spc-value">{r1} Ω</div>
            <input
              className="spc-slider"
              type="range"
              min="1"
              max="20"
              step="1"
              value={r1}
              onChange={(event) => setR1(Number(event.target.value))}
            />
            <div className="spc-slider-labels">
              <span>1 Ω</span>
              <span>20 Ω</span>
            </div>
          </div>

          <div className="spc-section">
            <h3>Resistance R2</h3>
            <div className="spc-value">{r2} Ω</div>
            <input
              className="spc-slider"
              type="range"
              min="1"
              max="20"
              step="1"
              value={r2}
              onChange={(event) => setR2(Number(event.target.value))}
            />
            <div className="spc-slider-labels">
              <span>1 Ω</span>
              <span>20 Ω</span>
            </div>
          </div>

          <div className="spc-section">
            <h3>Live Circuit Diagram</h3>
            <CircuitDiagram type={type} voltage={voltage}/>
            <p className="spc-note">
              Selected circuit: {type === "series" ? "Series – one current path" : "Parallel – two current paths"}
            </p>
          </div>

          <div className="spc-section">
            <h3>Calculated Results</h3>

            <div className="spc-measurements">
              <div>
                <span>Total Resistance</span>
                <strong>{result.totalResistance.toFixed(2)} Ω</strong>
              </div>
              <div>
                <span>Total Current</span>
                <strong>{result.totalCurrent.toFixed(3)} A</strong>
              </div>
              <div>
                <span>Voltage across R1</span>
                <strong>{result.voltage1.toFixed(2)} V</strong>
              </div>
              <div>
                <span>Voltage across R2</span>
                <strong>{result.voltage2.toFixed(2)} V</strong>
              </div>
              <div>
                <span>Current through R1</span>
                <strong>{result.current1.toFixed(3)} A</strong>
              </div>
              <div>
                <span>Current through R2</span>
                <strong>{result.current2.toFixed(3)} A</strong>
              </div>
            </div>

            <div className="spc-formula">
              {type === "series"
                ? `R = ${r1} + ${r2} = ${result.totalResistance.toFixed(2)} Ω`
                : `R = (${r1} × ${r2}) / (${r1} + ${r2}) = ${result.totalResistance.toFixed(2)} Ω`}
            </div>
          </div>

          <div className="spc-section">
            <h3>Record Your Observation</h3>
            <button className="spc-primary" onClick={recordReading}>
              + Record Reading
            </button>

            {readings.length > 0 && (
              <div className="spc-table-wrap">
                <table className="spc-table">
                  <thead>
                    <tr>
                      <th>Trial</th>
                      <th>Type</th>
                      <th>Voltage</th>
                      <th>Resistance</th>
                      <th>Current</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.map((item) => (
                      <tr key={item.trial}>
                        <td>{item.trial}</td>
                        <td>{item.type}</td>
                        <td>{item.voltage} V</td>
                        <td>{item.resistance.toFixed(2)} Ω</td>
                        <td>{item.current.toFixed(3)} A</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="spc-actions">
            <button className="spc-secondary" onClick={() => setSlide(1)}>
              ← Previous
            </button>
            <button className="spc-primary" onClick={() => setSlide(3)}>
              Next: Graph →
            </button>
          </div>
        </section>
      )}

      {/* SCREEN 3 */}
      {slide === 3 && (
        <section className="spc-card">
          <h2>3. Observation and Graph</h2>

          <p className="spc-subtitle">
            Study the relationship between supply voltage and total current.
          </p>

          <div className="spc-section">
            <h3>Voltage vs Current Graph</h3>

            <svg
              className="spc-graph"
              viewBox="0 0 500 340"
              role="img"
              aria-label="Graph of voltage against current for recorded circuit readings"
            >
              {Array.from({ length: 7 }, (_, index) => {
                const value = index * 4;
                const x = 65 + value * 14;
                const y = 270 - value * 8;

                return (
                  <g key={value}>
                    <line x1={x} y1="65" x2={x} y2="270" stroke="#e2e8f0"/>
                    <line x1="65" y1={y} x2="400" y2={y} stroke="#e2e8f0"/>
                    <text x={x} y="289" textAnchor="middle" fontSize="10">{value}</text>
                    <text x="53" y={y + 4} textAnchor="end" fontSize="10">{value}</text>
                  </g>
                );
              })}

              <line x1="65" y1="65" x2="65" y2="270" stroke="#334155" strokeWidth="2"/>
              <line x1="65" y1="270" x2="400" y2="270" stroke="#334155" strokeWidth="2"/>

              {readings.map((item) => (
                <circle
                  key={item.trial}
                  cx={65 + item.voltage * 14}
                  cy={270 - item.current * 8}
                  r="6"
                  fill="#2563eb"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}

              <text x="230" y="320" textAnchor="middle" fontSize="13">
                Voltage (V)
              </text>
              <text
                x="15"
                y="165"
                textAnchor="middle"
                fontSize="13"
                transform="rotate(-90 15 165)"
              >
                Current (A)
              </text>
            </svg>

            <p className="spc-note">
              Blue points represent recorded observations. The graph uses the
              same axes for both circuit types.
            </p>
          </div>

          <div className="spc-section">
            <h3>Observation Table</h3>
            {readings.length === 0 ? (
              <p>
                No readings recorded. Return to the experiment and record
                observations for both circuit types and different voltages.
              </p>
            ) : (
              <div className="spc-table-wrap">
                <table className="spc-table">
                  <thead>
                    <tr>
                      <th>Trial</th>
                      <th>Type</th>
                      <th>Voltage (V)</th>
                      <th>Resistance (Ω)</th>
                      <th>Current (A)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.map((item) => (
                      <tr key={item.trial}>
                        <td>{item.trial}</td>
                        <td>{item.type}</td>
                        <td>{item.voltage}</td>
                        <td>{item.resistance.toFixed(2)}</td>
                        <td>{item.current.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="spc-actions">
            <button className="spc-secondary" onClick={() => setSlide(2)}>
              ← Previous
            </button>
            <button className="spc-primary" onClick={() => setSlide(4)}>
              Next: Quiz →
            </button>
          </div>
        </section>
      )}

      {/* SCREEN 4 */}
      {slide === 4 && (
        <section className="spc-card">
          <h2>4. Knowledge Check</h2>

          <p className="spc-subtitle">
            Test your understanding of series and parallel circuits.
          </p>

          <div className="spc-quiz-progress">
            Question {quizIndex + 1} of {questions.length}
          </div>

          <div className="spc-section">
            <h3>{currentQuestion.question}</h3>

            <div className="spc-options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`spc-option ${
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
              <div className="spc-feedback">
                <strong>
                  {selectedOption === currentQuestion.answer
                    ? "Correct answer!"
                    : "Incorrect answer."}
                </strong>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>

          <div className="spc-actions">
            <button className="spc-secondary" onClick={() => setSlide(3)}>
              ← Previous
            </button>

            {!submitted ? (
              <button
                className="spc-primary"
                onClick={submitAnswer}
                disabled={selectedOption === null}
              >
                Submit Answer
              </button>
            ) : (
              <button className="spc-primary" onClick={nextQuestion}>
                {quizIndex === questions.length - 1
                  ? "View Results →"
                  : "Next Question →"}
              </button>
            )}
          </div>
        </section>
      )}

      {/* SCREEN 5 */}
      {slide === 5 && (
        <section className="spc-card">
          <h2>5. Experiment Results</h2>

          <p className="spc-subtitle">
            Review your circuit readings and quiz performance.
          </p>

          <div className="spc-result-box">
            <h3>Experimental Conclusion</h3>
            <p>
              In a series circuit, the same current flows through all
              components and the total resistance is the sum of the
              individual resistances. In a parallel circuit, voltage
              remains the same across each branch, and the total
              current is the sum of the branch currents.
            </p>
          </div>

          <div className="spc-measurements">
            <div>
              <span>Total Recorded Readings</span>
              <strong>{readings.length}</strong>
            </div>
            <div>
              <span>Quiz Score</span>
              <strong>{quizScore} / {questions.length}</strong>
            </div>
          </div>

          <div className="spc-section">
            <h3>Final Observations</h3>
            {readings.length === 0 ? (
              <p>No readings were recorded during the experiment.</p>
            ) : (
              <div className="spc-table-wrap">
                <table className="spc-table">
                  <thead>
                    <tr>
                      <th>Trial</th>
                      <th>Type</th>
                      <th>Voltage</th>
                      <th>Resistance</th>
                      <th>Current</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.map((item) => (
                      <tr key={item.trial}>
                        <td>{item.trial}</td>
                        <td>{item.type}</td>
                        <td>{item.voltage} V</td>
                        <td>{item.resistance.toFixed(2)} Ω</td>
                        <td>{item.current.toFixed(3)} A</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="spc-section">
            <h3>Video Learning References</h3>
            <ul className="spc-video-list">
              <li>
                <a
                  href="https://www.youtube.com/results?search_query=series+circuits+physics+explanation"
                  target="_blank"
                  rel="noreferrer"
                >
                  Series Circuits – Introduction and Demonstration
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/results?search_query=parallel+circuits+physics+explanation"
                  target="_blank"
                  rel="noreferrer"
                >
                  Parallel Circuits – Introduction and Demonstration
                </a>
              </li>
            </ul>
            <p className="spc-note">Video links require an internet connection.</p>
          </div>

          <div className="spc-actions">
            <button className="spc-secondary" onClick={() => setSlide(4)}>
              ← Previous
            </button>
            <button className="spc-primary" onClick={restartExperiment}>
              Restart Experiment
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default SeriesParallel;
