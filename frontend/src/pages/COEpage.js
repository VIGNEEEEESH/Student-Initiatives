import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "../Css files/COEpage.css";
import { useParams } from "react-router-dom";
import url from "../Baseurl";
import { Button, notification } from "antd";
import { useSelector } from "react-redux";
import EditCOE from "./EditCOE"

function COEpage() {
  const [boxCount, setBoxCount] = useState(0);
  const coeId=useSelector((state)=>state.auth);
  const [showEditDetails, setShowEditDetails] = useState(false)

  const goToEditCOEDetails = () => {
    setShowEditDetails(!showEditDetails)
  }
  const addBox = () => {
    setBoxCount(boxCount + 1);
  };
  
  const removeBox = () => {
    if (boxCount > 0) {
      setBoxCount(boxCount - 1);
    }
  };
  const { id } = useParams();
  useEffect(() => {
    const getCoeFromDB = async () => {
      const response = await fetch(url + `api/coe/${id}`);
      const resJSON = await response.json();
      setCoeInfo(resJSON);
    };

    const getCoeEvents = async () => {
      const resposne = await fetch(url + `api/coe-post/coe/${id}`);
      const resJSON = await resposne.json();
      console.log(resJSON);
      setCoeEvents(resJSON);
    };

    getCoeFromDB();
    getCoeEvents();
  }, []);
  const [file, setFile] = useState();
  const [coeInfo, setCoeInfo] = useState({});
  const [events, setCoeEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (time === "") {
      time = "00:00";
    }
    const newEvent = {
      title: title,
      date: date + " " + time + ":00",
      desc: description,
      id: id,
    };
    console.log(newEvent);

    const response = await fetch(url + `api/coe-post/${id}/`, {
      body: JSON.stringify({
        title: newEvent.title,
        date: newEvent.date,
        desc: newEvent.desc,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJSON = await response.json();
    const coePostId = resJSON.coePostId;

    const theFormWithImage = new FormData();
    theFormWithImage.append("image", file);
    var imgSuccess;
    if (!!file) {
      const imgResponse = await fetch(
        url + `api/coe-post/${id}/image/${coePostId}`,
        {
          method: "PUT",
          body: theFormWithImage,
        }
      );
      const imgResponseJSON = await imgResponse.json();
      if (imgResponseJSON.success === "true") {
        imgSuccess = true;
      }
      if ((!!coePostId && !file) || (!!coePostId && !!imgSuccess)) {
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
    const response = await fetch(url + `api/coe-post/${eventIndex}`, {
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

  return (
    <React.Fragment>    
      { !showEditDetails &&
    <div className="AAD" style={{overflow:"auto"}}>
      <CardGroup style={{ border: "none" }}>
        <div className="One">
          <Card className="cardGroup" style={{ border: "none" }}>
            <img
              variant="top"
              src={url + `api/coe/${id}/image/logo`}
              id="Twelve"
              width="60%"
              style={{marginLeft:"60px"}}
              
            />
          </Card>
          <h2 style={{marginTop:"40px",fontFamily: "CourierNewPS-ItalicMT",
              fontWeight: "bold",textAlign:"center" }}>{coeInfo.name}</h2>
        </div>
        
        <Card className="cardGroup" style={{ border: "none" }}>
          <Card.Body>
            <div className="misso">
              <Card className="mission">
                <Card.Body>
                  <Card.Title>
                    <b>Mission</b>
                  </Card.Title>
                  <p>{coeInfo.mission}</p>
                </Card.Body>
              </Card>
            </div>
            <Card className="vision">
              <Card.Body>
                <Card.Title>
                  <b>Vision</b>
                </Card.Title>
                <p>{coeInfo.vision}</p>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </CardGroup>
      {coeId.coeId?.toString() ===id?.toString()?  <div style={{textAlign:"right"}}>  <Button style={{ textAlign:"right", marginRight:"20px"}} type="primary" danger size="large" onClick={goToEditCOEDetails}>Edit COE</Button></div>:null}
      <br />

      <div className="chairpersons">
        <br />
        <br />
        <div className="cards-list">
          <div className="card1">
            <div className="card_title title-white">
              <p id="co">Co-Chairpersons</p>{" "}
            </div>
            <div className="card_body">
              {" "}
              <center>
                <p style={{ fontSize: "23px" }}> {coeInfo.coFounderName}</p>
              </center>
            </div>
          </div>
        </div>
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
          {console.log(`param ${id} >>> ${JSON.stringify(coeId)}`)}
          {coeId.coeId?.toString() ===id?.toString()?
          <form onSubmit={handleAddEvent}>
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
              style={{ width: "245px" }}
            ></input>

            <input
              type="date"
              placeholder="Event Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input type="time" onChange={(e) => setTime(e.target.value)} />
            <textarea
              placeholder="Event Description"
              value={description}
              style={{ width: "150px" }}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <br />

            <button type="submit">Add Event</button>
          </form>:null}
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
              overflow:"auto"}}
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
                src={url + `api/coe-post/${id}/image/${event.id}`}
                style={{ maxWidth: "650px" }}
              />
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
                  width: "720px",
                  height: "100px",
                }}
                value={event.desc}
              ></textarea>

              <br />
              <button onClick={() => handleDeleteEvent(event.id)}>
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

      {/* <div>
        <center>
          <p id="pic">
            <u>
              <b>PICTURE GALLERY</b>
            </u>
          </p>
        </center>
        <center>
          <button type="button" className="btn btn-dark" onClick={addBox}>
            <b>Add Event</b>
          </button>
          &emsp;
          <button type="button" className="btn btn-dark" onClick={removeBox}>
            <b>Remove Event</b>
          </button>
        </center>

        <div className="container">
          <div className="box1">
            <img src="" alt="img" />
            <span></span>
          </div>
          {Array.from({ length: boxCount }).map((_, index) => (
            <div className="box1" key={index}></div>
          ))}
        </div>
      </div>  */}
    </div>}
    { showEditDetails  && <EditCOE coeinfo={coeInfo}></EditCOE>}
    </React.Fragment>
  );
}
export default COEpage;
