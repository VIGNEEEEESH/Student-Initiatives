import React, { useEffect, useState } from "react";

import "../Css files/UniversityClubs.css";
import { useNavigate, Link } from "react-router-dom";
import url from "../Baseurl";

const UniversityClubs = () => {
  useEffect(() => {
    const getClubsList = async () => {
      const response = await fetch(url + "api/club/");
      const resJSON = await response.json();
      return await resJSON;
    };

    const filterSchoolClubs = (clubsList) => {
      return clubsList.filter((club) => club.school == null);
    };

    getClubsList().then((clubsList) => {
      setUniClubsList(filterSchoolClubs(clubsList));
    });
  }, []);

  const [uniClubsList, setUniClubsList] = useState([]);

  return (
    <div className="Uclub">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          
            
          {uniClubsList.map((entry) => (
            <div className="col">
              <div className="card">
                <Link to={`/ClubPage/${entry.clubId}`}>
                  {" "}
                  <img
                    src={url + `api/club/${entry.clubId}/image/logo`}
                    className="card-img-top"
                    alt="..."
                  />
                </Link>
                <div className="card-body">
                  <center>
                    <h4
                      style={{
                        fontFamily: "CourierNewPS-ItalicMT",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.clubName}
                    </h4>
                  </center>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
        </div>
      
  
  );
};

export default UniversityClubs;
