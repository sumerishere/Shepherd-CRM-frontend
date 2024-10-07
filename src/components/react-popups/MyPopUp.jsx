import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./MyPopUp.css";

const PopUp = () => {
  return (
    <Popup
      trigger={<button>Open Custom Popup</button>}
      position="right center"
      contentStyle={{
        width: "300px",
        padding: "20px",
        backgroundColor: "#f1f1f1",
        textAlign: "center",
      }}
    >
      <div>Custom Popup Content</div>
    </Popup>
  );
};

export default PopUp;
