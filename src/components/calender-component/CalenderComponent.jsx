import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
import "./CalenderComponent.css";

const localizer = momentLocalizer(moment);

const CalenderComponent = () => {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [leads, setLeads] = useState([]);
  const [leadData, setLeadData] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // New state for showing update form and tracking selected lead data
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    followUpDate: "",
    assignTo: "",
    comments: "",
    statusType: "",
  });

  const fetchLeads = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-all-lead");
      const leadData = await response.json();

      setLeads(leadData || []);

      const eventsData = leadData.reduce((eventsAcc, lead) => {
        const followUpDate = moment(lead.followUpDate).startOf("day").toDate();

        const existingEvent = eventsAcc.find((event) =>
          moment(event.start).isSame(followUpDate, "day")
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
      toast.error("Failed to fetch leads");
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
    const color = `#${((hash >> 24) & 0xff).toString(16)}${(
      (hash >> 16) &
      0xff
    ).toString(16)}${((hash >> 8) & 0xff).toString(16)}`;
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

  // Function to handle clicking on a table entry to open the update form
  const handleLeadClick = async (lead) => {
    try {
      const response = await fetch(
        `http://localhost:8080/get-lead-by-id/${lead.uid}`
      );
      const leadData = await response.json();

      setSelectedLead(leadData);
      
      setUpdateFormData({
        name: leadData.name || "",
        mobileNumber: leadData.mobileNumber || "",
        email: leadData.email || "",
        followUpDate: leadData.followUpDate || "",
        assignTo: leadData.assignTo || "",
        comments:
          leadData.comments.map((comment) => comment.comment).join(", ") || "",
        statusType: leadData.statusType || "",
      });
    
      setShowUpdateForm(true);
    } catch (error) {
      toast.error("Failed to fetch lead details", error);
    }
  };

  // Function to handle form changes
  const handleFormChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission and send PUT request
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the lead follow-up data
    const leadFollowUpData = {
      name: updateFormData.name || selectedLead.name,
      email: updateFormData.email || selectedLead.email,
      mobileNumber: updateFormData.mobileNumber || selectedLead.mobileNumber,
      followUpDate: updateFormData.followUpDate || selectedLead.followUpDate,
      assignTo: updateFormData.assignTo || selectedLead.assignTo,
      statusType: updateFormData.statusType || selectedLead.statusType,
    };

    // Construct the payload with leadFollowUp data only
    const payload = {
      name: leadFollowUpData.name,
      email: leadFollowUpData.email,
      mobileNumber: leadFollowUpData.mobileNumber,
      followUpDate: leadFollowUpData.followUpDate,
      assignTo: leadFollowUpData.assignTo,
      statusType: leadFollowUpData.statusType,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/update-followup/${selectedLead.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Send the properly structured payload
        }
      );

      if (response.ok) {
        toast.success("Lead updated successfully!");
        setShowUpdateForm(false);
        fetchLeads(); // Refresh leads after update
      } else {
        toast.error("Failed to update lead.");
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      toast.error("An error occurred while updating the lead.");
    }
  };

  // Function to handle closing the update form
  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  const [showCommentHistory, setShowCommentHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [noHistoryAvailable, setNoHistoryAvailable] = useState(false);

  const handleViewCommentsClick = (lead) => {
    // Set the history data for the selected lead
    const comments = lead.comments || [];
    setHistoryData(comments);
    setNoHistoryAvailable(comments.length === 0);

    // Toggle visibility of the comment history
    setLeadData(lead);
    setShowCommentHistory(true);
  };

  const closeCommentHistory = () => {
    setShowCommentHistory(false);
    setHistoryData([]);
  };

  return (
    <div className="calendar-root-div">
      <ToastContainer />
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
          eventPropGetter={(event) => {
            const eventDate = moment(event.start).startOf("day").toDate(); // Get the start date of the event
            const today = new Date(); // Get today's date

            // Compare day, month, and year to apply boxShadow conditionally
            const setDateCss =
              eventDate.getDate() === today.getDate() &&
              eventDate.getMonth() === today.getMonth() &&
              eventDate.getFullYear() === today.getFullYear();

            return {
              style: {
                backgroundColor: event.backgroundColor,
                borderRadius: "6px",
                color: "white",
                border: setDateCss ? "1.5px solid white" : "1px solid #7F7F7F",
                display: "block",
                height: "24px",
                width: "68px",
                marginTop: "20px",
                marginLeft: "5px",
                padding: "0px",
                boxShadow: setDateCss
                  ? "0px 3px 5px 0px rgb(0, 0, 0, 0.9)"
                  : "none", // Box shadow only for matching dates
                textAlign: "center",
              },
            };
          }}
          components={{
            event: ({ event }) => (
              <div
                className="rbc-event-content"
                title={event.title}
                style={{
                  margin: "-4px 0px",
                  padding: "0px",
                  width: "100%",
                  height: "100%",
                }}
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
                      <th>Status Type</th>
                      <th>Comments</th>
                      <th id="comments-action-colmn">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead, index) => (
                      <tr key={index} >
                        <td id="followup-table-td">{lead.name || "N/A"}</td>
                        <td id="followup-table-td">{lead.mobileNumber}</td>
                        <td id="followup-table-td">{lead.email || "N/A"}</td>
                        <td id="followup-table-td">
                          {lead.followUpDate || "N/A"}
                        </td>
                        <td id="followup-table-td">{lead.assignTo || "N/A"}</td>

                        <td id="followup-table-td">
                          {lead.statusType || "N/A"}
                        </td>
                        
                        <td id="followup-table-td">
                          {lead.comments && lead.comments.length > 0 ? (
                            <div>
                              <strong>Comment:</strong>{" "}
                              {lead.comments[0].comment}
                              {lead.comments.length > 1 && " ...."}
                            </div>
                          ) : (
                            "No Comments"
                          )}
                        </td>

                        <td>
                          <button
                            id="view-comment-btn"
                            onClick={() => handleViewCommentsClick(lead)}
                          >
                            view comments
                          </button>
                          <button onClick={() => handleLeadClick(lead)} id="update-lead-btn">Update lead</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No leads found for this date.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {showCommentHistory && (
        <div className="view-comment-form-div">
          <div className="lead-history-comments-div">
            <div className="history-close-box-btn-div">
              <button
                className="history-close-box-btn"
                onClick={closeCommentHistory}
              >
                X
              </button>
            </div>
            <p id="comment-headline-p">Comments History : {leadData.name || "N/A"} </p>
            <div className="lead-comments-div">
              {noHistoryAvailable ? (
                <p id="no-chats-p-id">No Comments available 😴</p>
              ) : (
                historyData
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((item) => (
                    <div key={item.id} className="history-comment-item">
                      <p>{item.comment}</p>
                      <span className="history-comment-date">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {showUpdateForm && (
        <div className="update-notifier-overlay ">
          <div className="update-notifier-form-container">
            <button
              onClick={handleCloseUpdateForm}
              className="update-notifier-close-btn"
            >
              X
            </button>
            <div className="update-notifier-header">Update FollowUp</div>
            <form onSubmit={handleFormSubmit}>
              <label className="update-notifier-label">
                Name:
                <input
                  type="text"
                  name="name"
                  value={updateFormData.name}
                  onChange={handleFormChange}
                  className="update-notifier-input"
                />
              </label>
              <label className="update-notifier-label">
                Mobile Number:
                <input
                  type="text"
                  name="mobileNumber"
                  value={updateFormData.mobileNumber}
                  onChange={handleFormChange}
                  className="update-notifier-input"
                />
              </label>
              <label className="update-notifier-label">
                Email:
                <input
                  type="email"
                  name="email"
                  value={updateFormData.email}
                  onChange={handleFormChange}
                  className="update-notifier-input"
                />
              </label>
              <label className="update-notifier-label">
                Follow Up Date:
                <input
                  type="datetime-local"
                  name="followUpDate"
                  value={updateFormData.followUpDate}
                  onChange={handleFormChange}
                  className="update-notifier-input"
                  min={getCurrentDateTime()}
                />
              </label>
              <label className="update-notifier-label">
                Assign To:
                <input
                  type="text"
                  name="assignTo"
                  value={updateFormData.assignTo}
                  onChange={handleFormChange}
                  className="update-notifier-input"
                />
              </label>

              <label className="update-notifier-label">
                Status Type:
                <input
                  type="text"
                  name="statusType"
                  value={updateFormData.statusType}
                  onChange={handleFormChange}
                  className="update-notifier-input"
                />
              </label>
              <button type="submit" className="update-notifier-submit-btn">
                Update Lead
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default CalenderComponent;
