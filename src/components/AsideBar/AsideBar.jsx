import "./AsideBar.css";
import PropTypes from "prop-types";
import {
  FundProjectionScreenOutlined,
  FileDoneOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  SolutionOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const AsideBar = ({ open, toggleAsideBar }) => {
  return (
    <div>
      <div className={open ? "aside-bar collapse" : "aside-bar"}>
        <ul>
          <Link to={'/'} style={{ textDecoration: "none", color: "black" }} onClick={toggleAsideBar} >
            <li>
              <FundProjectionScreenOutlined /> Dashboard
            </li>
          </Link>

          <Link
            to={'./LeadForm'}
            style={{ textDecoration: "none", color: "black" }}
            onClick={toggleAsideBar}
          >
            <li onClick={toggleAsideBar}>
              <UserAddOutlined /> Add Lead
            </li>
          </Link>

         <Link to={"./LeadList"} style={{textDecoration:"none" ,color:"black"}}> <li onClick={toggleAsideBar}>
            <UsergroupAddOutlined /> Lead List
          </li>
          </Link>

          <li onClick={toggleAsideBar}>
            <FileDoneOutlined /> Invoice
          </li>

          <li onClick={toggleAsideBar}>
            <SolutionOutlined /> Subscribers
          </li>


         <Link to={"./BusinessPanel"} style={{textDecoration:"none", color:"black"}}> <li onClick={toggleAsideBar}>
            <SettingFilled /> Business Panel
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

AsideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleAsideBar : PropTypes.bool.isRequired
};

export default AsideBar;
