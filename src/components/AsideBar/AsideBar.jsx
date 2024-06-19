import "./AsideBar.css";
import PropTypes from "prop-types";
import {FundProjectionScreenOutlined,FileDoneOutlined, UserAddOutlined,UsergroupAddOutlined,SolutionOutlined,SettingFilled} from "@ant-design/icons";
import { Colors } from "chart.js";

const AsideBar = ({ open }) => {
  return (
    <div>
      <div className={open ? "aside-bar collapse" : "aside-bar"}>
        <ul>
          <li><FundProjectionScreenOutlined/> Dashboard</li>
          <li><UserAddOutlined /> Add Lead</li>
          <li><UsergroupAddOutlined /> Lead List</li>
          <li><FileDoneOutlined /> Invoice</li>
          <li><SolutionOutlined /> Subscribers</li>
          <li><SettingFilled /> Business Panel</li>
        </ul>
      </div>
    </div>
  );
};

AsideBar.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default AsideBar;
