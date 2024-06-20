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
  // const [showPassword, setShowPassword] = useState(false); // Password visibility state

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

  // const handleTogglePassword = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <div className="sign-up-root-div">
      {/* <ToastContainer /> */}
      {/* <h2>Lead Registration Form</h2> */}
      {/* <p id="heading-form-text">
        Note : Please!!! Fill 
        The All Necessary Details Carefully.
      </p> */}

      <div className="create-lead">
        <p>Create Lead</p>
      </div>

      <form className="form-container">

        <label id="form-title" htmlFor="Personal Details">Personal Details</label>

        <label htmlFor="name">
          Lead Name<span className="required">*</span>
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

        <label htmlFor="Email">
          Email<span className="required">*</span>
        </label>
        <input
          type="text"
          required="true"
          placeholder="Enter Your Email"
          name="Email"
          value={formData.mobileNo}
          onChange={handleInputChange}
        />
        {formErrors.Email && <p style={{ color: "red" }}>{formErrors.Email}</p>}
        <label htmlFor="mobileNo">
          Mobile No.<span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Your mobile No."
          name="mobileNo"
          required="true"
          value={formData.mobileNo}
          onChange={handleInputChange}
        />
        {formErrors.mobileNo && (
          <p style={{ color: "red" }}>{formErrors.mobileNo}</p>
        )}
        <label htmlFor="Address">
          Address<span className="required">*</span>
          {/* <p id="username-unique">
            {`Note : " Username should be start with Capital letter and it's
            mandatory to unique. "`}
          </p> */}
        </label>
        <input
          type="text"
          placeholder="Enter New Address"
          name="Address"
          required="true"
          value={formData.Address}
          onChange={handleInputChange}
        />
        {formErrors.Address && (
          <p style={{ color: "red" }}>{formErrors.Address}</p>
        )}

        <label htmlFor="course Interested">
          Course Interested<span className="required">*</span>
        </label>
        <select
          name="Course Interested"
          value={formData.courseInterested}
          onChange={handleInputChange}
        >
          <option value="">Course Interested</option>
          <option value="+1">+91 (India)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>
        {formErrors.courseInterested && (
          <p style={{ color: "red" }}>{formErrors.courseInterested}</p>
        )}

        <label htmlFor="Mode">
          Mode<span className="required">*</span>
        </label>
        <select name="Mode" value={formData.Mode} onChange={handleInputChange}>
          <option value="">Select Course</option>
          <option value="+1">+91 (India)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>
        {formErrors.Mode && <p style={{ color: "red" }}>{formErrors.Mode}</p>}

        <label htmlFor="Course Done In Other Institute">
          Course Interested<span className="required">*</span>
        </label>
        <select
          name="Course Done"
          value={formData.courseDone}
          onChange={handleInputChange}
        >
          <option value="">No</option>
          <option value="+1">+91 (India)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>
        {formErrors.courseDone && (
          <p style={{ color: "red" }}>{formErrors.courseDone}</p>
        )}

        <label htmlFor="Interest">
          Course Interested<span className="required">*</span>
        </label>
        <select
          name="Interest"
          value={formData.Interest}
          onChange={handleInputChange}
        >
          <option value="">Pending</option>
          <option value="+1">+91 (India)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>
        {formErrors.Interest && (
          <p style={{ color: "red" }}>{formErrors.Interest}</p>
        )}

        {/* <label htmlFor="password">
          Create New Password<span className="required">*</span> */}
        {/* <p id="username-unique">
            {`"
            Note : " Password must be at least 8 characters with format - at
            least one uppercase letter/ lowercase letter/ digit and one special
            character. "`}
          </p> 
        </label>*/}

        {/* <input
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
        <span id="show-pass-text">Click to Show Password</span> */}

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

      {/*--------------------Qualification Form--------------- */}

      <form className="form-container">

      <label id="form-title" htmlFor="Qualification">Qualification</label>

        <label htmlFor="Degree">
          Degree<span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="Degree/Graduation"
          name="name"
          required={true}
          value={formData.name}
          onChange={handleInputChange}
        />
        {formErrors.name && <p style={{ color: "red" }}>{formErrors.name}</p>}

        <label htmlFor="Specialization">
          Specialization<span className="required">*</span>
        </label>
        <input
          type="text"
          required="true"
          placeholder="Specialization/Stream"
          name="Specialization"
          value={formData.mobileNo}
          onChange={handleInputChange}
        />
        {formErrors.Specialization && (
          <p style={{ color: "red" }}>{formErrors.Specialization}</p>
        )}

        <label htmlFor="Passing year">
          Passing year<span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Passing year"
          name="Passing"
          required="true"
          value={formData.Passing}
          onChange={handleInputChange}
        />
        {formErrors.Passing && (
          <p style={{ color: "red" }}>{formErrors.Passing}</p>
        )}

        <label htmlFor="College Name">
          College Name<span className="required">*</span>
          {/* <p id="username-unique">
            {`Note : " Username should be start with Capital letter and it's
            mandatory to unique. "`}
          </p> */}
        </label>
        <input
          type="text"
          placeholder="Enter College Name"
          name="College"
          required="true"
          value={formData.College}
          onChange={handleInputChange}
        />
        {formErrors.College && (
          <p style={{ color: "red" }}>{formErrors.College}</p>
        )}

        <label htmlFor="Experience">
          Experience<span className="required">*</span>
        </label>
        <select
          name="Experience"
          value={formData.courseInterested}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          <option value="+1">+91 (India)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>
        {formErrors.courseInterested && (
          <p style={{ color: "red" }}>{formErrors.courseInterested}</p>
        )}

        <label htmlFor="Approach">
          Approach<span className="required">*</span>
        </label>
        <select
          name="Approach"
          value={formData.Approach}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          <option value="+1">+91 (India)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>
        {/* {formErrors.Approach && (
          <p style={{ color: "red" }}>{formErrors.Approach}</p>
        )} */}

        <label htmlFor="Status">
          Status<span className="required">*</span>
        </label>
        <select
          name="Status"
          value={formData.Status}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          <option value="+1">+91 (India)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>
        {formErrors.Status && (
          <p style={{ color: "red" }}>{formErrors.Status}</p>
        )}

        <label htmlFor="name">Comments</label>
        <input
          type="text"
          placeholder="Comment here"
          name="comment"
          required={true}
          value={formData.comment}
          onChange={handleInputChange}
        />
        {/* {formErrors.name && <p style={{ color: "red" }}>{formErrors.name}</p>} */}
      </form>

      <div id="submit-btn-lead">
        <p>
          <input id="submit-input" type="submit" value="Add Lead" />
        </p>
      </div>
    </div>
  );
};
export default LeadForm;
