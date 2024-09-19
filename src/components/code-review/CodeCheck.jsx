const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Extract required fields
    const { billedByName, billedToName } = invoiceDetails;
  
    if (!billedByName || !billedToName) {
      toast.error("Please fill all the required fields!");
      return;
    }
  
    // Generate the PDF
    generatePDF();
  
    // Assuming you want to send invoice data to a backend
    setLoading(true); // Show loading spinner
    try {
      const response = await axios.post('/your-api-endpoint', {
        billedByName,
        billedToName,
        items,
        payments,
      });
      setLoading(false);
      toast.success("Invoice saved successfully!");
    } catch (error) {
      setLoading(false);
      toast.error("Error saving invoice. Please try again.");
    }
  };
  













// import { useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';

// const InvoiceForm = () => {
//     const [candidateName, setCandidateName] = useState('');
//     const [candidateMobile, setCandidateMobile] = useState('');
//     const [candidateMail, setCandidateMail] = useState('');
//     const [organizationName, setOrganizationName] = useState('');

//     const generatePDF = () => {
//         const doc = new jsPDF();

//         doc.text('Invoice', 10, 10);
//         doc.text(`Candidate Name: ${candidateName}`, 10, 20);
//         doc.text(`Mobile Number: ${candidateMobile}`, 10, 30);
//         doc.text(`Email: ${candidateMail}`, 10, 40);
//         doc.text(`Organization Name: ${organizationName}`, 10, 50);

//         return doc;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const doc = generatePDF();
//         const pdfBlob = doc.output('blob');

//         const formData = new FormData();
        
//         formData.append('candidateName', candidateName);
//         formData.append('candidateMobile', candidateMobile);
//         formData.append('candidateMail', candidateMail);
//         formData.append('organizationName', organizationName);
//         formData.append('invoicePdf', pdfBlob, 'invoice.pdf');

//         try {
//             const response = await axios.post('http://localhost:8080/save-invoice', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             alert(response.data);
//         } catch (error) {
//             console.error('Error saving invoice:', error);
//             alert('Failed to save invoice');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Candidate Name:</label>
//                 <input
//                     type="text"
//                     value={candidateName}
//                     onChange={(e) => setCandidateName(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>Mobile Number:</label>
//                 <input
//                     type="text"
//                     value={candidateMobile}
//                     onChange={(e) => setCandidateMobile(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>Email:</label>
//                 <input
//                     type="email"
//                     value={candidateMail}
//                     onChange={(e) => setCandidateMail(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>Organization Name:</label>
//                 <input
//                     type="text"
//                     value={organizationName}
//                     onChange={(e) => setOrganizationName(e.target.value)}
//                     required
//                 />
//             </div>
//             <button type="submit">Generate Invoice</button>
//         </form>
//     );
// };

// export default InvoiceForm;



































// import { useEffect, useState } from "react";
// import "./LeadFollowUp.css";
// import {
//   FormOutlined,
//   DeleteOutlined,
//   HistoryOutlined,
// } from "@ant-design/icons";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";

// const LeadFollowUp = () => {
//   const [loading, setLoading] = useState(true);
//   const [leads, setLeads] = useState([]);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [showHistory, setShowHistory] = useState(false);
//   const [historyData, setHistoryData] = useState([]);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [leadToDelete, setLeadToDelete] = useState(null);
//   const [noHistoryAvailable, setNoHistoryAvailable] = useState(false);
//   const [selectedCheckboxes, setSelectedCheckboxes] = useState({}); // Add state for managing selected checkboxes
//   const [filteredLeads, setFilteredLeads] = useState([]); // Added state for filtered leads
//   const [searchText, setSearchText] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState(""); // State for category filter

//   //------- getting all data from backend of lead table -------//
//   useEffect(() => {
//     const fetchLeads = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/get-all-lead");
//         const data = await response.json();
//         setLeads(data || []);
//         setFilteredLeads(data || []); // Initialize filtered leads
//       } catch (error) {
//         console.error("Error fetching leads:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLeads();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/search-lead-name?name=${searchText}`
//       );
//       const data = await response.json();
//       setFilteredLeads(data || []); // Update filtered leads based on search
//     } catch (error) {
//       console.error("Error searching leads:", error);
//     }
//   };

//   // ---- Handle category filter change -------//
//   const handleCategoryFilterChange = (e) => {
//     const selectedCategory = e.target.value;
//     setCategoryFilter(selectedCategory);

