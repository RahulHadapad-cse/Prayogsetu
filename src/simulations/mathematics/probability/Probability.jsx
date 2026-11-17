
import React, { useState } from "react";

export default function Probability() {
  const [slide,setSlide] = useState(0);
  const [rolls,setRolls] = useState([]);
  const [target,setTarget] = useState(6);
  const [answer,setAnswer] = useState("");
  const [submitted,setSubmitted] = useState(false);

  const titles = ["Introduction","Theory","Experiment","Observations","Quiz","Results"];
  const count = rolls.filter(n=>n===target).length;
  const experimental = rolls.length ? count/rolls.length : 0;

  const restart = () => {
    setSlide(0);setRolls([]);setTarget(6);
    setAnswer("");setSubmitted(false);
  };

  const roll = () => {
    setRolls(old=>[...old,Math.floor(Math.random()*6)+1]);
  };

  return (
    <main style={s.page}>
      <header style={s.header}>
        <small>PRAYOGSETU · MATHEMATICS LAB</small>
        <h1>🎲 Probability</h1>
        <p>Investigate chance using a virtual dice experiment.</p>
      </header>

      <Progress slide={slide} titles={titles}/>

      {slide===0 && <section style={s.card}>
        <h2>Slide 1: Introduction</h2>
        <p>Probability measures how likely an event is to happen. It ranges from 0 (impossible) to 1 (certain).</p>
        <div style={s.visual}>
          <div style={{fontSize:65}}>🎲</div>
          <h2>Rolling a Fair Die</h2>
          <p>Each face has an equal chance of appearing on a fair six-sided die.</p>
        </div>
        <h3>Learning Objectives</h3>
        <ul>
          <li>Understand probability.</li>
          <li>Identify possible outcomes.</li>
          <li>Compare theoretical and experimental probability.</li>
          <li>Collect results from repeated trials.</li>
        </ul>
      </section>}

      {slide===1 && <section style={s.card}>
        <h2>Slide 2: Theory</h2>
        <div style={s.formula}>P(Event) = Favorable outcomes ÷ Total outcomes</div>
        <p>For a fair six-sided die, the probability of rolling a 6 is 1/6.</p>
        <div style={s.visual}>
          <h3>Possible Outcomes</h3>
          <p style={{fontSize:28}}>1 · 2 · 3 · 4 · 5 · 6</p>
          <p>One favorable outcome out of six equally likely outcomes.</p>
        </div>
        <p>Theoretical probability is calculated from possible outcomes. Experimental probability is calculated from actual trials.</p>
      </section>}

      {slide===2 && <section style={s.card}>
        <h2>Slide 3: Interactive Experiment</h2>
        <p>Choose a number and roll the die repeatedly.</p>
        <label>Track outcome: </label>
        <select value={target} onChange={e=>setTarget(Number(e.target.value))} style={s.select}>
          {[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}</option>)}
        </select>
        <div style={s.visual}>
          <div style={{fontSize:70}}>
            {rolls.length ? ["⚀","⚁","⚂","⚃","⚄","⚅"][rolls[rolls.length-1]-1] : "🎲"}
          </div>
          <h2>{rolls.length ? `Last roll: ${rolls[rolls.length-1]}` : "Ready to roll?"}</h2>
          <button style={s.primary} onClick={roll}>Roll Dice</button>
          <button style={s.secondary} onClick={()=>setRolls([])}>Clear Trials</button>
        </div>
        <div style={s.result}>
          <p>Total trials: {rolls.length}</p>
          <p>Number {target} appeared: {count}</p>
          <p>Experimental probability: {experimental.toFixed(3)}</p>
          <p>Theoretical probability: 0.167 (1/6)</p>
        </div>
      </section>}

      {slide===3 && <section style={s.card}>
        <h2>Slide 4: Graph and Observations</h2>
        <p>Frequency of each dice outcome:</p>
        <div style={{display:"flex",alignItems:"end",gap:9,height:190,background:"#f8fafc",padding:14,borderRadius:10}}>
          {[1,2,3,4,5,6].map(n=>{
            const f=rolls.filter(v=>v===n).length;
            return <div key={n} style={{flex:1,textAlign:"center"}}>
              <div style={{height:`${rolls.length?f/rolls.length*100:0}%`,minHeight:f?5:2,background:n===target?"#7c3aed":"#93c5fd",borderRadius:"5px 5px 0 0"}}/>
              <b>{n}</b>
              <small style={{display:"block"}}>{f}</small>
            </div>;
          })}
        </div>
        <table style={s.table}>
          <tbody>
            <tr><th>Outcome</th><th>Frequency</th></tr>
            {[1,2,3,4,5,6].map(n=>(
              <tr key={n}><td>{n}</td><td>{rolls.filter(v=>v===n).length}</td></tr>
            ))}
          </tbody>
        </table>
        <p>With more trials, experimental results often move closer to theoretical probability, although they may not match exactly.</p>
      </section>}

      {slide===4 && <section style={s.card}>
        <h2>Slide 5: Quiz</h2>
        <p>What is the theoretical probability of rolling a 6 on a fair six-sided die?</p>
        {["1/2","1/3","1/6","6/6"].map(v=>(
          <button key={v} style={s.option(answer===v)}
            onClick={()=>{setAnswer(v);setSubmitted(false);}}>{v}</button>
        ))}
        <button style={s.primary} disabled={!answer} onClick={()=>setSubmitted(true)}>Submit Answer</button>
        {submitted && <p style={{color:answer==="1/6"?"green":"red"}}>
          {answer==="1/6"?"Correct!":"Incorrect. The correct answer is 1/6."}
        </p>}
      </section>}

      {slide===5 && <section style={s.card}>
        <h2>Slide 6: Results and Conclusion</h2>
        <div style={s.result}>
          <p>Total trials: {rolls.length}</p>
          <p>Outcome {target} frequency: {count}</p>
          <p>Experimental probability: {experimental.toFixed(3)}</p>
          <p>Theoretical probability: 0.167</p>
          <p>Quiz: {submitted?(answer==="1/6"?"Correct":"Incorrect"):"Not attempted"}</p>
        </div>
        <h3>Conclusion</h3>
        <p>Probability describes the chance of an event. Repeated trials provide experimental evidence, while theoretical probability is based on possible equally likely outcomes.</p>
        <h3>Real-Life Applications</h3>
        <ul>
          <li>Weather forecasting.</li>
          <li>Games and chance-based activities.</li>
          <li>Quality testing and risk estimates.</li>
          <li>Decision-making under uncertainty.</li>
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
  formula:{fontSize:20,fontWeight:"bold",textAlign:"center",color:"#6d28d9",background:"#f5f3ff",padding:16,borderRadius:10},
  result:{background:"#f5f3ff",padding:16,borderRadius:10,lineHeight:1.8},
  table:{width:"100%",borderCollapse:"collapse",margin:"18px 0",textAlign:"left"},
  select:{padding:8,margin:10,borderRadius:6},
  secondary:{padding:"11px 16px",background:"#64748b",color:"white",border:0,borderRadius:8,cursor:"pointer",marginLeft:8},
  option:selected=>({display:"block",width:"100%",padding:13,margin:"9px 0",textAlign:"left",borderRadius:8,border:selected?"2px solid #7c3aed":"1px solid #cbd5e1",background:selected?"#ede9fe":"white",cursor:"pointer"}),
  primary:{padding:"12px 20px",background:"#7c3aed",color:"white",border:0,borderRadius:8,fontWeight:"bold",cursor:"pointer"},
  nav:{padding:"12px 20px",background:"white",border:"1px solid #cbd5e1",borderRadius:8,cursor:"pointer"},
  navigation:{display:"flex",justifyContent:"space-between",gap:12,marginTop:20},
  footer:{textAlign:"center",color:"#64748b",fontSize:13,marginTop:28,padding:15,borderTop:"1px solid #e2e8f0"}
};
