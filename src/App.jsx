import "./App.css";
import "../src/index.css";
import Nav from "./components/Nav-Bar/Nav";
import Calender from "./components/Calender-Comp/Calender";
import LeadCount from "./components/Lead-Comp/LeadCount";
import ChartComp from "./components/Chart-Comp/ChartComp";
import FollowUp from "./components/Follow-Up/FollowUp";
import AsideBar from "./components/AsideBar/AsideBar";
import BackDrop from "./components/AsideBar/BackDrop";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LeadForm from "./components/Lead-Form/LeadForm";
import LeadList from "./components/Lead-List/LeadList";
import BusinessPanel from "./components/Business-Panel/BusinessPanel";
import DynamicForm from "./components/template-fom/TemplateComp";
import TemplateCreated from "./components/created-templates/CreatedTemplate";
// import LoginComponent from "./components/Login-form/LoginComp";


function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAsideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Nav toggleAsideBar={toggleAsideBar} isOpen={isOpen} />

      <AsideBar open={isOpen} toggleAsideBar={toggleAsideBar} />
      {isOpen && <BackDrop click={toggleAsideBar}  open={isOpen} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Calender />
              <LeadCount />
              <ChartComp />
              <FollowUp />
            </>
          }
        />
        <Route path = "/" element={<ChartComp/>}/>
        <Route path="/LeadForm" element={<LeadForm />} />
        <Route path = "/LeadList" element={<LeadList/>}/>
        <Route path = "/BusinessPanel" element={<BusinessPanel/>}/>
        <Route path = "/DynamicForm" element={<DynamicForm/>}/>
        <Route path= "/TemplateCreated" element={<TemplateCreated/>}/>
      </Routes>

    </>
  );
}

export default App;
