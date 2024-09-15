import "./DashboardComponent.css";

import "react-big-calendar/lib/css/react-big-calendar.css";
import LineChartComp from "../Chart-Comp/LineChart";
import DoughnutChart from "../Chart-Comp/ChartComp";
import PieChart from "../Chart-Comp/PieChart";
import CalenderComponent from "../calender-component/CalenderComponent";

const DashboardComponent = () => {
  return (
    <div className="dashboard-root-div">
      <div className="calender-child-1">
        <CalenderComponent />
      </div>

      <div className="lineChart-child-2">
        <div className="line-chart-div">
          <LineChartComp />
        </div>
      </div>

      <div className="doughnutChart-child-3">
        <div className="doughnutChart-child-3-div-1">
          <DoughnutChart />
        </div>

        <div className="doughnutChart-child-3-div-2">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
