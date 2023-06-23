import React from "react";
import "./style.css";

import { useState } from "react";
import Child from "../child/Child";

const MainPage = () => {
  const [subject,setSubject]=useState('linux');
  console.log(subject)
  const handleClick=(page)=>{
    if(page==='linux'){
       setSubject('linux');
       document.getElementById('linux').classList.add('active');
       document.getElementById('sql').classList.remove('active');
       document.getElementById('devops').classList.remove('active');
    }else if(page==='devops'){
      setSubject('devops');
      document.getElementById('linux').classList.remove('active');
       document.getElementById('sql').classList.remove('active');
       document.getElementById('devops').classList.add('active');
    }else{
      setSubject('sql');
      document.getElementById('linux').classList.remove('active');
       document.getElementById('sql').classList.add('active');
       document.getElementById('devops').classList.remove('active');
    }
   
  }
  return (
    <div className="container-fluid">
      <span style={{color:'#252d4a'}}>QUIZ APP</span>
      
      <div className="quiz-area">
      <div className="btn-group">
  <button type="button" className="btn btn-primary active" id="linux" onClick={()=>{handleClick('linux')}}>Linux</button>
  <button type="button" className="btn btn-primary" id="devops" onClick={()=>{handleClick('devops')}}>DevOps</button>
  <button type="button" className="btn btn-primary" id='sql' onClick={()=>{handleClick('sql')}}>SQL</button>
</div>

        
        <div className="quiz-options">
          <Child sub={subject}/>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
