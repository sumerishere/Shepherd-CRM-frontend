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
  const [filteredLeads, setFilteredLeads] = useState([]); // State to hold the filtered leads

  const fetchLeads = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-all-lead");
      const leadData = await response.json();

      setLeads(leadData || []);

      // Group leads by their followUpDate and create events for the calendar
      const eventsData = leadData.reduce((eventsAcc, lead) => {
        const followUpDate = moment(lead.followUpDate).startOf("day").toDate();
        const existingEvent = eventsAcc.find(
          (event) => moment(event.start).isSame(followUpDate, "day")
        );

        if (existingEvent) {
          existingEvent.title = `${parseInt(existingEvent.title) + 1} leads`; // Increment the count
        } else {
          eventsAcc.push({
            start: followUpDate,
            end: followUpDate,
            title: "1 lead", // Initial count for the event
            backgroundColor: getRandomColor(),
          });
        }
        return eventsAcc;
      }, []);

      setEvents(eventsData); // Update the events state with counted entries
    } catch (error) {
      alert("check server", error);
    }
  };

  useEffect(() => {
    fetchLeads(); // Fetch leads when the component mounts
  },[]);

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
        // backgroundColor: getRandomColor(),
        backgroundColor: getHashedColor(eventSlot.start),
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

  // Hashing function for consistent color generation based on followUpDate or event title
  const getHashedColor = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `#${((hash >> 24) & 0xff).toString(16)}${((hash >> 16) & 0xff).toString(16)}${((hash >> 8) & 0xff).toString(16)}`;
    return color;
  };

  const handleCustomAgendaClick = () => {
    const today = moment().format("YYYY-MM-DD"); // Get the current date

    // Filter the leads where followUpDate is equal to today's date
    const filteredLeadsByDate = leads.filter((lead) => {
      const followUpDate = moment(lead.followUpDate).format("YYYY-MM-DD");
      return followUpDate === today;
    });

    setFilteredLeads(filteredLeadsByDate); // Set the filtered leads
    fetchLeads();
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
              backgroundColor: getHashedColor(event.start.toString()),
              borderRadius: "13px",
              color: "white",
              border: "1px",
              display: "block",
              height: "30px",
              width: "84px",
              marginTop: "12px",
              // marginLeft: "12px",
              padding : "0px",
            },
          })}
          components={{
            event: ({ event }) => (
              <div className="rbc-event-content" title={event.title}>
                {event.title} {/* Displays the count of entries */}
              </div>
            ),
          }}
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
              {filteredLeads.length > 0 ? (
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
                    {filteredLeads.map((lead, index) => (
                      <tr key={index}>
                        <td id="followup-table-td">{lead.name}</td>
                        <td id="followup-table-td">{lead.mobileNumber}</td>
                        <td id="followup-table-td">{lead.email}</td>
                        <td id="followup-table-td">{lead.followUpDate}</td>
                        <td id="followup-table-td">{lead.assignTo || "N/A"}</td>
                        <td id="followup-table-td">
                          {lead.comments.map((commentItem) => (
                            <div key={commentItem.id}>
                              <strong>Comment:</strong> {commentItem.comment}{" "}
                              <br />
                              <strong>Time:</strong>{" "}
                              {new Date(commentItem.createdAt).toLocaleString()}{" "}
                              <br />
                            </div>
                          ))}
                        </td>
                        <td id="followup-table-td">{lead.statusType || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-followup-text-div">
                  <img className="no-followup-img" src="/images/no-followups.jpeg" alt="" />
                  <p id="no-followups-text">No followUps Found 😴</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalenderComponent;
