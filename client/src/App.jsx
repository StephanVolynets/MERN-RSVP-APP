import React, { useState, useEffect } from "react";
import EventList from "./EventList";
import axios from "axios";
import "./App.css";

function App() {
  // State for storing events fetched from the server
  const [events, setEvents] = useState([]);
  // State for handling loading status, during API calls
  const [loading, setLoading] = useState(false);
  // State for handling any errors that occur during API calls
  const [error, setError] = useState(null);

  // Fetch data from the server when component reloads
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // API CALL #1
        const response = await axios.get("http://localhost:8080/api/events");
        setEvents(response.data);
        // console.log("Fetched events:", response.data); -- For Debugging purposes only --
        setError(null);
      } catch (err) { // handle errors
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  // New state to track RSVPs
  const [userRSVPs, setUserRSVPs] = useState({});

  // Function to toggle RSVPs:
  const toggleRSVP = async (eventId) => {
    // STOP duplicate API calls; I had a bug where I was clicking the RSVP button and it was sending multiple requests to the server?
    if (loading) return;

    // Check if user has already RSVPed to the event in past
    const isRSVPed = userRSVPs[eventId];
    const action = isRSVPed ? "unrsvp" : "rsvp"; // one button two actions(routes)

    setLoading(true);
    try {
      // API CALL #2
      const response = await axios.post(
        `http://localhost:8080/api/events/${eventId}/headCount/${action}`
      );
      const updatedEvent = response.data;

      if (updatedEvent) {
        setEvents(
          // Update the events state with the updated event
          events.map((event) => (event._id === eventId ? updatedEvent : event))
        );
        setUserRSVPs({ ...userRSVPs, [eventId]: !isRSVPed });
      } else { // handle error if no updated event is returned
        throw new Error("Failed to update head count");
      }
    } catch (err) { // handle error that occurs during API call
      console.error(err);
      setError("Error updating RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>RSVP App</h1>
      <h4> By Stephan Volynets</h4>
      {loading && <div className="loader"></div>}
      {error && <p>Error: {error}</p>}
      <EventList events={events} onRSVPToggle={toggleRSVP} />
    </div>
  );
}

export default App;
