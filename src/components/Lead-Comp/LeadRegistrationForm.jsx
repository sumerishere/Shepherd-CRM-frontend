import { useState } from "react";
import "../Lead-Comp/LeadRegistrationForm.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";

const LeadRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    CourseType: "" // Ensure correct field name
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
          errorMessage = "Name should not start with a digit and should only contain letters and spaces.";
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
      [field]: errorMessage
    }));

    return isValid;
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log(`id: ${id}, value: ${value}`); // Debugging

    if (id === "lead-course-type") {
      setFormData({
        ...formData,
        CourseType: value
      });
    } else {
      const field = id.split('-')[1];
      setFormData({
        ...formData,
        [field]: value
      });
    }

    console.log("Updated formData:", formData); // Debugging
    validate(id.split('-')[1], value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formIsValid = true;

    Object.keys(formData).forEach(key => {
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
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobileNumber: formData.mobile,
            address: formData.address,
            courseType: formData.CourseType // Ensure correct field name
          })
        });

        if (response.ok) {
          toast.success("Form submitted successfully!!");
          setFormData({
            name: "",
            mobile: "",
            address: "",
            email: "",
            CourseType: "" // Reset the field correctly
          });
        } else {
          const errorText = await response.text();
          toast.error("Failed to submit the form.",errorText);
        }
      } 
      catch (error) {
        toast.error("An error occurred. Please try again.");
      } 
      finally {
        setLoading(false); // Hide the spinner
      }
    }
  };

  return (
    <div className="lead-registration-form-root">
      {loading && (
        <div className="lead-registration-form-spinner-overlay">
          <ClipLoader color="#ffffff" loading={loading} size={100} />
        </div>
      )}
      <div className="lead-registration-form-div">
        <ToastContainer/>
        <h2 className="lead-registration-form-title">Lead Registration</h2>
        <form className="lead-registration-form" onSubmit={handleSubmit}>
          <div className="lead-registration-form-group">
            <label htmlFor="lead-name" className="lead-registration-form-label">Name:</label>
            <input
              id="lead-name"
              type="text"
              className="lead-registration-form-input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="lead-registration-form-error">{errors.name}</div>}
          </div>

          <div className="lead-registration-form-group">
            <label htmlFor="lead-mobile" className="lead-registration-form-label">Mobile Number:</label>
            <input
              id="lead-mobile"
              type="text"
              className="lead-registration-form-input"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            {errors.mobile && <div className="lead-registration-form-error">{errors.mobile}</div>}
          </div>

          <div className="lead-registration-form-group">
            <label htmlFor="lead-address" className="lead-registration-form-label">Address:</label>
            <input
              id="lead-address"
              type="text"
              className="lead-registration-form-input"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <div className="lead-registration-form-error">{errors.address}</div>}
          </div>

          <div className="lead-registration-form-group">
            <label htmlFor="lead-email" className="lead-registration-form-label">Email:</label>
            <input
              id="lead-email"
              type="email"
              className="lead-registration-form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="lead-registration-form-error">{errors.email}</div>}
          </div>

          <div className="lead-registration-form-group">
            <label htmlFor="lead-course-type" className="lead-registration-form-label">Course Type:</label>
            <select
              id="lead-course-type"
              className="lead-registration-form-select"
              value={formData.CourseType} // Ensure correct field name
              onChange={handleChange}
              required
            >
              <option value="">Select a courseType</option>
              <option value="Java_fullStack_development">Java fullStack development</option>
              <option value="Automation_Testing">Automation Testing</option>
              <option value="UI/UX">UI/UX</option>
              <option value="MERN_Stack">MERN Stack</option>
            </select>
          </div>

          <div className="lead-registration-form-buttons">
            <button type="submit" className="lead-registration-form-button lead-registration-form-submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadRegistrationForm;
