import { useState } from "react";
import "../SignUp-form/SignUpComp.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SignUpComp = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    mobileNumber: "",
    email: "",
    organizationName:"",
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [logoFile, setLogoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.email.includes("@")) {
      errors.email = "Invalid email format";
    }
    if (!/^\d{1,12}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile number must be between (1-12) digits";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create a FormData object to send the form data
    const formDataToSend = new FormData();

    // Append form data fields
    formDataToSend.append(
      "user",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    // Append the logo file if it exists
    if (logoFile) {
      formDataToSend.append("logo", logoFile);
    }

    try {
      const response = await fetch("http://localhost:8080/save-user-info", {
        method: "POST",
        body: formDataToSend, // Send formData directly
      });

      const responseText = await response.text(); // Read response as text

      if (!response.ok) {
        if (responseText.startsWith("{") || responseText.startsWith("[")) {
          try {
            const responseData = JSON.parse(responseText);
            throw new Error(`${JSON.stringify(responseData)}`);
          } catch (e) {
            throw new Error(`${responseText}`);
          }
        } else {
          throw new Error(`${responseText}`);
        }
      }

      // Handle success response
      if (responseText === "User saved successfully") {
        toast.success("Form submitted successfully!");
      } else {
        toast.error(`Error: ${responseText}`);
      }

      // Reset form data and errors
      setFormData({
        fullName: "",
        address: "",
        mobileNumber: "",
        email: "",
        organizationName:"",
        userName: "",
        password: "",
      });
      setErrors({});
    } catch (error) {
      toast.error(`Error submitting the form: ${error.message}`);
      console.error("Submission error:", error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Clear the authentication state
    localStorage.removeItem("isAuthenticated"); // Remove authentication state from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="signup-root-div">
      <div className="signup-form-div">
        <h1 id="signup-form-h1">SignUp Form</h1>
        <div className="signup-img-div">
          <img className="signup-img" src="/images/signup-png.png" alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group-singup">
            <label>Full Name:</label>
            <input
              className="form-input-grp"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-singup">
            <label>Address:</label>
            <input
              className="form-input-grp"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-singup">
            <label>Mobile Number:</label>
            <input
              className="form-input-grp"
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
            {errors.mobileNumber && (
              <span className="error">{errors.mobileNumber}</span>
            )}
          </div>
          <div className="form-group-singup">
            <label>Email:</label>
            <input
              className="form-input-grp"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>


          <div className="form-group-singup">
            <label>Organization Name:</label>
            <input
              className="form-input-grp"
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-singup">
            <label>Username:</label>
            <input
              className="form-input-grp"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-singup">
            <label>Password:</label>
            <input
              className="form-input-grp"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              id="pass-check-box"
              className="form-input-grp"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="upload-logo">Upload Logo</label>
            <input
              type="file"
              style={{ border: "1px solid black" }}
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files[0])}
            />
            {/* <p id="pass-show-p">Show Password</p> */}
          </div>
          <button id="SignUp-submit-btn" type="submit">
            SignUp
          </button>
          <span id="already-acc-id">Aleady! account</span>
          <p onClick={handleLogout} id="go-login-id">
            Go-Login
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpComp;

SignUpComp.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};
