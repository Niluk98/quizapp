import React from 'react'
import './style.css'
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";


const Child = ({sub}) => {
  const [data,setData]=useState([]);
  const [index,setIndex]=useState(0);
  const [points,setPoints]=useState(0);
    const fetchData = () => {
        axios
          .get(
            `https://quizapi.io/api/v1/questions?apiKey=xcUWH3vsaD2KVRcGbr1dwCsF28G9a2gplaYfFm7V&category=${sub}&limit=5`
          )
          .then((res) => {
            console.log(res.data)
            setData(res.data);
          })
          .catch((err)=>{
            console.log(err);
          })
          
      };
      useEffect(() => {
        fetchData();
        setIndex(0);
      }, [sub]);

      const handleNext=()=>{
        
        let options =document.getElementsByName('optradio');
        let ans='';
        options.forEach((item)=>{
          if(item.checked){
            ans=item.value;
          }
        })
        if(ans===''){
          document.getElementById('error').innerText='Please Select an Option!!!!';
          return;
        }else{
          document.getElementById('error').innerText='';

        }
        console.log(data[index]?.correct_answer===ans);
        if(data[index]?.correct_answer===ans){
           setPoints((points)=>points+1);

        }
        // console.log(points);
        setIndex((index)=>index+1);

      }
  return (
    <>
    {index<5?<div className='container'>
      <div className="text">
      <h3>{data[index]?.question}</h3>
      <div className="radio-buttons">
      <div class="radio">
  <label><input type="radio" name="optradio" value={"answer_a"}/>{data[index]?.answers.answer_a}</label>
</div>
<div class="radio">
  <label><input type="radio" name="optradio"value={"answer_b"}/>{data[index]?.answers.answer_b}</label>
</div>
<div class="radio">
  {data[index]?.answers.answer_c?<label><input type="radio" name="optradio" value={"answer_c"}/>{data[index]?.answers.answer_c}</label>:null}
</div>
<div class="radio">
{data[index]?.answers.answer_d?<label><input type="radio" name="optradio" value={"answer_d"}/>{data[index]?.answers.answer_d}</label>:null}
</div>
      </div>
     

      </div>

      <div id='error'>
        
      </div>
<div className="button">
{index<4?<button type="button" className="btn btn-primary btn-xl" onClick={handleNext}>Next</button>:<button type="button" className="btn btn-primary" onClick={()=>{setIndex((index)=>index+1)}}>Finish</button>}
</div>
      
      
    </div>:
    <div className="results">
<div className="circleRating" style={{width:'60%'}} >
            <CircularProgressbar
                value={points}
                maxValue={5} 
                text={points}
                styles={buildStyles({
                    pathColor:
                        points < 2 ? "red" : points <=3 ? "orange" : "green",
                })}
            />
        </div>
        <br /> <br />
        
        {points < 2 ?<h2 style={{color:'red'}}>Poor!!</h2>  : points <=3 ? <h2 style={{color:'orange'}}>Good!!</h2>: <h2 style={{color:'green'}}>Awesome!!</h2>}

        
    </div>
    
}
    
    </>
    
  )
}

export default Child
