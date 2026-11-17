
import React, { useState } from "react";

export default function Fractions() {
  const [slide, setSlide] = useState(0);
  const [numerator, setNumerator] = useState(3);
  const [denominator, setDenominator] = useState(4);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fractionValue = (numerator / denominator).toFixed(2);

  const slides = [
    "Introduction",
    "Theory",
    "Interactive Experiment",
    "Graph and Observations",
    "Quiz",
    "Results and Conclusion"
  ];

  const nextSlide = () => {
    setSlide((current) => Math.min(current + 1, slides.length - 1));
  };

  const previousSlide = () => {
    setSlide((current) => Math.max(current - 1, 0));
  };

  const restart = () => {
    setSlide(0);
    setNumerator(3);
    setDenominator(4);
    setQuizAnswer("");
    setSubmitted(false);
  };

  const styles = {
    page: {
      width: "100%",
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "24px",
      boxSizing: "border-box",
      fontFamily: "Arial, sans-serif",
      color: "#172554"
    },
    heading: {
      textAlign: "center",
      fontSize: "28px",
      marginBottom: "8px",
      color: "#312e81"
    },
    subtitle: {
      textAlign: "center",
      color: "#64748b",
      marginBottom: "25px"
    },
    progress: {
      width: "100%",
      height: "8px",
      background: "#e2e8f0",
      borderRadius: "10px",
      overflow: "hidden",
      marginBottom: "25px"
    },
    progressFill: {
      height: "100%",
      background: "#7c3aed",
      transition: "width 0.3s"
    },
    card: {
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "14px",
      padding: "25px",
      marginBottom: "20px",
      boxShadow: "0 3px 12px rgba(0,0,0,0.05)"
    },
    example: {
      background: "#f5f3ff",
      borderRadius: "12px",
      padding: "25px 15px",
      textAlign: "center",
      marginBottom: "20px"
    },
    fractionBoxes: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
      margin: "25px 0"
    },
    box: {
      width: "60px",
      height: "60px",
      border: "2px solid #7c3aed",
      borderRadius: "11px",
      boxSizing: "border-box"
    },
    formula: {
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "22px",
      textAlign: "center"
    },
    navigation: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px",
      marginTop: "25px"
    },
    button: {
      background: "#7c3aed",
      color: "white",
      border: "none",
      borderRadius: "9px",
      padding: "12px 22px",
      fontSize: "15px",
      fontWeight: "bold",
      cursor: "pointer"
    },
    disabledButton: {
      background: "#cbd5e1",
      color: "#64748b",
      cursor: "not-allowed"
    },
    slider: {
      width: "100%",
      accentColor: "#7c3aed",
      margin: "12px 0 22px"
    }
  };

  const renderFractionBoxes = (num, den) => (
    <div style={styles.fractionBoxes}>
      {Array.from({ length: den }, (_, index) => (
        <div
          key={index}
          style={{
            ...styles.box,
            background: index < num ? "#8b5cf6" : "#e2e8f0"
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Fractions Virtual Lab</h1>
      <p style={styles.subtitle}>
        Learn fractions through interactive examples
      </p>

      <div style={styles.progress}>
        <div
          style={{
            ...styles.progressFill,
            width: `${((slide + 1) / slides.length) * 100}%`
          }}
        />
      </div>

      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Slide {slide + 1} of {slides.length} — {slides[slide]}
      </p>

      {/* SLIDE 1: INTRODUCTION */}
      {slide === 0 && (
        <div style={styles.card}>
          <h2>Introduction to Fractions</h2>
          <p>
            A fraction represents a part of a whole. It is used when an object
            or quantity is divided into equal parts.
          </p>

          <div style={styles.example}>
            <h2>Example: 3/4</h2>
            <p>Three out of four equal parts are selected.</p>
            {renderFractionBoxes(3, 4)}
            <h2>3 / 4</h2>
          </div>
        </div>
      )}

      {/* SLIDE 2: THEORY */}
      {slide === 1 && (
        <div style={styles.card}>
          <h2>Fraction Theory</h2>

          <div style={styles.example}>
            <h2>Example: 3/4</h2>
            <p style={{ fontSize: "20px", lineHeight: 1.5 }}>
              Numerator = 3
              <br />
              Denominator = 4
            </p>

            {renderFractionBoxes(3, 4)}

            <p style={{ fontSize: "19px" }}>
              Three out of four equal parts are selected.
            </p>
          </div>

          <div style={styles.formula}>
            <h2>Fraction Formula</h2>
            <p style={{ fontSize: "20px" }}>
              Fraction = Numerator ÷ Denominator
            </p>
            <p>3 ÷ 4 = 0.75</p>
          </div>
        </div>
      )}

      {/* SLIDE 3: INTERACTIVE EXPERIMENT */}
      {slide === 2 && (
        <div style={styles.card}>
          <h2>Interactive Fraction Experiment</h2>
          <p>Move the sliders to change the fraction.</p>

          <div style={styles.example}>
            <h2>
              Your Fraction: {numerator}/{denominator}
            </h2>

            {renderFractionBoxes(numerator, denominator)}

            <h3>
              Fraction Value: {fractionValue}
            </h3>
          </div>

          <label>
            <strong>Numerator: {numerator}</strong>
          </label>
          <input
            type="range"
            min="1"
            max={denominator}
            value={numerator}
            onChange={(e) => setNumerator(Number(e.target.value))}
            style={styles.slider}
          />

          <label>
            <strong>Denominator: {denominator}</strong>
          </label>
          <input
            type="range"
            min="2"
            max="10"
            value={denominator}
            onChange={(e) => {
              const newDenominator = Number(e.target.value);
              setDenominator(newDenominator);
              setNumerator((current) =>
                Math.min(current, newDenominator)
              );
            }}
            style={styles.slider}
          />

          <p>
            <strong>Observation:</strong> {numerator} out of {denominator} equal
            parts are selected.
          </p>
        </div>
      )}

      {/* SLIDE 4: GRAPH AND OBSERVATIONS */}
      {slide === 3 && (
        <div style={styles.card}>
          <h2>Graph and Observations</h2>

          <div style={styles.example}>
            <h2>Fraction: 3/4</h2>
            {renderFractionBoxes(3, 4)}
            <h3>3/4 = 0.75 = 75%</h3>
          </div>

          <h3>Important Observations</h3>
          <ul style={{ lineHeight: 2 }}>
            <li>The numerator tells us the selected parts.</li>
            <li>The denominator tells us the total equal parts.</li>
            <li>A fraction can also be represented as a decimal.</li>
            <li>3/4 means 75% of the whole.</li>
          </ul>
        </div>
      )}

      {/* SLIDE 5: QUIZ */}
      {slide === 4 && (
        <div style={styles.card}>
          <h2>Test Your Knowledge</h2>
          <p>
            <strong>Question:</strong> What is the simplified form of 2/4?
          </p>

          {["1/2", "1/4", "2/3", "3/4"].map((option) => (
            <label
              key={option}
              style={{
                display: "block",
                padding: "13px",
                margin: "10px 0",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                cursor: "pointer",
                background:
                  quizAnswer === option ? "#ede9fe" : "#ffffff"
              }}
            >
              <input
                type="radio"
                name="fractionQuiz"
                value={option}
                checked={quizAnswer === option}
                onChange={() => {
                  setQuizAnswer(option);
                  setSubmitted(false);
                }}
              />{" "}
              {option}
            </label>
          ))}

          <button
            style={styles.button}
            onClick={() => setSubmitted(true)}
            disabled={!quizAnswer}
          >
            Submit Answer
          </button>

          {submitted && (
            <p
              style={{
                fontWeight: "bold",
                color: quizAnswer === "1/2" ? "#15803d" : "#dc2626"
              }}
            >
              {quizAnswer === "1/2"
                ? "Correct! 2/4 simplifies to 1/2."
                : "Incorrect. Try again! The correct answer is 1/2."}
            </p>
          )}
        </div>
      )}

      {/* SLIDE 6: RESULTS */}
      {slide === 5 && (
        <div style={styles.card}>
          <h2>Results and Conclusion</h2>

          <div style={styles.example}>
            <h2>What We Learned</h2>
            {renderFractionBoxes(3, 4)}
            <h2>3/4 = 0.75</h2>
          </div>

          <ul style={{ lineHeight: 2 }}>
            <li>Fractions represent parts of a whole.</li>
            <li>The numerator represents selected parts.</li>
            <li>The denominator represents total equal parts.</li>
            <li>Fractions can be converted into decimal values.</li>
          </ul>

          <h3>Conclusion</h3>
          <p>
            Fractions help us understand and represent parts of a whole.
            Interactive experiments make learning fractions easier.
          </p>

          <button style={styles.button} onClick={restart}>
            Restart Experiment
          </button>
        </div>
      )}

      {/* PREVIOUS AND NEXT BUTTONS */}
      <div style={styles.navigation}>
        <button
          onClick={previousSlide}
          disabled={slide === 0}
          style={{
            ...styles.button,
            ...(slide === 0 ? styles.disabledButton : {})
          }}
        >
          Previous Slide
        </button>

        <button
          onClick={nextSlide}
          disabled={slide === slides.length - 1}
          style={{
            ...styles.button,
            ...(slide === slides.length - 1
              ? styles.disabledButton
              : {})
          }}
        >
          Next Slide
        </button>
      </div>
    </div>
  );
}
