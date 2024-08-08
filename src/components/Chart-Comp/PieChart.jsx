import "../Chart-Comp/PieChart.css";
import { PieChart } from "@mui/x-charts/PieChart";

const PieChartComp = () => {
  return (

    <div className="pie-chart-root">
      <div className="pie-chart-child">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 15, label: "Out" },
                { id: 1, value: 13, label: "Cold" },
                { id: 2, value: 20, label: "Hot" },
              ],
            
            },
          ]}
          width={290}
          height={300}
        />
      </div>
      <h3 id="lead-activity-h3">Lead activity</h3>
    </div>
  );
};

export default PieChartComp;
