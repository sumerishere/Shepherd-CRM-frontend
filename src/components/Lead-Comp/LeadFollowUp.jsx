// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './LeadFollowUp.css';
// import { FormOutlined, DeleteOutlined, HistoryOutlined } from "@ant-design/icons";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const LeadFollowUp = () => {
//   const [leads, setLeads] = useState([]);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [showHistory, setShowHistory] = useState(false);
//   const [historyData, setHistoryData] = useState([]);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [leadToDelete, setLeadToDelete] = useState(null);
//   const [noHistoryAvailable, setNoHistoryAvailable] = useState(false);

//   useEffect(() => {
//     axios.get('http://localhost:8080/get-all-lead')
//       .then(response => {
//         setLeads(response.data || []);
//       })
//       .catch(error => {
//         console.error('Error fetching leads:', error);
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
//           toast.success('Lead deleted successfully!');
//           setShowDeleteConfirm(false);
//           setLeadToDelete(null);
//         })
//         .catch(error => {
//           console.error('Error deleting lead:', error);
//           toast.error('Failed to update lead. Please try again.');
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
//         setSelectedLead(response.data);
//         setShowUpdateForm(true);
//       })
//       .catch(error => {
//         console.error('Error fetching lead data:', error);
//       });
//   };

//   const handleHistory = (uid) => {
//     axios.get(`http://localhost:8080/get-comments-by-id/${uid}`)
//       .then(response => {
//         const data = response.data;
//         if (Array.isArray(data) && data.length === 0) {
//           setNoHistoryAvailable(true);
//         } else {
//           setHistoryData(Array.isArray(data) ? data : []);
//           setNoHistoryAvailable(false);
//         }
//         setShowHistory(true);
//       })
//       .catch(error => {
//         console.error('Error fetching history:', error);
//         setNoHistoryAvailable(true);
//         setShowHistory(true);
//       });
//   };

//   const closeHistory = () => {
//     setShowHistory(false);
//     setNoHistoryAvailable(false);
//   };

//   const handleUpdateSubmit = (event) => {
//     event.preventDefault();
//     const newComment = event.target.newComment.value;
  
//     if (!selectedLead) return;
  
//     // Ensure that existing comments are strings
//     // const existingComments = (selectedLead.comments || []).map(comment =>
//     //   typeof comment === 'string' ? comment : comment.comment
//     // );
  
//     // Prepare the updated lead data
//     const updatedLeadData = {
//       leadFollowUp: {
//         name: event.target.name.value,
//         email: event.target.email.value,
//         mobileNumber: event.target.mobileNumber.value,
//         address: event.target.address.value,
//       },
//       comments: [newComment] // Ensure comments are strings
//     };
  
//     // Send the updated data to the backend
//     axios.put(`http://localhost:8080/update-lead-by-id/${selectedLead.uid}`, updatedLeadData)
//       .then(response => {
//         console.log('Lead updated successfully:', response.data);
//         toast.success('Lead updated successfully!');
//         setShowUpdateForm(false);
//         setSelectedLead(null);
//       })
//       .catch(error => {
//         console.error('Error updating lead:', error);
//         toast.error('Failed to update lead. Please try again.');
//       });
//   };
  


//   const cancelUpdateForm = () => {
//     setShowUpdateForm(false);
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
//                 <th>Connected At</th>
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
//                     <button className="action-btn update-btn" onClick={() => handleUpdate(lead.uid)}><FormOutlined /></button>
//                     <button className="action-btn delete-btn" onClick={() => handleDelete(lead.uid)}><DeleteOutlined /></button>
//                     <button className="action-btn history-btn" onClick={() => handleHistory(lead.uid)}><HistoryOutlined /></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>



//       {showUpdateForm && selectedLead && (
//         <div className="updateFormContainer">
//           <form className="updateForm" onSubmit={handleUpdateSubmit}>
//             <label className="updateFormLabel">Name</label>
//             <input className="updateFormInput" type="text" name="name" defaultValue={selectedLead.name || ''} />

//             <label className="updateFormLabel">Email</label>
//             <input className="updateFormInput" type="email" name="email" defaultValue={selectedLead.email || ''} />

//             <label className="updateFormLabel">Mobile Number</label>
//             <input className="updateFormInput" type="text" name="mobileNumber" defaultValue={selectedLead.mobileNumber || ''} />

//             <label className="updateFormLabel">Address</label>
//             <input className="updateFormInput" type="text" name="address" defaultValue={selectedLead.address || ''} />

//             <label className="updateFormLabel">Comments</label>
//             <textarea className="updateFormTextarea" name="newComment" placeholder="Add a new comment"></textarea>

//             <button className="updateFormButtonSubmit" type="submit">Update</button>
//             <button className="updateFormButtonCancel" type="button" onClick={cancelUpdateForm}>Cancel</button>
//           </form>
//         </div>
//       )}



//       {showHistory && (
//         <div className="history-container">
//           <div className="history-header">
//             <span className="history-title">History of {historyData.length > 0 ? historyData[0]?.leadName : 'Lead'}</span>
//             <button className="close-btn" onClick={closeHistory}>X</button>
//           </div>
//           <div className="history-content">
//             {noHistoryAvailable ? (
//               <p id="no-chats-p-id">No chat history available😴</p>
//             ) : (
//               historyData.map((item) => (
//                 <div key={item.id} className="history-item">
//                   <p>{item.comment}</p>
//                   <span className="history-date">{new Date(item.createdAt).toLocaleString()}</span>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}

