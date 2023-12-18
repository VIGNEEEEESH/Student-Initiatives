import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import EditClub from "../EditClub";
import "../../Css files/ClubPage.css";
import { useParams } from "react-router-dom";
import url from "../../Baseurl";
import { Button, notification } from "antd";
import { useSelector } from "react-redux";
function ClubPage() {
  const [boxCount, setBoxCount] = useState(0);

  const addBox = () => {
    setBoxCount(boxCount + 1);
  };

  const removeBox = () => {
    if (boxCount > 0) {
      setBoxCount(boxCount - 1);
    }
  };

  const { clubId } = useParams();
  useEffect(() => {
    const getClubFromDB = async () => {
      const response = await fetch(url + `api/club/${clubId}`);
      const resJSON = await response.json();
      setClubInfo(resJSON);
    };

    const getClubEvents = async () => {
      const resposne = await fetch(url + `api/event/club/${clubId}`);
      const resJSON = await resposne.json();
      console.log(resJSON);
      setEvents(resJSON);
    };

    getClubFromDB();
    getClubEvents();
  }, []);
  const [file, setFile] = useState();
  const [clubInfo, setClubInfo] = useState({});
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const auth = useSelector((state) => state.auth);
  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (time === "") {
      time = "00:00";
    }
    const newEvent = {
      title: title,
      date: date + " " + time + ":00",
      eventDesc: description,
      clubId: clubId,
    };
    console.log(newEvent);

    const response = await fetch(url + "api/event", {
      body: JSON.stringify({ ...newEvent }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJSON = await response.json();
    const eventId = resJSON.eventId;

    const theFormWithImage = new FormData();
    theFormWithImage.append("image", file);
    var imgSuccess;
    if (!!file) {
      const imgResponse = await fetch(
        url + `api/event/image/${clubId}/${eventId}`,
        {
          method: "PUT",
          body: theFormWithImage,
        }
      );
      const imgResponseJSON = await imgResponse.json();
      if (imgResponseJSON.success === "true") {
        imgSuccess = true;
      }
      if ((!!eventId && !file) || (!!eventId && !!imgSuccess)) {
        notification.success({
          message: "Event added successfully",
          description: `${newEvent.title} was added to the club's calendar. Please reload the page to see changes.`,
          placement: "bottomRight",
        });
      }
    }

    setTitle("");
    setDate("");
    setDescription("");
    setFile("");
    setTime("");
  };

  const handleDeleteEvent = async (eventIndex) => {
    const response = await fetch(url + `api/event/${eventIndex}`, {
      method: "DELETE",
    });
    const resJSON = await response.json();
    if (resJSON.success === "true") {
      notification.success({
        message: "Event deleted successfully",
        description: "Reload to see the changes",
        placement: "top",
      });
    } else {
      notification.error({
        message: "Something went wrong",
        description: "The even was not deleted",
        placement: "top",
      });
    }
  };

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
    const target = e.target;
    if (target.files && target.files[0]) {
      const maxAllowedSize = 10 * 1024 * 1024;
      if (target.files[0].size > maxAllowedSize) {
        target.value = "";
        notification.error({
          message: `The file size is be less than 10MB`,

          placement: "top",
        });
      }
    }
  };

  const [showEditDetails, setShowEditDetails] = useState(false);

  const goToEditClubDetails = () => {
    setShowEditDetails(!showEditDetails);
  };

  return (
    <React.Fragment>
      {!showEditDetails && (
        <div className="Tech">
          <CardGroup>
            <div className="One">
              <Card className="cardGroup">
                <img
                  variant="top"
                  src={url + `api/club/${clubId}/image/logo`}
                  id="Twelve"
                />
                <h2
                  style={{
                    marginTop: "40px",
                    fontFamily: "CourierNewPS-ItalicMT",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {clubInfo.clubName}
                </h2>
              </Card>
            </div>
            <Card className="cardGroup">
              <Card.Body>
                <div className="misso">
                  <Card className="mission">
                    <Card.Body>
                      <Card.Title>
                        <b>Mission</b>
                      </Card.Title>
                      <p>{clubInfo.mission}</p>
                    </Card.Body>
                  </Card>
                </div>
                <Card className="vision">
                  <Card.Body>
                    <Card.Title>
                      <b>Vision</b>
                    </Card.Title>
                    <p>{clubInfo.vision}</p>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </CardGroup>
          {auth.clubId?.toString() === clubId?.toString() ? (
            <div style={{ textAlign: "right" }}>
              {" "}
              <Button
                style={{
                  marginBottom: "10px",
                  textAlign: "right",
                  marginRight: "20px",
                }}
                type="primary"
                danger
                size="large"
                onClick={goToEditClubDetails}
              >
                Edit Club
              </Button>
            </div>
          ) : null}
          <br />

          <div className="presidents" style={{ overflow: "clip" }}>
            <br />
            <br />
            <center>
              <div
                style={{ width: "100%" }}
                className="card-group d-flex align-items-center justify-content-center"
              >
                <div className="ab ">
                  <div className="card " id="PR">
                    <div className="card-body">
                      <h5 className="card-title">
                        <b>President</b>
                      </h5>
                      <p className="card-text">{clubInfo.presidentName}</p>
                    </div>
                  </div>
                </div>
                <div className="cd">
                  <div className="card" id="VR">
                    <div className="card-body">
                      <h5 className="card-title">
                        <b>Vice-President</b>
                      </h5>
                      <p className="card-text">{clubInfo.vicePresidentName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </center>
            <br />
            <br />
          </div>
          <div className="calendar">
        <div className="calendar-header">
          <h2
            style={{
              fontFamily: "CourierNewPS-ItalicMT",
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            Event Calendar
          </h2>
          <br />
          {auth.clubId?.toString() === clubId?.toString() ? (
            <form onSubmit={handleAddEvent} style={{ overflow: "clip" }}>
              <br />
              <input
                type="text"
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="file"
                onChange={uploadFile}
                accept="image/png, image/jpeg,.jpg"
                style={{ maxWidth: "100%" }}
              />

              <input
                type="date"
                placeholder="Event Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="time"
                onChange={(e) => setTime(e.target.value)}
              />
              <textarea
  placeholder="Event Description"
  value={description}
  style={{
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: "10px",
    fontSize: "16px",
    lineHeight: "1.5",
  }}
  onChange={(e) => setDescription(e.target.value)}
></textarea>

              <br />

              <button type="submit">Add Event</button>
                </form>
              ) : null}
            </div>
            <br />
            <div className="calendar-body">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="event"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                    overflow: "auto",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "CourierNewPS-ItalicMT",
                      fontWeight: "bold",
                    }}
                  >
                    {event.title}
                  </h4>
                  <img
                    src={url + `api/event/image/${clubId}/${event.eventId}`}
                    style={{ maxWidth: "100%" }}
                  />
                  <br />
                  <br />
                  <p
                    style={{
                      fontFamily: "CourierNewPS-ItalicMT",
                      fontWeight: "bold",
                    }}
                  >
                    {event.date}
                  </p>

                  <textarea
                    style={{
                      fontFamily: "CourierNewPS-ItalicMT",
                      fontWeight: "bold",
                      width: "100%",
                      height: "100px",
                    }}
                    value={event.eventDesc}
                    disabled
                  ></textarea>

                  <br />
                  <button onClick={() => handleDeleteEvent(event.eventId)}>
                    Delete
                  </button>
                  <br />
                  <br />
                </div>
              ))}
            </div>
          </div>

          <br />
          <br />
          <br />
        </div>
      )}
      {showEditDetails && <EditClub clubinfo={clubInfo}></EditClub>}
    </React.Fragment>
  );
}
export default ClubPage;
