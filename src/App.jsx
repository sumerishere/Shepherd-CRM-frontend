// import "./App.css";
// import "../src/index.css";
// import Nav from "./components/Nav-Bar/Nav";
// import Calender from "./components/Calender-Comp/Calender";
// import LeadCount from "./components/Lead-Comp/LeadCount";
// import ChartComp from "./components/Chart-Comp/ChartComp";
// import FollowUp from "./components/Follow-Up/FollowUp";
// import AsideBar from "./components/AsideBar/AsideBar";
// import BackDrop from "./components/AsideBar/BackDrop";
// import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import LeadForm from "./components/Lead-Form/LeadForm";
// import LeadList from "./components/Lead-List/LeadList";
// import BusinessPanel from "./components/Business-Panel/BusinessPanel";
// import DynamicForm from "./components/template-fom/TemplateComp";
// import TemplateCreated from "./components/created-templates/CreatedTemplate";
// // import LoginComponent from "./components/Login-form/LoginComp";


// function App() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleAsideBar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <Nav toggleAsideBar={toggleAsideBar} isOpen={isOpen} />

//       <AsideBar open={isOpen} toggleAsideBar={toggleAsideBar} />
//       {isOpen && <BackDrop click={toggleAsideBar}  open={isOpen} />}

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <Calender />
//               <LeadCount />
//               <ChartComp />
//               <FollowUp />
//             </>
//           }
//         />
//         <Route path = "/" element={<ChartComp/>}/>
//         <Route path="/LeadForm" element={<LeadForm />} />
//         <Route path = "/LeadList" element={<LeadList/>}/>
//         <Route path = "/BusinessPanel" element={<BusinessPanel/>}/>
//         <Route path = "/DynamicForm" element={<DynamicForm/>}/>
//         <Route path= "/TemplateCreated" element={<TemplateCreated/>}/>
//       </Routes>

//     </>
//   );
// }

// export default App;

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
import { Route, Routes,Navigate } from "react-router-dom";
import LeadForm from "./components/Lead-Form/LeadForm";
import LeadList from "./components/Lead-List/LeadList";
import BusinessPanel from "./components/Business-Panel/BusinessPanel";
import DynamicForm from "./components/template-fom/TemplateComp";
import TemplateCreated from "./components/created-templates/CreatedTemplate";
import LoginComponent from "./components/Login-form/LoginComp";



function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [templateId, setTemplateId] = useState(null);

  const toggleAsideBar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = (username, password) => {
    fetch(`http://localhost:8080/login?username=${username}&password=${password}`)
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
          setUsername(username);
          fetchTemplateData(username);
        } else {
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const fetchTemplateData = (username) => {
    fetch(`http://localhost:8080/get-template-username?userName=${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setTemplateId(data[0].id); // Assuming you want the first template's ID
        } else {
          console.table(data)
          console.error("No templates found for this user.");
        }
      })
      .catch((error) => console.error("Error fetching template data:", error));
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Nav toggleAsideBar={toggleAsideBar} isOpen={isOpen} />
          <AsideBar open={isOpen} toggleAsideBar={toggleAsideBar} username={username} />
          {isOpen && <BackDrop click={toggleAsideBar} open={isOpen} />}

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Calender />
                  <LeadCount />
                  <ChartComp />
                  <FollowUp templateId={templateId} />
                  
                </>
              }
            />
            <Route path="/LeadForm" element={<LeadForm />} />
            <Route path="/LeadList" element={<LeadList />} />
            <Route path="/BusinessPanel" element={<BusinessPanel />} />
            <Route path="/DynamicForm" element={<DynamicForm />} />
            <Route path="/TemplateCreated" element={<TemplateCreated username={username} />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginComponent onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
}

export default App;