//       {showDeleteConfirm && (
//         <div className="delete-confirm-container">
//           <div className="delete-confirm-content">
//             <p id="delete-note-text-id">Are you sure you want to delete this lead entry? 🥺</p>
//             <div className="delete-confirm-buttons">
//               <button className="confirm-btn" onClick={confirmDelete}>Yes</button>
//               <button className="cancel-btn" onClick={cancelDelete}>No</button>
//             </div>
//           </div>
//         </div>
//       )}
//       <ToastContainer position="bottom-right" />
//     </div>
//   );
// };

// export default LeadFollowUp;



import { useEffect, useState } from 'react';
// import axios from 'axios';
import './LeadFollowUp.css';
import { FormOutlined, DeleteOutlined, HistoryOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

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
  

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:8080/get-all-lead');
        const data = await response.json();
        setLeads(data || []);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);
  
  const handleDelete = (uid) => {
    setLeadToDelete(uid);
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = async () => {

    if (leadToDelete) {
      try {

        await fetch(`http://localhost:8080/delete-lead-by-id/${leadToDelete}`, {
          method: 'DELETE',
        });

        setLeads(leads.filter(lead => lead.uid !== leadToDelete));
        toast.success('Lead deleted successfully!');
        setShowDeleteConfirm(false);
        setLeadToDelete(null);
        
      } 
      catch (error) {
        console.error('Error deleting lead:', error);
        toast.error('Failed to delete lead. Please try again.');
      }
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setLeadToDelete(null);
  };
  
  const handleUpdate = async (uid) => {
    try {
      const response = await fetch(`http://localhost:8080/get-lead-by-id/${uid}`);
      const data = await response.json();
      console.log('Lead data fetched successfully:', data);
      setSelectedLead(data);
      setShowUpdateForm(true);
    } 
    catch (error) {
      console.error('Error fetching lead data:', error);
    }
  };
  
  const handleHistory = async (uid) => {
    try {
      const response = await fetch(`http://localhost:8080/get-comments-by-id/${uid}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length === 0) {
        setNoHistoryAvailable(true);
      } else {
        setHistoryData(Array.isArray(data) ? data : []);
        setNoHistoryAvailable(false);
      }
      setShowHistory(true);
    } catch (error) {
      console.error('Error fetching history:', error);
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
      },
      comments: [newComment],
    };
  
    try {
      const response = await fetch(`http://localhost:8080/update-lead-by-id/${selectedLead.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLeadData),
      });
  
      // Check if the response is in JSON format
      const contentType = response.headers.get("content-type");
      
      if (response.ok) {
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
          console.log('Lead updated successfully:', data);
          
        } 
        else {
          const textData = await response.text();
          console.log('Lead updated successfully:', textData);
        }
        toast.success('Lead updated successfully!!!');
        setShowUpdateForm(false);
        setSelectedLead(null);
        
      } else {
          throw new Error('Failed to update lead');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead. Please try again.');
    }
  };
  
  
  const cancelUpdateForm = () => {
    setShowUpdateForm(false);
  };

  if (leads.length === 0) {
    return (
      <div className="follow-up-div">
        <hr />
        <p id="client-data-empty-text">No entries are available.</p>
        <hr />
      </div>
    );
  } else {
    if (loading) {
      return <div id="loading-id">Loading...</div>;
    }
  }
  

  return (
    <div className="lead-data-root">
      <ToastContainer/>
      <p id="lead-data-heading">Follow Up</p>
      <hr />

      <div className="add-lead-btn-div">
        <Link to="/LeadRegistrationForm" style={{textDecoration:"none", color:"white"}}>
          <button id="add-lead-btn">Add Lead</button>
        </Link>
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
                <th>courseType</th>
                <th>Connected At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.uid}>
                  <td id="table-td">{lead.name}</td>
                  <td id="table-td">{lead.email}</td>
                  <td id="table-td">{lead.mobileNumber}</td>
                  <td id="table-td">{lead.address}</td>
                  <td id="table-td" >{lead.courseType}</td>
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
        <div className="updateFormContainer">
          <form className="updateForm" onSubmit={handleUpdateSubmit}>
            <label className="updateFormLabel">Name</label>
            <input className="updateFormInput" type="text" name="name" defaultValue={selectedLead.name || ''} />

            <label className="updateFormLabel">Email</label>
            <input className="updateFormInput" type="email" name="email" defaultValue={selectedLead.email || ''} />

            <label className="updateFormLabel">Mobile Number</label>
            <input className="updateFormInput" type="tel" name="mobileNumber" defaultValue={selectedLead.mobileNumber || ''} />

            <label className="updateFormLabel">Address</label>
            <input className="updateFormInput" type="text" name="address" defaultValue={selectedLead.address || ''} />

            <label className="updateFormLabel">New Comment</label>
            <textarea className="updateFormTextarea" placeholder='add new comment under(1-151) letters' name="newComment" />

            <button className="updateFormButtonSubmit" type="submit">Update</button>
            <button className="updateFormButtonCancel" type="button" onClick={cancelUpdateForm}>Cancel</button>
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
