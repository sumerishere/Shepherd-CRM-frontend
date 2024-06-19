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

const AsideBar = ({ open }) => {
  return (
    <div>
      <div className={open ? "aside-bar collapse" : "aside-bar"}>
        <ul>
          <Link to={'/'} style={{ textDecoration: "none", color: "black" }}>
            <li>
              <FundProjectionScreenOutlined /> Dashboard
            </li>
          </Link>

          <Link
            to={'./LeadForm'}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li>
              <UserAddOutlined /> Add Lead
            </li>
          </Link>

          <li>
            <UsergroupAddOutlined /> Lead List
          </li>
          <li>
            <FileDoneOutlined /> Invoice
          </li>
          <li>
            <SolutionOutlined /> Subscribers
          </li>
          <li>
            <SettingFilled /> Business Panel
          </li>
        </ul>
      </div>
    </div>
  );
};

AsideBar.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default AsideBar;
