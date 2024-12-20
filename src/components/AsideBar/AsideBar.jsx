import {
  FileDoneOutlined,
  // SettingFilled,
  FormOutlined,
  FundProjectionScreenOutlined,
  LogoutOutlined,
  SolutionOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { BsPeople } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./AsideBar.css";

const AsideBar = ({ open, toggleAsideBar, username, setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false); // Clear the authentication state
    localStorage.removeItem("isAuthenticated"); // Remove authentication state from localStorage
    navigate("/login"); // Redirect to the login page
  };
  const navigate = useNavigate();

  return (
    <div className="aside-root-div">
      <div className={open ? "aside-bar collapse" : "aside-bar collapse "}>
        <Link
          to={"/"}
          style={{ textDecoration: "none", color: "black" }}
          onClick={toggleAsideBar}
        >
          <div id="logo-name">
            <p>Shepherd</p>
          </div>
          <hr />
          {/* <p id="sub-text">by testing shastra</p> */}
        </Link>

        <div className="ul-list-div">
          <ul>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              <li id="dashboard-li">
                <FundProjectionScreenOutlined />{" "}
                <span id="aside-icon-space">Dashboard</span>
              </li>
            </Link>

            <Link
              to={"/LeadRegistrationForm"}
              state={{ username }} // Pass username here
              style={{ textDecoration: "none", color: "white" }}
              onClick={toggleAsideBar}
            >
              <li>
                <UserAddOutlined /> <span id="aside-icon-space">Add Lead</span>
              </li>
            </Link>

            <Link
              to={"/BulkLeadComponent"}
              style={{ textDecoration: "none", color: "white" }}
              onClick={toggleAsideBar}
            >
              <li>
                <BsPeople />
                <span id="aside-icon-space">Add Bulk Lead</span>
              </li>
            </Link>

            <Link
              to={"/TemplateCreated"}
              state={{ username }} // Pass username here
              style={{ textDecoration: "none", color: "white" }}
              onClick={toggleAsideBar}
            >
              <li>
                <UserAddOutlined />{" "}
                <span id="aside-icon-space">Add Client</span>
              </li>
            </Link>

            <Link
              to={"/ClientDataTable"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <li>
                <UsergroupAddOutlined />{" "}
                <span id="aside-icon-space">Client List</span>
              </li>
            </Link>

            <Link
              to="/InvoiceGen"
              style={{ textDecoration: "none", color: "white" }}
            >
              <li onClick={toggleAsideBar}>
                <FileDoneOutlined /> <span id="aside-icon-space">Invoice</span>
              </li>
            </Link>

            <Link
              to="/SubscriptionPage"
              style={{ textDecoration: "none", color: "white" }}
            >
              <li onClick={toggleAsideBar}>
                <SolutionOutlined />{" "}
                <span id="aside-icon-space">Subscription</span>
              </li>
            </Link>
            <Link
              // to="/DynamicForm"
              to="/TemplateCustom"
              style={{ textDecoration: "none", color: "white" }}
            >
              <li onClick={toggleAsideBar}>
                <FormOutlined />{" "}
                <span id="aside-icon-space">Create Template</span>
              </li>
            </Link>
            {/* <Link
            to={"/BusinessPanel"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <li onClick={toggleAsideBar}>
              <SettingFilled /> Business Panel
            </li>
          </Link> */}

            <li onClick={handleLogout}>
              <LogoutOutlined /> <span id="aside-icon-space">Log-out</span>
            </li>
          </ul>
        </div>
        <div className="bottem-div-aside">
          <p id="develop-text-line1">Design and developed by</p>
          <p id="develop-text-line2">Testing Shastra.</p>
        </div>
      </div>
    </div>
  );
};

AsideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleAsideBar: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default AsideBar;
