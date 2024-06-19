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
import { Route, Routes } from "react-router-dom";
import LeadForm from "./components/Lead-Form/LeadForm";

// import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAsideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Nav toggleAsideBar={toggleAsideBar} isOpen={isOpen} />
      {/* <Calender />
      <LeadCount />
      <ChartComp />
      <FollowUp /> */}

      <AsideBar open={isOpen} />
      {isOpen && <BackDrop click={toggleAsideBar} open={isOpen} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="welcome-text">
                <h4 id="">
                  Hello!! Testing Shastra <SmileOutlined />
                </h4>
              </div>

              <Calender />
              <LeadCount />
              <ChartComp />
              <FollowUp />
            </>
          }
        />
        <Route path="/LeadForm" element={<LeadForm />} />
      </Routes>

      {/* <Routes>
        <Route path = "/" element={<ChartComp/>}/>
        <Route path="/LeadForm" element= {<LeadForm/>}/>
      </Routes> */}
    </>
  );
}

export default App;
