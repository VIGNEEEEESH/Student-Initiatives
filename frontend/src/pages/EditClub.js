import React, {  useEffect, useState } from 'react'
import axios from 'axios';
import url from '../Baseurl'
import "../Css files/EditClub.css"
import { Button, notification } from 'antd';

function EditClub(props) {
  
  const [ss,setSs]=useState("True")
  const [clubName, setClubName] = useState("")
  const [clubMission, setClubMission] = useState("")
  const [clubVision, setClubVision] = useState("")
  const [clubPresident, setClubPresident] = useState("")
  const [clubVicePresident, setClubVicePresident] = useState("")
  const [clubPresidentEmail, setClubPresidentEmail] = useState("")
  const [clubPassword, setClubPassword] = useState("")
  const [clubUniversity, setClubUniversity] = useState("")
  const [schoolsList, setSchoolsList] = useState([{schoolId: 1, schoolName:"School of Tech"}])
  const [clubSchools, setClubSchools] = useState(0)
  const [clubLogo, setClubLogo] = useState("")
  const [file, setFile] = useState();

  useEffect(() => {
    console.log(props)
    setClubName(props.clubinfo.clubName)
    setClubPresident(props.clubinfo.presidentName)
    setClubVicePresident(props.clubinfo.vicePresidentName)
    setClubMission(props.clubinfo.mission)
    setClubVision(props.clubinfo.vision)
  }, [])
  

  const handleClubNameChange = (event) => {
    setClubName({value: event.target.value})
  }
  const handleClubMissionChange = (event) => {
    setClubMission({value: event.target.value})
  }
  const handleClubVisionChange = (event) => {
    setClubVision({value: event.target.value})
  }
  const handleClubPresidentChange = (event) => {
    setClubPresident({value: event.target.value})
  }
  const handleClubVicePresidentChange = (event) => {
    setClubVicePresident({value: event.target.value})
  }
  const handleClubPresidentEmailChange = (event) => {
    setClubPresidentEmail({value: event.target.value})
  }
  const handleClubPasswordChange = (event) => {
    setClubPassword({value: event.target.value})
  }
  const handleClubLogoChange = (event) => {
    setClubLogo({value: event.target.value})
    const value=event.taget.value
    console.log(value)
  }
  const handleClubUniversityChange = async (event) => {
    
    if(event.target.value === "School Level"){
      setSs(false)
      const response = await fetch(url + "api/school/", {
        method: "GET"
      })
      
      const resJson = await response.json()
      console.log(resJson)
      setSchoolsList([...(await resJson)])
    }
    else {
      setSs(true)
      setClubSchools(0)
    }

    setClubUniversity({value: event.target.value})
  }
  
  const handleClubSchoolsChange = (event) => {
    setClubSchools({value: event.target.value})
    console.log(event.target.value)
  }

  const onsubmit = async (event) =>{
      event.preventDefault();
      const formValues = {
        "clubName": clubName.value ?? clubName,
        "mission": clubMission.value ?? clubMission,
        "vision":clubVision.value ?? clubVision,
        "presidentName":clubPresident.value ?? clubPresident,
        "vicePresidentName":clubVicePresident.value ?? clubVicePresident,
      }

      console.log(formValues)
      const response=await fetch(url+`api/club/${props.clubinfo.clubId}`,{
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
  function on(){
    window.location.reload(true)
  }

  


    return (
      <div className="EditClub" >
        <center>
        <Button style={{marginTop:"20px"}} onClick={on}>Back</Button>
      <div className="rectangle">
        
        <form onSubmit={onsubmit} >
          <br/>
            <label>Name of the Club: &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input defaultValue={props.clubinfo.clubName} onChange={handleClubNameChange} type="text" id="nc" required/><br/><br/>

            <label>Mission of the Club: &nbsp;</label>
            <textarea defaultValue={props.clubinfo.mission} onChange={handleClubMissionChange} required/><br/><br/>

            <label>Vision of the Club: &nbsp;&nbsp;</label>
            <textarea  defaultValue={props.clubinfo.vision} onChange={handleClubVisionChange} required/><br/><br/>

            <label>President Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input defaultValue={props.clubinfo.presidentName} onChange={handleClubPresidentChange} type="text" placeholder='President' required/><br/><br/>

            <label>Vice-President Name : &nbsp;</label>
            <input defaultValue={props.clubinfo.vicePresidentName} onChange={handleClubVicePresidentChange} type="text" placeholder='Vice-President' required/><br/><br/>

            <label>President Email : &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input onChange={handleClubPresidentEmailChange} type="text" placeholder='President' /><br/><br/>
            <label>Change password : &nbsp;&nbsp;</label>
            <input onChange={handleClubPasswordChange} type="password" /><br/><br/>

           
          <label style={{display:"inline"}}> Upload Club's Logo:</label> <input id="file" onChange={uploadFile} style={{display:"inline"}}type="file"  accept="image/png, image/jpeg,.jpg"/>
<input type="submit" ></input>
            
        </form>
       </div>
       </center>
      </div>
    )
  }

export default EditClub
