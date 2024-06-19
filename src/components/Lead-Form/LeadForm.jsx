import { useState } from "react";
import "./LeadForm.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { RotatingLines } from "react-loader-spinner";

const LeadForm = () => {
  const initialFormData = {
    name: "",
    mobileNo: "",
    mailId: "",
    username: "",
    password: "",
  };

  const [formErrors, setFormErrors] = useState({}); // Error messages state
  const [formData, setFormData] = useState(initialFormData); // Form data state
  const [showPassword, setShowPassword] = useState(false); // Password visibility state

  // const [loading, setLoading] = useState(false); // State to manage loading spinner

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Validate the input fields
    if (name === "mobileNo") {
      if (/^\d+$/.test(value) || value === "") {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      } else {
        setFormErrors({
          ...formErrors,
          [name]: "Please enter numbers only.",
        });
      }
    } else {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="sign-up-root-div">
      {/* <ToastContainer /> */}
      {/* <h2>Lead Registration Form</h2> */}
      {/* <p id="heading-form-text">
        Note : Please!!! Fill The All Necessary Details Carefully.
      </p> */}
      <form className="form-container">
        <label htmlFor="name">
          Investor Name<span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          required={true}
          value={formData.name}
          onChange={handleInputChange}
        />
        {formErrors.name && <p style={{ color: "red" }}>{formErrors.name}</p>}
        <label htmlFor="countryCode">
          Country Code<span className="required">*</span>
        </label>
        <select
          name="countryCode"
          value={formData.countryCode}
          onChange={handleInputChange}
        >
          <option value="">Select Country Code</option>
          <option value="+1">+91 (India)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>
        {formErrors.countryCode && (
          <p style={{ color: "red" }}>{formErrors.countryCode}</p>
        )}
        <label htmlFor="mobileNo">
          Investor Mobile No.<span className="required">*</span>
        </label>
        <input
          type="text"
          required="true"
          placeholder="Enter Your Mobile No."
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleInputChange}
        />
        {formErrors.mobileNo && (
          <p style={{ color: "red" }}>{formErrors.mobileNo}</p>
        )}
        <label htmlFor="mailId">
          Investor Email<span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Your Email"
          name="mailId"
          required="true"
          value={formData.mailId}
          onChange={handleInputChange}
        />
        {formErrors.mailId && (
          <p style={{ color: "red" }}>{formErrors.mailId}</p>
        )}
        <label htmlFor="username">
          Create New Username (Unique)<span className="required">*</span>
          <p id="username-unique">
            {`Note : " Username should be start with Capital letter and it's
            mandatory to unique. "`}
          </p>
        </label>
        <input
          type="text"
          placeholder="Enter New Username"
          name="username"
          required="true"
          value={formData.username}
          onChange={handleInputChange}
        />
        {formErrors.username && (
          <p style={{ color: "red" }}>{formErrors.username}</p>
        )}
        <label htmlFor="password">
          Create New Password<span className="required">*</span>
          <p id="username-unique">
            {`"
            Note : " Password must be at least 8 characters with format - at
            least one uppercase letter/ lowercase letter/ digit and one special
            character. "`}
          </p>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter New Password"
          name="password"
          required="true"
          id="pass-id"
          value={formData.password}
          onChange={handleInputChange}
        />
        {formErrors.password && (
          <p style={{ color: "red" }}>{formErrors.password}</p>
        )}
        <input
          type="checkbox"
          id="show-password"
          onChange={handleTogglePassword}
        />
        <span id="show-pass-text">Click to Show Password</span>
        {/* <label htmlFor="ProfileImg">
          Upload Profile Image<span className="required">*</span>
        </label>
        <input
          className="pro-img"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        /> */}
         {/*disabled={loading} */}
      </form>

      {/* {loading && (
        <div className="spinnner-signUp">
          <RotatingLines width="100" />
        </div>
      )} */}

      <form className="form-container">
        <label htmlFor="name">
          Investor Name<span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          required={true}
          value={formData.name}
          onChange={handleInputChange}
        />
        {formErrors.name && <p style={{ color: "red" }}>{formErrors.name}</p>}
        <label htmlFor="countryCode">
          Country Code<span className="required">*</span>
        </label>
        <select
          name="countryCode"
          value={formData.countryCode}
          onChange={handleInputChange}
        >
          <option value="">Select Country Code</option>
          <option value="+1">+91 (India)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>
        {formErrors.countryCode && (
          <p style={{ color: "red" }}>{formErrors.countryCode}</p>
        )}
        <label htmlFor="mobileNo">
          Investor Mobile No.<span className="required">*</span>
        </label>
        <input
          type="text"
          required="true"
          placeholder="Enter Your Mobile No."
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleInputChange}
        />
        {formErrors.mobileNo && (
          <p style={{ color: "red" }}>{formErrors.mobileNo}</p>
        )}
        <label htmlFor="mailId">
          Investor Email<span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Your Email"
          name="mailId"
          required="true"
          value={formData.mailId}
          onChange={handleInputChange}
        />
        {formErrors.mailId && (
          <p style={{ color: "red" }}>{formErrors.mailId}</p>
        )}
        <label htmlFor="username">
          Create New Username (Unique)<span className="required">*</span>
          <p id="username-unique">
            {`Note : " Username should be start with Capital letter and it's
            mandatory to unique. "`}
          </p>
        </label>
        <input
          type="text"
          placeholder="Enter New Username"
          name="username"
          required="true"
          value={formData.username}
          onChange={handleInputChange}
        />
        {formErrors.username && (
          <p style={{ color: "red" }}>{formErrors.username}</p>
        )}
        <label htmlFor="password">
          Create New Password<span className="required">*</span>
          <p id="username-unique">
            {`"
            Note : " Password must be at least 8 characters with format - at
            least one uppercase letter/ lowercase letter/ digit and one special
            character. "`}
          </p>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter New Password"
          name="password"
          required="true"
          id="pass-id"
          value={formData.password}
          onChange={handleInputChange}
        />
        {formErrors.password && (
          <p style={{ color: "red" }}>{formErrors.password}</p>
        )}
        <input
          type="checkbox"
          id="show-password"
          onChange={handleTogglePassword}
        />
        <span id="show-pass-text">Click to Show Password</span>
        {/* <label htmlFor="ProfileImg">
          Upload Profile Image<span className="required">*</span>
        </label>
        <input
          className="pro-img"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        /> */}
         {/*disabled={loading} */}
      </form>

      <div id="submit-btn-lead">
        <p><input id="submit-input" type="submit" value="Add Lead" /></p>
      </div>
      
    </div>
  );
};
export default LeadForm;
