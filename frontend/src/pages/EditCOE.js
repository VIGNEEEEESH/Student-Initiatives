import React, {  useEffect, useState } from 'react'
import axios from 'axios';
import url from '../Baseurl'
import "../Css files/EditClub.css"
import { notification } from 'antd';

function EditCOE(props) {
  
  const [ss,setSs]=useState("True")
  const [coeName, setCOEName] = useState("")
  const [coeMission, setCOEMission] = useState("")
  const [coeVision, setCOEVision] = useState("")
  const [coeMentor, setCOEMentor] = useState("")
  const [coeCoFounder, setCOECoFounder] = useState("")
  const [coeCoFounderEmail, setCOECoFounderEmail] = useState("")
  const [cloePassword, setCOEPassword] = useState("")
  
  const [coeLogo, setCOELogo] = useState("")
  const [file, setFile] = useState();

  useEffect(() => {
    console.log(props)
    setCOEName(props.coeinfo.name)
    setCOEMentor(props.coeinfo.mentors)
    setCOECoFounder(props.coeinfo.coFounderName)
    setCOEMission(props.coeinfo.mission)
    setCOEVision(props.coeinfo.vision)
  }, [])
  

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
  const handleCOELogoChange = (event) => {
    setCOELogo({value: event.target.value})
    const value=event.taget.value
    console.log(value)
  }
  

  const onsubmit = async (event) =>{
      event.preventDefault();
      const formValues = {
        "name": coeName.value ?? coeName,
        "mission": coeMission.value ?? coeMission,
        "vision":coeVision.value ?? coeVision,
        "mentors":coeMentor.value ?? coeMentor,
        "coFounderName":coeCoFounder.value ?? coeCoFounder,
      }


      console.log(formValues)
      const response=await fetch(url+`api/coe/${props.coeinfo.id}`,{
        method:"PATCH",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({...formValues})
      })
      console.log(await response.json())
        

      notification.success({
        message: `Club ${formValues.clubName} successfully edited`,
        description: `Reload to see changes`,
        placement:'topRight'
      })

        const formData = new FormData();
        formData.append("image", file);
        if(!!file){
        try {
          const res = await axios.put(url+ 
            `api/club/${props.clubinfo.clubId}/image/logo`,
            formData
          );          
         } catch (ex) {
          console.log(ex);
        }
 
      }
      
  }

  
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
      <div className="EditClub" >
        <center>
      <div className="rectangle">
      <form onSubmit={onsubmit}>
          <br/>
            <label>Name of the COE: &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="text" defaultValue={props.coeinfo.name} onChange={handleCOENameChange} /><br/><br/>

            <label>Mission of the COE: &nbsp;</label>
            <textarea defaultValue={props.coeinfo.mission} onChange={handleCOEMissionChange} /><br/><br/>

            <label>Vision of the COE: &nbsp;&nbsp;</label>
            <textarea defaultValue={props.coeinfo.vision} onChange={handleCOEVisionChange} /><br/><br/>

            <label>Mentor name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input defaultValue={props.coeinfo.mentors} type="text" onChange={handleCOEMentorChange} placeholder='Mentor' /><br/><br/>

            <label>Co-Founder name : &nbsp;&nbsp;&nbsp;</label>
            <input defaultValue={props.coeinfo.coFounderName} type="text" onChange={handleCOECoFounderChange} placeholder='Co-Founder' /><br/><br/>

            <label>Email-ID of the : &nbsp;&nbsp;&nbsp;</label>
            <input  type="text" onChange={handleCOECoFounderEmailChange} placeholder='Co-Founder' /><br/><br/>
            <label>Create a password : &nbsp;</label>
            <input  type="password" onChange={handleCOEPasswordChange} /><br/><br/>

            
          <label style={{display:"inline"}}> Upload COE's Logo:</label> <input style={{display:"inline"}}type="file" onChange={uploadFile}  accept="image/png, image/jpeg,.jpg"/>
          <input type="submit" />
            
        </form></div>
       </center>
      </div>
    )
  }

export default EditCOE