import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "../src/index.css";
import "./App.css";
import AsideBar from "./components/AsideBar/AsideBar";
import BackDrop from "./components/AsideBar/BackDrop";
import BulkLeadComponent from "./components/Bulk-lead/BulkLead";
import BusinessPanel from "./components/Business-Panel/BusinessPanel";
import CalenderComponent from "./components/calender-component/CalenderComponent";
import ClientDataTable from "./components/Client-data/ClientDataTable";
import TemplateCreated from "./components/created-templates/CreatedTemplate";
import DashboardComponent from "./components/Dashboard-Component/DashboardComponent";
import InvoiceGen from "./components/Invoice-generator/InvoiceGen";
import LeadActivity from "./components/Lead-Comp/LeadActivity";
import LeadFollowUp from "./components/Lead-Comp/LeadFollowUp";
import LeadRegistrationForm from "./components/Lead-Comp/LeadRegistrationForm";
import LeadList from "./components/Lead-List/LeadList";
import LoginComponent from "./components/Login-form/LoginComp";
import Nav from "./components/Nav-Bar/Nav";
import SignUpComp from "./components/SignUp-form/SignUpComp";
import SubscriptionPage from "./components/Subscription-component/SubscriptionPage";
import TemplateCustom from "./components/template-fom/TemplateCustom";
import DynamicForm from "./components/template-fom/TemplateComp";
import ErrorBoundary from "./ErrorBoundary";


function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [organizationName, setOrganizationName] = useState(
    localStorage.getItem("organizationName") || ""
  )

  const [templateId, setTemplateId] = useState(null);

  const [user, setUser] = useState({
    id: null,
    fullName: "",
    address: "",
    mobileNumber: "",
    email: "",
    organizationName: "",
    userName: "",
    formTemplates: [],
    logo: null,
  });

  const toggleAsideBar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = (username, password) => {
    fetch(
      `http://localhost:8080/login?username=${username}&password=${password}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        setIsAuthenticated(true);
        setUsername(username);
        setOrganizationName(data.organizationName);

        localStorage.setItem("username", username);
        localStorage.setItem("organizationName", data.organizationName);
        
        localStorage.setItem("isAuthenticated", "true");
        setUser(data);

        console.log("app user data", user);
        console.log("getting organizationName---->",data.organizationName);
        console.log("username ---->",username);
        localStorage.setItem("user", JSON.stringify(data));
        fetchTemplateData(username);
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const fetchTemplateData = (username) => {
    fetch(`http://localhost:8080/get-template-username?userName=${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          console.log(data);
          setTemplateId(data[0].id); // Assuming you want the first template's ID
        } else {
          console.error("No templates found for this user.");
        }
      })
      .catch((error) => console.error("Error fetching template data:", error));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setOrganizationName("")
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("organizationName");
  };

  useEffect(() => {
    if (isAuthenticated && username) {
      fetchTemplateData(username);
    }
  }, [isAuthenticated, username]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Nav toggleAsideBar={toggleAsideBar} user={user} isOpen={isOpen} />
          <AsideBar
            open={isOpen}
            toggleAsideBar={toggleAsideBar}
            username={username}
            setIsAuthenticated={handleLogout}
          />
          {isOpen && <BackDrop click={toggleAsideBar} open={isOpen} />}

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ErrorBoundary>
                    <DashboardComponent />
                    <LeadActivity />
                    <LeadFollowUp />
                  </ErrorBoundary>

                  <hr />
                  <div className="footer-content-root-div">
                    <div className="footer-content-div">
                      <p style={{ marginLeft: "22%" }}>
                        © {new Date().getFullYear()} Shepherd, All rights
                        reserved.
                      </p>
                      <p>Terms </p>
                      <p>Subscription Service Agreement</p>
                      <p>Policy </p>
                      <p>Privacy </p>
                    </div>
                  </div>
                </>
              }
            />
            <Route path="/LeadList" element={<LeadList />} />
            <Route path="/BusinessPanel" element={<BusinessPanel />} />
            <Route
              path="/DynamicForm"
              element={<DynamicForm userName={username} />}
            />

            <Route path = "/TemplateCustom" element={<TemplateCustom  username={username} organizationName={organizationName}/>}/>
            <Route
              path="/TemplateCreated"
              element={<TemplateCreated username={username} />}
            />
            <Route
              path="/ClientDataTable"
              element={<ClientDataTable templateId={templateId} />}
            ></Route>
            <Route
              path="/LeadRegistrationForm"
              element={<LeadRegistrationForm />}
            />
            <Route 
              path="/BulkLeadComponent" 
              element={<BulkLeadComponent />} 
              />

            <Route
              path="/InvoiceGen"
              element={<InvoiceGen templateId={templateId} />}
            />

            <Route path="/CalenderComponent" element={<CalenderComponent />} />

            <Route path="/SubscriptionPage" element={<SubscriptionPage />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginComponent onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/SignUpComp" element={<SignUpComp />} />
          {/* <Route path = "/" element={<LoginComponent/>}/> */}
        </Routes>
      )}
    </>
  );
}

export default App;
