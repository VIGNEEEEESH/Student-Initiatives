import React, { useEffect, useState } from 'react';
import "../Css files/DeleteClub.css";

import url from '../Baseurl'
import { notification } from 'antd';

import loginImg from '../components/images/robot.png'


function DeleteClub() {
    const [clubsList, setClubsList] = useState([])
    const [selectedClubId, setSelectedClubId] = useState(0)

    useEffect(() => {
      const getClubsListFromDB = async () => {
        const response = await fetch(url + "api/club/", {
          method: "GET"
        })
        const resJSON = response.json();
        console.log(await resJSON)
        setClubsList([...(await resJSON)])
        
      }

      getClubsListFromDB();
    }, [])
    

    const handleClubChange = async (event) => {
        setSelectedClubId(event.target.value)
        console.log(event.target.value);
        }
        const onsubmit = async (event) =>{
            event.preventDefault();
            
              const clubresponse = await fetch(url +`api/club/${selectedClubId}`, {
                method: "DELETE"
              })
      
              const clubResponseJson = await clubresponse.json()
              console.log(await clubResponseJson)
                if(await clubResponseJson.success === "true"){
                notification.success({
                  message: `Club successfully deleted`,
                  placement:'topRight'
                })
              }
              } 
              
            
        
       
    return (
      <div className="DeleteClub " style={{overflow:"auto"}}>
      <center>
      <div className="form" onSubmit={onsubmit}>
          <div className="loginImage">
            <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/><br/><br/><br/>
            <form>
            <h1>Delete Club</h1>   <select onChange={handleClubChange}  required>
              <option value = {0}>Select a club</option>
              { clubsList.map((entry) => 
                <option value={entry.clubId}>{entry.clubName}</option>
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




export default DeleteClub;
