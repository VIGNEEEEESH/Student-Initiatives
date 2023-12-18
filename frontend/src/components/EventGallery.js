import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./EventGallery.css";
import url from "../Baseurl";

const EventGallery = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const handleEventClick = (event) => {
    setActiveEvent(event);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setActiveEvent(null);
    setModalVisible(false);
  };

  useEffect(() => {
    const getClubEvents = async () => {
      const currentDate = new Date();
      
      const startDate = new Date(currentDate);
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + 10);
      
      const startDateFormatted = formatDate(startDate);
      const endDateFormatted = formatDate(endDate);
console.log(startDateFormatted)
console.log(endDateFormatted)
      const response = await fetch(url + "api/event/dateRange", {
        method: "POST",
        body: JSON.stringify({
          start: startDateFormatted,
          end: endDateFormatted,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resJSON = await response.json();
      setEvents(resJSON);
      console.log(resJSON)
      
    };

    getClubEvents();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
  };

 
  return (
    <div className="event-gallery">
      <div className="event-container">
        <center>
          <h1 style={{ fontFamily: "'Courier New', monospace" }}>Events</h1>
        </center>
        {events.map((event) => (
          <div className="event-item" onClick={() => handleEventClick(event)}>
            <h2 className="event-title" style={{ fontFamily: "'Courier New', monospace" }}>
              {event.title}
            </h2>
            
            <div className="event-meta">
              <p className="event-date" style={{ fontFamily: "'Courier New', monospace" }}>
                {event.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal
  visible={modalVisible}
  title={activeEvent && <span style={{ fontFamily: "Georgia, serif", fontSize: "20px", textDecoration: "underline" }}>{activeEvent.title}</span>}
  onCancel={handleModalClose}
  footer={null}
  id="modal"
>
  {activeEvent && (
    <div>
      <b><p className="event-date" style={{ fontFamily: "'Courier New', monospace" }}>
        {activeEvent.date}
            </p></b>
            <b><p className="event-time" style={{ fontFamily: "'Courier New', monospace" }}>
              {activeEvent.time}
            </p></b>
            <b><p className="event-description" style={{ fontFamily: "'Courier New', monospace" }}>
              {activeEvent.eventDesc}
            </p></b>
          </div>
        )}
      </Modal>
    </div>
  );

};

export default EventGallery;
