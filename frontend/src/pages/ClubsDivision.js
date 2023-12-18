import React from "react";
import "../Css files/ClubDiv.css"
import One from "../components/images/COE (6).png"
import Two from "../components/club_logos/seventeen.png"
import Three from "../components/images/COE (7).png"
import {useNavigate, Link} from "react-router-dom"


class ClubsDivision extends React.Component {
    render(){
        return (
        <div className="ClubDiv">
            <div className="row">
            <div className="column" id="columnOne">
       <Link to="/UniversityClubs"><img src={One} alt="Snow"  /></Link>
            </div>
            <div className="column">
              <img src={Two} alt="Forest" />
            </div>
            <div className="column" id="columnThree">
       <Link  to="/SchoolClubs"><img src={Three} alt="Mountains"  /></Link>
            </div>
          </div>
          </div>
            );
        
        }
    }
export default ClubsDivision