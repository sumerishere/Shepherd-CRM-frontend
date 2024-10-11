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
    organizationName: "",
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    fullName:"",
    address: "",
    mobileNumber: "",
    email: "",
    organizationName:"",
    userName: "",
    password: "",
  });

  const [logoFile, setLogoFile] = useState(null);

  //validation constant
  const NAME_isVALID = /^[a-zA-Z][a-zA-Z\s]*$/;
  const ADDRESS_isVALID = /^(?!.*\s{2})[A-Za-z0-9\\s,./-]+(\s[A-Za-z0-9\s'#,.\-/()]+)*$/;
  // const MOBILE_NUMBER_PATTERN = /^\d{1,12}$/;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



  const validate = (field,value) => {
    let isValid = true;
    let errorMessage = "";

    switch(field){

      case "fullName":{
        if(!NAME_isVALID.test(value)){
          errorMessage = "Valid full Name format is required";
          isValid = false;
        }
        break;
      }

      case "address":{
        if(!ADDRESS_isVALID.test(value)){
          errorMessage = "Valid Address format is required"
          isValid = false;
        }
        break;
      }
      
      case "email":{
        if (!EMAIL_PATTERN.test(value)) {
          errorMessage = "Valid email format is required";
          isValid = false;
        }
        break;
      }

      case "organizationName":{
        if(!NAME_isVALID.test(value)){
          errorMessage = "Valid organization name format is required";
          isValid = false;
        }
        break;
      }
      default:
        break;
    }
    setErrors((prevErrors)=> ({
      ...prevErrors,
      [field] : errorMessage,
    }));

    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    switch(id){
      case "fullName-validate-id":
        setFormData((prev) => ({ ...prev, fullName: value }));
        break;
      
      case "address-validate-id":
        setFormData((prev) => ({ ...prev, address: value }));
        break;
      
      // case "mobileNumber-validate-id":
      //   setFormData((prev) => ({...prev, mobileNumber: value}));
      //   break;
      
      case "email-validate-id":
        setFormData((prev) => ({
          ...prev,email:value
        }));
        break;
      

      case "organizationName-validate-id":
        setFormData((prev) => ({
          ...prev,organizationName:value
        }));
        break;
      

      case "userName-validate-id":
        setFormData((prev) => ({
          ...prev, userName:value
        }));
        break;

      case "password-validate-id":
        setFormData((prev) => ({
          ...prev, password:value
        }));
        break;

      default:
        break;
    }
    validate(id.split("-")[0], value);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }


    // Validate all fields
  const fields = ['fullName', 'address', 'email', 'organizationName', 'userName', 'password'];
  let isValid = true;

  for (const field of fields) {
    if (!validate(field, formData[field])) {
      isValid = false;
    }
  }

  if(!isValid){
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

        // Navigate to login page after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);

    } else {
      toast.error(`Error: ${responseText}`);
    }
  }catch (error) {
      toast.error(`Error submitting the form: ${error.message}`);
      console.error("Submission error:", error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Clear the authentication state
    localStorage.removeItem("isAuthenticated"); // Remove authentication state from localStorage
    navigate("/login"); // Redirect to the login page
  };

  const handleMobileChange = (e) => {
    const { name, value } = e.target;
    // Only allow numeric input and limit to 10 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 10);

    setFormData((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
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
              id="fullName-validate-id"
              className="form-input-grp"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <span className="error">{errors.fullName}</span>
            )}
          </div>
          <div className="form-group-singup">
            <label>Address:</label>
            <input
              id="address-validate-id"
              className="form-input-grp"
              type="text"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div className="form-group-singup">
            <label>Mobile Number:</label>
            <input
              id="mobileNumber-validate-id"
              className="form-input-grp mobile-number"
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleMobileChange}
              pattern="[0-9]{10}"
              maxLength="10"
              placeholder="Enter 10-digit mobile number"
              required
            />
          </div>
          <div className="form-group-singup">
            <label>Email:</label>
            <input
              id="email-validate-id"
              className="form-input-grp"
              type="text"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group-singup">
            <label>Organization Name:</label>
            <input
              id="organizationName-validate-id"
              className="form-input-grp"
              type="text"
              name="organizationName"
              placeholder="Enter Organization Name"
              value={formData.organizationName}
              onChange={handleChange}
              required
            />

            {errors.organizationName && (
              <span className="error">{errors.organizationName}</span>
            )}
          </div>

          <div className="form-group-singup">
            <label>Create Username:</label>
            <input
              id="userName-validate-id"
              className="form-input-grp"
              type="text"
              name="userName"
              placeholder="Create New Username "
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-singup">
            <label>Create Password:</label>
            <input
              id="password-validate-id"
              className="form-input-grp"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter new password"
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
