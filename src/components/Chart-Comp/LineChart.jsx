import "../Chart-Comp/LineChart.css";
import { LineChart } from "@mui/x-charts/LineChart";

const LineChartComp = () => {
  return (
    <div className="line-chart-root">
      <div className="line-chart-child">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              area: true,
              border: "black",
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
};

export default LineChartComp;
