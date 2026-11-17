
import React, { useState } from "react";

export default function AreaPerimeter() {
  const [slide, setSlide] = useState(0);
  const [length, setLength] = useState(8);
  const [width, setWidth] = useState(5);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const area = length * width;
  const perimeter = 2 * (length + width);
  const titles = ["Introduction", "Theory", "Experiment", "Observations", "Quiz", "Results"];

  const restart = () => {
    setSlide(0);
    setLength(8);
    setWidth(5);
    setAnswer("");
    setSubmitted(false);
  };

  return (
    <main style={s.page}>
      <header style={s.header}>
        <small>PRAYOGSETU · MATHEMATICS LAB</small>
        <h1>📐 Area and Perimeter</h1>
        <p>Explore the dimensions of a rectangle interactively.</p>
      </header>

      <Progress slide={slide} titles={titles} />

      {slide === 0 && <section style={s.card}>
        <h2>Slide 1: Introduction</h2>
        <p>Area measures the surface covered by a shape. Perimeter measures the total distance around its boundary.</p>
        <div style={s.visual}>
          <div style={{fontSize:60}}>▰</div>
          <h2>Rectangle</h2>
          <p>We will change its length and width and observe the results.</p>
        </div>
        <h3>Learning Objectives</h3>
        <ul>
          <li>Understand area and perimeter.</li>
          <li>Identify length and width.</li>
          <li>Calculate area and perimeter.</li>
          <li>Apply formulas to real-life problems.</li>
        </ul>
      </section>}

      {slide === 1 && <section style={s.card}>
        <h2>Slide 2: Theory</h2>
        <h3>Area Formula</h3>
        <div style={s.formula}>Area = Length × Width</div>
        <p>Area is measured in square units.</p>
        <h3>Perimeter Formula</h3>
        <div style={s.formula}>Perimeter = 2 × (Length + Width)</div>
        <p>Perimeter is measured in units such as centimetres or metres.</p>
        <div style={s.visual}>
          <b>Example: Length = 8, Width = 5</b>
          <p>Area = 8 × 5 = 40 square units</p>
          <p>Perimeter = 2 × (8 + 5) = 26 units</p>
        </div>
      </section>}

      {slide === 2 && <section style={s.card}>
        <h2>Slide 3: Interactive Experiment</h2>
        <label>Length: {length} units</label>
        <input style={s.slider} type="range" min="1" max="20"
          value={length} onChange={e => setLength(Number(e.target.value))} />
        <label>Width: {width} units</label>
        <input style={s.slider} type="range" min="1" max="20"
          value={width} onChange={e => setWidth(Number(e.target.value))} />

        <div style={s.visual}>
          <div style={{
            width: `${length * 12}px`,
            height: `${width * 10}px`,
            maxWidth: "100%",
            maxHeight: "220px",
            minWidth: "30px",
            minHeight: "30px",
            background: "#bfdbfe",
            border: "3px solid #2563eb",
            display: "grid",
            placeItems: "center",
            color: "#1e3a8a",
            fontWeight: "bold"
          }}>
            {length} × {width}
          </div>
        </div>

        <div style={s.result}>
          <p>Area = {area} square units</p>
          <p>Perimeter = {perimeter} units</p>
        </div>
      </section>}

      {slide === 3 && <section style={s.card}>
        <h2>Slide 4: Graph and Observations</h2>
        <p>Area for different lengths when width is {width}:</p>
        <div style={{display:"flex",alignItems:"end",gap:5,height:190,background:"#f8fafc",padding:12}}>
          {[2,4,6,8,10,12,14,16].map(v => (
            <div key={v} title={`Length ${v}: area ${v * width}`}
              style={{
                flex:1,
                height:`${v * width / 320 * 100}%`,
                background:v === length ? "#7c3aed" : "#93c5fd",
                borderRadius:"5px 5px 0 0"
              }} />
          ))}
        </div>
        <div style={s.result}>
          <p>Current area: {area} square units</p>
          <p>Current perimeter: {perimeter} units</p>
        </div>
        <ul>
          <li>Increasing length increases area if width stays fixed.</li>
          <li>Area measures the inside surface.</li>
          <li>Perimeter measures the outside boundary.</li>
        </ul>
      </section>}

      {slide === 4 && <section style={s.card}>
        <h2>Slide 5: Quiz</h2>
        <p>A rectangle has length 8 units and width 5 units. What is its area?</p>
        {["13 square units","26 square units","40 square units","80 square units"].map(v => (
          <button key={v} style={s.option(answer === v)}
            onClick={() => {setAnswer(v);setSubmitted(false);}}>
            {v}
          </button>
        ))}
        <button style={s.primary} disabled={!answer} onClick={() => setSubmitted(true)}>
          Submit Answer
        </button>
        {submitted && <p style={{color:answer === "40 square units" ? "green" : "red"}}>
          {answer === "40 square units" ? "Correct! Well done." : "Incorrect. The answer is 40 square units."}
        </p>}
      </section>}

      {slide === 5 && <section style={s.card}>
        <h2>Slide 6: Results and Conclusion</h2>
        <div style={s.result}>
          <p>Length: {length}</p>
          <p>Width: {width}</p>
          <p>Area: {area} square units</p>
          <p>Perimeter: {perimeter} units</p>
          <p>Quiz: {submitted ? (answer === "40 square units" ? "Correct" : "Incorrect") : "Not attempted"}</p>
        </div>
        <h3>Conclusion</h3>
        <p>Area measures the space inside a rectangle, while perimeter measures the total distance around it.</p>
        <h3>Real-Life Applications</h3>
        <ul>
          <li>Finding the floor area of a room.</li>
          <li>Calculating fencing for a garden.</li>
          <li>Estimating carpet and tile requirements.</li>
        </ul>
        <button style={s.primary} onClick={restart}>Restart Experiment</button>
      </section>}

      <Navigation slide={slide} setSlide={setSlide} restart={restart} />
      <footer style={s.footer}>PrayogSetu – Making STEM Learning Interactive</footer>
    </main>
  );
}