//     if (selectedCategory === "") {
//       setFilteredLeads(leads); // Reset to all leads if no category is selected
//     } else {
//       setFilteredLeads(
//         leads.filter((lead) => lead.category === selectedCategory)
//       );
//     }
//   };

//   const handleDelete = (uid) => {
//     setLeadToDelete(uid);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDelete = async () => {
//     if (leadToDelete) {
//       try {
//         await fetch(`http://localhost:8080/delete-lead-by-id/${leadToDelete}`, {
//           method: "DELETE",
//         });

//         setLeads(leads.filter((lead) => lead.uid !== leadToDelete));
//         setFilteredLeads(
//           filteredLeads.filter((lead) => lead.uid !== leadToDelete)
//         );
//         toast.success("Lead deleted successfully!");
//         setShowDeleteConfirm(false);
//         setLeadToDelete(null);
//       } catch (error) {
//         console.error("Error deleting lead:", error);
//         toast.error("Failed to delete lead. Please try again.");
//       }
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteConfirm(false);
//     setLeadToDelete(null);
//   };

//   const handleUpdate = async (uid) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/get-lead-by-id/${uid}`
//       );
//       const data = await response.json();
//       console.log("Lead data fetched successfully:", data);
//       setSelectedLead(data);
//       setShowUpdateForm(true);
//     } catch (error) {
//       console.error("Error fetching lead data:", error);
//     }
//   };

//   const handleHistory = async (uid) => {
//     try {
//       // Fetch the lead's data
//       const leadResponse = await fetch(
//         `http://localhost:8080/get-lead-by-id/${uid}`
//       );
//       const leadData = await leadResponse.json();

//       // Set the lead data to show user info in the history container
//       setSelectedLead(leadData);

//       // Fetch the comments (history) data
//       const commentsResponse = await fetch(
//         `http://localhost:8080/get-comments-by-id/${uid}`
//       );
//       const commentsData = await commentsResponse.json();

//       // Set the comments data to show the history
//       if (Array.isArray(commentsData) && commentsData.length === 0) {
//         console.log("lead comment : ", commentsData);
//         setNoHistoryAvailable(true);
//       } else {
//         setHistoryData(Array.isArray(commentsData) ? commentsData : []);
//         setNoHistoryAvailable(false);
//       }

//       // Show the history container with user info and comments
//       setShowHistory(true);
//     } catch (error) {
//       console.error("Error fetching history or lead data:", error);
//       setNoHistoryAvailable(true);
//       setShowHistory(true);
//     }
//   };

//   const closeHistory = () => {
//     setShowHistory(false);
//     setNoHistoryAvailable(false);
//   };

//   const handleUpdateSubmit = async (event) => {
//     event.preventDefault();
//     const newComment = event.target.newComment.value;

//     if (!selectedLead) return;

//     const updatedLeadData = {
//       leadFollowUp: {
//         name: event.target.name.value,
//         email: event.target.email.value,
//         mobileNumber: event.target.mobileNumber.value,
//         address: event.target.address.value,
//         qualification: event.target.qualification.value,
//         source: event.target.source.value,
//         referName: event.target.referName.value,
//         category: event.target.category.value,
//       },
//       comments: [newComment],
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:8080/update-lead-by-id/${selectedLead.uid}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedLeadData),
//         }
//       );

//       // Check if the response is in JSON format
//       const contentType = response.headers.get("content-type");

//       if (response.ok) {
//         let data;
//         if (contentType && contentType.includes("application/json")) {
//           data = await response.json();
//           console.log("Lead updated successfully:", data);
//         } else {
//           const textData = await response.text();
//           console.log("Lead updated successfully:", textData);
//         }
//         toast.success("Lead updated successfully!!!");
//         setShowUpdateForm(false);
//         setSelectedLead(null);
//       } else {
//         const errorMessage = await response.text();
//         toast.error(errorMessage);
//         // throw new Error('Failed to update lead');
//       }
//     } catch (error) {
//       console.error("Error updating lead:", error);
//       toast.error("Failed to update lead,", error);
//     }
//   };

//   const cancelUpdateForm = () => {
//     setShowUpdateForm(false);
//   };

//   if (leads.length === 0) {
//     return (
//       <div className="follow-up-div">
//         <hr />
//         <p id="client-data-empty-text">No entries are available.</p>
//         <hr />
//       </div>
//     );
//   } else {
//     if (loading) {
//       return <div id="loading-id">Loading...</div>;
//     }
//   }

