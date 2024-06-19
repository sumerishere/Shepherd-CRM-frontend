import "./App.css";
import "../src/index.css";
import Nav from "./components/Nav-Bar/Nav";
import Calender from "./components/Calender-Comp/Calender";
import LeadCount from "./components/Lead-Comp/LeadCount";
import ChartComp from "./components/Chart-Comp/ChartComp";
import FollowUp from "./components/Follow-Up/FollowUp";
import { SmileOutlined } from "@ant-design/icons";
import AsideBar from "./components/AsideBar/AsideBar";
import BackDrop from "./components/AsideBar/BackDrop";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAsideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="welcome-text">
        <h4 id="">
          Hello!! Testing Shastra <SmileOutlined />
        </h4>
      </div>
      <Nav toggleAsideBar={toggleAsideBar} isOpen={isOpen} />
      <Calender />
      <LeadCount />
      <ChartComp />
      <FollowUp />
      {/* <AsideBar/>
      <BackDrop /> */}
      <AsideBar open={isOpen} />
      {isOpen && <BackDrop click={toggleAsideBar} open={isOpen} />}
    </>
  );
}

export default App;
