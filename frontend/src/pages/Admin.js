
import React from 'react'
import {  useNavigate } from 'react-router-dom'
import COE from "../components/images/COEorg3.png"
import Clubs from "../components/images/Student_clubs.png"
import School from "../components/images/newSchool.png"
import "../Css files/Admin.css"

export default function Admin() {
  const navigate=useNavigate();
  function NewPage(){
    navigate("/AddClub")
  }
  function NewCOE(){
    navigate("/AddCOE")
  }
  function NewSchool(){
    navigate("/AddSchool")
  }
  function AddAdmin(){
    navigate("/AddAdmin")
  }
  
  function DeleteClub(){
    navigate("/DeleteClub")
  }
  function DeleteCOE(){
    navigate("/DeleteCOE")
  }
  function DeleteSchool(){
    navigate("/DeleteSchool")
  }
  function DeleteAdmin(){
    navigate("/DeleteAdmin")
  }
  return (
    
    <div className="Admin" >
      <center>
    

   
  
  <div className="row row-cols-1 row-cols-md-3 g-1">
  <div className="col">
    <div className="card">
      <img src={Clubs} className="card-img-top"  alt="..."/>
      <div className="card-body">
       <div className="One" style={{display:"inline"}}>
      <button type="button" onClick={NewPage} className="btn btn-dark">Add</button>
    </div><div className="One" style={{display:"inline"}}>
    <button type="button" onClick={DeleteClub} className="btn btn-dark">Delete</button>
    </div></div>
    </div>
  </div>

  
  <div className="col">
    <div className="card">
      <img src={COE} className="card-img-top" alt="..."/>
      <div className="card-body">
      <div className="One" style={{display:"inline"}}>
      <button type="button" onClick={NewCOE} className="btn btn-dark">Add</button>
    </div><div className="One" style={{display:"inline"}}>
    <button type="button" onClick={DeleteCOE} className="btn btn-dark">Delete</button>
    </div> </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src={School} className="card-img-top" alt="..."/>
      <div className="card-body">
      <div className="One" style={{display:"inline"}}>
      <button type="button" onClick={NewSchool} className="btn btn-dark">Add</button>
    </div><div className="One" style={{display:"inline"}}>
    <button type="button" onClick={DeleteSchool} className="btn btn-dark">Delete</button>
    </div> </div>
    </div>
  </div>
  
</div>
</center>


        </div>
        
  )
}
