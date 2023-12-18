import React, { useState } from 'react';
import "../Css files/AdminLogIn.css";
import un from "../components/images/user.png"
import pw from "../components/images/pw.png"
import url from '../Baseurl'
import bg from "../components/images/light rays.png"
import loginImg from '../components/images/robot.png'
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import { loginSucess,loginFail } from '../Redux/Slices/authSlice';
import { useNavigate } from 'react-router-dom';


function AdminLogIn() {
  const navigate=useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch =useDispatch();
  const state=useSelector((state)=>state.auth);
  const handleEmailChange = (event) => {
    setEmail({value: event.target.value})
  }
  const handlePasswordChange = (event) => {
    setPassword({value: event.target.value})
  }

 

  const onsubmit = async (event) =>{
    event.preventDefault();
    const formValues = {
      "email":email.value,
      "password":password.value,
    }
    const response=await fetch(url+"api/admin/login",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({...formValues})
    }
    )
    const json=await response.json();
    if(response.status===200){
      
      dispatch(loginSucess(json));
      navigate("/");
    }else{
      dispatch(loginFail(json));
    }
    

    console.log(json)
  }
  
   function myFunction(){
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      
      
      x.type = "text";
      
    } else {
      x.type = "password";
      
    }
  }

    return (
      <div className="Login " style={{overflow:"auto"}}>
        
      <center>
      <div className="form">
          <div className="loginImage">
            <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/><br/><br/><br/>
            <form onSubmit={onsubmit}>
            <img src={un} height="25px"/> &nbsp; <input onChange={handleEmailChange} className="o" type="text" placeholder="Email"/><br/><br/>
            <img src={pw} height="25px"/> &nbsp;   <input onChange={handlePasswordChange} className="o" type="password" id="myInput"  placeholder="Password"/><br/><br/>
            <input type="checkbox" id="showImageButton" onClick={myFunction}/>&nbsp; Show Password <br/><br/>
            <input  type="submit" value="Log-In"/>
            
            </form>
          </div>
        </div>
          </center>
          
         
       
      </div>
    );
    
  }




export default AdminLogIn
