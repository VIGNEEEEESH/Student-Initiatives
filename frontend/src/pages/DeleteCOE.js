import React, { useEffect, useState } from 'react';
import "../Css files/DeleteCOE.css";

import url from '../Baseurl'
import { notification } from 'antd';

import loginImg from '../components/images/robot.png'


function DeleteCOE() {
  const [COEsList, setCOEsList] = useState([])
  const [selectedCOEId, setSelectedCOEId] = useState(0)

  useEffect(() => {
    const getCOEsListFromDB = async () => {
      const response = await fetch(url + "api/coe", {
        method: "GET"
      })
      const resJSON = response.json();
      console.log(await resJSON)
      setCOEsList([...(await resJSON)])
      
    }

    getCOEsListFromDB();
  }, [])
  

  const handleCOEChange = async (event) => {
      setSelectedCOEId(event.target.value)
      console.log(event.target.value);
      }
      const onsubmit = async (event) =>{
          event.preventDefault();
          console.log(selectedCOEId)
            const coeresponse = await fetch(url +`api/coe/${selectedCOEId}`, {
              method: "DELETE"
            })
    
            const coeResponseJson = await coeresponse.json()
            console.log(await coeResponseJson)
              if(await coeResponseJson.success === "true"){
              notification.success({
                message: `COE successfully deleted`,
                placement:'topRight'
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
            <h1>Delete COE</h1>   <select onChange={handleCOEChange}  required>
            <option value = {0}>Select a COE</option>
              { COEsList.map((entry) => 
                <option value={entry.id}>{entry.name}</option>
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




export default DeleteCOE;
