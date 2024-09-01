import "./CalenderComponent.css";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalenderComponent = () => {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const fetchLeads = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-all-lead");
      const leadData = await response.json();

      setLeads(leadData || []);

      const eventsData = leadData.reduce((eventsAcc, lead) => {
        const followUpDate = moment(lead.followUpDate).startOf("day").toDate();
        const existingEvent = eventsAcc.find(
          (event) => moment(event.start).isSame(followUpDate, "day")
        );

        if (existingEvent) {
          existingEvent.title = `${parseInt(existingEvent.title) + 1}`;
        } else {
          eventsAcc.push({
            start: followUpDate,
            end: followUpDate,
            title: "1",
            backgroundColor: getHashedColor(followUpDate.toString()),
          });
        }
        return eventsAcc;
      }, []);

      setEvents(eventsData);
    } catch (error) {
      alert("check server", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const getHashedColor = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `#${((hash >> 24) & 0xff).toString(16)}${((hash >> 16) & 0xff).toString(16)}${((hash >> 8) & 0xff).toString(16)}`;
    return color;
  };

  const handleEventClick = (event) => {
    const clickedDate = moment(event.start).format("YYYY-MM-DD");
    const filteredLeadsByDate = leads.filter((lead) => {
      const followUpDate = moment(lead.followUpDate).format("YYYY-MM-DD");
      return followUpDate === clickedDate;
    });

    setFilteredLeads(filteredLeadsByDate);
    setShowTable(true);
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
          views={{ month: true, week: true, day: true }}
          view={currentView}
          onView={setCurrentView}
          style={{ width: 584, height: 480 }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.backgroundColor,
              borderRadius: "13px",
              color: "white",
              border: "1px",
              display: "block",
              height: "30px",
              width: "70px",
              marginTop: "20px",
              marginLeft: "5px",
              padding: "0px",
              textAlign: "center",
            },
          })}
          components={{
            event: ({ event }) => (
              <div 
                className="rbc-event-content" 
                title={event.title}
                onClick={() => handleEventClick(event)}
              >
                {event.title}
              </div>
            ),
          }}
        />
      </div>

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