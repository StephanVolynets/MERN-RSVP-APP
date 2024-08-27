import React from 'react';
import './EventCard.css'; // Assuming you have a separate CSS file for styling

function EventCard({ event, onRSVPToggle }) {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p>{event.description}</p> {/* New */}
      <p>Date: {event.date}</p> {/* New */}
      <p>Location: {event.location}</p> {/* New */}
      <p>Head Count: {event.headCount}</p>
      <button onClick={() => onRSVPToggle(event._id)}>RSVP / UNRSVP</button>
    </div>
  );
}

export default EventCard;
