import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./Pages/Signin";
import Join from "./Pages/Join/Join";
import JoinInvestor from "./Pages/Join/JoinInvestor";
import JoinStartup from "./Pages/Join/JoinStartup";
import StartupRegistration from "./Pages/Registration/StartupRegistration";
import InvestorRegistration from "./Pages/Registration/InvestorRegistration";
import Dashboard from "./Pages/Insider/Dashboard";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/join/investor" element={<JoinInvestor />}></Route>
          <Route path="/join/startup" element={<JoinStartup />}></Route> 
          <Route path="/join/startup/registration" element={<StartupRegistration/>}></Route>
          <Route path="/join/investor/registration" element={<InvestorRegistration/>}></Route>
          <Route path="/user" element={<Dashboard/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
