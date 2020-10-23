import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, BrowserRouter } from "react-router-dom";
import EventPlanningManagementScreen from "./components/EventPlanningRequest/EventPlanningRequestManagementScreen";
import CreateEventPlanningRequestScreen from "./components/EventPlanningRequest/CreateEventPlanningRequestScreen";
import CreateFinancialRequestScreen from "./components/FinancialRequest/CreateFinancialRequestScreen";
import FinancialRequestManagementScreen from "./components/FinancialRequest/FinancialRequestManagementScreen";
import CreateRecruitmentRequestScreen from "./components/RecruitmentRequest/CreateRecruitmentRequestScreen";
import RecruitmentRequestManagementScreen from "./components/RecruitmentRequest/RecruitmentRequestManagementScreen";
import CreateSubteamTaskScreen from "./components/SubteamTask/CreateSubteamTaskScreen";
import SubteamTaskManagementScreen from "./components/SubteamTask/SubteamTaskManagementScreen";
import HomeScreen from "./components/Home/HomeScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={HomeScreen} />
        <Route
          exact
          path="/event-requests"
          component={EventPlanningManagementScreen}
        />
        <Route
          exact
          path="/create-event-request"
          component={CreateEventPlanningRequestScreen}
        />
        <Route
          exact
          path="/create-financial-request"
          component={CreateFinancialRequestScreen}
        />
        <Route
          exact
          path="/financial-requests"
          component={FinancialRequestManagementScreen}
        />
        <Route
          exact
          path="/create-recruitment-request"
          component={CreateRecruitmentRequestScreen}
        />
        <Route
          exact
          path="/recruitment-requests"
          component={RecruitmentRequestManagementScreen}
        />
        <Route
          exact
          path="/subteam-tasks"
          component={SubteamTaskManagementScreen}
        />
        <Route
          exact
          path="/create-subteam-task"
          component={CreateSubteamTaskScreen}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
