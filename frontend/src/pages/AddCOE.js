import React, { Component, useState } from 'react'
import "../Css files/AddCOE.css"
import url from '../Baseurl'
import axios from 'axios';
import { notification } from 'antd';
function AddCOE() {
  const [COEName, setCOEName] = useState("")
  const [COEMission, setCOEMission] = useState("")
  const [COEVision, setCOEVision] = useState("")
  const [COEMentor, setCOEMentor] = useState("")
  const [COECoFounder, setCOECoFounder] = useState("")
  const [COECoFounderEmail, setCOECoFounderEmail] = useState("")
  const [COEPassword, setCOEPassword] = useState("")
  const [file, setFile] = useState();

  const handleCOENameChange = (event) => {
    setCOEName({value: event.target.value})
  }
  const handleCOEMissionChange = (event) => {
    setCOEMission({value: event.target.value})
  }
  const handleCOEVisionChange = (event) => {
    setCOEVision({value: event.target.value})
  }
  const handleCOEMentorChange = (event) => {
    setCOEMentor({value: event.target.value})
  }
  const handleCOECoFounderChange = (event) => {
    setCOECoFounder({value: event.target.value})
  }
  const handleCOECoFounderEmailChange = (event) => {
    setCOECoFounderEmail({value: event.target.value})
  }
  const handleCOEPasswordChange = (event) => {
    setCOEPassword({value: event.target.value})
  }

  const onsubmit = async (event) =>{
    event.preventDefault();
    
    const formValues = {
      "name": COEName.value,
      "mission": COEMission.value,
      "vision":COEVision.value,
      "mentors":COEMentor.value,
      "coFounderName":COECoFounder.value,
      "email":COECoFounderEmail.value,
      "password":COEPassword.value,
      
    }
    console.log(formValues)
    
    const response=await fetch(url+"api/user/",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({...formValues})
    })
    console.log(await response.json())
      if(response.ok){
        const coeresponse = await fetch(url +`api/coe/${formValues.email}`, {
          method: "POST",
          body: JSON.stringify({...formValues}),
          headers: {
            "Content-Type" : "application/json"
          }
        })
    const coeResponseJson = await coeresponse.json()
        const coeId = await coeResponseJson.id;
    const formData = new FormData();
        formData.append("image", file);
        try {
          const res = await axios.put(url+ 
            `api/coe/${coeId}/image/logo`,
            formData
          );
          console.log(res);
          
          notification.success({
            message: `COE ${formValues.name} successfully created`,
            description: `COE email = ${formValues.email}\nPassword = ${formValues.password}\n
            ID = ${coeId}. Please save the credentials as they can't be seen again`,
            placement:'topRight'
          })

        } catch (ex) {
          console.log(ex);
        }
  }}
  const uploadFile = (e) => {
    setFile(e.target.files[0]);
    const target = e.target
  	if (target.files && target.files[0]) {

      /*Maximum allowed size in bytes
        5MB Example
        Change first operand(multiplier) for your needs*/
      const maxAllowedSize = 10 * 1024 * 1024;
      if (target.files[0].size > maxAllowedSize) {
      	
       	target.value = ''
         notification.error({
          message: `The file size is be less than 10MB`,
          
          placement:'top'
        })
      }
  }
  
  };
  
    return (
      <div className="Addco" >
        <center>
      <div className="rectangle">
        <form onSubmit={onsubmit}>
          <br/>
            <label>Name of the COE : &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="text" onChange={handleCOENameChange} required/><br/><br/>

            <label>Mission of the COE : &nbsp;</label>
            <textarea  onChange={handleCOEMissionChange} required/><br/><br/>

            <label>Vision of the COE : &nbsp;&nbsp;</label>
            <textarea onChange={handleCOEVisionChange} required/><br/><br/>

            <label>Mentor name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="text" onChange={handleCOEMentorChange} placeholder='Mentor' required/><br/><br/>

            <label>Co-Founder name : &nbsp;&nbsp;&nbsp;</label>
            <input type="text" onChange={handleCOECoFounderChange} placeholder='Co-Founder' required/><br/><br/>

            <label>Co-Founder Email : &nbsp;&nbsp;&nbsp;</label>
            <input type="text" onChange={handleCOECoFounderEmailChange} placeholder='Co-Founder' required/><br/><br/>
            <label>Create a password : &nbsp;</label>
            <input type="password" onChange={handleCOEPasswordChange} required/><br/><br/>

            
          <label style={{display:"inline"}}> Upload COE's Logo:</label> <input style={{display:"inline"}}type="file" onChange={uploadFile} required accept="image/png, image/jpeg,.jpg"/>
          <input type="submit" />
            
        </form>
       </div>
       </center>
      </div>
    )
  }

export default AddCOE
