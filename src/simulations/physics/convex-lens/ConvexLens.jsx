import React, { useMemo, useState } from "react";
import "./ConvexLens.css";

const questions = [
  {
    q: "What type of lens is a convex lens?",
    options: ["Diverging lens", "Converging lens", "Plane lens", "Reflecting lens"],
    answer: 1,
    explanation: "A convex lens is thicker at the centre and converges parallel light rays.",
  },
  {
    q: "What happens when an object is placed beyond 2F?",
    options: [
      "Image forms between F and 2F",
      "Image forms at infinity",
      "Image forms behind the object",
      "No image is formed",
    ],
    answer: 0,
    explanation: "For an object beyond 2F, a real, inverted and diminished image forms between F and 2F.",
  },
  {
    q: "What is the image when an object is placed between F and the lens?",
    options: [
      "Real and inverted",
      "Virtual and erect",
      "Real and enlarged",
      "No image",
    ],
    answer: 1,
    explanation: "When the object is inside the focal length, the image is virtual, erect and magnified.",
  },
  {
    q: "What is the SI unit of focal length?",
    options: ["Dioptre", "Metre", "Newton", "Watt"],
    answer: 1,
    explanation: "Focal length is a distance, so its SI unit is the metre.",
  },
];

function calculateLens(objectDistance, focalLength) {
  const doValue = objectDistance;
  const f = focalLength;

  if (Math.abs(doValue - f) < 0.001) {
    return {
      imageDistance: null,
      magnification: null,
      nature: "Image at infinity",
      orientation: "Highly enlarged",
      size: "Highly enlarged",
      type: "Real image at infinity (ideal model)",
    };
  }

  const di = (f * doValue) / (doValue - f);
  const magnification = -di / doValue;

  let nature;
  let orientation;
  let size;
  let type;

  if (di > 0) {
    nature = "Real";
    orientation = "Inverted";
    size = Math.abs(magnification) > 1.001
      ? "Enlarged"
      : Math.abs(magnification) < 0.999
        ? "Diminished"
        : "Same size";
    type = "Real and inverted";
  } else {
    nature = "Virtual";
    orientation = "Erect";
    size = "Enlarged";
    type = "Virtual and erect";
  }

  return {
    imageDistance: di,
    magnification,
    nature,
    orientation,
    size,
    type,
  };
}

