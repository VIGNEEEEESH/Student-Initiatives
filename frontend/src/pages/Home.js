import React from "react";

import {useNavigate, Link} from "react-router-dom"
import "../Css files/Home.css"
import imgOne from "../components/images/COE (5).png"
import imgTwo from "../components/images/COE (4).png"
import imgThree from "../components/images/COE (3).png"
import imgFour from "../components/images/COE (8).png"
import videoOne from "../components/carousel videos/videoplayback (4).mp4"
import videoTwo from "../components/carousel videos/videoplayback (1).mp4"
import videoThree from "../components/carousel videos/videoplayback (3).mp4"


import "bootstrap/dist/css/bootstrap.css";
import EventGallery from "../components/EventGallery";



class Home extends React.Component{
    render(){
        
        return (
            
<div className="Home">

    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <video width="100%" muted autoPlay loop>
              <source src={videoOne} type="video/mp4"/>
            </video>
          </div>
          <div className="carousel-item">
            <video width="100%" muted autoPlay loop>
              <source src={videoTwo} type="video/mp4"/>
            </video>
          </div>̵
          <div className="carousel-item">
            <video width="100%" muted autoPlay loop>
              <source src={videoThree} type="video/mp4"/>
            </video>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    

    <div className="card_container">
    <div className="row row-cols-1 row-cols-md-3 g-4">
      <div className="col">
        <div className="card">
         <Link to='/StudentCouncilpage'> <img src={imgOne} className="card-img-top"  width="5px" alt="..."/></Link>
          
        </div>
      </div>
      <div className="col">
        <div className="card">
        <Link to="/COE"> <img src={imgTwo} className="card-img-top"  alt="..."/></Link>
         
        </div>
      </div>
      <div className="col">
        <div className="card">
          <Link to="./TT.html"> <img src={imgThree} className="card-img-top"  alt="..."/></Link>
          
        </div>
      </div>
      <div className="col">
        <div className="card">
          <Link to="./TT.html"> <img src={imgFour} className="card-img-top" alt="..."/></Link>
          
        </div>
      </div>
      
    </div>
    <EventGallery/>
  </div>
  
</div>


       );
        
    }
}
export default Home