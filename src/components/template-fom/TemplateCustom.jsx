import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TemplateCustom.css";

const TemplateCustom = ({ username, organizationName }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //---- default fields of template form ------//
  const [fields, setFields] = useState([
    {
      id: 1,
      type: "Text(String)",
      label: "Full Name",
      placeholder: "Enter your full name",
    },
    {
      id: 2,
      type: "Text(String)",
      label: "Address",
      placeholder: "Enter your address",
    },

    {
      id: 3,
      type: "Number(int)",
      label: "Mobile Number",
      placeholder: "Enter your mobile number",
    },
    { id: 4, type: "Date", label: "date", placeholder: "Select date" },
  ]);

  //---------- dropdown options -----------//
  const fieldTypes = [
    { id: 1, value: "", label: "Select Option", icon: "" },
    { id: 2, value: "Text(String)", label: "text", icon: "📝" },
    { id: 3, value: "Number(int)", label: "Number", icon: "🔢" },
    { id: 4, value: "file", label: "File Upload", icon: "📎" },
    { id: 5, value: "Date", label: "Date", icon: "📅" },
    { id: 6, value: "Yes/No check(checkbox)", label: "Yes/No (Checkbox)", icon: "☑️" },
    { id: 7, value: "Yes/No button(Radio)", label: "Yes/No (Radio Button)", icon: "⭕" },
    { id: 8, value: "Image", label:"Image/Photo", icon:"🖼️"},
    { id: 9, value: "select(dropdown)", label: "Dropdown", icon: "▼" },
  ];

  const addField = () => {
    const newField = {
      id: fields.length + 1,
      type: "Text(String)",
      label: `${fields.length + 1}. Enter field name here`,
      placeholder: "Enter value",
      options: [],
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // method to handle form submission to backend
  const submitFormToBackend = async () => {
    try {
      // Prepare payload according to backend requirements
      const payload = {
        formName: organizationName,
        createdAt: new Date().toISOString(),
        userName: username, // This can be dynamically set later
        fields: {},
        dropdowns: [],
      };

      // Convert fields to backend expected format
      fields.forEach((field) => {
        // Directly use the field type from dropdown
        payload.fields[field.label] = field.type;

        // If field is a dropdown, add to dropdowns array
        if (field.type === "select(dropdown)" && field.options) {
          payload.dropdowns.push({
            dropdownName: field.label,
            options: field.options,
          });
        }
      });

      // Perform axios POST request
      const response = await axios.post(
        "http://localhost:8080/create-template",
        payload
      );

      // Log the entire response for debugging
      console.log("Full Server Response:", response);

      // Check if response has data and log it
      if (response.data) {
        console.log("Response Data:", response.data);

        const responseMessage =
          response.data.message || "Template created successfully";

        // Show success toast with additional info
        toast.success(`${responseMessage} `, {
          position: "top-right",
          autoClose: 3000,
          // hideProgressBar: false,
          // closeOnClick: true,
          // pauseOnHover: true,
          // draggable: true,
        });
      }
      else{

        const errorMessage = await response.data.text();
        console.log("error got during template submission",errorMessage)

        toast.error(`${errorMessage} `, {
          position: "top-right",
          autoClose: 3000,
        });
      }

      // Reset alert and preview states
      setShowAlert(false);
      setShowPreview(false);
    } catch (error) {
      // Comprehensive error logging
      console.error("Submission Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });

      // Show detailed error toast
      const errorMessage =
        error.response?.data ||
        error.message ||
        "Form submission failed. Please try again.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });

      console.error("Submission error:", error);
    }
  };

  const handleSubmit = (e) => {
    setShowAlert(true);
    e.preventDefault();
  };

  const handleTypeChange = (id, newType) => {
    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              type: newType,
              options: newType === "select(dropdown)" ? [] : undefined,
            }
          : field
      )
    );
  };

  const handleLabelChange = (id, newLabel) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, label: newLabel } : field
      )
    );
  };

  const addDropdownOption = (id, optionValue) => {
    setFields(
      fields.map((field) =>
        field.id === id && field.type === "select(dropdown)"
          ? { ...field, options: [...(field.options || []), optionValue] }
          : field
      )
    );
  };

  const handleOptionChange = (id, optionIndex, newValue) => {
    setFields(
      fields.map((field) =>
        field.id === id && field.type === "select(dropdown)"
          ? {
              ...field,
              options: field.options.map((opt, index) =>
                index === optionIndex ? newValue : opt
              ),
            }
          : field
      )
    );
  };

  const removeDropdownOption = (id, optionIndex) => {
    setFields(
      fields.map((field) =>
        field.id === id && field.type === "select(dropdown)"
          ? {
              ...field,
              options: field.options.filter(
                (_, index) => index !== optionIndex
              ),
            }
          : field
      )
    );
  };

  return (
    <div className="custom-form-root">
      <form onSubmit={handleSubmit} className="custom-form-container">
        {fields.map((field) => (
          <div key={field.id} className="custom-form-field-container">
            <div className="custom-form-field-header">
              <input
                type="text"
                value={field.label}
                onChange={(e) => handleLabelChange(field.id, e.target.value)}
                className="custom-form-label-input"
                readOnly={field.id < 5}
              />
              {field.id > 4 && (
                <button
                  type="button"
                  onClick={() => removeField(field.id)}
                  className="custom-form-remove-btn"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="custom-form-field-content">
              <div className="custom-form-type-select-container">
                <select
                  value={field.type}
                  onChange={(e) => handleTypeChange(field.id, e.target.value)}
                  className="custom-form-type-select"
                  disabled={field.id < 5}
                >
                  {fieldTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {field.type === "select(dropdown)" && (
                <div className="custom-form-dropdown-options">
                  {field.options?.map((option, index) => (
                    <div
                      key={index}
                      className="custom-form-dropdown-option-row"
                    >
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(field.id, index, e.target.value)
                        }
                        placeholder={`Option ${index + 1}`}
                        className="custom-form-dropdown-option"
                      />
                      <button
                        type="button"
                        onClick={() => removeDropdownOption(field.id, index)}
                        className="custom-form-remove-option-btn"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addDropdownOption(field.id, "")}
                    className="custom-form-add-option-btn"
                  >
                    + Add Option
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="custom-form-actions">
          <button
            style={{ color: "black", fontWeight: "500", fontSize: "16px" }}
            type="button"
            onClick={addField}
            className="custom-form-add-btn"
          >
            + Add Field
          </button>

          <button
            type="submit"
            style={{ fontWeight: "500", fontSize: "16px" }}
            className="custom-form-submit-btn"
          >
            Submit Form
          </button>
        </div>
      </form>

      {showAlert && (
        <div className="custom-form-alert">
          <div className="custom-form-alert-content">
            <div>
              <p style={{fontWeight:"450"}}>{`Note: "once you submit, It will be consider as permanent template form."`}</p>
            </div>
            <h3 id="custom-form-h3">Confirm Submission</h3>
            <div className="custom-form-alert-buttons">
              <button
                id="border-btn"
                onClick={() => setShowPreview(true)}
                className="custom-form-preview-btn"
              >
                Preview
              </button>
              <button
                id="border-btn"
                // onClick={() => {
                //   // Handle form submission
                //   setShowAlert(false);
                // }}
                onClick={submitFormToBackend}
                className="custom-form-confirm-btn"
              >
                Yes, Submit
              </button>
              <button
                id="border-btn"
                onClick={() => setShowAlert(false)}
                className="custom-form-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreview && (
        <div className="custom-form-preview">
          <div className="custom-form-preview-content">
            <h3 id="custom-form-h3">Form Preview</h3>
            <div className="custom-form-preview-fields">
              {fields.map((field) => (
                <div key={field.id} className="custom-form-preview-field">
                  <label>{field.label}</label>
                  <div className="custom-form-preview-field-value">
                    {/* Preview field value would go here */}
                    {field.placeholder}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="custom-form-preview-close-btn"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
TemplateCustom.propTypes = {
  username: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
};

export default TemplateCustom;
