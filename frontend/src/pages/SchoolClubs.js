import React, { useEffect, useState } from "react";
import { useNavigate, Link, Router, Await } from "react-router-dom"
import MOne from "../components/schools/school/1.png"
import MTwo from "../components/schools/school/2.png"
import MThree from "../components/schools/school/3.png"
import MFour from "../components/schools/school/4.png"
import MFive from "../components/schools/school/5.png"
import Twelve from "../components/club_logos/twelve.png"
import Four from "../components/club_logos/four.png"
import Eleven from "../components/club_logos/eleven.png"
import TwentyThree from "../components/club_logos/twentyThree.jpg"
import TwentyTwo from "../components/club_logos/twentyTwo.png"
import Six from "../components/club_logos/six.png"
import Twenty from "../components/club_logos/twenty.jpg"
import Eighteen from "../components/club_logos/eighteen.png"
import Eight from "../components/club_logos/eight.png"
import Fourteen from "../components/club_logos/fourteen.png"
import Nineteen from "../components/club_logos/nineteen.png"
import "../Css files/SchoolClubs.css"
import { Dropdown } from "react-bootstrap";
import { Card, Select, Space } from "antd";
import url from '../Baseurl'
import Tech from "./School_Clubs/ClubPage";
import dropdown from "../components/images/dropdown.png"



function SchoolClubs() {
  const [schoolsList, setSchoolsList] = useState([])
  const [clubsObject, setClubsObject] = useState({})
  const navigate = useNavigate();
  const ListPage = (school) => {
    navigate(`/SpecificClubList/${school.schoolId}`)
  }
  useEffect(() => {

    const getSchoolsListFromDB = async () => {

      const response = await fetch(url + "api/school/", {
        method: "GET"
      })
      const resJSON = await response.json();
      console.log(await resJSON)
      setSchoolsList([...(resJSON)])


      await resJSON.forEach(getClubsListFromDB)
    }

    const getClubsListFromDB = async (school) => {
      const schoolId = await school.schoolId
      const response = await fetch(url + `api/school/${schoolId}/clubs`, {
        method: "GET"
      })
      const resJSON = await response.json();
      console.log(await resJSON)
      const tempClubsList = clubsObject
      tempClubsList[schoolId] = [...(await resJSON)]
      setClubsObject(tempClubsList)

    }

    getSchoolsListFromDB();

  }, [])

  useEffect(() => {
    console.log("Logging clubObject: ")
    console.log(clubsObject)
  }, [clubsObject])



  return (
    <center>
      <div className="Sclub" style={{overflow:"auto"}}>

        {schoolsList.map((entry) =>
          <div className="card-class">


            <Card id="card" onClick={() => ListPage(entry)} style={{ height: "150px", fontFamily: 'League Spartan' }}>
              <h1>{entry.schoolName}</h1>

              <img id="dropdown" src={dropdown} height="47px" />
            </Card>





            {/* {
                clubsObject[entry.schoolId].map((entry) => {
                  <Dropdown.Item> <img src = {url + `api/club/${entry.clubId}/image/logo`} height="300px"/><center><h4 style={{fontFamily:"CourierNewPS-ItalicMT",fontWeight:"bold"}}>{entry.clubName}</h4></center>
                  </Dropdown.Item>
                })
              } */}



          </div>
        )}

      </div>


    </center>

  );

}
export default SchoolClubs
