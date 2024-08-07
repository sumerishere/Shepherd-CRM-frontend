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
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({});

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
      const response = await fetch(
        `http://localhost:8080/delete-by-uid/${uidToDelete}`,
        {
          method: "DELETE",
        }
      );
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

  const handleUpdateClick = async (uid) => {
    try {
      const response = await fetch(`http://localhost:8080/get-user-by-uid/${uid}`);
      if (response.ok) {
        const result = await response.json();
        setUpdateFormData(result);
        setUpdateFormVisible(true);
      } 
      else {
        console.error("Failed to fetch user data for update");
        toast.error("Failed to fetch user data for update.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } 
    catch (error) {
      console.error("Fetch error:", error);
      toast.error("An error occurred while fetching user data. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
  
    try {
      console.log("Update Form Data: ", updateFormData);
  
      const payload = {
        uid: updateFormData.uid,
        fieldsData: { ...updateFormData.fieldsData },
      };
  
      console.log("Payload: ", payload);
  
      const response = await fetch("http://localhost:8080/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        toast.success("User data updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
  
        setUpdateFormVisible(false);
        const updatedData = data.map((item) =>
          item.uid === updateFormData.uid ? updateFormData : item
        );
        setData(updatedData);
      } else {
        const errorText = await response.text();
        toast.error(`Failed to update user data: ${errorText}`, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating user data. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (loading) {
    return <div id="loading-id">Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <div className="follow-up-div">
        <p id="followUp-empty-text">No entries are available for the selected template.</p>
      </div>
    );
  }

  const fieldsDataArray = data.map((item) => item.fields_Data);
  const columnHeaders = fieldsDataArray.length > 0 ? Object.keys(fieldsDataArray[0]) : [];

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
                      className="update-button"
                      onClick={() => handleUpdateClick(row.uid)}
                    >
                      Update
                    </button>
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

      {updateFormVisible && (
        <div className="update-form-container">
          <form onSubmit={handleUpdateSubmit}>
            {columnHeaders.map((header) => (
              <div key={header} className="form-group">
                <label htmlFor={header}>{header}</label>
                <input
                  type="text"
                  id={header}
                  name={header}
                  value={updateFormData[header] || ""}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <div className="button-group">
              <button type="submit" className="submit-button">
                Update
              </button>
              <button type="button" id="form-cancel-btn" className="cancel-button" onClick={() => setUpdateFormVisible(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

FollowUp.propTypes = {
  templateId: PropTypes.number.isRequired,
};

export default FollowUp;
