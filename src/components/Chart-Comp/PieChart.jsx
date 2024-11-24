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
                { id: 0, value: 15, label: "Out" ,color:"	#9B82D0"},
                { id: 1, value: 13, label: "Cold",color:"#7673bb" },
                { id: 2, value: 20, label: "Hot",color:"#8E8DB6" },
              ],
              
            
            },
          ]}
          width={240}
          height={120}
        />
      </div>
      {/* <h3 id="lead-activity-h3">Lead activity</h3> */}
    </div>
  );
};

export default PieChartComp;