//   // Handle checkbox change
//   const handleCheckboxChange = (uid) => {
//     setSelectedCheckboxes((prev) => ({
//       ...prev,
//       [uid]: !prev[uid],
//     }));
//   };

//   return (
//     <div className="lead-data-root">
//       <ToastContainer />
//       <p id="lead-data-heading">Lead-Table</p>

//       {/* search input div*/}
//       <div className="lead-search-div">
//         <input
//           type="text"
//           placeholder="Search lead here"
//           id="lead-search-input"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//         <button id="lead-search-btn" onClick={handleSearch}>
//           Search
//         </button>
//       </div>

//       <hr />
//       <div className="add-btn-filter-lead-div">
//         <div className="add-lead-btn-div">
//           <Link
//             to="/LeadRegistrationForm"
//             style={{ textDecoration: "none", color: "white" }}
//           >
//             <button id="add-lead-btn">Add Lead</button>
//           </Link>
//         </div>

//         {/* filter lead by category */}
//         <div className="filter-lead-drop">
//           <select
//             id="select-filter-lead"
//             value={categoryFilter}
//             style={{ cursor: "pointer" }}
//             onChange={handleCategoryFilterChange}
//           >
//             <option value="">Filter Lead</option>
//             <option value="hot">Hot</option>
//             <option value="warm">Warm</option>
//             <option value="cold">Cold</option>
//           </select>
//         </div>
//       </div>

//       <div className="lead-table-root">
//         <div className="lead-table-div">
//           <table className="lead-table">
//             <thead>
//               <tr>
//                 <th>Deal-Done</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Mobile Number</th>
//                 <th>Address</th>
//                 <th>Qualification</th>
//                 <th>courseType</th>
//                 <th>Connected At</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredLeads.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="9"
//                     style={{
//                       fontFamily: "Lucida Sans",
//                       textAlign: "center",
//                       fontSize: "20px",
//                     }}
//                   >
//                     Lead not found 😭
//                   </td>
//                 </tr>
//               ) : (
//                 filteredLeads.map((lead) => (
//                   <tr key={lead.uid}>
//                     <td id="table-td-checkbox">
//                       <input
//                         style={{ cursor: "pointer" }}
//                         type="checkbox"
//                         checked={!!selectedCheckboxes[lead.uid]}
//                         onChange={() => handleCheckboxChange(lead.uid)}
//                       />

//                       <div
//                         className="lead-color-code"
//                         id={
//                           lead.category === "hot"
//                             ? "hot-lead"
//                             : lead.category === "warm"
//                             ? "warm-lead"
//                             : lead.category === "cold"
//                             ? "cold-lead"
//                             : ""
//                         }
//                       ></div>
//                     </td>
//                     <td id="table-td">{lead.name}</td>
//                     <td id="table-td">{lead.email}</td>
//                     <td id="table-td">{lead.mobileNumber}</td>
//                     <td id="table-td">{lead.address}</td>
//                     <td id="table-td">{lead.qualification}</td>
//                     <td id="table-td">{lead.courseType}</td>
//                     <td>{new Date(lead.createdAt).toLocaleString()}</td>
//                     <td>
//                       <button
//                         className="action-btn update-btn"
//                         onClick={() => handleUpdate(lead.uid)}
//                       >
//                         <FormOutlined />
//                       </button>
//                       <button
//                         className="action-btn delete-btn"
//                         onClick={() => handleDelete(lead.uid)}
//                       >
//                         <DeleteOutlined />
//                       </button>
//                       <button
//                         className="action-btn history-btn"
//                         onClick={() => handleHistory(lead.uid)}
//                       >
//                         <HistoryOutlined />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showUpdateForm && selectedLead && (
//         <div className="updateFormContainer">
//           <form className="updateForm" onSubmit={handleUpdateSubmit}>
//             <label className="updateFormLabel">Name</label>
//             <input
//               className="updateFormInput"
//               type="text"
//               name="name"
//               defaultValue={selectedLead.name || ""}
//             />

//             <label className="updateFormLabel">Email</label>
//             <input
//               className="updateFormInput"
//               type="email"
//               name="email"
//               defaultValue={selectedLead.email || ""}
//             />

