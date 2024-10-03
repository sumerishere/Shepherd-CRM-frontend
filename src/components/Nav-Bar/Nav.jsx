import "./Nav.css";
// import { useState } from "react";
import Hamburger from "hamburger-react";
import PropTypes from 'prop-types';

const Nav = ({ toggleAsideBar, isOpen, user }) => {

  // const [isOpen, setOpen] = useState(false);
  const defaultImage = "/Admin-img/admin-default.png";

  const getImageSrc = () => {
    if (user.logo) {
      // If logo is a URL, use it directly. If it's base64 data, prefix it.
      return user.logo.startsWith('data:') ? user.logo : `data:image/jpeg;base64,${user.logo}`;
    }
    return defaultImage;
  };

  

  return (
    <div className="nav-div-root">
      <div className="menu-div">
        <div className="menu-btn-div">

          {/* <button id="btn-id">
              <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              id="hamburger-custom"/>
            </button> */}

          <button id="btn-id" onClick={toggleAsideBar}>
            <Hamburger toggled={isOpen} toggle={toggleAsideBar} id="hamburger-custom" />
            <div id ="menu-title">Menu</div>
          </button>
        </div>
      </div>

      <div className="profile-div">
        <div className="profile-details-div">

         <div className="profile-img-div">
            <img 
              id="logo-img" 
              src={getImageSrc()} 
              alt="Profile"
              onError={(e) => { e.target.src = defaultImage; }}
            />
          </div>
          <p id="profile-name">{user.organizationName || "Organization Name"}</p>
          <p id="admin-name">{"Admin"}</p>
        </div>
      </div>
    </div>
  );
};

Nav.propTypes = {
  toggleAsideBar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    fullName: PropTypes.string,
    address: PropTypes.string,
    mobileNumber: PropTypes.string,
    email: PropTypes.string,
    organizationName:PropTypes.string,
    userName: PropTypes.string,
    formTemplates: PropTypes.array,
    logo: PropTypes.string
  }).isRequired
};

export default Nav;
