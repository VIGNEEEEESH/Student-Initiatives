import React, { useEffect, useState } from 'react';
import "../Css files/DeleteSchool.css";

import url from '../Baseurl'
import { notification } from 'antd';

import loginImg from '../components/images/robot.png'


function DeleteSchool() {
    const [schoolsList, setSchoolsList] = useState([])
    const [selectedSchoolId, setSelectedSchoolId] = useState(0)

    useEffect(() => {
      const getSchoolsListFromDB = async () => {
        const response = await fetch(url + "api/school/", {
          method: "GET"
        })
        const resJSON = response.json();
        console.log(await resJSON)
        setSchoolsList([...(await resJSON)])
        
      }

      getSchoolsListFromDB();
    }, [])
    

    const handleSchoolChange = async (event) => {
        setSelectedSchoolId(event.target.value)
        console.log(event.target.value);
        }
        const onsubmit = async (event) =>{
            event.preventDefault();
            
              const schoolresponse = await fetch(url +`api/school/${selectedSchoolId}`, {
                method: "DELETE"
              })
      
              const schoolResponseJson = await schoolresponse.json()
              console.log(await schoolResponseJson)
                if(await schoolResponseJson.success === "true"){
                notification.success({
                  message: `School successfully deleted`,
                  placement:'topRight'
                })
              }
              } 
            
        
       
    return (
      <div className="DeleteSchool " style={{overflow:"auto"}}>
      <center>
      <div className="form" onSubmit={onsubmit}>
          <div className="loginImage">
            <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/><br/><br/><br/>
            <form>
            <h1>Delete School</h1>   <select onChange={handleSchoolChange}  required>
            <option value = {0}>Select a School</option>
              { schoolsList.map((entry) => 
                <option value={entry.schoolId}>{entry.schoolName}</option>
              )} 
              
            </select><br/><br/>
           
            
            <input type="submit" value="Delete"/>
            </form>
          </div>
        </div>
          </center>
          
         
       
      </div>
    );
    
  }




export default DeleteSchool;