//             <label className="updateFormLabel">Mobile Number</label>
//             <input
//               className="updateFormInput"
//               type="tel"
//               name="mobileNumber"
//               defaultValue={selectedLead.mobileNumber || ""}
//             />

//             <label className="updateFormLabel">Address</label>
//             <input
//               className="updateFormInput"
//               type="text"
//               name="address"
//               defaultValue={selectedLead.address || ""}
//             />

//             <label className="updateFormLabel">Qualification</label>
//             <input
//               className="updateFormInput"
//               type="text"
//               name="qualification"
//               defaultValue={selectedLead.qualification || ""}
//             />

//             <label className="updateFormLabel">Source</label>
//             <input
//               className="updateFormInput"
//               type="text"
//               name="source"
//               defaultValue={selectedLead.source || ""}
//             />

//             <label className="updateFormLabel">Refer Name</label>
//             <input
//               className="updateFormInput"
//               type="text"
//               name="referName"
//               defaultValue={selectedLead.referName || ""}
//             />

//             <label className="updateFormLabel">Category</label>
//             <input
//               className="updateFormInput"
//               type="text"
//               name="category"
//               defaultValue={selectedLead.category || ""}
//             />

//             <label className="updateFormLabel">New Comment</label>
//             <textarea
//               className="updateFormTextarea"
//               placeholder="add new comment under(1-151) letters"
//               name="newComment"
//             />

//             <button className="updateFormButtonSubmit" type="submit">
//               Update
//             </button>
//             <button
//               className="updateFormButtonCancel"
//               type="button"
//               onClick={cancelUpdateForm}
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}

//       {/* show history of lead*/}

//       {showHistory && selectedLead && (
//         <div className="history-container">
//           <div className="history-header">
//             <span className="history-title">
//               Profile of{" "}
//               {historyData.length > 0 ? historyData[0]?.leadName : "Lead"}
//             </span>
//             <button className="history-close-btn" onClick={closeHistory}>
//               X
//             </button>
//           </div>
//           <div className="history-profile-info">
//             <div className="history-profile-column">
//               <p>
//                 <strong>Name:</strong> {selectedLead.name || "N/A"}
//               </p>
//               <p>
//                 <strong>Email:</strong> {selectedLead.email || "N/A"}
//               </p>
//               <p>
//                 <strong>Mobile Number:</strong>{" "}
//                 {selectedLead.mobileNumber || "N/A"}
//               </p>
//               <p>
//                 <strong>Address:</strong> {selectedLead.address || "N/A"}
//               </p>
//             </div>
//             <div className="history-profile-column">
//               <p>
//                 <strong>Qualification:</strong>{" "}
//                 {selectedLead.qualification || "N/A"}
//               </p>
//               <p>
//                 <strong>Source:</strong> {selectedLead.source || "N/A"}
//               </p>
//               <p>
//                 <strong>Refer Name:</strong> {selectedLead.referName || "N/A"}
//               </p>
//               <p>
//                 <strong>Category:</strong>{" "}
//                 {`----  (${selectedLead.category})` || "N/A"}
//               </p>
//               <div
//                 className="lead-color-code category-history-code"
//                 id={
//                   selectedLead.category === "hot"
//                     ? "hot-lead"
//                     : selectedLead.category === "warm"
//                     ? "warm-lead"
//                     : selectedLead.category === "cold"
//                     ? "cold-lead"
//                     : ""
//                 }
//               ></div>
//             </div>
//           </div>
//           <hr />
//           <h4 id="comment-box-title">Comments :</h4>

//           <div className="history-comments">
//             {noHistoryAvailable ? (
//               <p id="no-chats-p-id">No Comments available😴</p>
//             ) : (
//               historyData
//                 .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sorting comments by date (newest first)
//                 .map((item) => (
//                   <div key={item.id} className="history-comment-item">
//                     <p>{item.comment}</p>
//                     <span className="history-comment-date">
//                       {new Date(item.createdAt).toLocaleString()}
//                     </span>
//                   </div>
//                 ))
//             )}
//           </div>
//         </div>
//       )}

//       {showDeleteConfirm && (
//         <div className="delete-confirm-container">
//           <div className="delete-confirm-content">
//             <p id="delete-note-text-id">
//               Are you sure you want to delete this lead entry? 🥺
//             </p>
//             <div className="delete-confirm-buttons">
//               <button className="confirm-btn" onClick={confirmDelete}>
//                 Yes
//               </button>
//               <button className="cancel-btn" onClick={cancelDelete}>
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeadFollowUp;


