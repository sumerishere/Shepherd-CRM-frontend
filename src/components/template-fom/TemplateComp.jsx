import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TemplateComp.css";

const DynamicForm = ({ userName }) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const username = location.state?.username || "";

  const [userData, setUserData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [fields, setFields] = useState([
    {
      type: "input",
      label: "Full Name",
      value: "Full Name",
      selectValue: "Text(String)",
      readOnly: true,
      required: true,
    },
    {
      type: "input",
      label: "Address",
      value: "Address",
      selectValue: "Text(String)",
      readOnly: true,
      required: true,
    },
    {
      type:"date",
      label:"Date",
      value:"Select Date",
      selectValue:"Date",
      readOnly:true,
      required:true
    },
    {
      type:"text",
      label:"Mobile Number",
      value:"Mobile Number",
      selectValue:"Mobile No.",
      readOnly:true,
      required:true
    }
  ]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/get-user-data?username=${userName}`
      );

      if (response.ok) {
        const data = await response.json();
        setUserData(data);

        console.log("checking user data", data);
      } else {
        console.log("error to fetching username data");
      }
    } catch (error) {
      console.log("fetching to error of userData", error);
    }
  };

  useEffect(() => {
    if (userName) {
      fetchUserData();
    } 
  }, [userName]);

  function getCurrentDateTimeFormat() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    // const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const [isLoading, setIsLoading] = useState(false);

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        type: "input",
        label: "",
        value: "",
        selectValue: "",
        readOnly: false,
        required: true,
      },
    ]);
  };

  const handleInputChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].value = value;
    setFields(newFields);
  };

  const handleSelectChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].selectValue = value;
    setFields(newFields);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const validateFields = () => {
    for (let field of fields) {
      if (!field.value || !field.selectValue) {
        return false;
      }
    }
    return true;
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      toast.error("Please fill out all fields before submitting...", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    const formTemplateDTO = {
      formName: userData.organizationName,
      createdAt: getCurrentDateTimeFormat(),
      userName: userData.userName,
      fields: fields.reduce((acc, field) => {
        if (field.value) {
          acc[field.value] = field.selectValue;
        }
        return acc;
      }, {}),
    };

    try {
      const response = await fetch("http://localhost:8080/create-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formTemplateDTO),
      });

      if (response.ok) {
        toast.success(`Template Created Successfully!! 😊`, {
          position: "top-center",
          autoClose: 5000,
        });
        setShowAlert(false);
        console.log("Form template saved successfully");
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 4000,
        });
        console.error("Error saving form template");
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 4000,
      });
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowAlertOpen = () => {
    setShowAlert(true);
  };

  const handleShowAlertCancel = () => {
    setShowAlert(false);
  };

  return (
    <div className="template-root-div">
      {/* <div>
        <h1 id="heading-h1">Create Template</h1>
      </div> */}

      <div className="child-template-div">
        <ToastContainer />
        <div>
          <p id="note-id">{` Important note : "Once you create template it will be considerd as permanently so check carefully once before submitting form. "`}</p>
        </div>

        <div className="check-template-btn-div">
          <button id="check-template-btn">
            <Link
              to="/TemplateCreated"
              state={{ username }}
              style={{ textDecoration: "none", color: "white" }}
            >
              Check Template
            </Link>
          </button>
        </div>

        <div className="form-container">
          <form className="form-template" >
            {fields.map((field, index) => (
              <div key={index} className="field-row">
                <input
                  style={{ marginBottom: "0px", padding: "10px" }}
                  type="text"
                  placeholder = {(field.label ? field.label : field.selectValue === "Multiple Options(Dropdown)" ? "Enter option1, option2, option3 ..." : ` ${index + 1}. Field Name`)}
                  value={field.value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  readOnly={field.readOnly}
                  required={field.required}
                />
                <select
                  className="template-dropdown-container"
                  style={{ cursor: "pointer" }}
                  value={field.selectValue}
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                  required={field.required}
                >
                  <option value="">Select Field Type</option>
                  <option value="Text(String)">Text(String)</option>
                  <option value="Number(int)">Number(int)</option>
                  <option value="Yes/No button(Radio)">
                    Yes/No button(Radio)
                  </option>
                  <option value="Image">Image</option>
                  <option value="Pdf File">Pdf File</option>
                  <option value="Yes/No check(checkbox)">
                    Yes/No check(checkbox)
                  </option>
                  <option value="Date">Date</option>
                  <option value="Mobile No.">Mobile No.</option>
                  <option value="Multiple Options(Dropdown)">Multiple Options(Dropdown)</option>
                </select>
                {index >= 4 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    id="remove-button"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <div style={{ display: "inline-flex" }}>
              <button
                type="button"
                onClick={handleAddField}
                className="add-button"
              >
                +
              </button>
              
              <button
                type="button"
                className="template-submit-button"
                onClick={handleShowAlertOpen}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {showAlert && (
          <div className="alert-confirm-container">
            <div className="alert-confirm-content">
              <div className="alert-symbol">&#9888;</div>{" "}
              {/* Unicode symbol for alert */}
              <p id="alert-note-text">
                Are you sure you want to submit this form?
              </p>
              <p>{`"Note : this will consider as final submit"`}</p>
              <div className="alert-confirm-buttons">
                <button 
                  className="alert-confirm-btn" 
                  onClick={handleFinalSubmit}
                  >
                  {isLoading ? <div className="spinner"></div> : "Yes"}
                </button>
                <button
                  className="alert-cancel-btn"
                  onClick={handleShowAlertCancel}
                >
                  No
                </button>
                <button id="prev-btn">Preview</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

DynamicForm.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default DynamicForm;
