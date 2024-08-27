import { useEffect, useState } from "react";
import "./LeadFollowUp.css";
import {
  FormOutlined,
  DeleteOutlined,
  HistoryOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";


const LeadFollowUp = () => {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [noHistoryAvailable, setNoHistoryAvailable] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({}); // Add state for managing selected checkboxes
  const [filteredLeads, setFilteredLeads] = useState([]); // Added state for filtered leads
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(""); // State for category filter

  //------- getting all data from backend of lead table -------//
  // Fetch leads
  const fetchLeads = async () => {
    setLoading(true); // Set loading to true when starting to fetch
    try {
      const response = await fetch("http://localhost:8080/get-all-lead");
      const data = await response.json();
      setLeads(data || []);
      setFilteredLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to force re-render by changing the key
  useEffect(() => {
    fetchLeads();
  }, []);

  const handleRefresh = () => {
    fetchLeads();
  };

  const handleSearch = async (text) => {
    try {
      const response = await fetch(`http://localhost:8080/search-lead-name?name=${text}`);
      const data = await response.json();
      setFilteredLeads(data || []);
    } catch (error) {
      console.error("Error searching leads:", error);
    }
  };

  const debouncedSearch = debounce((text) => handleSearch(text), 300);


  useEffect(() => {
    if (searchText.length >= 3) {
      debouncedSearch(searchText);
    } else {
      // Reset filtered leads if search text is less than 3 characters
      setFilteredLeads(leads);
    }
  }, [searchText, leads, debouncedSearch]);



  // ---- Handle category filter change -------//
  const handleCategoryFilterChange = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);

    if (selectedCategory === "") {
      setFilteredLeads(leads); // Reset to all leads if no category is selected
    } else {
      setFilteredLeads(
        leads.filter((lead) => lead.category === selectedCategory)
      );
    }
  };

  const handleDelete = (uid) => {
    setLeadToDelete(uid);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (leadToDelete) {
      try {
        await fetch(`http://localhost:8080/delete-lead-by-id/${leadToDelete}`, {
          method: "DELETE",
        });

        setLeads(leads.filter((lead) => lead.uid !== leadToDelete));
        setFilteredLeads(
          filteredLeads.filter((lead) => lead.uid !== leadToDelete)
        );
        toast.success("Lead deleted successfully!");
        setShowDeleteConfirm(false);
        setLeadToDelete(null);
      } catch (error) {
        console.error("Error deleting lead:", error);
        toast.error("Failed to delete lead. Please try again.");
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setLeadToDelete(null);
  };

  const handleUpdate = async (uid) => {
    try {
      const response = await fetch(
        `http://localhost:8080/get-lead-by-id/${uid}`
      );
      const data = await response.json();
      console.log("Lead data fetched successfully:", data);
      setSelectedLead(data);
      setShowUpdateForm(true);
    } catch (error) {
      console.error("Error fetching lead data:", error);
    }
  };

  const handleHistory = async (uid) => {
    try {
      // Fetch the lead's data
      const leadResponse = await fetch(
        `http://localhost:8080/get-lead-by-id/${uid}`
      );
      const leadData = await leadResponse.json();

      // Set the lead data to show user info in the history container
      setSelectedLead(leadData);

      // Fetch the comments (history) data
      const commentsResponse = await fetch(
        `http://localhost:8080/get-comments-by-id/${uid}`
      );
      const commentsData = await commentsResponse.json();

      // Set the comments data to show the history
      if (Array.isArray(commentsData) && commentsData.length === 0) {
        console.log("lead comment : ", commentsData);
        setNoHistoryAvailable(true);
      } else {
        setHistoryData(Array.isArray(commentsData) ? commentsData : []);
        setNoHistoryAvailable(false);
      }

      // Show the history container with user info and comments
      setShowHistory(true);
    } catch (error) {
      console.error("Error fetching history or lead data:", error);
      setNoHistoryAvailable(true);
      setShowHistory(true);
    }
  };

  const closeHistory = () => {
    setShowHistory(false);
    setNoHistoryAvailable(false);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const newComment = event.target.newComment.value;

    if (!selectedLead) return;

    const updatedLeadData = {
      leadFollowUp: {
        name: event.target.name.value,
        email: event.target.email.value,
        mobileNumber: event.target.mobileNumber.value,
        address: event.target.address.value,
        qualification: event.target.qualification.value,
        courseType: event.target.courseType.value,
        source: event.target.source.value,
        referName: event.target.referName.value,
        category: event.target.category.value,
        followUpDate : event.target.followUpDate.value
      },
      comments: [newComment],
    };

    try {
      const response = await fetch(
        `http://localhost:8080/update-lead-by-id/${selectedLead.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLeadData),
        }
      );

      // Check if the response is in JSON format
      const contentType = response.headers.get("content-type");

      if (response.ok) {
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
          console.log("Lead updated successfully:", data);
        } else {
          const textData = await response.text();
          console.log("Lead updated successfully:", textData);
        }
        toast.success("Lead updated successfully!!!");
        setShowUpdateForm(false);
        setSelectedLead(null);
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage);
        // throw new Error('Failed to update lead');
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      toast.error("Failed to update lead,", error);
    }
  };

  const cancelUpdateForm = () => {
    setShowUpdateForm(false);
  };

  // if (leads.length === 0) {
  //   return (
  //     <div className="follow-up-div">
  //       <hr />
  //       <p id="client-data-empty-text">No entries are available.</p>
  //       <hr />
  //     </div>
  //   );
  // } else {
    if (loading) {
      return <div id="loading-id">Loading...</div>;
    }
  // }

  // Handle checkbox change
  const handleCheckboxChange = (uid) => {
    setSelectedCheckboxes((prev) => ({
      ...prev,
      [uid]: !prev[uid],
    }));
  };

  return (
    <div className="lead-data-root">
      <ToastContainer />
      <p id="lead-data-heading">Lead-Table</p>

      {/* search input div*/}
      <div className="lead-search-div">
        <input
          type="text"
          placeholder="Search lead here"
          id="lead-search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button id="lead-search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <hr />
      <div className="add-btn-filter-lead-div">
        <div className="add-lead-btn-div">
          <Link
            to="/LeadRegistrationForm"
            style={{ textDecoration: "none", color: "white" }}
          >
            <button id="add-lead-btn">Add Lead</button>
          </Link>
        </div>

        {/* filter lead by category */}
        <div className="filter-lead-drop">
          <select
            id="select-filter-lead"
            value={categoryFilter}
            style={{ cursor: "pointer" }}
            onChange={handleCategoryFilterChange}
          >
            <option value="">Filter Lead</option>
            <option value="hot">Hot</option>
            <option value="warm">Warm</option>
            <option value="cold">Cold</option>
          </select>
        </div>
        <button id="lead-table-refresh-btn" onClick={handleRefresh}>
          <RedoOutlined />
        </button>
      </div>

      <div className="lead-table-root">
        <div className="lead-table-div">
          <table className="lead-table">
            <thead>
              <tr>
                <th>Deal-Done</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Address</th>
                <th>Qualification</th>
                <th>courseType</th>
                <th>FollowUp-DateTime</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      fontFamily: "Lucida Sans",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                  >
                    Lead not found 😭
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.uid}>
                    <td id="table-td-checkbox">
                      <input
                        style={{ cursor: "pointer" }}
                        type="checkbox"
                        checked={!!selectedCheckboxes[lead.uid]}
                        onChange={() => handleCheckboxChange(lead.uid)}
                      />

                      <div
                        className="lead-color-code"
                        id={
                          lead.category === "hot"
                            ? "hot-lead"
                            : lead.category === "warm"
                            ? "warm-lead"
                            : lead.category === "cold"
                            ? "cold-lead"
                            : ""
                        }
                      ></div>
                    </td>
                    <td id="table-td">{lead.name}</td>
                    <td id="table-td">{lead.email}</td>
                    <td id="table-td">{lead.mobileNumber}</td>
                    <td id="table-td">{lead.address}</td>
                    <td id="table-td">{lead.qualification}</td>
                    <td id="table-td">{lead.courseType}</td>
                    {/* <td>{new Date(lead.createdAt).toLocaleString()}</td> */}
                    <td id="table-td">{lead.followUpDate}</td>
                    <td>
                      <button
                        className="action-btn update-btn"
                        onClick={() => handleUpdate(lead.uid)}
                      >
                        <FormOutlined />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(lead.uid)}
                      >
                        <DeleteOutlined />
                      </button>
                      <button
                        className="action-btn history-btn"
                        onClick={() => handleHistory(lead.uid)}
                      >
                        <HistoryOutlined />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showUpdateForm && selectedLead && (
        <div className="updateFormContainer">
          <form className="updateForm" onSubmit={handleUpdateSubmit}>
            <label className="updateFormLabel">Name</label>
            <input
              className="updateFormInput"
              type="text"
              name="name"
              defaultValue={selectedLead.name || ""}
            />

            <label className="updateFormLabel">Email</label>
            <input
              className="updateFormInput"
              type="email"
              name="email"
              defaultValue={selectedLead.email || ""}
            />

            <label className="updateFormLabel">Mobile Number</label>
            <input
              className="updateFormInput"
              type="tel"
              name="mobileNumber"
              defaultValue={selectedLead.mobileNumber || ""}
            />

            <label className="updateFormLabel">Address</label>
            <input
              className="updateFormInput"
              type="text"
              name="address"
              defaultValue={selectedLead.address || ""}
            />

            <label className="updateFormLabel">Qualification</label>
            <input
              className="updateFormInput"
              type="text"
              name="qualification"
              defaultValue={selectedLead.qualification || ""}
            />

            <label className="updateFormLabel">Course Type</label>
            <input
              className="updateFormInput"
              type="text"
              name="courseType"
              defaultValue={selectedLead.courseType || ""}
            />

            <label className="updateFormLabel">Source</label>
            <input
              className="updateFormInput"
              type="text"
              name="source"
              defaultValue={selectedLead.source || ""}
            />

            <label className="updateFormLabel">Refer Name</label>
            <input
              className="updateFormInput"
              type="text"
              name="referName"
              defaultValue={selectedLead.referName || ""}
            />

            <label className="updateFormLabel">Category</label>
            <input
              className="updateFormInput"
              type="text"
              name="category"
              defaultValue={selectedLead.category || ""}
            />

            <label className="updateFormLabel">FollowUp-Date</label>
            <input
              className="updateFormInput"
              type="datetime-local"
              name="followUpDate"
              defaultValue={selectedLead.followUpDate || ""}
            />

            <label className="updateFormLabel">New Comment</label>
            <textarea
              className="updateFormTextarea"
              placeholder="add new comment under(1-151) letters"
              name="newComment"
            />

            <button className="updateFormButtonSubmit" type="submit">
              Update
            </button>
            <button
              className="updateFormButtonCancel"
              type="button"
              onClick={cancelUpdateForm}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* show history of lead*/}

      {showHistory && selectedLead && (
        <div className="history-container">
          <div className="history-header">
            <span className="history-title">
              Profile of{" "}
              {historyData.length > 0 ? historyData[0]?.leadName : "Lead"}
            </span>
            <button className="history-close-btn" onClick={closeHistory}>
              X
            </button>
          </div>
          <div className="history-profile-info">
            <div className="history-profile-column">
              <p>
                <strong>Name:</strong> {selectedLead.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {selectedLead.email || "N/A"}
              </p>
              <p>
                <strong>Mobile Number:</strong>{" "}
                {selectedLead.mobileNumber || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {selectedLead.address || "N/A"}
              </p>
            </div>
            <div className="history-profile-column">
              <p>
                <strong>Qualification:</strong>{" "}
                {selectedLead.qualification || "N/A"}
              </p>
              <p>
                <strong>Source:</strong> {selectedLead.source || "N/A"}
              </p>
              <p>
                <strong>Refer Name:</strong> {selectedLead.referName || "N/A"}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                {`----  (${selectedLead.category})` || "N/A"}
              </p>
              <div
                className="lead-color-code category-history-code"
                id={
                  selectedLead.category === "hot"
                    ? "hot-lead"
                    : selectedLead.category === "warm"
                    ? "warm-lead"
                    : selectedLead.category === "cold"
                    ? "cold-lead"
                    : ""
                }
              ></div>
            </div>
          </div>
          <hr />
          <h4 id="comment-box-title">Comments :</h4>

          <div className="history-comments">
            {noHistoryAvailable ? (
              <p id="no-chats-p-id">No Comments available😴</p>
            ) : (
              historyData
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sorting comments by date (newest first)
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
      )}

      {showDeleteConfirm && (
        <div className="delete-confirm-container">
          <div className="delete-confirm-content">
            <p id="delete-note-text-id">
              Are you sure you want to delete this lead entry? 🥺
            </p>
            <div className="delete-confirm-buttons">
              <button className="confirm-btn" onClick={confirmDelete}>
                Yes
              </button>
              <button className="cancel-btn" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadFollowUp;
