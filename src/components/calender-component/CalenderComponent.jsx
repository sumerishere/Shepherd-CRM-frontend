import "./CalenderComponent.css";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalenderComponent = () => {
  const [events, setEvents] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventSlot, setEventSlot] = useState(null);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        const notificationElement = document.querySelector(
          ".notification-container"
        );
        if (notificationElement) {
          notificationElement.classList.add("show");
        }
      }, 10); // Delay to ensure the element is rendered before applying the transition
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleSelectSlot = ({ start, end }) => {
    setEventSlot({ start, end });
    setShowNotification(true);
  };

  const handleAddEvent = () => {
    if (eventTitle) {
      const newEvent = {
        start: eventSlot.start,
        end: eventSlot.end,
        title: eventTitle,
        backgroundColor: getRandomColor(),
      };
      setEvents([...events, newEvent]);
      setEventTitle("");
      setShowNotification(false);
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="calendar-root-div">
      <div className="calendar-div">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ width: 584, height: 480 }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.backgroundColor,
              borderRadius: "4px",
              color: "white",
              border: "1px",
              display: "block",
              padding: "3px 1px",
            },
          })}
        />
      </div>

      {showNotification && (
        <div className="notification-container">
          <h3>Add Event😊</h3>
          <input
            type="text"
            placeholder="Enter event title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="event-input"
          />
          <div className="notification-buttons">
            <button onClick={handleAddEvent} className="ok-button">
              OK
            </button>
            <button
              onClick={() => setShowNotification(false)}
              className="back-button"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalenderComponent;
