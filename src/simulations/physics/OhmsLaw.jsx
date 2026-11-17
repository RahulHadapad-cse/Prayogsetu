import React, { useMemo, useState } from "react";
import "./OhmsLaw.css";

const questions = [
  {
    question: "1. What happens to current when voltage increases and resistance stays constant?",
    options: ["Current increases", "Current decreases", "Current remains the same", "Current becomes zero"],
    answer: 0,
    explanation: "Current increases because current is directly proportional to voltage."
  },
  {
    question: "2. If voltage is 12 V and resistance is 6 Ω, what is the current?",
    options: ["1 A", "2 A", "3 A", "6 A"],
    answer: 1,
    explanation: "I = V / R = 12 / 6 = 2 A."
  },
  {
    question: "3. What happens to current when resistance increases while voltage remains constant?",
    options: ["Current increases", "Current decreases", "Current remains the same", "Voltage becomes zero"],
    answer: 1,
    explanation: "Current decreases because current is inversely proportional to resistance."
  },
  {
    question: "4. What happens to current when the circuit switch is OFF?",
    options: ["Current becomes maximum", "Current doubles", "No current flows", "Resistance becomes zero"],
    answer: 2,
    explanation: "An OFF switch opens the circuit, so no current can flow."
  }
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function OhmsLaw() {
  const [slide, setSlide] = useState(0);
  const [mode, setMode] = useState("current");
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(4);
  const [givenCurrent, setGivenCurrent] = useState(3);
  const [givenVoltage, setGivenVoltage] = useState(12);
  const [givenResistance, setGivenResistance] = useState(4);
  const [isOn, setIsOn] = useState(true);
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [calculationError, setCalculationError] = useState("");

  const values = useMemo(() => {
    let v = voltage;
    let r = resistance;
    let i = 0;

    if (mode === "current") {
      v = voltage;
      r = resistance;
      i = v / r;
    } else if (mode === "resistance") {
      v = givenVoltage;
      i = givenCurrent;
      r = i > 0 ? v / i : 0;
    } else {
      i = givenCurrent;
      r = givenResistance;
      v = i * r;
    }

    return { voltage: v, resistance: r, current: i };
  }, [mode, voltage, resistance, givenVoltage, givenCurrent, givenResistance]);

  const safeValues = {
    voltage: Number.isFinite(values.voltage) ? values.voltage : 0,
    resistance: Number.isFinite(values.resistance) ? values.resistance : 0,
    current: Number.isFinite(values.current) ? values.current : 0
  };

  const actualCurrent = isOn ? safeValues.current : 0;
  const score = questions.reduce(
    (total, question, index) => total + (answers[index] === String(question.answer) ? 1 : 0),
    0
  );

  const calculate = () => {
    if (mode === "resistance" && givenCurrent <= 0) {
      setCalculationError("Current must be greater than 0 A to calculate resistance.");
      return;
    }
    if (mode === "voltage" && (givenCurrent < 0 || givenResistance <= 0)) {
      setCalculationError("Enter a non-negative current and a resistance greater than 0 Ω.");
      return;
    }
    if (mode === "current" && resistance <= 0) {
      setCalculationError("Resistance must be greater than 0 Ω.");
      return;
    }
    if (safeValues.voltage < 0 || safeValues.resistance <= 0 || safeValues.current < 0) {
      setCalculationError("Please enter valid non-negative values. Resistance must be greater than 0 Ω.");
      return;
    }
    setCalculationError("");
    setSlide(2);
  };

  const resetExperiment = () => {
    setMode("current");
    setVoltage(12);
    setResistance(4);
    setGivenCurrent(3);
    setGivenVoltage(12);
    setGivenResistance(4);
    setIsOn(true);
    setCalculationError("");
    setAnswers({});
    setQuestionIndex(0);
    setQuizSubmitted(false);
    setAnswerSubmitted(false);
    setSlide(0);
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setCalculationError("");
  };

  const handleAnswer = (value) => {
    if (answerSubmitted) return;
    setAnswers((previous) => ({ ...previous, [questionIndex]: value }));
  };

  const submitCurrentAnswer = () => {
    if (answers[questionIndex] === undefined) return;
    setAnswerSubmitted(true);
  };

  const nextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      setQuizSubmitted(true);
      setSlide(4);
    } else {
      setQuestionIndex((previous) => previous + 1);
      setAnswerSubmitted(false);
    }
  };

  const startQuizAgain = () => {
    setAnswers({});
    setQuestionIndex(0);
    setQuizSubmitted(false);
    setAnswerSubmitted(false);
    setSlide(3);
  };

  const currentQuestion = questions[questionIndex];
  const isCorrect = answers[questionIndex] === String(currentQuestion.answer);
  const maxCurrent = Math.max(safeValues.voltage / safeValues.resistance, 0.01);
  const graphX = 65 + (clamp(safeValues.voltage, 0, 24) / 24) * 360;
  const graphY = 215 - (clamp(actualCurrent, 0, maxCurrent) / maxCurrent) * 170;
  const progress = ((slide + 1) / 5) * 100;

  const slides = ["Circuit", "Controls", "Graph", "Quiz", "Results"];

  return (
    <main className="ohms-container">
      <header className="lab-header">
        <h1>Ohm's Law Virtual Lab</h1>
        <p>Predict, Test, Observe and Explain</p>
        <span className="lab-tag">Physics Experiment</span>
      </header>

      <div className="slide-progress">
        <div className="slide-progress-top">
          <strong>Experiment Progress</strong>
          <span>Slide {slide + 1} of 5</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="slide-step-labels">
          {slides.map((name, index) => (
            <span key={name} className={index === slide ? "active-step" : index < slide ? "completed-step" : ""}>
              {index + 1}. {name}
            </span>
          ))}
        </div>
      </div>

      {slide === 0 && (
        <section className="ohms-card slide-card">
          <h2>1. Interactive Electrical Circuit</h2>
          <p>Switch ON the circuit to observe current flowing through it.</p>

          <div className="circuit-wrapper">
            <svg viewBox="0 0 700 270" className="circuit-svg" role="img" aria-label="Battery, switch, resistor and ammeter connected in a circuit">
              <defs>
                <marker id="currentArrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 Z" fill="#16a34a" />
                </marker>
              </defs>
              <path d="M130 65 H285 M355 65 H570 V205 H130 V65" fill="none" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
              {isOn && safeValues.voltage > 0 && (
                <path d="M130 65 H285 M355 65 H570 V205 H130 V65" fill="none" stroke="#16a34a" strokeWidth="4" strokeDasharray="12 12" className="current-flow" markerMid="url(#currentArrow)" />
              )}
              <rect x="93" y="100" width="75" height="65" rx="9" fill="#e0f2fe" stroke="#2563eb" strokeWidth="3" />
              <line x1="130" y1="112" x2="130" y2="130" stroke="#2563eb" strokeWidth="4" />
              <line x1="120" y1="121" x2="140" y2="121" stroke="#2563eb" strokeWidth="4" />
              <line x1="120" y1="145" x2="140" y2="145" stroke="#2563eb" strokeWidth="4" />
              <text x="130" y="185" textAnchor="middle" className="svg-label">Battery</text>
              <text x="130" y="202" textAnchor="middle" className="svg-small">{safeValues.voltage.toFixed(2)} V</text>
              <circle cx="285" cy="65" r="7" fill="#334155" />
              <circle cx="355" cy="65" r="7" fill="#334155" />
              <line x1="285" y1="65" x2={isOn ? 355 : 335} y2={isOn ? 65 : 35} stroke={isOn ? "#16a34a" : "#dc2626"} strokeWidth="6" strokeLinecap="round" />
              <text x="320" y="25" textAnchor="middle" className="svg-label">Switch: {isOn ? "ON" : "OFF"}</text>
              <rect x="530" y="82" width="80" height="38" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
              <text x="570" y="106" textAnchor="middle" fontSize="17" fontWeight="bold">Ω</text>
              <text x="570" y="145" textAnchor="middle" className="svg-label">Resistor</text>
              <text x="570" y="163" textAnchor="middle" className="svg-small">{safeValues.resistance.toFixed(2)} Ω</text>
              <circle cx="350" cy="205" r="27" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
              <text x="350" y="213" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1d4ed8">A</text>
              <text x="350" y="250" textAnchor="middle" className="svg-label">{actualCurrent.toFixed(3)} A</text>
              {isOn && safeValues.voltage > 0 && (
                <text x="455" y="194" textAnchor="middle" fontSize="13" fill="#16a34a" fontWeight="bold">Current flowing →</text>
              )}
            </svg>
          </div>

          <div className="circuit-controls">
            <button className={isOn ? "switch-on" : "switch-off"} onClick={() => setIsOn(!isOn)}>
              {isOn ? "Switch ON" : "Switch OFF"}
            </button>
            <span className={isOn && safeValues.voltage > 0 ? "status-on" : "status-off"}>
              {isOn && safeValues.voltage > 0 ? "Current is flowing" : "No current flowing"}
            </span>
          </div>
          <p className="slide-hint">Next, choose which electrical quantity you want to calculate.</p>
        </section>
      )}

      {slide === 1 && (
        <section className="ohms-card slide-card">
          <h2>2. Experiment Controls and Calculation</h2>
          <p>Select the value you want to find. Enter the two known values, then calculate.</p>

          <div className="mode-selector">
            <label htmlFor="calculationMode">What do you want to calculate?</label>
            <select id="calculationMode" value={mode} onChange={(e) => handleModeChange(e.target.value)}>
              <option value="current">Find Current (I)</option>
              <option value="resistance">Find Resistance (R)</option>
              <option value="voltage">Find Voltage (V)</option>
            </select>
          </div>

          {mode === "current" && (
            <>
              <div className="slider-group">
                <label>Battery Voltage: <strong>{voltage} V</strong></label>
                <input type="range" min="0" max="24" step="1" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} />
                <div className="range-labels"><span>0 V</span><span>24 V</span></div>
              </div>
              <div className="slider-group">
                <label>Resistance: <strong>{resistance} Ω</strong></label>
                <input type="range" min="1" max="100" step="1" value={resistance} onChange={(e) => setResistance(Number(e.target.value))} />
                <div className="range-labels"><span>1 Ω</span><span>100 Ω</span></div>
              </div>
              <p className="formula">I = V / R</p>
            </>
          )}

          {mode === "resistance" && (
            <div className="calculation-input-grid">
              <div className="number-input-group">
                <label htmlFor="givenVoltage">Known Voltage (V)</label>
                <input id="givenVoltage" type="number" min="0" step="any" value={givenVoltage} onChange={(e) => setGivenVoltage(Number(e.target.value))} />
              </div>
              <div className="number-input-group">
                <label htmlFor="givenCurrent">Known Current (A)</label>
                <input id="givenCurrent" type="number" min="0" step="any" value={givenCurrent} onChange={(e) => setGivenCurrent(Number(e.target.value))} />
              </div>
              <p className="formula full-width">R = V / I</p>
            </div>
          )}

          {mode === "voltage" && (
            <div className="calculation-input-grid">
              <div className="number-input-group">
                <label htmlFor="voltageCurrent">Known Current (A)</label>
                <input id="voltageCurrent" type="number" min="0" step="any" value={givenCurrent} onChange={(e) => setGivenCurrent(Number(e.target.value))} />
              </div>
              <div className="number-input-group">
                <label htmlFor="voltageResistance">Known Resistance (Ω)</label>
                <input id="voltageResistance" type="number" min="0.01" step="any" value={givenResistance} onChange={(e) => setGivenResistance(Number(e.target.value))} />
              </div>
              <p className="formula full-width">V = I × R</p>
            </div>
          )}

          {calculationError && <p className="calculation-error">{calculationError}</p>}

          <div className="calculation-preview">
            <h3>Calculated Values</h3>
            <div className="result-grid">
              <div className="result-box"><h3>Voltage</h3><p>{safeValues.voltage.toFixed(2)} V</p></div>
              <div className="result-box"><h3>Resistance</h3><p>{safeValues.resistance.toFixed(2)} Ω</p></div>
              <div className="result-box"><h3>Current</h3><p>{safeValues.current.toFixed(3)} A</p></div>
            </div>
            <p className="formula">
              {mode === "current" && `I = ${safeValues.voltage.toFixed(2)} / ${safeValues.resistance.toFixed(2)} = ${safeValues.current.toFixed(3)} A`}
              {mode === "resistance" && `R = ${safeValues.voltage.toFixed(2)} / ${safeValues.current.toFixed(3)} = ${safeValues.resistance.toFixed(2)} Ω`}
              {mode === "voltage" && `V = ${safeValues.current.toFixed(3)} × ${safeValues.resistance.toFixed(2)} = ${safeValues.voltage.toFixed(2)} V`}
            </p>
            {!isOn && <p className="feedback">The switch is OFF, so the actual current in the circuit is 0 A. The values above show the calculated Ohm's Law result.</p>}
          </div>
          <button className="test-button" onClick={calculate}>Calculate and Continue</button>
          <button className="reset-button slide-reset" onClick={resetExperiment}>Reset Experiment</button>
        </section>
      )}

      {slide === 2 && (
        <section className="ohms-card slide-card">
          <h2>3. Voltage vs Current Graph</h2>
          <p>The graph shows how current changes with voltage when resistance is kept constant at {safeValues.resistance.toFixed(2)} Ω.</p>
          <div className="graph-wrapper">
            <svg viewBox="0 0 480 270" className="graph-svg" role="img" aria-label="Voltage versus current graph">
              {[0, 1, 2, 3, 4].map((step) => {
                const y = 215 - step * 42.5;
                return (
                  <g key={step}>
                    <line x1="65" y1={y} x2="425" y2={y} stroke="#dbe3ee" />
                    <text x="52" y={y + 4} textAnchor="end" fontSize="11" fill="#64748b">{(maxCurrent * step / 4).toFixed(2)}</text>
                  </g>
                );
              })}
              {[0, 6, 12, 18, 24].map((value) => {
                const x = 65 + (value / 24) * 360;
                return (
                  <g key={value}>
                    <line x1={x} y1="45" x2={x} y2="215" stroke="#e2e8f0" />
                    <text x={x} y="233" textAnchor="middle" fontSize="11" fill="#64748b">{value}</text>
                  </g>
                );
              })}
              <line x1="65" y1="45" x2="65" y2="215" stroke="#334155" strokeWidth="2" />
              <line x1="65" y1="215" x2="425" y2="215" stroke="#334155" strokeWidth="2" />
              <line x1="65" y1="215" x2="425" y2="45" stroke="#2563eb" strokeWidth="3" />
              <circle cx={graphX} cy={graphY} r="7" fill="#dc2626" stroke="white" strokeWidth="2" />
              <text x="245" y="260" textAnchor="middle" fontSize="13" fill="#334155">Voltage (V)</text>
              <text transform="translate(15 130) rotate(-90)" textAnchor="middle" fontSize="13" fill="#334155">Current (A)</text>
            </svg>
          </div>
          <p className="graph-note">Red dot: Actual operating current. Blue line: Theoretical relationship. The graph updates using the calculated resistance.</p>
          <div className="result-grid">
            <div className="result-box"><h3>Voltage</h3><p>{safeValues.voltage.toFixed(2)} V</p></div>
            <div className="result-box"><h3>Resistance</h3><p>{safeValues.resistance.toFixed(2)} Ω</p></div>
            <div className="result-box"><h3>Current</h3><p>{actualCurrent.toFixed(3)} A</p></div>
          </div>
        </section>
      )}

      {slide === 3 && (
        <section className="ohms-card slide-card">
          <h2>4. Predict – Test Your Knowledge</h2>
          <p>Answer each question and submit your answer before moving to the next question.</p>
          <div className="quiz-count">Question {questionIndex + 1} of {questions.length}</div>
          <div className="quiz-mini-progress"><div style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
          <div className="question-box">
            <h3>{currentQuestion.question}</h3>
            {currentQuestion.options.map((option, optionIndex) => (
              <label className="option-label" key={optionIndex}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={String(optionIndex)}
                  checked={answers[questionIndex] === String(optionIndex)}
                  disabled={answerSubmitted}
                  onChange={() => handleAnswer(String(optionIndex))}
                />
                {option}
              </label>
            ))}
            {answerSubmitted && (
              <div className={isCorrect ? "correct-feedback" : "wrong-feedback"}>
                <strong>{isCorrect ? "Correct answer!" : "Incorrect answer."}</strong>
                <p>Correct response: {currentQuestion.options[currentQuestion.answer]}</p>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
          {!answerSubmitted ? (
            <button className="test-button" disabled={answers[questionIndex] === undefined} onClick={submitCurrentAnswer}>Submit Answer</button>
          ) : (
            <button className="test-button" onClick={nextQuestion}>
              {questionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          )}
        </section>
      )}

      {slide === 4 && (
        <section className="ohms-card slide-card">
          <h2>5. Experiment Results</h2>
          {quizSubmitted ? (
            <div className="score-box">
              <h3>Your Quiz Result</h3>
              <p>Score: {score} / {questions.length}</p>
              <p>{score === questions.length ? "Excellent! You understand Ohm's Law very well." : "Good attempt! Review the explanations and try again."}</p>
              <button className="reset-button" onClick={startQuizAgain}>Try Quiz Again</button>
            </div>
          ) : (
            <div className="score-box">
              <h3>Experiment completed</h3>
              <p>Your calculation and graph are ready.</p>
              <p>Complete the quiz to see your score here.</p>
            </div>
          )}

          <h3 className="result-heading">Final Experiment Values</h3>
          <div className="result-grid">
            <div className="result-box"><h3>Voltage</h3><p>{safeValues.voltage.toFixed(2)} V</p></div>
            <div className="result-box"><h3>Resistance</h3><p>{safeValues.resistance.toFixed(2)} Ω</p></div>
            <div className="result-box"><h3>Current</h3><p>{actualCurrent.toFixed(3)} A</p></div>
          </div>
          <p className="formula">
            {mode === "current" && "I = V / R"}
            {mode === "resistance" && "R = V / I"}
            {mode === "voltage" && "V = I × R"}
          </p>
          <h3 className="result-heading">Observe and Explain</h3>
          <p>
            {isOn
              ? `The battery supplies ${safeValues.voltage.toFixed(2)} V. The resistance is ${safeValues.resistance.toFixed(2)} Ω. Therefore, the current is ${safeValues.current.toFixed(3)} A.`
              : "The switch is OFF, so no current flows through the circuit."}
          </p>
          <p>Remember: increasing voltage increases current. Increasing resistance decreases current when voltage is constant.</p>
          <button className="reset-button" onClick={resetExperiment}>Restart Experiment</button>
        </section>
      )}

      <div className="slide-navigation">
        <button className="reset-button" onClick={() => setSlide((previous) => Math.max(0, previous - 1))} disabled={slide === 0}>
          Previous
        </button>
        {slide < 2 && (
          <button className="test-button" onClick={() => setSlide((previous) => Math.min(2, previous + 1))}>
            Next
          </button>
        )}
        {slide === 2 && (
          <button className="test-button" onClick={() => { setQuestionIndex(0); setSlide(3); }}>
            Start Quiz
          </button>
        )}
        {slide === 3 && (
          <button className="reset-button" onClick={() => setSlide(2)}>Back to Graph</button>
        )}
        {slide === 4 && (
          <button className="test-button" onClick={resetExperiment}>Start Again</button>
        )}
      </div>
    </main>
  );
}

export default OhmsLaw;