function LensDiagram({ objectDistance, focalLength, result }) {
  const centerX = 320;
  const axisY = 170;
  const scale = 170 / Math.max(2 * focalLength, objectDistance, 10);
  const objectX = centerX - objectDistance * scale;
  const focusLeft = centerX - focalLength * scale;
  const focusRight = centerX + focalLength * scale;

  const finiteImage = result.imageDistance !== null;
  const imageX = finiteImage
    ? centerX + result.imageDistance * scale
    : 570;

  const imageHeight = finiteImage
    ? Math.max(12, Math.min(90, 48 * Math.abs(result.magnification)))
    : 90;

  const imageTop = result.magnification > 0
    ? axisY - imageHeight
    : axisY + imageHeight;

  const imageBottom = result.magnification > 0
    ? axisY
    : axisY;

  const rayEndX = finiteImage ? Math.max(40, Math.min(590, imageX)) : 570;

  return (
    <div className="cl-diagram">
      <svg viewBox="0 0 640 310" role="img" aria-label="Convex lens ray diagram">
        <defs>
          <marker id="cl-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6" fill="none" stroke="#2563eb" strokeWidth="1.2" />
          </marker>
        </defs>

        <line x1="25" y1={axisY} x2="615" y2={axisY} stroke="#64748b" strokeWidth="1.5" />

        <path
          d="M320 55 Q285 170 320 285 Q355 170 320 55"
          fill="#bfdbfe"
          fillOpacity="0.65"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text x="320" y="35" textAnchor="middle" fontSize="13" fill="#1d4ed8">Convex lens</text>

        {[focusLeft, focusRight].map((x, index) => (
          <g key={index}>
            <circle cx={x} cy={axisY} r="4" fill="#dc2626" />
            <text x={x} y={axisY + 22} textAnchor="middle" fontSize="12" fill="currentColor">
              F
            </text>
            <text x={index === 0 ? x - 3 : x + 3} y={axisY + 38} textAnchor="middle" fontSize="10" fill="#64748b">
              {index === 0 ? "F₁" : "F₂"}
            </text>
          </g>
        ))}

        <line x1={centerX - 2 * focalLength * scale} y1={axisY - 5}
          x2={centerX - 2 * focalLength * scale} y2={axisY + 5}
          stroke="#64748b" strokeDasharray="3 3" />
        <line x1={centerX + 2 * focalLength * scale} y1={axisY - 5}
          x2={centerX + 2 * focalLength * scale} y2={axisY + 5}
          stroke="#64748b" strokeDasharray="3 3" />

        <line
          x1={objectX}
          y1={axisY}
          x2={objectX}
          y2={axisY - 48}
          stroke="#16a34a"
          strokeWidth="4"
          markerEnd="url(#cl-arrow)"
        />
        <text x={objectX} y={axisY + 25} textAnchor="middle" fontSize="12" fill="#16a34a">
          Object
        </text>

        <line
          x1={objectX}
          y1={axisY - 48}
          x2={centerX}
          y2={axisY - 48}
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <line
          x1={centerX}
          y1={axisY - 48}
          x2={rayEndX}
          y2={finiteImage && result.imageDistance > 0 ? axisY + 48 * result.magnification : axisY - 48}
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray={result.imageDistance < 0 ? "5 4" : "0"}
        />

        {finiteImage && (
          <>
            <line
              x1={centerX}
              y1={axisY - 48}
              x2={imageX}
              y2={imageTop}
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray={result.imageDistance < 0 ? "5 4" : "0"}
            />
            <line
              x1={imageX}
              y1={imageBottom}
              x2={imageX}
              y2={imageTop}
              stroke="#dc2626"
              strokeWidth="4"
            />
            <text x={Math.max(35, Math.min(605, imageX))} y={imageTop + (result.magnification > 0 ? -10 : 20)}
              textAnchor="middle" fontSize="12" fill="#dc2626">
              Image
            </text>
          </>
        )}

        <text x="320" y="295" textAnchor="middle" fontSize="11" fill="#64748b">
          Principal axis (illustrative ray diagram)
        </text>
      </svg>
    </div>
  );
}

