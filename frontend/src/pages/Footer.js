import React from "react";
import "../Css files/Footer.css"

class Footer extends React.Component{
    render(){
        return(
            <div className="Footer" >
                <footer className="footer">
    <div className="waves">
      <div className="wave" id="wave1"></div>
      <div className="wave" id="wave2"></div>
      <div className="wave" id="wave3"></div>
      <div className="wave" id="wave4"></div>
    </div>
    <ul className="social-icon">
        <li className="social-icon__item"><a className="social-icon__link"  >
         <ion-icon name="logo-facebook" onclick="parent.location='https://www.facebook.com/woxsen/'" ></ion-icon>
        </a></li>
      <li className="social-icon__item"><a className="social-icon__link"  >
          <ion-icon name="logo-twitter" onclick="parent.location='https://twitter.com/Woxsen?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'"></ion-icon>
        </a></li>
      <li className="social-icon__item"><a className="social-icon__link"  >
          <ion-icon name="logo-linkedin" onclick="parent.location='https://in.linkedin.com/school/woxsen-university/'"></ion-icon>
        </a></li>
      <li className="social-icon__item"><a className="social-icon__link"  >
          <ion-icon name="logo-instagram" onclick="parent.location='https://www.instagram.com/woxsen_university/'"></ion-icon>
        </a></li>
    </ul>
    <ul className="menu">
      <li className="menu__item"><a className="menu__link" href="/">Home</a></li>
      <li className="menu__item"><a className="menu__link" href="#">About</a></li>
      
      
      <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>
    </ul>
    
    <h5>Designed and Developed by <a style={{color:"white"}}href="https://www.linkedin.com/in/aditi-baggu-701151227/">Aditi Baggu</a>, <a style={{color:"white"}}href="https://www.linkedin.com/in/harsh-morayya/">Harsh Morayya</a>, <a style={{color:"white"}}href="https://www.linkedin.com/in/arunchandra-boini/">Arunchandra Boini</a>, <a style={{color:"white"}}href="https://www.linkedin.com/in/vignesh-devamulla-5b2b88219/">Vignesh Devamulla</a></h5>
    
  </footer>
  
            </div>
        )
    }
}
export default Footer