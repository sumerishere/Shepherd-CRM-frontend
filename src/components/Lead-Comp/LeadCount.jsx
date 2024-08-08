import "./LeadCount.css";
import MonthsChart from "../Chart-Comp/MonthsChart";
import PieChartComp from "../Chart-Comp/PieChart";

const LeadCount = () =>{
  return (
    <div className="lead-comp">
      <div  id="item-alignment" className="all-lead">
        <p>All Lead</p>
        <p id="number">18</p>
      </div>

      <div id="item-alignment" className="deal-done">
        <p>Deal-Done</p> 
        <p id="number">20</p>
      </div>

      <div id="item-alignment" className="closed">
         <p>Closed</p> 
         <p id="number">5</p>
      </div>
      <MonthsChart/>
      <PieChartComp/>
    </div>
  )
}

export default LeadCount;