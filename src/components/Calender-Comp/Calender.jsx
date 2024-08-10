import "./Calender.css";

// eslint-disable-next-line no-unused-vars
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import { SmileOutlined } from "@ant-design/icons";
import LineChartComp from "../Chart-Comp/LineChart";
import DoughnutChart from "../Chart-Comp/ChartComp";
import PieChart from "../Chart-Comp/PieChart";

// Create the localizer
const localizer = momentLocalizer(moment);

// Example events
const events = [
  // {
  //   id: 0,
  //   title: "All Day Event",
  //   allDay: true,
  //   start: new Date(2023, 6, 0),
  //   end: new Date(2023, 6, 1),
  // },
  // {
  //   id: 1,
  //   title: "Long Event",
  //   start: new Date(2023, 6, 7),
  //   end: new Date(2023, 6, 10),
  // },
  // {
  //   id: 2,
  //   title: "DTS STARTS",
  //   start: new Date(2023, 2, 13, 0, 0, 0),
  //   end: new Date(2023, 2, 20, 0, 0, 0),
  // },
  // {
  //   id: 3,
  //   title: "DTS ENDS",
  //   start: new Date(2023, 10, 6, 0, 0, 0),
  //   end: new Date(2023, 10, 13, 0, 0, 0),
  // },
  // {
  //   id: 4,
  //   title: "Some Event",
  //   start: new Date(2023, 3, 9, 0, 0, 0),
  //   end: new Date(2023, 3, 9, 0, 0, 0),
  // },
  // {
  //   id: 5,
  //   title: "Conference",
  //   start: new Date(2023, 3, 11),
  //   end: new Date(2023, 3, 13),
  //   desc: "Big conference for important people",
  // },
  // {
  //   id: 6,
  //   title: "Meeting",
  //   start: new Date(2023, 3, 12, 10, 30, 0, 0),
  //   end: new Date(2023, 3, 12, 12, 30, 0, 0),
  //   desc: "Pre-meeting meeting, to prepare for the meeting",
  // },
  // {
  //   id: 7,
  //   title: "Lunch",
  //   start: new Date(2023, 3, 12, 12, 0, 0, 0),
  //   end: new Date(2023, 3, 12, 13, 0, 0, 0),
  //   desc: "Power lunch",
  // },
  // {
  //   id: 8,
  //   title: "Meeting",
  //   start: new Date(2023, 3, 12, 14, 0, 0, 0),
  //   end: new Date(2023, 3, 12, 15, 0, 0, 0),
  // },
  // {
  //   id: 9,
  //   title: "Happy Hour",
  //   start: new Date(2023, 3, 12, 17, 0, 0, 0),
  //   end: new Date(2023, 3, 12, 17, 30, 0, 0),
  //   desc: "Most important meal of the day",
  // },
  // {
  //   id: 10,
  //   title: "Dinner",
  //   start: new Date(2023, 3, 12, 20, 0, 0, 0),
  //   end: new Date(2023, 3, 12, 21, 0, 0, 0),
  // },
  // {
  //   id: 11,
  //   title: "Birthday Party",
  //   start: new Date(2023, 3, 13, 7, 0, 0),
  //   end: new Date(2023, 3, 13, 10, 30, 0),
  // },
  // {
  //   id: 12,
  //   title: "Late Night Event",
  //   start: new Date(2023, 3, 17, 19, 30, 0),
  //   end: new Date(2023, 3, 18, 2, 0, 0),
  // },
  // {
  //   id: 13,
  //   title: "Multi-day Event",
  //   start: new Date(2023, 3, 20, 19, 30, 0),
  //   end: new Date(2023, 3, 22, 2, 0, 0),
  // },
];

const Calender = () => {
  return (
    <div className="calender-root-div">
      <div className="calander-child-1">

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ minHeight: "400px", width: "100%" }}
        />
      </div>

      <div className="calender-child-2">
        <div className="line-chart-div">
          <LineChartComp />
        </div>
      </div>

      <div className="calender-child-3">
        
        <div className="calender-child-3-div-1">
           <DoughnutChart/>
        </div>

        <div className="calender-child-3-div-2">
           <PieChart/>
        </div>

      </div>
    </div>
  );
};

export default Calender;
