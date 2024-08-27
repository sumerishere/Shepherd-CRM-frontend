import "./CalenderComponent.css";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalenderComponent = () => {
  const [events, setEvents] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventSlot, setEventSlot] = useState(null);
  const [currentView, setCurrentView] = useState(Views.MONTH); // Track the current view
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-all-lead");
      const leadData = await response.json();

      setLeads(leadData || []);
    } catch (error) {
      alert("got error", error);
    }
  };

  useEffect(() => {
    fetchLeads(); // Fetch leads when the component mounts
  }, []);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        const notificationElement = document.querySelector(
          ".notification-container"
        );
        if (notificationElement) {
          notificationElement.classList.add("show");
        }
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  useEffect(() => {
    if (currentView !== Views.AGENDA) {
      setShowTable(false); // Hide table when not in Agenda view
    }
  }, [currentView]);

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

  const handleCustomAgendaClick = () => {
    setShowTable(true); // Show table container on custom agenda button click
  };

  const handleCloseTable = () => {
    setShowTable(false);
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
          views={{ month: true, week: true, day: true }}
          view={currentView}
          onView={setCurrentView}
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

      <button
        onClick={handleCustomAgendaClick}
        className="custom-agenda-button"
      >
        Show FollowUps
      </button>

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

      {showTable && (
        <div className="table-container-parent">
          <div className="table-container">
            <div className="followup-close-btn-div">
              <p className="followup-text-p">FollowUps</p>
              <button onClick={handleCloseTable} className="table-close-button">
                X
              </button>
            </div>

            <div className="followup-notifier-table-div">
              <table className="followup-notifier-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Follow Up</th>
                    <th>Assign To</th>
                    <th>Comments</th>
                    <th>Status Type</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, index) => (
                    <tr key={index}>
                      <td id="followup-table-td">{lead.name}</td>
                      <td id="followup-table-td">{lead.mobileNumber}</td>
                      <td id="followup-table-td">{lead.email}</td>
                      <td id="followup-table-td">{lead.followUpDate}</td>
                      <td id="followup-table-td">{lead.assignTo}</td>
                      <td id="followup-table-td">
                        {lead.comments.map((commentItem) => (
                          <div  key={commentItem.id}>
                            <strong>Comment:</strong> {commentItem.comment}{" "}
                            <br />
                            <strong>Time:</strong>{" "}
                            {new Date(commentItem.createdAt).toLocaleString()}{" "}
                            <br />
                          </div>
                        ))}
                      </td>
                      <td id="followup-table-td">{lead.statusType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default CalenderComponent;
