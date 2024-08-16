// import "./AsideBar.css";
// import PropTypes from "prop-types";


// import {
//   FundProjectionScreenOutlined,
//   FileDoneOutlined,
//   UserAddOutlined,
//   UsergroupAddOutlined,
//   SolutionOutlined,
//   SettingFilled,
//   FormOutlined,
//   LogoutOutlined
// } from "@ant-design/icons";
// import { Link,useNavigate } from "react-router-dom";

// const AsideBar = ({ open, toggleAsideBar, username, setIsAuthenticated }) => {

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setIsAuthenticated(false); // Clear the authentication state
//     navigate("/"); // Redirect to the login page
//   };

//   return (
//     <div>
//       <div className={open ? "aside-bar collapse" : "aside-bar collapse "}>
//         <Link
//           to={"/"}
//           style={{ textDecoration: "none", color: "black" }}
//           onClick={toggleAsideBar}

//         >
//           <div id="logo-name">
//             <p>Shepherd</p>
//           </div>
//           <p id="sub-text">by testing shastra</p>
//         </Link>
//         <ul>
//           <Link
//             to={"/"}
//             style={{ textDecoration: "none", color: "white" }}
//             onClick={toggleAsideBar}
//           >
//             <li>
//               <FundProjectionScreenOutlined /> Dashboard
//             </li>
//           </Link>
//           <Link
//             to={"/TemplateCreated"}
//             state={{ username }} // Pass username here
//             style={{ textDecoration: "none", color: "white" }}
//             onClick={toggleAsideBar}
//           >
//             <li>
//               <UserAddOutlined /> Add Lead
//             </li>
//           </Link>
//           <Link
//             to={"/LeadList"}
//             style={{ textDecoration: "none", color: "white" }}
//           >
//             <li>
//               <UsergroupAddOutlined /> Lead List
//             </li>
//           </Link>
//           <li onClick={toggleAsideBar}>
//             <FileDoneOutlined /> Invoice
//           </li>
//           <li onClick={toggleAsideBar}>
//             <SolutionOutlined /> Subscribers
//           </li>
//           <Link
//             to="/DynamicForm"
//             style={{ textDecoration: "none", color: "white" }}
//           >
//             <li onClick={toggleAsideBar}>
//               <FormOutlined /> Create Template
//             </li>
//           </Link>
//           <Link
//             to={"/BusinessPanel"}
//             style={{ textDecoration: "none", color: "white" }}
//           >
//             <li onClick={toggleAsideBar}>
//               <SettingFilled /> Business Panel
//             </li>
//           </Link>

          
//             <li onClick={handleLogout} >
//             <LogoutOutlined /> Log-out
//             </li>
          
         

//         </ul>
//         <p id="develop-text-line1">Design and developed by</p>
//         <p id="develop-text-line2">Testing Shastra.</p>
//       </div>
//     </div>
//   );
// };

// AsideBar.propTypes = {
//   open: PropTypes.bool.isRequired,
//   toggleAsideBar: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired, // Add prop type validation for username
//   setIsAuthenticated: PropTypes.boolean.isRequired
// };

// export default AsideBar;



import "./AsideBar.css";
import PropTypes from "prop-types";
import {
  FundProjectionScreenOutlined,
  FileDoneOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  SolutionOutlined,
  SettingFilled,
  FormOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const AsideBar = ({ open, toggleAsideBar, username, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false); // Clear the authentication state
    localStorage.removeItem("isAuthenticated"); // Remove authentication state from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div>
      <div className={open ? "aside-bar collapse" : "aside-bar collapse "}>
        <Link
          to={"/"}
          style={{ textDecoration: "none", color: "black" }}
          onClick={toggleAsideBar}
        >
          <div id="logo-name">
            <p>Shepherd</p>
          </div>
          <p id="sub-text">by testing shastra</p>
        </Link>
        <ul>
          <Link
            to={"/"}
            style={{ textDecoration: "none", color: "white" }}
            onClick={toggleAsideBar}
          >
            <li>
              <FundProjectionScreenOutlined /> Dashboard
            </li>
          </Link>
          <Link
            to={"/TemplateCreated"}
            state={{ username }} // Pass username here
            style={{ textDecoration: "none", color: "white" }}
            onClick={toggleAsideBar}
          >
            <li>
              <UserAddOutlined /> Add Client
            </li>
          </Link>
          <Link
            to={"/LeadList"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <li>
              <UsergroupAddOutlined /> Lead List
            </li>
          </Link>
          <li onClick={toggleAsideBar}>
            <FileDoneOutlined /> Invoice
          </li>
          <li onClick={toggleAsideBar}>
            <SolutionOutlined /> Subscribers
          </li>
          <Link
            to="/DynamicForm"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li onClick={toggleAsideBar}>
              <FormOutlined /> Create Template
            </li>
          </Link>
          <Link
            to={"/BusinessPanel"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <li onClick={toggleAsideBar}>
              <SettingFilled /> Business Panel
            </li>
          </Link>

          <li onClick={handleLogout}>
            <LogoutOutlined /> Log-out
          </li>
        </ul>
        <p id="develop-text-line1">Design and developed by</p>
        <p id="develop-text-line2">Testing Shastra.</p>
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
