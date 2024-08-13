// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './LeadFollowUp.css';

// const LeadFollowUp = () => {
//   const [leads, setLeads] = useState([]);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [showHistory, setShowHistory] = useState(false);
//   const [historyData, setHistoryData] = useState([]);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [leadToDelete, setLeadToDelete] = useState(null);

//   useEffect(() => {
//     // Fetch all leads from the backend
//     axios.get('http://localhost:8080/get-all-lead')
//       .then(response => {
//         setLeads(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the leads!', error);
//       });
//   }, []);

//   const handleDelete = (uid) => {
//     setLeadToDelete(uid);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDelete = () => {
//     if (leadToDelete) {
//       axios.delete(`http://localhost:8080/delete-lead-by-id/${leadToDelete}`)
//         .then(() => {
//           setLeads(leads.filter(lead => lead.uid !== leadToDelete));
//           setShowDeleteConfirm(false);
//           setLeadToDelete(null);
//         })
//         .catch(error => {
//           console.error('There was an error deleting the lead!', error);
//         });
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteConfirm(false);
//     setLeadToDelete(null);
//   };

//   const handleUpdate = (uid) => {
//     axios.get(`http://localhost:8080/get-lead-by-id/${uid}`)
//       .then(response => {
//         setSelectedLead(response.data.leadFollowUp);
//         setShowUpdateForm(true);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the lead data!', error);
//       });
//   };

//   const handleHistory = (uid) => {
//     axios.get(`http://localhost:8080/get-comments-by-id/${uid}`)
//       .then(response => {
//         setHistoryData(response.data);
//         setShowHistory(true);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the history!', error);
//       });
//   };

//   const closeHistory = () => {
//     setShowHistory(false);
//   };

//   return (
//     <div className="lead-data-root">
//       <p id="lead-data-heading">Follow Up</p>
//       <hr />

//       <div className="add-lead-btn-div">
//         <button id="add-lead-btn">Add Lead</button>
//       </div>

//       <div className="lead-table-root">
//         <div className="lead-table-div">
//           <table className="lead-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Mobile Number</th>
//                 <th>Address</th>
//                 <th>Created At</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leads.map((lead) => (
//                 <tr key={lead.uid}>
//                   <td>{lead.name}</td>
//                   <td>{lead.email}</td>
//                   <td>{lead.mobileNumber}</td>
//                   <td>{lead.address}</td>
//                   <td>{new Date(lead.createdAt).toLocaleString()}</td>
//                   <td>
//                     <button className="action-btn update-btn" onClick={() => handleUpdate(lead.uid)}>Update</button>
//                     <button className="action-btn delete-btn" onClick={() => handleDelete(lead.uid)}>Delete</button>
//                     <button className="action-btn history-btn" onClick={() => handleHistory(lead.uid)}>History</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showUpdateForm && selectedLead && (
//         <div className="update-form-container">
//           <form className="update-form">
//             <label>Name</label>
//             <input type="text" defaultValue={selectedLead.name} />
//             <label>Email</label>
//             <input type="email" defaultValue={selectedLead.email} />
//             <label>Mobile Number</label>
//             <input type="text" defaultValue={selectedLead.mobileNumber} />
//             <label>Address</label>
//             <input type="text" defaultValue={selectedLead.address} />
//             <button type="submit">Update</button>
//           </form>
//         </div>
//       )}

//       {showHistory && (
//         <div className="history-container">
//           <div className="history-header">
//             <span className="history-title">History for {historyData.length > 0 ? historyData[0].leadName : ''}</span>
//             <button className="close-btn" onClick={closeHistory}>X</button>
//           </div>
//           <div className="history-content">
//             {historyData.map((item) => (
//               <div key={item.id} className="history-item">
//                 <p>{item.comment}</p>
//                 <span className="history-date">{new Date(item.createdAt).toLocaleString()}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showDeleteConfirm && (
//         <div className="delete-confirm-container">
//           <div className="delete-confirm-content">
//             <p>Are you sure you want to delete this entry?</p>
//             <div className="delete-confirm-buttons">
//               <button className="confirm-btn" onClick={confirmDelete}>Yes</button>
//               <button className="cancel-btn" onClick={cancelDelete}>No</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeadFollowUp;


import { useEffect, useState } from 'react';
import axios from 'axios';
import './LeadFollowUp.css';
import { FormOutlined, DeleteOutlined, HistoryOutlined } from "@ant-design/icons";

