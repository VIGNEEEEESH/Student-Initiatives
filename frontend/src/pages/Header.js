import React from "react";
import NavBrand from "../components/images/Woxsen.png"
import {NavLink, Link} from "react-router-dom"
import "../Css files/Header.css"
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../Redux/Slices/authSlice";


  
  export const Header = () => {
    const {isAuthorised,coeId,clubId}=useSelector(state=>state.auth);
    const dispatch =useDispatch();
    return (
            <div className="Header" style={{width:"100%"}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark " bg-blackdata-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src={NavBrand} width="25%"/></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
       
          <ul className="nav nav-pills">
          <li className="nav-item">
          {isAuthorised&&coeId===null&&clubId===null? <NavLink className={({isActive}) => (isActive ? " bg-light active text-dark nav-link" : " nav-link text-light")} to="/Admin" >Admin</NavLink>:null}
            </li>
          <li className="nav-item">
              <NavLink className={({isActive}) => (isActive ? " bg-light active text-dark nav-link" : " nav-link text-light")} to="/" >Home</NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className={({isActive}) => (isActive ? " bg-light active text-dark nav-link" : "nav-link text-light")} to="/StudentCouncilpage" >Clubs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => (isActive ? " bg-light active text-dark nav-link" : "nav-link text-light")} to="/COE" >COE</NavLink>
            </li>
            <li className="nav-item">
              {!isAuthorised?<NavLink className={({isActive}) => (isActive ? " bg-light active text-dark nav-link" : "nav-link text-light")} to="/Login">Log-In</NavLink>
              :<NavLink onClick={()=>{dispatch(logoutSuccess())}} className={({isActive}) => (isActive ? " bg-light active text-dark nav-link" : "nav-link text-light")} to="/Login">Log-Out</NavLink>
              }
            </li>
            
          </ul>
          </div>
        </nav>
        </div>
            );
        
        }
    
export default Header