function Progress({slide,titles}) {
  return <div style={{margin:"18px 0 24px"}}>
    <p>Slide {slide+1} of 6 — {Math.round((slide+1)/6*100)}% completed</p>
    <div style={{height:8,background:"#e2e8f0",borderRadius:20,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${(slide+1)/6*100}%`,background:"#7c3aed"}}/>
    </div>
    <p>{titles[slide]}</p>
  </div>;
}

function Navigation({slide,setSlide,restart}) {
  return <div style={s.navigation}>
    <button style={s.nav} disabled={slide===0} onClick={()=>setSlide(v=>v-1)}>← Previous</button>
    {slide<5
      ? <button style={s.primary} onClick={()=>setSlide(v=>v+1)}>Next Slide →</button>
      : <button style={s.primary} onClick={restart}>Finish</button>}
  </div>;
}

const s = {
  page:{maxWidth:1000,margin:"25px auto",padding:20,fontFamily:"Arial,sans-serif",color:"#1e293b"},
  header:{background:"linear-gradient(120deg,#4c1d95,#7c3aed)",color:"white",padding:30,borderRadius:14,textAlign:"center"},
  card:{background:"white",border:"1px solid #e2e8f0",borderRadius:14,padding:24,minHeight:340,boxShadow:"0 4px 12px rgba(0,0,0,.05)"},
  visual:{textAlign:"center",background:"#f5f3ff",padding:22,borderRadius:12,margin:"18px 0"},
  formula:{fontSize:22,fontWeight:"bold",textAlign:"center",color:"#6d28d9",background:"#f5f3ff",padding:16,borderRadius:10,margin:"12px 0"},
  slider:{display:"block",width:"100%",margin:"12px 0 24px",accentColor:"#7c3aed"},
  result:{background:"#f5f3ff",padding:16,borderRadius:10,lineHeight:1.8,marginTop:18},
  option:selected=>({display:"block",width:"100%",padding:13,margin:"9px 0",textAlign:"left",borderRadius:8,border:selected?"2px solid #7c3aed":"1px solid #cbd5e1",background:selected?"#ede9fe":"white",cursor:"pointer"}),
  primary:{padding:"12px 20px",background:"#7c3aed",color:"white",border:0,borderRadius:8,fontWeight:"bold",cursor:"pointer"},
  nav:{padding:"12px 20px",background:"white",border:"1px solid #cbd5e1",borderRadius:8,cursor:"pointer"},
  navigation:{display:"flex",justifyContent:"space-between",gap:12,marginTop:20},
  footer:{textAlign:"center",color:"#64748b",fontSize:13,marginTop:28,padding:15,borderTop:"1px solid #e2e8f0"}
};
