import "./ClientData.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";

const ClientData = ({ templateId }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // Store original data
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [uidToDelete, setUidToDelete] = useState(null);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    uid: null,
    fieldsData: {},
  });

  const [searchTerm, setSearchTerm] = useState(""); // New state for the search term
  const [clientNotFound, setClientNotFound] = useState(false); // State to handle "Client not found"

  useEffect(() => {
    if (templateId) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/get-template-data/${templateId}`
          );
          if (response.ok) {
            const result = await response.json();
            setData(result);
            setOriginalData(result); // Store original data
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

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, show all entries
      setData(originalData);
      setClientNotFound(false); // Reset client not found state
    } else {
      // Otherwise, filter the data based on the search term
      const filteredData = originalData.filter((item) =>
        JSON.stringify(item.fields_Data).toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredData.length === 0) {
        setClientNotFound(true); // Set state if no clients found
      } else {
        setClientNotFound(false); // Reset state if clients found
      }
      setData(filteredData); // Update data with the search results
    }
  };
  
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
      const response = await fetch(
        `http://localhost:8080/get-user-by-uid/${uid}`
      );
      if (response.ok) {
        const result = await response.json();
        setUpdateFormData({
          uid: uid,
          fieldsData: result,
        });
        setUpdateFormVisible(true);
      } else {
        toast.error("Failed to fetch user data for update.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(
        "An error occurred while fetching user data. Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        uid: updateFormData.uid,
        fieldsData: updateFormData.fieldsData,
      };

      const response = await fetch("http://localhost:8080/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("User data updated successfully!", {
          position: "bottom-right",
          autoClose: 3000,
        });

        setUpdateFormVisible(false);
        const updatedData = data.map((item) =>
          item.uid === updateFormData.uid
            ? { ...item, fields_Data: updateFormData.fieldsData }
            : item
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
      toast.error(
        "An error occurred while updating user data. Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      fieldsData: {
        ...prevData.fieldsData,
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (e, uid) => {
    const updatedData = data.map((row) =>
      row.uid === uid
        ? {
            ...row,
            fields_Data: {
              ...row.fields_Data,
              "fees completed": e.target.checked ? "Yes" : "No",
            },
          }
        : row
    );
    setData(updatedData);
  };

  if (loading) {
    return <div id="loading-id">Loading...</div>;
  }

  const fieldsDataArray = data.map((item) => item.fields_Data);
  const columnHeaders =
    fieldsDataArray.length > 0 ? Object.keys(fieldsDataArray[0]) : [];

  return (
    <div className="client-data-root">
      <ToastContainer />
      <p id="client-data-text">Client-Table</p>

      {/* client search input div */}
      <div className="client-search-div">
        <input
          type="text"
          placeholder="Search lead here"
          id="client-search-input"
          value={searchTerm} // Controlled input for search
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        <button id="client-search-btn" onClick={handleSearch}> {/* Trigger search */}
          Search
        </button>
      </div>
      <hr />

      <div className="">
        <div className="add-client-btn-div">
          <Link
            to={"/TemplateCreated"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <button id="add-client-btn">Add Client</button>
          </Link>
        </div>
      </div>

      <div className="data-table-root">
        <div className="data-table-child">
          <table className="table-class">
            <thead>
            <tr>
                <th className="narrow-column">Lead Status</th>
                <th className="narrow-column">Fees Completed</th>
                {columnHeaders.map((header) =>
                  header !== "lead-status" && header !== "fees completed" ? (
                    <th key={header}>{header}</th>
                  ) : null
                )}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {/* Render Client Not Found message in table if no data */}
              {data.length === 0 && clientNotFound && (
                <tr>
                  <td
                    colSpan={columnHeaders.length + 3} // Adjust the colspan according to the number of columns
                    style={{
                      fontFamily: "Lucida Sans",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                  >
                    Client not found 😭
                  </td>
                </tr>
              )}

{data.map((row) => (
                <tr key={row.uid}>
                  <td className="narrow-column">
                    <input
                      type="checkbox"
                      style={{ cursor: "pointer" }}
                      checked={row.fields_Data["fees completed"] === "Yes"}
                      onChange={(e) => handleCheckboxChange(e, row.uid)}
                    />
                  </td>
                  <td className="narrow-column">
                    {row.fields_Data["fees completed"] || "No"}
                  </td>
                  {columnHeaders.map((header) =>
                    header !== "lead-status" && header !== "fees completed" ? (
                      <td key={header}>
                        {typeof row.fields_Data[header] === "boolean"
                          ? row.fields_Data[header]
                            ? "Yes"
                            : "No"
                          : row.fields_Data[header]}
                      </td>
                    ) : null
                  )}
                  <td>
                    <button
                      className="update-button"
                      onClick={() => handleUpdateClick(row.uid)}
                    >
                      <FormOutlined />
                    </button>
                    <button
                      className="remove-button"
                      onClick={() => handleDeleteClick(row.uid)}
                    >
                      <DeleteOutlined />
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
            <p id="confirm-content-p">
              Are you sure you want to delete this entry? 🥺
            </p>
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
            {columnHeaders.map((header) =>
              header !== "lead-status" && header !== "fees completed" ? (
                <div key={header} className="form-group">
                  <label htmlFor={header}>{header}</label>
                  <input
                    type="text"
                    required={true}
                    id={header}
                    name={header}
                    value={updateFormData.fieldsData[header] || ""}
                    onChange={handleInputChange}
                  />
                </div>
              ) : null
            )}
            <div className="button-group">
              <button type="submit" className="submit-button">
                Update
              </button>
              <button
                type="button"
                className="cancel-button"
                id="form-cancel-btn"
                onClick={() => setUpdateFormVisible(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

ClientData.propTypes = {
  templateId: PropTypes.string.isRequired,
};

export default ClientData;
