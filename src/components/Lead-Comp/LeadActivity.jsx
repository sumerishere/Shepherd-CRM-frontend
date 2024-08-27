import "./LeadActivity.css";
import { BsPersonStanding } from "react-icons/bs";

import { GrGroup, GrUserExpert,GrRun,GrTarget,GrCurrency} from "react-icons/gr";

const LeadActivity = () => {


  return (
    <div className="lead-activity-root">

      <div className="lead-container-1">
        <p id="lead-container-1-p"><GrGroup /></p>
        <hr />
        <p id="total-lead-count-p">Total-lead <span id="total-lead-count-span">38</span></p>
      </div>

      <div className="lead-container-2">
        <p id="lead-container-2-p"><GrUserExpert /></p>
        <hr />
        <p id="deal-done-p">Deal-done <span id="deal-done-span">28</span></p>
      </div>

      <div className="lead-container-3">
        <p id="lead-container-3-p"><GrRun /></p>
        <hr />
        <p id="miss-out-p">Miss-out <span id="miss-out-span">10</span></p>

      </div>

      <div className="lead-container-4">
        <p id="lead-container-4-p"><BsPersonStanding /></p>
        <hr />
        <p id="open-lead-p">Open-lead <span id="open-lead-span">13</span></p>
      </div>

      <div className="lead-container-4">
        <p id="lead-container-4-p"><GrTarget/></p>
        <hr />
        <p id="open-lead-p">This-month <span id="open-lead-span">20</span></p>
      </div>

      <div className="lead-container-4">
        <p id="lead-container-4-p"><GrCurrency /></p>
        <hr />
        <p id="open-lead-p">Rewards <span id="open-lead-span">100</span></p>
      </div>

    </div>
  );
};

export default LeadActivity;
