import React from 'react';
import EventCard from './EventCard';
import './EventList.css'; // Import the CSS file

function EventList({ events, onRSVPToggle }) {
  return (
    <div className="event-list">
      {events.map(event => (
        <EventCard key={event._id} event={event} onRSVPToggle={onRSVPToggle} />
      ))}
    </div>
  );
}

export default EventList;
