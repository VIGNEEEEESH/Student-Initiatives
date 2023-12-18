import React, { useState } from "react";
import "../Css files/Calender.css"

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      title: title,
      date: date,
      description: description,
    };
    setEvents([...events, newEvent]);
    setTitle("");
    setDate("");
    setDescription("");
  };

  const handleDeleteEvent = (eventIndex) => {
    setEvents(events.filter((event, index) => index !== eventIndex));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h1>Event Calendar</h1>
        <form onSubmit={handleAddEvent}>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            placeholder="Event Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit">Add Event</button>
        </form>
      </div>
      <div className="calendar-body">
        {events.map((event, index) => (
          <div key={index} className="event">
            <h2>{event.title}</h2>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <button onClick={() => handleDeleteEvent(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;