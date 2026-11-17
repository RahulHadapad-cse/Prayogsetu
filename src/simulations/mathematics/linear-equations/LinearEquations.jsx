
import React, { useState } from "react";

export default function LinearEquations() {
  const [slide,setSlide] = useState(0);
  const [m,setM] = useState(2);
  const [b,setB] = useState(1);
  const [x,setX] = useState(2);
  const [answer,setAnswer] = useState("");
  const [submitted,setSubmitted] = useState(false);

  const y = m*x+b;
  const titles = ["Introduction","Theory","Experiment","Observations","Quiz","Results"];

  const restart = () => {
    setSlide(0);setM(2);setB(1);setX(2);
    setAnswer("");setSubmitted(false);
  };

  const points = Array.from({length:11},(_,i)=>{
    const xv=i-5;
    return `${210+xv*30},${150-(m*xv+b)*12}`;
  }).join(" ");

  return (
    <main style={s.page}>
      <header style={s.header}>
        <small>PRAYOGSETU · MATHEMATICS LAB</small>
        <h1>📈 Linear Equations and Graphs</h1>
        <p>Explore straight-line equations by changing slope and intercept.</p>
      </header>

      <Progress slide={slide} titles={titles}/>

      {slide===0 && <section style={s.card}>
        <h2>Slide 1: Introduction</h2>
        <p>A linear equation can be represented by a straight line on a coordinate graph.</p>
        <div style={s.visual}>
          <div style={{fontSize:50}}>📈</div>
          <h2>y = mx + b</h2>
          <p>Changing m and b changes the position and direction of the line.</p>
        </div>
        <h3>Learning Objectives</h3>
        <ul>
          <li>Identify slope and y-intercept.</li>
          <li>Calculate y for a given x.</li>
          <li>Plot points on a coordinate plane.</li>
          <li>Understand linear graphs.</li>
        </ul>
      </section>}

      {slide===1 && <section style={s.card}>
        <h2>Slide 2: Theory</h2>
        <div style={s.formula}>y = mx + b</div>
        <p><b>m (slope):</b> tells how steep the line is and whether it rises or falls.</p>
        <p><b>b (y-intercept):</b> tells where the line crosses the y-axis.</p>
        <div style={s.visual}>
          <b>Example: y = 2x + 1</b>
          <p>If x = 2, then y = 2(2) + 1 = 5.</p>
          <p>The point is (2, 5).</p>
        </div>
        <p>A linear equation produces a straight-line graph.</p>
      </section>}

      {slide===2 && <section style={s.card}>
        <h2>Slide 3: Interactive Experiment</h2>
        <label>Slope (m): {m}</label>
        <input style={s.slider} type="range" min="-5" max="5" value={m}
          onChange={e=>setM(Number(e.target.value))}/>
        <label>Y-intercept (b): {b}</label>
        <input style={s.slider} type="range" min="-5" max="5" value={b}
          onChange={e=>setB(Number(e.target.value))}/>
        <label>Choose x: {x}</label>
        <input style={s.slider} type="range" min="-5" max="5" value={x}
          onChange={e=>setX(Number(e.target.value))}/>
        <div style={s.visual}>
          <h2>y = {m}x + ({b})</h2>
          <h3>When x = {x}, y = {y}</h3>
        </div>
      </section>}

      {slide===3 && <section style={s.card}>
        <h2>Slide 4: Graph and Observations</h2>
        <svg viewBox="0 0 420 300" style={{width:"100%",maxHeight:330,background:"#f8fafc",borderRadius:10}}>
          {Array.from({length:11},(_,i)=>(
            <g key={i}>
              <line x1={60+i*30} y1="0" x2={60+i*30} y2="300" stroke="#e2e8f0"/>
              <line x1="60" y1={i*30} x2="360" y2={i*30} stroke="#e2e8f0"/>
            </g>
          ))}
          <line x1="60" y1="150" x2="360" y2="150" stroke="#334155" strokeWidth="2"/>
          <line x1="210" y1="0" x2="210" y2="300" stroke="#334155" strokeWidth="2"/>
          <polyline points={points} fill="none" stroke="#7c3aed" strokeWidth="3"/>
          <circle cx={210+x*30} cy={150-y*12} r="6" fill="#ef4444"/>
          <text x="370" y="155" fill="#334155">X</text>
          <text x="215" y="15" fill="#334155">Y</text>
        </svg>
        <p>Selected point: ({x}, {y}). Equation: y = {m}x + {b}.</p>
        <ul>
          <li>Positive slope: line rises from left to right.</li>
          <li>Negative slope: line falls from left to right.</li>
          <li>Zero slope: horizontal line.</li>
          <li>The intercept shifts the line vertically.</li>
        </ul>
      </section>}

      {slide===4 && <section style={s.card}>
        <h2>Slide 5: Quiz</h2>
        <p>In y = 3x + 2, what is the slope?</p>
        {["2","3","5","-3"].map(v=>(
          <button key={v} style={s.option(answer===v)}
            onClick={()=>{setAnswer(v);setSubmitted(false);}}>{v}</button>
        ))}
        <button style={s.primary} disabled={!answer} onClick={()=>setSubmitted(true)}>Submit Answer</button>
        {submitted && <p style={{color:answer==="3"?"green":"red"}}>
          {answer==="3"?"Correct!":"Incorrect. The slope is 3."}
        </p>}
      </section>}

      {slide===5 && <section style={s.card}>
        <h2>Slide 6: Results and Conclusion</h2>
        <div style={s.result}>
          <p>Equation: y = {m}x + {b}</p>
          <p>Selected x: {x}</p>
          <p>Calculated y: {y}</p>
          <p>Quiz: {submitted?(answer==="3"?"Correct":"Incorrect"):"Not attempted"}</p>
        </div>
        <h3>Conclusion</h3>
        <p>A linear equation represents a straight line. Slope controls its steepness and direction, while the y-intercept tells where it crosses the vertical axis.</p>
        <h3>Real-Life Applications</h3>
        <ul>
          <li>Calculating fixed charges and usage costs.</li>
          <li>Distance travelled at constant speed.</li>
          <li>Budgeting and simple forecasting.</li>
        </ul>
        <button style={s.primary} onClick={restart}>Restart Experiment</button>
      </section>}

      <Navigation slide={slide} setSlide={setSlide} restart={restart}/>
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
    {slide<5?<button style={s.primary} onClick={()=>setSlide(v=>v+1)}>Next Slide →</button>:<button style={s.primary} onClick={restart}>Finish</button>}
  </div>;
}

const s = {
  page:{maxWidth:1000,margin:"25px auto",padding:20,fontFamily:"Arial,sans-serif",color:"#1e293b"},
  header:{background:"linear-gradient(120deg,#4c1d95,#7c3aed)",color:"white",padding:30,borderRadius:14,textAlign:"center"},
  card:{background:"white",border:"1px solid #e2e8f0",borderRadius:14,padding:24,minHeight:340,boxShadow:"0 4px 12px rgba(0,0,0,.05)"},
  visual:{textAlign:"center",background:"#f5f3ff",padding:22,borderRadius:12,margin:"18px 0"},
  formula:{fontSize:22,fontWeight:"bold",textAlign:"center",color:"#6d28d9",background:"#f5f3ff",padding:16,borderRadius:10},
  slider:{display:"block",width:"100%",margin:"12px 0 24px",accentColor:"#7c3aed"},
  result:{background:"#f5f3ff",padding:16,borderRadius:10,lineHeight:1.8},
  option:selected=>({display:"block",width:"100%",padding:13,margin:"9px 0",textAlign:"left",borderRadius:8,border:selected?"2px solid #7c3aed":"1px solid #cbd5e1",background:selected?"#ede9fe":"white",cursor:"pointer"}),
  primary:{padding:"12px 20px",background:"#7c3aed",color:"white",border:0,borderRadius:8,fontWeight:"bold",cursor:"pointer"},
  nav:{padding:"12px 20px",background:"white",border:"1px solid #cbd5e1",borderRadius:8,cursor:"pointer"},
  navigation:{display:"flex",justifyContent:"space-between",gap:12,marginTop:20},
  footer:{textAlign:"center",color:"#64748b",fontSize:13,marginTop:28,padding:15,borderTop:"1px solid #e2e8f0"}
};