//-----------------------------------------------------------------//


// import { useState, useEffect } from "react";
// import debounce from "lodash/debounce";
// import PropTypes from "prop-types";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";
// import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
// import "./ClientData.css";

// const ClientData = ({ templateId }) => {
//   const [data, setData] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [uidToDelete, setUidToDelete] = useState(null);
//   const [updateFormVisible, setUpdateFormVisible] = useState(false);
//   const [updateFormData, setUpdateFormData] = useState({
//     uid: null,
//     fieldsData: {},
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     if (templateId) {
//       const fetchData = async () => {
//         try {
//           const response = await fetch(
//             `http://localhost:8080/get-template-data/${templateId}`
//           );
//           if (response.ok) {
//             const result = await response.json();
//             setData(result);
//             setOriginalData(result);
//             setFilteredData(result); // Initialize filteredData with fetched data
//           } else {
//             console.error("Failed to fetch template data");
//           }
//         } catch (error) {
//           console.error("Fetch error:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     }
//   }, [templateId]);

//   useEffect(() => {
//     debouncedHandleSearch();
//   }, [searchTerm, originalData]);

//   const debouncedHandleSearch = debounce(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredData(originalData);
//     } else {
//       const filtered = originalData.filter((item) =>
//         JSON.stringify(item.fields_Data)
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   }, 300);

//   const handleSearchInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearchButtonClick = () => {
//     debouncedHandleSearch();
//   };

//   const handleDeleteClick = (uid) => {
//     setUidToDelete(uid);
//     setShowConfirm(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/delete-by-uid/${uidToDelete}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (response.ok) {
//         toast.success("Entry deleted successfully!", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//         setFilteredData(filteredData.filter((item) => item.uid !== uidToDelete));
//       } else {
//         toast.error("Failed to delete entry.", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       toast.error("An error occurred. Please try again.", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     } finally {
//       setShowConfirm(false);
//       setUidToDelete(null);
//     }
//   };

//   const handleUpdateClick = async (uid) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/get-user-by-uid/${uid}`
//       );
//       if (response.ok) {
//         const result = await response.json();
//         setUpdateFormData({
//           uid: uid,
//           fieldsData: result,
//         });
//         setUpdateFormVisible(true);
//       } else {
//         toast.error("Failed to fetch user data for update.", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       toast.error(
//         "An error occurred while fetching user data. Please try again.",
//         {
//           position: "top-center",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleUpdateSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const payload = {
//         uid: updateFormData.uid,
//         fieldsData: updateFormData.fieldsData,
//       };

//       const response = await fetch("http://localhost:8080/update-user", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         toast.success("User data updated successfully!", {
//           position: "bottom-right",
//           autoClose: 3000,
//         });

//         setUpdateFormVisible(false);
//         const updatedData = filteredData.map((item) =>
//           item.uid === updateFormData.uid
//             ? { ...item, fields_Data: updateFormData.fieldsData }
//             : item
//         );
//         setFilteredData(updatedData);
//       } else {
//         const errorText = await response.text();
//         toast.error(`Failed to update user data: ${errorText}`, {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       toast.error(
//         "An error occurred while updating user data. Please try again.",
//         {
//           position: "top-center",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateFormData((prevData) => ({
//       ...prevData,
//       fieldsData: {
//         ...prevData.fieldsData,
//         [name]: value,
//       },
//     }));
//   };

//   const handleCheckboxChange = (e, uid) => {
//     const updatedData = filteredData.map((row) =>
//       row.uid === uid
//         ? {
//             ...row,
//             fields_Data: {
//               ...row.fields_Data,
//               "fees completed": e.target.checked ? "Yes" : "No",
//             },
//           }
//         : row
//     );
//     setFilteredData(updatedData);
//   };

//   if (loading) {
//     return <div id="loading-id">Loading...</div>;
//   }

//   const fieldsDataArray = filteredData.map((item) => item.fields_Data);
//   const columnHeaders =
//     fieldsDataArray.length > 0 ? Object.keys(fieldsDataArray[0]) : [];

//   return (
//     <div className="client-data-root">
//       <ToastContainer />
//       <p id="client-data-text">Client-Table</p>