export default function ConvexLens() {
  const [screen, setScreen] = useState(0);
  const [objectDistance, setObjectDistance] = useState(30);
  const [focalLength, setFocalLength] = useState(10);
  const [readings, setReadings] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(
    () => calculateLens(objectDistance, focalLength),
    [objectDistance, focalLength]
  );

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  function recordReading() {
    setReadings((previous) => [
      ...previous,
      {
        id: Date.now(),
        objectDistance,
        focalLength,
        imageDistance: result.imageDistance,
        magnification: result.magnification,
        nature: result.nature,
      },
    ]);
  }

  function resetExperiment() {
    setObjectDistance(30);
    setFocalLength(10);
    setReadings([]);
  }

  return (
    <main className="cl-lab">
      <header className="cl-header">
        <div>
          <p className="cl-eyebrow">PRAYOGSETU · PHYSICS VIRTUAL LAB</p>
          <h1>Convex Lens – Image Formation</h1>
          <p>Explore how a convex lens forms images at different object positions.</p>
        </div>
        <div className="cl-header-icon">🔎</div>
      </header>

      <nav className="cl-progress">
        {["Introduction", "Experiment", "Graph", "Quiz", "Results"].map((name, index) => (
          <button
            key={name}
            className={`cl-step ${screen === index ? "active" : ""} ${screen > index ? "completed" : ""}`}
            onClick={() => setScreen(index)}
          >
            <span>{index + 1}</span>{name}
          </button>
        ))}
      </nav>

      {screen === 0 && (
        <section className="cl-panel">
          <div className="cl-heading">
            <span>SCREEN 1 OF 5</span>
            <h2>Introduction and Theory</h2>
            <p>Learn how a convex lens bends light rays to form an image.</p>
          </div>

          <div className="cl-two-columns">
            <article className="cl-card">
              <h3>What is a convex lens?</h3>
              <p>
                A convex lens is thicker at the centre and thinner at the edges.
                It bends parallel light rays towards a common point called the
                principal focus.
              </p>
              <p>
                Depending on the object's position, it can form real or virtual
                images of different sizes.
              </p>
            </article>

            <article className="cl-card cl-blue-card">
              <h3>Lens formula</h3>
              <div className="cl-formula">
                1/f = 1/v − 1/u
              </div>
              <p>Using the Cartesian sign convention:</p>
              <ul>
                <li>f = focal length</li>
                <li>u = object distance (negative for an object on the left)</li>
                <li>v = image distance</li>
              </ul>
            </article>
          </div>

          <article className="cl-card">
            <h3>Important terms</h3>
            <ul>
              <li><strong>Optical centre:</strong> The centre point of the lens.</li>
              <li><strong>Principal axis:</strong> The straight line passing through the optical centre.</li>
              <li><strong>Principal focus (F):</strong> The point where parallel rays converge.</li>
              <li><strong>Focal length:</strong> Distance between the optical centre and principal focus.</li>
              <li><strong>Magnification:</strong> Ratio of image height to object height.</li>
            </ul>
          </article>

          <article className="cl-card">
            <h3>Learning objectives</h3>
            <ul>
              <li>Understand image formation by a convex lens.</li>
              <li>Calculate image distance using the lens formula.</li>
              <li>Identify real, virtual, erect and inverted images.</li>
              <li>Study the effect of changing object distance.</li>
            </ul>
          </article>
        </section>
      )}

      {screen === 1 && (
        <section className="cl-panel">
          <div className="cl-heading">
            <span>SCREEN 2 OF 5</span>
            <h2>Interactive Experiment</h2>
            <p>Move the object and change the focal length to observe image formation.</p>
          </div>

          <div className="cl-diagram-wrap">
            <LensDiagram
              objectDistance={objectDistance}
              focalLength={focalLength}
              result={result}
            />
          </div>

          <div className="cl-controls">
            <div className="cl-control">
              <label htmlFor="cl-object">
                Object distance <strong>{objectDistance} cm</strong>
              </label>
              <input
                id="cl-object"
                type="range"
                min="5"
                max="80"
                value={objectDistance}
                onChange={(e) => setObjectDistance(Number(e.target.value))}
              />
              <div className="cl-range-labels"><span>5 cm</span><span>80 cm</span></div>
            </div>

            <div className="cl-control">
              <label htmlFor="cl-focal">
                Focal length <strong>{focalLength} cm</strong>
              </label>
              <input
                id="cl-focal"
                type="range"
                min="5"
                max="25"
                value={focalLength}
                onChange={(e) => setFocalLength(Number(e.target.value))}
              />
              <div className="cl-range-labels"><span>5 cm</span><span>25 cm</span></div>
            </div>
          </div>

          <div className="cl-results">
            <div className="cl-result">
              <span>Image distance (v)</span>
              <strong>
                {result.imageDistance === null
                  ? "At infinity"
                  : `${result.imageDistance.toFixed(2)} cm`}
              </strong>
            </div>
            <div className="cl-result">
              <span>Magnification</span>
              <strong>
                {result.magnification === null
                  ? "∞"
                  : result.magnification.toFixed(2)}
              </strong>
            </div>
            <div className="cl-result">
              <span>Image nature</span>
              <strong>{result.nature}</strong>
            </div>
            <div className="cl-result">
              <span>Image orientation</span>
              <strong>{result.orientation}</strong>
            </div>
            <div className="cl-result">
              <span>Image size</span>
              <strong>{result.size}</strong>
            </div>
          </div>

          <div className="cl-observation-note">
            <strong>Observation:</strong> {result.type}.
            {result.imageDistance === null
              ? " The object is at the principal focus, so the ideal image forms at infinity."
              : result.imageDistance > 0
                ? " The image forms on the opposite side of the lens."
                : " The image forms on the same side as the object."}
          </div>

          <div className="cl-actions">
            <button className="cl-button secondary" onClick={resetExperiment}>Reset</button>
            <button className="cl-button primary" onClick={recordReading}>Record observation</button>
          </div>

          <div className="cl-table-wrap">
            <h3>Observation table ({readings.length})</h3>
            {readings.length === 0 ? (
              <p>No readings recorded. Change the sliders and click Record observation.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Object distance</th>
                    <th>Focal length</th>
                    <th>Image distance</th>
                    <th>Magnification</th>
                    <th>Image nature</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((reading, index) => (
                    <tr key={reading.id}>
                      <td>{index + 1}</td>
                      <td>{reading.objectDistance} cm</td>
                      <td>{reading.focalLength} cm</td>
                      <td>
                        {reading.imageDistance === null
                          ? "Infinity"
                          : `${reading.imageDistance.toFixed(2)} cm`}
                      </td>
                      <td>
                        {reading.magnification === null
                          ? "Infinity"
                          : reading.magnification.toFixed(2)}
                      </td>
                      <td>{reading.nature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {screen === 2 && (
        <section className="cl-panel">
          <div className="cl-heading">
            <span>SCREEN 3 OF 5</span>
            <h2>Graph and Analysis</h2>
            <p>Observe the relationship between object distance and image distance.</p>
          </div>

          {readings.length === 0 ? (
            <div className="cl-empty">
              <h3>No observations available</h3>
              <p>Record readings in the Experiment screen to display the graph.</p>
              <button className="cl-button primary" onClick={() => setScreen(1)}>
                Go to experiment
              </button>
            </div>
          ) : (
            <>
              <article className="cl-card">
                <h3>Object distance vs image distance</h3>
                <p className="cl-muted">Recorded observations are shown as points.</p>
                <div className="cl-graph-wrap">
                  <svg viewBox="0 0 620 350" role="img" aria-label="Object distance versus image distance graph">
                    {Array.from({ length: 6 }, (_, i) => {
                      const x = 75 + i * 95;
                      const y = 275 - i * 45;
                      return (
                        <g key={i}>
                          <line x1={x} y1="45" x2={x} y2="275" stroke="#e2e8f0" strokeDasharray="4 4" />
                          <line x1="75" y1={y} x2="550" y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />
                          <text x={x} y="295" textAnchor="middle" fontSize="11" fill="#64748b">{i * 10}</text>
                          <text x="62" y={y + 4} textAnchor="end" fontSize="11" fill="#64748b">{i * 10}</text>
                        </g>
                      );
                    })}
                    <line x1="75" y1="45" x2="75" y2="275" stroke="#475569" strokeWidth="2" />
                    <line x1="75" y1="275" x2="550" y2="275" stroke="#475569" strokeWidth="2" />
                    {readings.map((reading, index) => {
                      if (reading.imageDistance === null) return null;
                      const x = 75 + (Math.min(50, reading.objectDistance) / 50) * 475;
                      const yValue = Math.max(-10, Math.min(50, reading.imageDistance));
                      const y = 275 - ((yValue + 10) / 60) * 230;
                      return (
                        <g key={reading.id}>
                          <circle cx={x} cy={y} r="6" fill="#2563eb" />
                          <text x={x + 8} y={y - 9} fontSize="11" fill="#1d4ed8">{index + 1}</text>
                        </g>
                      );
                    })}
                    <text x="310" y="330" textAnchor="middle" fontSize="13" fill="#475569">Object distance (cm)</text>
                    <text x="18" y="160" textAnchor="middle" fontSize="13" fill="#475569" transform="rotate(-90 18 160)">Image distance (cm)</text>
                  </svg>
                </div>
              </article>

              <article className="cl-card">
                <h3>What can you observe?</h3>
                <ul>
                  <li>When the object is beyond 2F, the image is real, inverted and diminished.</li>
                  <li>When the object is at 2F, the image is at 2F and is the same size.</li>
                  <li>When the object is between F and 2F, the image is real, inverted and enlarged.</li>
                  <li>When the object is inside F, the image is virtual, erect and enlarged.</li>
                </ul>
              </article>
            </>
          )}
        </section>
      )}

      {screen === 3 && (
        <section className="cl-panel">
          <div className="cl-heading">
            <span>SCREEN 4 OF 5</span>
            <h2>Knowledge Check</h2>
            <p>Answer all four questions and submit your answers.</p>
          </div>

          {questions.map((question, index) => (
            <article className="cl-question" key={index}>
              <h3>{index + 1}. {question.q}</h3>
              <div className="cl-options">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`cl-option ${
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
                      name={`cl-question-${index}`}
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
                <p className="cl-explanation">{question.explanation}</p>
              )}
            </article>
          ))}

          {submitted && (
            <div className="cl-score">Your score: <strong>{score} / 4</strong></div>
          )}

          <div className="cl-actions">
            {submitted ? (
              <button
                className="cl-button secondary"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
              >
                Try again
              </button>
            ) : (
              <button
                className="cl-button primary"
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
        <section className="cl-panel">
          <div className="cl-heading">
            <span>SCREEN 5 OF 5</span>
            <h2>Results and Conclusion</h2>
            <p>Review the learning outcomes of your experiment.</p>
          </div>

          <div className="cl-complete">
            <div>🔎</div>
            <h3>Experiment completed!</h3>
            <p>You explored image formation using a convex lens.</p>
          </div>

          <div className="cl-results">
            <div className="cl-result">
              <span>Observations recorded</span>
              <strong>{readings.length}</strong>
            </div>
            <div className="cl-result">
              <span>Quiz score</span>
              <strong>{submitted ? `${score}/4` : "Not submitted"}</strong>
            </div>
          </div>

          <article className="cl-card">
            <h3>Conclusion</h3>
            <p>
              A convex lens converges light rays and forms images depending on
              the object's position. The image may be real or virtual, enlarged
              or diminished, and inverted or erect. The thin lens formula helps
              calculate the image distance.
            </p>
          </article>

          <article className="cl-card">
            <h3>Applications of convex lenses</h3>
            <ul>
              <li>Magnifying glasses</li>
              <li>Cameras</li>
              <li>Microscopes</li>
              <li>Telescopes</li>
              <li>Projectors</li>
              <li>Corrective lenses for hypermetropia</li>
            </ul>
          </article>

          <article className="cl-card">
            <h3>Video learning references</h3>
            <div className="cl-video-links">
              <a
                href="https://www.youtube.com/results?search_query=convex+lens+image+formation+introduction"
                target="_blank"
                rel="noreferrer"
              >
                ▶ Convex Lens – Introduction and Theory
              </a>
              <a
                href="https://www.youtube.com/results?search_query=convex+lens+ray+diagram+experiment"
                target="_blank"
                rel="noreferrer"
              >
                ▶ Convex Lens – Ray Diagram Demonstration
              </a>
            </div>
          </article>

          <div className="cl-actions">
            <button
              className="cl-button secondary"
              onClick={() => {
                setScreen(0);
                setAnswers({});
                setSubmitted(false);
                resetExperiment();
              }}
            >
              Restart experiment
            </button>
            <button className="cl-button primary" onClick={() => setScreen(1)}>
              Try experiment again
            </button>
          </div>
        </section>
      )}

      <footer className="cl-footer">
        <button
          className="cl-button secondary"
          disabled={screen === 0}
          onClick={() => setScreen((current) => Math.max(0, current - 1))}
        >
          ← Previous
        </button>
        <span>Screen {screen + 1} of 5</span>
        <button
          className="cl-button primary"
          disabled={screen === 4}
          onClick={() => setScreen((current) => Math.min(4, current + 1))}
        >
          Next →
        </button>
      </footer>
    </main>
  );
}