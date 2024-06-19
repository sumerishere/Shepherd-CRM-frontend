import "./BackDrop.css";
import PropTypes from "prop-types";

const BackDrop = ({ click, open }) => {
  return (
    <div
      className={open ? "backdrop  backdrop-open" : "backdrop"}
      onClick={click}
    ></div>
  );
};

BackDrop.propTypes = {
  click: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default BackDrop;
