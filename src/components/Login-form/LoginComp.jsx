import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for prop type validation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginComp.css";
import { Link } from "react-router-dom";

const LoginComponent = ({ onLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/login?username=${username}&password=${password}`
      );
      if (response.ok) {
        // const data = await response.json();
        onLogin(username, password);
        // navigate('/TemplateCreated',{state: { username }});
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-root-div">
      <ToastContainer />
      <h1 id="login-heading">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label id="login-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id="login-label" htmlFor="password">
            Password
          </label>
          <div className="password-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>

        <p id="sign-up-p">
          <span id="sign-up-span">Create a new account -</span>

          <Link to="/SignUpComp"
          >SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

LoginComponent.propTypes = {
  onLogin: PropTypes.func.isRequired, // Specify that onLogin is a required function
};

export default LoginComponent;
