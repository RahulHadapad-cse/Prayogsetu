
import React, { useState } from "react";

export default function RatioProportion() {
  const [slide,setSlide] = useState(0);
  const [red,setRed] = useState(2);
  const [blue,setBlue] = useState(3);
  const [factor,setFactor] = useState(2);
  const [answer,setAnswer] = useState("");
  const [submitted,setSubmitted] = useState(false);

  const gcd = (a,b) => b === 0 ? a : gcd(b,a%b);
  const d = gcd(red,blue);
  const titles = ["Introduction","Theory","Experiment","Observations","Quiz","Results"];

  const restart = () => {
    setSlide(0); setRed(2); setBlue(3); setFactor(2);
    setAnswer(""); setSubmitted(false);
  };

  return (
    <main style={s.page}>
      <header style={s.header}>
        <small>PRAYOGSETU · MATHEMATICS LAB</small>
        <h1>⚖️ Ratio and Proportion</h1>
        <p>Compare quantities and explore equivalent ratios.</p>
      </header>

      <Progress slide={slide} titles={titles}/>

      {slide===0 && <section style={s.card}>
        <h2>Slide 1: Introduction</h2>
        <p>A ratio compares two quantities. A proportion states that two ratios are equal.</p>
        <div style={s.visual}>
          <div style={{fontSize:40}}>🔴 🔴 : 🔵 🔵 🔵</div>
          <h2>2 : 3</h2>
          <p>Two red objects for every three blue objects.</p>
        </div>
        <h3>Learning Objectives</h3>
        <ul>
          <li>Understand ratios.</li>
          <li>Simplify ratios.</li>
          <li>Identify equivalent ratios.</li>
          <li>Apply proportions in everyday life.</li>
        </ul>
      </section>}

      {slide===1 && <section style={s.card}>
        <h2>Slide 2: Theory</h2>
        <h3>Ratio Formula</h3>
        <div style={s.formula}>a : b = a / b</div>
        <p>A ratio compares the first quantity with the second quantity.</p>
        <h3>Simplifying a Ratio</h3>
        <div style={s.visual}>
          <b>Example: 6 : 9</b>
          <p>GCD = 3</p>
          <p>6 ÷ 3 : 9 ÷ 3 = 2 : 3</p>
        </div>
        <h3>Proportion</h3>
        <div style={s.formula}>a : b = c : d</div>
        <p>Equivalent ratios form a proportion.</p>
      </section>}

      {slide===2 && <section style={s.card}>
        <h2>Slide 3: Interactive Experiment</h2>
        <label>Red objects: {red}</label>
        <input style={s.slider} type="range" min="1" max="12" value={red}
          onChange={e=>setRed(Number(e.target.value))}/>
        <label>Blue objects: {blue}</label>
        <input style={s.slider} type="range" min="1" max="12" value={blue}
          onChange={e=>setBlue(Number(e.target.value))}/>

        <div style={s.visual}>
          <h3>Object Comparison</h3>
          <div style={{fontSize:26,overflowWrap:"anywhere"}}>
            {Array.from({length:red},(_,i)=><span key={i}>🔴 </span>)}
          </div>
          <div style={{fontSize:26,overflowWrap:"anywhere"}}>
            {Array.from({length:blue},(_,i)=><span key={i}>🔵 </span>)}
          </div>
        </div>

        <div style={s.result}>
          <h2>Ratio = {red} : {blue}</h2>
          <h3>Simplified ratio = {red/d} : {blue/d}</h3>
          <label>Multiplication factor: {factor}</label>
          <input style={s.slider} type="range" min="1" max="6" value={factor}
            onChange={e=>setFactor(Number(e.target.value))}/>
          <p>Equivalent ratio = {red*factor} : {blue*factor}</p>
        </div>
      </section>}

      {slide===3 && <section style={s.card}>
        <h2>Slide 4: Graph and Observations</h2>
        <p>Compare the two quantities.</p>
        <b>Red: {red}</b>
        <div style={{height:24,width:`${red/12*100}%`,minWidth:8,background:"#ef4444",borderRadius:5,marginBottom:15}}/>
        <b>Blue: {blue}</b>
        <div style={{height:24,width:`${blue/12*100}%`,minWidth:8,background:"#3b82f6",borderRadius:5}}/>
        <table style={s.table}>
          <tbody>
            <tr><th>Quantity</th><th>Count</th></tr>
            <tr><td>Red</td><td>{red}</td></tr>
            <tr><td>Blue</td><td>{blue}</td></tr>
            <tr><td>Simplified ratio</td><td>{red/d} : {blue/d}</td></tr>
          </tbody>
        </table>
        <ul>
          <li>A ratio compares two quantities.</li>
          <li>Multiplying both terms by the same non-zero number produces an equivalent ratio.</li>
        </ul>
      </section>}

      {slide===4 && <section style={s.card}>
        <h2>Slide 5: Quiz</h2>
        <p>What is the simplest form of the ratio 6 : 9?</p>
        {["1 : 3","2 : 3","3 : 2","6 : 3"].map(v=>(
          <button key={v} style={s.option(answer===v)}
            onClick={()=>{setAnswer(v);setSubmitted(false);}}>{v}</button>
        ))}
        <button style={s.primary} disabled={!answer} onClick={()=>setSubmitted(true)}>Submit Answer</button>
        {submitted && <p style={{color:answer==="2 : 3"?"green":"red",fontWeight:"bold"}}>
          {answer==="2 : 3"?"Correct!":"Incorrect. Divide both terms by 3."}
        </p>}
      </section>}

      {slide===5 && <section style={s.card}>
        <h2>Slide 6: Results and Conclusion</h2>
        <div style={s.result}>
          <p>Selected ratio: {red} : {blue}</p>
          <p>Simplified ratio: {red/d} : {blue/d}</p>
          <p>Equivalent ratio: {red*factor} : {blue*factor}</p>
          <p>Quiz: {submitted?(answer==="2 : 3"?"Correct":"Incorrect"):"Not attempted"}</p>
        </div>
        <h3>Conclusion</h3>
        <p>Ratios compare quantities, while proportions show equality between ratios.</p>
        <h3>Real-Life Applications</h3>
        <ul>
          <li>Mixing ingredients and paint.</li>
          <li>Reading maps and scale drawings.</li>
          <li>Comparing prices and quantities.</li>
          <li>Adjusting recipes.</li>
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
  result:{background:"#f5f3ff",padding:16,borderRadius:10,lineHeight:1.8,marginTop:18},
  table:{width:"100%",borderCollapse:"collapse",margin:"18px 0",textAlign:"left"},
  option:selected=>({display:"block",width:"100%",padding:13,margin:"9px 0",textAlign:"left",borderRadius:8,border:selected?"2px solid #7c3aed":"1px solid #cbd5e1",background:selected?"#ede9fe":"white",cursor:"pointer"}),
  primary:{padding:"12px 20px",background:"#7c3aed",color:"white",border:0,borderRadius:8,fontWeight:"bold",cursor:"pointer"},
  nav:{padding:"12px 20px",background:"white",border:"1px solid #cbd5e1",borderRadius:8,cursor:"pointer"},
  navigation:{display:"flex",justifyContent:"space-between",gap:12,marginTop:20},
  footer:{textAlign:"center",color:"#64748b",fontSize:13,marginTop:28,padding:15,borderTop:"1px solid #e2e8f0"}
};
