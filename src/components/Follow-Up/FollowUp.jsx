import "./FollowUp.css";
import DataTableComp from "../data-table/DataTableComp";

const FollowUp = () => {
  return (
    <div className="follow-up-div">
      <p id="followUp-text">Follow Up</p>
      <hr />
      <DataTableComp/>
    </div>
  )
}

export default FollowUp;