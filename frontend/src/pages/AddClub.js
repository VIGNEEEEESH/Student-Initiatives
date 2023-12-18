import React, { Component, useState } from 'react'
import axios from 'axios';
import url from '../Baseurl'
import "../Css files/AddClub.css"
import { notification } from 'antd';

function AddClub() {
  
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
      console.log(clubName)
      const formValues = {
        "clubName": clubName.value,
        "mission": clubMission.value,
        "vision":clubVision.value,
        "presidentName":clubPresident.value,
        "vicePresidentName":clubVicePresident.value,
        "email":clubPresidentEmail.value,
        "password":clubPassword.value,
        "clubSchoolType":clubUniversity.value,
        "schoolId":clubSchools.value,
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
        if(!formValues.schoolId || formValues.schoolId == 0){
        delete formValues.schoolId;
        }
        const clubresponse = await fetch(url +"api/club/", {
          method: "POST",
          body: JSON.stringify({...formValues}),
          headers: {
            "Content-Type" : "application/json"
          }
        })

        const clubResponseJson = await clubresponse.json()
        const clubId = await clubResponseJson.clubId;

        const formData = new FormData();
        formData.append("image", file);
        try {
          const res = await axios.put(url+ 
            `api/club/${clubId}/image/logo`,
            formData
          );
          console.log(res);
          
          notification.success({
            message: `Club ${formValues.clubName} successfully created`,
            description: `Club email = ${formValues.email}\nPassword = ${formValues.password}\n
            ID = ${clubId}. Please save the credentials as they can't be seen again`,
            placement:'topRight'
          })

        } catch (ex) {
          console.log(ex);
        }
        
      }
      else{
        notification.error({
          message: `Club ${formValues.name} is not created`,
          placement:'top'
        })

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
      <div className="AddClub" >
        <center>
      <div className="rectangle">
        <form onSubmit={onsubmit} >
          <br/>
            <label>Name of the Club : &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input onChange={handleClubNameChange} type="text" id="nc" required/><br/><br/>

            <label>Mission of the Club : &nbsp;</label>
            <textarea onChange={handleClubMissionChange} required/><br/><br/>

            <label>Vision of the Club : &nbsp;&nbsp;</label>
            <textarea onChange={handleClubVisionChange} required/><br/><br/>

            <label>President Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input onChange={handleClubPresidentChange} type="text" placeholder='President' required/><br/><br/>

            <label>Vice-President Name : &nbsp;</label>
            <input onChange={handleClubVicePresidentChange} type="text" placeholder='Vice-President' required/><br/><br/>

            <label>President Email : &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input onChange={handleClubPresidentEmailChange} type="text" placeholder='President' required/><br/><br/>
            <label>Create a password : &nbsp;&nbsp;</label>
            <input onChange={handleClubPasswordChange} type="password" required/><br/><br/>

            <label>Select the type of the Club : &nbsp;</label><br/>
            <input onChange={handleClubUniversityChange} type="radio" name="school" value="University Level" required/>&nbsp;
            <label > University Level</label>&emsp;
            <input onChange={handleClubUniversityChange} type="radio" name="school" value="School Level" required/>&nbsp;
            <label>School Level</label><br/>
            <select onChange={handleClubSchoolsChange} hidden={ss} required>
            <option value = {0} >Select a club</option>
              { schoolsList.map((entry) => 
                <option value={entry.schoolId}>{entry.schoolName}</option>
              )} 
              
            </select><br/>
          <label style={{display:"inline"}}> Upload Club's Logo:</label> <input id="file" onChange={uploadFile} style={{display:"inline"}}type="file" required accept="image/png, image/jpeg,.jpg"/>
<input type="submit" ></input>
            
        </form>
       </div>
       </center>
      </div>
    )
  }

export default AddClub
