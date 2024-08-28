import { useState } from "react";
import "../Lead-Comp/LeadRegistrationForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const LeadRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    CourseType: "", // Ensure correct field name
    source: "",
    referName: "",
    qualification: "", // New field for Qualification
    category: "",
    followUpDate: "",
    assignTo: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
  });

  const [loading, setLoading] = useState(false); // State to control loading spinner

  const validate = (field, value) => {
    let isValid = true;
    let errorMessage = "";

    switch (field) {
      case "name": {
        const namePattern = /^[a-zA-Z][a-zA-Z\s]*$/;
        if (!namePattern.test(value)) {
          errorMessage =
            "Name should not start with a digit and should only contain letters and spaces.";
          isValid = false;
        }
        break;
      }

      case "mobile": {
        const mobilePattern = /^[0-9]+$/;
        if (!mobilePattern.test(value)) {
          errorMessage = "Mobile number must be digits only.";
          isValid = false;
        }
        break;
      }

      case "address": {
        if (value.trim() === "") {
          errorMessage = "Address is required.";
          isValid = false;
        }
        break;
      }

      case "email": {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errorMessage = "Invalid email format.";
          isValid = false;
        }
        break;
      }

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));

    return isValid;
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
  
    switch (id) {
      case "lead-name":
        setFormData((prev) => ({ ...prev, name: value }));
        break;
      case "lead-mobile":
        setFormData((prev) => ({ ...prev, mobile: value }));
        break;
      case "lead-address":
        setFormData((prev) => ({ ...prev, address: value }));
        break;
      case "lead-email":
        setFormData((prev) => ({ ...prev, email: value }));
        break;
      case "lead-course-type":
        setFormData((prev) => ({ ...prev, CourseType: value }));
        break;
      case "lead-source":
        setFormData((prev) => ({ ...prev, source: value }));
        break;
      case "lead-referName":
        setFormData((prev) => ({ ...prev, referName: value }));
        break;
      case "lead-qualification":
        setFormData((prev) => ({ ...prev, qualification: value }));
        break;
      case "lead-category-drop":
        setFormData((prev) => ({ ...prev, category: value }));
        break;
      case "lead-followUpDate":
        setFormData((prev) => ({ ...prev, followUpDate: value }));
        break;
      case "lead-assignTo":  // Fix for the 'Assign To' field
        setFormData((prev) => ({ ...prev, assignTo: value }));
        break;
      default:
        break;
    }
  
    // Validate the input field
    validate(id.split("-")[1], value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formIsValid = true;

    Object.keys(formData).forEach((key) => {
      if (!validate(key, formData[key])) {
        formIsValid = false;
      }
    });

    if (formIsValid) {
      setLoading(true); // Show the spinner

      try {
        const response = await fetch("http://localhost:8080/save-lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobileNumber: formData.mobile,
            address: formData.address,
            courseType: formData.CourseType, // Ensure correct field name
            source: formData.source,
            referName: formData.referName,
            qualification: formData.qualification, // Sending the qualification
            category: formData.category,
            followUpDate: formData.followUpDate,
            assignTo: formData.assignTo,
          }),
        });

        if (response.ok) {
          toast.success("Lead Added successfully!!");
          setFormData({
            name: "",
            mobile: "",
            address: "",
            email: "",
            CourseType: "", // Reset the field correctly
            source: "",
            referName: "",
            qualification: "", // Reset qualification field
            category: "",
            followUpDate: "",
            assignTo: "",
          });
        } else {
          const errorText = await response.text();
          toast.error("Failed to submit the form.", errorText);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false); // Hide the spinner
      }
    }
  };

  // Get the current date and time in the format required by the datetime-local input
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="lead-registration-form-root">
      {loading && (
        <div className="lead-registration-form-spinner-overlay">
          <ClipLoader color="#ffffff" loading={loading} size={100} />
        </div>
      )}
      <div className="lead-registration-form-div">
        <ToastContainer />
        <h2 className="lead-registration-form-title">Lead Registration</h2>
        <form className="lead-registration-form" onSubmit={handleSubmit}>
          <div className="lead-registration-form-group">
            <label htmlFor="lead-name" className="lead-registration-form-label">
              Name:
            </label>
            <input
              id="lead-name"
              type="text"
              className="lead-registration-form-input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <div className="lead-registration-form-error">{errors.name}</div>
            )}
          </div>

          <div className="lead-registration-form-group">
            <label
              htmlFor="lead-mobile"
              className="lead-registration-form-label"
            >
              Mobile Number:
            </label>
            <input
              id="lead-mobile"
              type="text"
              className="lead-registration-form-input"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            {errors.mobile && (
              <div className="lead-registration-form-error">
                {errors.mobile}
              </div>
            )}
          </div>

          <div className="lead-registration-form-group">
            <label
              htmlFor="lead-address"
              className="lead-registration-form-label"
            >
              Address:
            </label>
            <input
              id="lead-address"
              type="text"
              className="lead-registration-form-input"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && (
              <div className="lead-registration-form-error">
                {errors.address}
              </div>
            )}
          </div>

          <div className="lead-registration-form-group">
            <label
              htmlFor="lead-email"
              className="lead-registration-form-label"
            >
              Email:
            </label>
            <input
              id="lead-email"
              type="email"
              className="lead-registration-form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className="lead-registration-form-error">{errors.email}</div>
            )}
          </div>

          <div className="lead-registration-form-group">
            <label
              htmlFor="lead-course-type"
              className="lead-registration-form-label"
            >
              Course Type:
            </label>
            <select
              id="lead-course-type"
              className="lead-registration-form-select"
              value={formData.CourseType} // Ensure correct field name
              onChange={handleChange}
              required
            >
              <option value="">Select a course type</option>
              <option value="Java fullStack development">
                Java fullStack development
              </option>
              <option value="Automation Testing">Automation Testing</option>
              <option value="UI/UX">UI/UX</option>
              <option value="MERN Stack">MERN Stack</option>
              <option value="REST Api">REST Api</option>
            </select>
          </div>

          {/* New source dropdown */}
          <div className="lead-registration-form-group">
            <label
              htmlFor="lead-source"
              className="lead-registration-form-label"
            >
              Source:
            </label>
            <select
              id="lead-source"
              className="lead-registration-form-select"
              value={formData.source}
              onChange={handleChange}
              required
            >
              <option value="">Select a source</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
              <option value="Direct">Direct</option>
            </select>
          </div>

          {/* New referName input field */}
          <div className="lead-registration-form-group">
            <label
              htmlFor="lead-referName"
              className="lead-registration-form-label"
            >
              Refer Name:
            </label>
            <input
              id="lead-referName"
              type="text"
              className="lead-registration-form-input"
              placeholder="Enter the refer name if available"
              value={formData.referName}
              onChange={handleChange}
            />
          </div>

          {/* New qualification input field */}
          <div className="lead-registration-form-group">
            <label
              htmlFor="lead-qualification"
              className="lead-registration-form-label"
            >
              Qualification:
            </label>
            <input
              id="lead-qualification"
              type="text"
              className="lead-registration-form-input"
              placeholder="Enter your qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>

          <div className="lead-registration-form-group">
            <label
              htmlFor="lead-category"
              className="lead-registration-form-label"
            >
              Lead category:
            </label>
            <select
              id="lead-category-drop"
              className="lead-registration-form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select lead category</option>
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="cold">Cold</option>
            </select>
          </div>

          <div className="lead-registration-form-group">
            <label
              htmlFor="lead-followUpDate"
              className="lead-registration-form-label"
            >
              FollowUp-Date:
            </label>
            <input
              id="lead-followUpDate"
              type="datetime-local"
              className="lead-registration-form-input"
              placeholder="Enter your qualification"
              value={formData.followUpDate}
              onChange={handleChange}
              min={getCurrentDateTime()}
            />
          </div>

          <div className="lead-registration-form-group">
            <label
              htmlFor="lead-assignTo"
              className="lead-registration-form-label">
              Assign-To:
            </label>
            <input
              id="lead-assignTo"
              type="text"
              className="lead-registration-form-input"
              placeholder="Enter Name"
              value={formData.assignTo}
              onChange={handleChange}
            />
          </div>

          <div className="lead-registration-form-buttons">
            <button
              type="submit"
              className="lead-registration-form-button lead-registration-form-submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadRegistrationForm;
