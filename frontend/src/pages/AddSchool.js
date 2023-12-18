import React, { useState } from 'react';
import "../Css files/AddSchool.css";
import un from "../components/images/user.png"
import pw from "../components/images/pw.png"
import bg from "../components/images/light rays.png"
import url from '../Baseurl'
import { notification } from 'antd';

import loginImg from '../components/images/robot.png'


function AddSchool() {
  const [schoolName, setSchoolName] = useState("")

  const handleSchoolNameChange = (event) => {
    setSchoolName({value: event.target.value})
  }
  const onsubmit = async (event) =>{
    event.preventDefault();
    
    const formValues = {
      "schoolName": schoolName.value,
      
      
    }
    console.log(formValues)
    
    
    
      
        const Schoolresponse = await fetch(url +"api/school/", {
          method: "POST",
          body: JSON.stringify({...formValues}),
          headers: {
            "Content-Type" : "application/json"
          }
        })
    const SchoolResponseJson = await Schoolresponse.json()
        if(SchoolResponseJson.success=="true"){
          notification.success({
            message: `School ${formValues.name} successfully created`,
            placement:'topRight'
          })
        }else{
          notification.error({
            message: `School ${formValues.name} is not created`,
            placement:'top'
          })

        }

        
  }

    return (
      <div className="Addsc " style={{overflow:"auto"}}>
        
      <center>
      <div className="form" onSubmit={onsubmit}>
          <div className="loginImage">
            <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/><br/><br/><br/>
            <form>
            <h1>Name of the School</h1>  <input onChange={handleSchoolNameChange} className="o" type="text" placeholder="Woxsen" required/><br/><br/>
           
            
            <input type="submit"/>
            </form>
          </div>
        </div>
          </center>
          
         
       
      </div>
    );
    
  }




export default AddSchool;
