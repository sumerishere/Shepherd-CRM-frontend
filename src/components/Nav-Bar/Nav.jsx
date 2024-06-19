import "./Nav.css";
// import { useState } from "react";
import Hamburger from "hamburger-react";
import PropTypes from 'prop-types';

const Nav = ({ toggleAsideBar, isOpen }) => {

  // const [isOpen, setOpen] = useState(false);
  

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
            <img id="logo-img" src="/Admin-img/logo.png" alt="imgg" />
          </div>
          <p id="profile-name">Testing shastra</p>
          <p id="admin-name">Admin</p>
        </div>
      </div>
    </div>
  );
};

Nav.propTypes = {
  toggleAsideBar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default Nav;
