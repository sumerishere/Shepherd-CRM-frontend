// import "./FollowUp.css";
// import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// // import DataTableComp from "../data-table/DataTableComp";

// const FollowUp = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/get-template-data/${1}`
//         );
//         if (response.ok) {
//           const result = await response.json();
//           console.log("Fetched template data:", result);
//           setData(result);
//         } else {
//           console.error("Failed to fetch template data");
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div id="loading-id">Loading...</div>;
//   }

//   if (data.length === 0) {
//     return <div>No data available for the selected template.</div>;
//   }

//   // Extract fields_Data for table
//   const fieldsDataArray = data.map((item) => item.fields_Data);
//   const columnHeaders = Object.keys(fieldsDataArray[0]); // Get column headers from first object

//   return (
//     <div className="follow-up-div">

//       <p id="followUp-text">Follow Up</p>

//       <hr />

//       <div className="data-table-root">
//         {/* <h1 id="data-table-h1">Data Table</h1> */}
//         <div className="data-table-child">
//           <table className="table-class">
//             <thead>
//               <tr>
//                 {columnHeaders.map((header) => (
//                   <th key={header}>{header}</th>
//                 ))}
//                 <th>UID</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row) => (
//                 <tr key={row.uid}>
//                   {columnHeaders.map((header) => (
//                     <td key={header}>
//                       {typeof row.fields_Data[header] === "boolean"
//                         ? row.fields_Data[header]
//                           ? "Yes"
//                           : "No"
//                         : row.fields_Data[header]}
//                     </td>
//                   ))}
//                   <td>{row.uid}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// FollowUp.propTypes = {
//   formTemplateId: PropTypes.number.isRequired,
// };

// export default FollowUp;

import "./FollowUp.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FollowUp = ({ templateId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [uidToDelete, setUidToDelete] = useState(null);

  useEffect(() => {
    if (templateId) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/get-template-data/${templateId}`
          );
          if (response.ok) {
            const result = await response.json();
            console.log("Fetched template data:", result);
            setData(result);
          } else {
            console.error("Failed to fetch template data");
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [templateId]);

  const handleDeleteClick = (uid) => {
    setUidToDelete(uid);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/delete-by-uid/${uidToDelete}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Entry deleted successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setData(data.filter((item) => item.uid !== uidToDelete));
      } else {
        toast.error("Failed to delete entry.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setShowConfirm(false);
      setUidToDelete(null);
    }
  };

  if (loading) {
    return <div id="loading-id">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="follow-up-div">
      <p id="followUp-empty-text">No entries are available for the selected template.</p></div>;
  }

  const fieldsDataArray = data.map((item) => item.fields_Data);
  const columnHeaders = Object.keys(fieldsDataArray[0]);

  return (
    <div className="follow-up-div">
      <ToastContainer />
      <p id="followUp-text">Follow Up</p>
      <hr />
      <div className="data-table-root">
        <div className="data-table-child">
          <table className="table-class">
            <thead>
              <tr>
                {columnHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
                <th>UID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.uid}>
                  {columnHeaders.map((header) => (
                    <td key={header}>
                      {typeof row.fields_Data[header] === "boolean"
                        ? row.fields_Data[header]
                          ? "Yes"
                          : "No"
                        : row.fields_Data[header]}
                    </td>
                  ))}
                  <td>{row.uid}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() => handleDeleteClick(row.uid)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showConfirm && (
        <div className="confirm-dialog">
          <div className="confirm-content">
            <p id="confirm-content-p">Are you sure you want to delete this entry? 🥺</p>
            <button className="confirm-button" onClick={confirmDelete}>
              Yes
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowConfirm(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

FollowUp.propTypes = {
  templateId: PropTypes.number,
};

export default FollowUp;
