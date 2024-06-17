import "./App.css";
import "../src/index.css";
import Nav from "./components/Nav-Bar/Nav";
import Calender from "./components/Calender-Comp/Calender";
import LeadCount from "./components/Lead-Comp/LeadCount";
import ChartComp from "./components/Chart-Comp/ChartComp";
import FollowUp from "./components/Follow-Up/FollowUp";
import {SmileOutlined} from "@ant-design/icons";
// import AsideBar from "./components/AsideBar/AsideBar";
// import BackDrop from "./components/AsideBar/BackDrop";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>  
      <div className="welcome-text">
        <h4 id="">Hello!!  Testing Shastra <SmileOutlined /></h4>
      </div>
      <Nav />
      <Calender />
      <LeadCount/>
      <ChartComp/>
      <FollowUp/>
      {/* <AsideBar/>
      <BackDrop /> */}
    </>
  );
}

export default App;