const LeadFollowUp = () => {
  const [leads, setLeads] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [noHistoryAvailable, setNoHistoryAvailable] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/get-all-lead')
      .then(response => {
        setLeads(response.data);
      })
      .catch(error => {
        console.error('Error fetching leads:', error);
      });
  }, []);

  const handleDelete = (uid) => {
    setLeadToDelete(uid);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (leadToDelete) {
      axios.delete(`http://localhost:8080/delete-lead-by-id/${leadToDelete}`)
        .then(() => {
          setLeads(leads.filter(lead => lead.uid !== leadToDelete));
          setShowDeleteConfirm(false);
          setLeadToDelete(null);
        })
        .catch(error => {
          console.error('Error deleting lead:', error);
        });
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setLeadToDelete(null);
  };

  const handleUpdate = (uid) => {
    axios.get(`http://localhost:8080/get-lead-by-id/${uid}`)
      .then(response => {
        setSelectedLead(response.data);
        setShowUpdateForm(true);
      })
      .catch(error => {
        console.error('Error fetching lead data:', error);
      });
  };

  const handleHistory = (uid) => {
    axios.get(`http://localhost:8080/get-comments-by-id/${uid}`)
      .then(response => {
        const data = response.data;
        if (Array.isArray(data) && data.length === 0) {
          setNoHistoryAvailable(true);
        } else {
          setHistoryData(Array.isArray(data) ? data : []);
          setNoHistoryAvailable(false);
        }
        setShowHistory(true);
      })
      .catch(error => {
        console.error('Error fetching history:', error);
        setNoHistoryAvailable(true);
        setShowHistory(true);
      });
  };

  const closeHistory = () => {
    setShowHistory(false);
    setNoHistoryAvailable(false);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newComment = event.target.newComment.value;
  
    if (!selectedLead) return;
  
    // Ensure that existing comments are strings
    const existingComments = (selectedLead.comments || []).map(comment =>
      typeof comment === 'string' ? comment : comment.comment
    );
  
    // Prepare the updated lead data
    const updatedLeadData = {
      leadFollowUp: {
        name: event.target.name.value,
        email: event.target.email.value,
        mobileNumber: event.target.mobileNumber.value,
        address: event.target.address.value,
      },
      comments: [...existingComments, newComment] // Ensure comments are strings
    };
  
    // Send the updated data to the backend
    axios.put(`http://localhost:8080/update-lead-by-id/${selectedLead.uid}`, updatedLeadData)
      .then(response => {
        console.log('Lead updated successfully:', response.data);
        setShowUpdateForm(false);
        setSelectedLead(null);
      })
      .catch(error => {
        console.error('Error updating lead:', error);
      });
  };
  


  const cancelUpdateForm = () => {
    setShowUpdateForm(false);
  };

  return (
    <div className="lead-data-root">
      <p id="lead-data-heading">Follow Up</p>
      <hr />

      <div className="add-lead-btn-div">
        <button id="add-lead-btn">Add Lead</button>
      </div>

      <div className="lead-table-root">
        <div className="lead-table-div">
          <table className="lead-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Address</th>
                <th>Connected At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.uid}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.mobileNumber}</td>
                  <td>{lead.address}</td>
                  <td>{new Date(lead.createdAt).toLocaleString()}</td>
                  <td>
                    <button className="action-btn update-btn" onClick={() => handleUpdate(lead.uid)}><FormOutlined /></button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(lead.uid)}><DeleteOutlined /></button>
                    <button className="action-btn history-btn" onClick={() => handleHistory(lead.uid)}><HistoryOutlined /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUpdateForm && selectedLead && (
        <div className="update-form-container">
          <form className="update-form" onSubmit={handleUpdateSubmit}>
            <label>Name</label>
            <input type="text" name="name" defaultValue={selectedLead.name || ''} />

            <label>Email</label>
            <input type="email" name="email" defaultValue={selectedLead.email || ''} />

            <label>Mobile Number</label>
            <input type="text" name="mobileNumber" defaultValue={selectedLead.mobileNumber || ''} />

            <label>Address</label>
            <input type="text" name="address" defaultValue={selectedLead.address || ''} />

            <label>Comments</label>
            {/* Exclude existing comments from the form */}
            <textarea name="newComment" placeholder="Add a new comment"></textarea>

            <button type="submit">Update</button>
            <button type="button" onClick={cancelUpdateForm}>Cancel</button>
          </form>
        </div>
      )}

      {showHistory && (
        <div className="history-container">
          <div className="history-header">
            <span className="history-title">History of {historyData.length > 0 ? historyData[0]?.leadName : 'Lead'}</span>
            <button className="close-btn" onClick={closeHistory}>X</button>
          </div>
          <div className="history-content">
            {noHistoryAvailable ? (
              <p id="no-chats-p-id">No chat history available😴</p>
            ) : (
              historyData.map((item) => (
                <div key={item.id} className="history-item">
                  <p>{item.comment}</p>
                  <span className="history-date">{new Date(item.createdAt).toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="delete-confirm-container">
          <div className="delete-confirm-content">
            <p id="delete-note-text-id">Are you sure you want to delete this lead entry? 🥺</p>
            <div className="delete-confirm-buttons">
              <button className="confirm-btn" onClick={confirmDelete}>Yes</button>
              <button className="cancel-btn" onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadFollowUp;
