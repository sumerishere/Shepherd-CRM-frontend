import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../created-templates/CreatedTemplate.css";

import PropTypes from "prop-types";

const TemplateCreated = ({username}) => {

  
  const [templateData, setTemplateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [formTemplateId, setFormTemplateId] = useState(null);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/get-template-username?userName=${username}
          `
        );

        if (response.ok) {

          const data = await response.json();
          console.log("Fetched data:", data); 

          if (Array.isArray(data) && data.length > 0) {
            setTemplateData(data);
            setFormTemplateId(data[0].id); // Assuming the ID is available as `id` in the response
         
          }
           else {
            setTemplateData([]);
          }
        } 
        else {
          setTemplateData([]);
        }
      } 
      catch (error) {
        console.error("Fetch error:", error);
        setTemplateData([]);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, [username]);

  // const handleChange = (e) => {
  //   const { name, value, type, checked, files } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]:
  //       type === "checkbox"
  //         ? checked
  //         : type === "file"
  //         ? files[0] 
  //         : value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special case for Yes/No checkboxes
    if (type === "checkbox" && (value === "Yes" || value === "No")) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? value : "", // Set to "Yes" or "No" if checked, or empty if unchecked
      }));
    } else {
      // Handle other input types as before
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  


  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object for all data
    const formDataObject = new FormData();
  
    // Add formTemplateId
    formDataObject.append("formTemplateId", formTemplateId);
  
    // Prepare the formData
    const jsonFormData = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) {
        // Append files directly to FormData
        formDataObject.append(key, formData[key]);
      } else {
        // Add non-file data to jsonFormData
        jsonFormData[key] = formData[key];
      }
    });
  
    // Add the JSON data as a stringified object
    formDataObject.append("formDataRequest", JSON.stringify({
      formTemplateId: formTemplateId,
      formData: jsonFormData
    }));
  
    try {
      // Send form data using fetch API
      const response = await fetch("http://localhost:8080/submit-form-data", {
        method: "POST",
        body: formDataObject, // Send formDataObject directly
        // Don't set Content-Type header, let the browser set it with the boundary
      });
  
      if (response.ok) {
        toast.success("Form submitted successfully!", {
          position: "top-center",
        });
        console.log("Form submitted successfully.");
      } else {
        const errorText = await response.text();
        toast.error(`Error submitting form: ${errorText}`, {
          position: "top-center",
        });
        console.error("Error submitting form:", errorText);
      }
    } catch (error) {
      toast.error("Submission error: " + error.message, {
        position: "top-center",
      });
      console.error("Submission error:", error);
    }
  };

  if (loading) {
    return <div id="template-loading-id">Loading...</div>;
  }

  if (templateData.length === 0) {
    return (
      <div className="empty-text-div">


        <img className="bg-template-img" src="/images/data-8873303_1920.png" alt="" />
        <p id="empty-text">Template! not found. 🥲</p>
        <p id="alert-emoji">⚠️</p>
        <p id="empty-template-note">{`Note :" First you will have to create your own template form then you will able to see your template form here."`}</p>
      </div>
    );
  }

  const template = templateData[0];
  const fields = template?.fields || [];

  return (
    <div className="createdTemplate-root-div">
      <ToastContainer />
      <p id="createdTemplate-h1"> Add Client</p>

      <div className="form-div-container">
        <form className="created-template-form" onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="form-group">
              <label htmlFor={field.columnName}>{field.columnName}</label>

              {field.dataType === "Yes/No button(Radio)" ? (
                <div>
                  <label id="label-radio-1">
                    <input
                      id="radio-input-1"
                      style={{ cursor: "pointer" }}
                      type="radio"
                      name={field.columnName}
                      value="Yes"
                      onChange={handleChange}
                    />{" "}
                    Yes
                  </label>
                  <label id="label-radio-2">
                    <input
                      id="radio-input-2"
                      style={{ cursor: "pointer" }}
                      type="radio"
                      name={field.columnName}
                      value="No"
                      onChange={handleChange}
                    />{" "}
                    No
                  </label>
                </div>
              ) : field.dataType === "Yes/No check(checkbox)" ? (
                <div>
                <label id="template-label-checkbox">
                  <input
                    style={{ cursor: "pointer" }}
                    id="template-checkbox-input"
                    type="checkbox"
                    name={field.columnName}
                    value="Yes"
                    onChange={handleChange}
                    checked={formData[field.columnName] === "Yes"} // Handle checked state
                  />
                  Yes
                </label>
            
                <label id="template-label-checkbox">
                  <input
                    style={{ cursor: "pointer" }}
                    id="template-checkbox-input"
                    type="checkbox"
                    name={field.columnName}
                    value="No"
                    onChange={handleChange}
                    checked={formData[field.columnName] === "No"} // Handle checked state
                  />
                  No
                </label>
              </div>
            
              ) : field.dataType === "Image" ? (
                <div>
                  <label id="label-image">
                    <input
                      style={{
                        border: "1px solid grey",
                        borderRadius: "3px",
                      }}
                      id="image-input"
                      type="file"
                      accept="image/*"
                      name={field.columnName}
                      onChange={handleChange}
                    />{" "}
                    Upload Image
                  </label>
                </div>
              ) : field.dataType === "Pdf File" ? (
                <div>
                  <label id="label-pdf">
                    <input
                      style={{
                        border: "1px solid grey",
                        borderRadius: "3px",
                      }}
                      id="pdf-input"
                      type="file"
                      accept="application/pdf"
                      name={field.columnName}
                      onChange={handleChange}
                    />{" "}
                    Upload PDF
                  </label>
                </div>
              ) : (
                <input
                  className="form-input"
                  placeholder={`Enter ${
                    field.columnName !== "comment box"
                      ? field.columnName
                      : "comment"
                  }`}
                  type={field.dataType === "Number(int)" ? "number" : "text"}
                  min={field.dataType === "Number(int)" ? 0 : undefined}
                  required={true}
                  id={field.columnName}
                  name={field.columnName}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

TemplateCreated.propTypes = {
  open: PropTypes.bool.isRequired,
  // toggleAsideBar: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired, // Add prop type validation for username
};

export default TemplateCreated;





