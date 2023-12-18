import React, { useState } from "react";
import One from "../components/club_logos/one.png";
import { useEffect } from "react";
import { useParams } from "react-router";

import "../Css files/SpecificClubList.css";
import { useNavigate, Link } from "react-router-dom";
import url from "../Baseurl";

const SpecificClubList = () => {
  const [clubsList, setClubsList] = useState([]);
  const params = useParams();
  useEffect(() => {
    const getClubsListFromDB = async () => {
      const response = await fetch(url + `api/school/${params.schoolId}/clubs`);
      const resJSON = await response.json();
      setClubsList(resJSON);
      console.log(resJSON);
    };

    getClubsListFromDB();
  }, []);

  return (
    <div className="SpecificClubList">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {clubsList.map((club) => (
            <div className="col">
              <div className="card">
                <Link to={"/ClubPage/" + club.clubId}>
                  {" "}
                  <img
                    src={url + `api/club/${club.clubId}/image/logo`}
                    className="card-img-top"
                    alt="..."
                  />{" "}
                </Link>
                <div className="card-body">
                  <center>
                    <h4
                      style={{
                        fontFamily: "CourierNewPS-ItalicMT",
                        fontWeight: "bold",
                      }}
                    >
                      {club.clubName}
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
export default SpecificClubList;