//       {/* client search input div */}
//       <div className="client-search-div">
//         <input
//           type="text"
//           placeholder="Search client here"
//           id="client-search-input"
//           value={searchTerm} // Controlled input for search
//           onChange={handleSearchInputChange} // Update search term
//         />
//         <button id="search-btn" onClick={handleSearchButtonClick}>
//           Search
//         </button>
//       </div>
//       <hr />

//       <div className="">
//         <div className="add-client-btn-div">
//           <Link
//             to={"/TemplateCreated"}
//             style={{ textDecoration: "none", color: "black" }}
//           >
//             <button id="add-client-btn">Add Client</button>
//           </Link>
//         </div>
//       </div>

//       <div className="data-table-root">
//         <div className="data-table-child">
//           <table className="table-class">
//             <thead>
//               <tr>
//                 {columnHeaders.map((header, index) => (
//                   <th key={index}>{header}</th>
//                 ))}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.length > 0 ? (
//                 filteredData.map((item) => (
//                   <tr key={item.uid}>
//                     {columnHeaders.map((header, index) => (
//                       <td key={index}>
//                         {item.fields_Data[header] !== undefined
//                           ? item.fields_Data[header]
//                           : ""}
//                       </td>
//                     ))}
//                     <td>
//                       <button
//                         className="update-btn"
//                         onClick={() => handleUpdateClick(item.uid)}
//                       >
//                         <FormOutlined />
//                       </button>
//                       <button
//                         className="delete-btn"
//                         onClick={() => handleDeleteClick(item.uid)}
//                       >
//                         <DeleteOutlined />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={columnHeaders.length + 1}>
//                     Client not found 😭
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Confirm delete modal */}
//       {showConfirm && (
//         <div className="confirm-delete-modal">
//           <p>Are you sure you want to delete this entry?</p>
//           <button onClick={confirmDelete}>Yes</button>
//           <button onClick={() => setShowConfirm(false)}>No</button>
//         </div>
//       )}

//       {/* Update form modal */}
//       {updateFormVisible && (
//         <div className="update-form-modal">
//           <form onSubmit={handleUpdateSubmit}>
//             {Object.keys(updateFormData.fieldsData).map((key) => (
//               <div key={key}>
//                 <label>{key}</label>
//                 <input
//                   type="text"
//                   name={key}
//                   value={updateFormData.fieldsData[key] || ""}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             ))}
//             <button type="submit">Update</button>
//             <button
//               type="button"
//               onClick={() => setUpdateFormVisible(false)}
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// ClientData.propTypes = {
//   templateId: PropTypes.string.isRequired,
// };

// export default ClientData;






// <div className="data-table-root">
//         <div className="data-table-child">
//           <table className="table-class">
//             <thead>
//               <tr>
//                 <th className="narrow-column">Lead Status</th>
//                 <th className="narrow-column">Fees Completed</th>
//                 {columnHeaders.map((header) =>
//                   header !== "lead-status" && header !== "fees completed" ? (
//                     <th key={header}>{header}</th>
//                   ) : null
//                 )}
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={columnHeaders.length + 3} // Adjust colspan according to the total number of columns
//                     style={{
//                       fontFamily: "Lucida Sans",
//                       textAlign: "center",
//                       fontSize: "20px",
//                     }}
//                   >
//                     Client not found 😭
//                   </td>
//                 </tr>
//               ) : (
//                 data.map((row) => (
//                   <tr key={row.uid}>
//                     <td className="narrow-column">
//                       <input
//                         type="checkbox"
//                         style={{ cursor: "pointer" }}
//                         checked={row.fields_Data["fees completed"] === "Yes"}
//                         onChange={(e) => handleCheckboxChange(e, row.uid)}
//                       />
//                     </td>
//                     <td className="narrow-column">
//                       {row.fields_Data["fees completed"] || "No"}
//                     </td>
//                     {columnHeaders.map((header) =>
//                       header !== "lead-status" &&
//                       header !== "fees completed" ? (
//                         <td key={header}>
//                           {typeof row.fields_Data[header] === "boolean"
//                             ? row.fields_Data[header]
//                               ? "Yes"
//                               : "No"
//                             : row.fields_Data[header]}
//                         </td>
//                       ) : null
//                     )}
//                     <td>
//                       <button
//                         className="update-button"
//                         onClick={() => handleUpdateClick(row.uid)}
//                       >
//                         <FormOutlined />
//                       </button>
//                       <button
//                         className="remove-button"
//                         onClick={() => handleDeleteClick(row.uid)}
//                       >
//                         <DeleteOutlined />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
