
import React, { useState } from "react";

export default function PythagoreanTheorem() {
  const [slide,setSlide] = useState(0);
  const [a,setA] = useState(3);
  const [b,setB] = useState(4);
  const [answer,setAnswer] = useState("");
  const [submitted,setSubmitted] = useState(false);

  const c = Math.sqrt(a*a+b*b);
  const titles = ["Introduction","Theory","Experiment","Observations","Quiz","Results"];

  const restart = () => {
    setSlide(0);setA(3);setB(4);setAnswer("");setSubmitted(false);
  };

  return (
    <main style={s.page}>
      <header style={s.header}>
        <small>PRAYOGSETU · MATHEMATICS LAB</small>
        <h1>📐 Pythagorean Theorem</h1>
        <p>Explore the relationship between the sides of a right triangle.</p>
      </header>

      <Progress slide={slide} titles={titles}/>

      {slide===0 && <section style={s.card}>
        <h2>Slide 1: Introduction</h2>
        <p>The Pythagorean theorem connects the lengths of the three sides of a right-angled triangle.</p>
        <div style={s.visual}>
          <div style={{fontSize:55}}>📐</div>
          <h2>Right-Angled Triangle</h2>
          <p>The longest side, opposite the right angle, is called the hypotenuse.</p>
        </div>
        <h3>Learning Objectives</h3>
        <ul>
          <li>Identify the sides of a right triangle.</li>
          <li>Understand the theorem formula.</li>
          <li>Calculate the hypotenuse.</li>
          <li>Apply the theorem to practical problems.</li>
        </ul>
      </section>}

      {slide===1 && <section style={s.card}>
        <h2>Slide 2: Theory</h2>
        <div style={s.formula}>a² + b² = c²</div>
        <p><b>a and b:</b> the two sides that form the right angle.</p>
        <p><b>c:</b> the hypotenuse, opposite the right angle.</p>
        <div style={s.visual}>
          <h3>Example</h3>
          <p>3² + 4² = c²</p>
          <p>9 + 16 = 25</p>
          <p>c = 5 units</p>
        </div>
        <p>The theorem applies to right-angled triangles.</p>
      </section>}

      {slide===2 && <section style={s.card}>
        <h2>Slide 3: Interactive Experiment</h2>
        <label>Side a: {a} units</label>
        <input style={s.slider} type="range" min="1" max="15" value={a}
          onChange={e=>setA(Number(e.target.value))}/>
        <label>Side b: {b} units</label>
        <input style={s.slider} type="range" min="1" max="15" value={b}
          onChange={e=>setB(Number(e.target.value))}/>

        <div style={s.visual}>
          <svg viewBox="0 0 420 300" style={{width:"100%",maxHeight:300}}>
            <polygon points={`70,250 70,${250-b*12} ${70+a*12},250`}
              fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
            <path d={`M70 ${250-b*12+18} v-18 h18`}
              fill="none" stroke="#1e293b" strokeWidth="2"/>
            <text x="72" y="270" fill="#1e293b">a = {a}</text>
            <text x="10" y={250-b*6} fill="#1e293b">b = {b}</text>
            <text x={80+a*6} y={240-b*6} fill="#7c3aed">c = {c.toFixed(2)}</text>
          </svg>
        </div>

        <div style={s.result}>
          <p>a² = {a*a}</p>
          <p>b² = {b*b}</p>
          <p>c² = {a*a+b*b}</p>
          <h2>Hypotenuse = {c.toFixed(2)} units</h2>
        </div>
      </section>}

      {slide===3 && <section style={s.card}>
        <h2>Slide 4: Graph and Observations</h2>
        <p>Compare the squares of the three sides.</p>
        <div style={{display:"flex",alignItems:"end",gap:12,height:190,background:"#f8fafc",padding:15,borderRadius:10}}>
          {[
            {n:"a²",v:a*a,c:"#60a5fa"},
            {n:"b²",v:b*b,c:"#34d399"},
            {n:"c²",v:c*c,c:"#8b5cf6"}
          ].map(o=>(
            <div key={o.n} style={{flex:1,textAlign:"center"}}>
              <div style={{height:`${o.v/450*100}%`,minHeight:4,background:o.c,borderRadius:"6px 6px 0 0"}}/>
              <b>{o.n}</b>
              <small style={{display:"block"}}>{o.v.toFixed(1)}</small>
            </div>
          ))}
        </div>
        <div style={s.result}>
          <p>a² + b² = {a*a+b*b}</p>
          <p>c² = {(c*c).toFixed(2)}</p>
          <p>Both values are equal.</p>
        </div>
        <p>Observation: The square of the hypotenuse equals the sum of the squares of the other two sides.</p>
      </section>}

      {slide===4 && <section style={s.card}>
        <h2>Slide 5: Quiz</h2>
        <p>If the two shorter sides are 3 units and 4 units, what is the hypotenuse?</p>
        {["4 units","5 units","6 units","7 units"].map(v=>(
          <button key={v} style={s.option(answer===v)}
            onClick={()=>{setAnswer(v);setSubmitted(false);}}>{v}</button>
        ))}
        <button style={s.primary} disabled={!answer} onClick={()=>setSubmitted(true)}>Submit Answer</button>
        {submitted && <p style={{color:answer==="5 units"?"green":"red"}}>
          {answer==="5 units"?"Correct!":"Incorrect. The correct answer is 5 units."}
        </p>}
      </section>}

      {slide===5 && <section style={s.card}>
        <h2>Slide 6: Results and Conclusion</h2>
        <div style={s.result}>
          <p>Side a: {a}</p>
          <p>Side b: {b}</p>
          <p>Hypotenuse: {c.toFixed(2)}</p>
          <p>Quiz: {submitted?(answer==="5 units"?"Correct":"Incorrect"):"Not attempted"}</p>
        </div>
        <h3>Conclusion</h3>
        <p>For a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.</p>
        <h3>Real-Life Applications</h3>
        <ul>
          <li>Finding ladder length against a wall.</li>
          <li>Calculating diagonal distances.</li>
          <li>Construction and surveying.</li>
          <li>Navigation and map measurements.</li>
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
  formula:{fontSize:24,fontWeight:"bold",textAlign:"center",color:"#6d28d9",background:"#f5f3ff",padding:16,borderRadius:10},
  slider:{display:"block",width:"100%",margin:"12px 0 24px",accentColor:"#7c3aed"},
  result:{background:"#f5f3ff",padding:16,borderRadius:10,lineHeight:1.8},
  option:selected=>({display:"block",width:"100%",padding:13,margin:"9px 0",textAlign:"left",borderRadius:8,border:selected?"2px solid #7c3aed":"1px solid #cbd5e1",background:selected?"#ede9fe":"white",cursor:"pointer"}),
  primary:{padding:"12px 20px",background:"#7c3aed",color:"white",border:0,borderRadius:8,fontWeight:"bold",cursor:"pointer"},
  nav:{padding:"12px 20px",background:"white",border:"1px solid #cbd5e1",borderRadius:8,cursor:"pointer"},
  navigation:{display:"flex",justifyContent:"space-between",gap:12,marginTop:20},
  footer:{textAlign:"center",color:"#64748b",fontSize:13,marginTop:28,padding:15,borderTop:"1px solid #e2e8f0"}
};
