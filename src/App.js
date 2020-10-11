import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import {Route, BrowserRouter} from "react-router-dom";
import EventPlanningManagementScreen from "./components/EventPlanningRequest/EventPlanningRequestManagementScreen";
import CreateEventPlanningRequestScreen from "./components/EventPlanningRequest/CreateEventPlanningRequestScreen";
import CreateFinancialRequestScreen from "./components/FinancialRequest/CreateFinancialRequestScreen";
import FinancialRequestManagementScreen from "./components/FinancialRequest/FinancialRequestManagementScreen";
import CreateRecruitmentRequestScreen from "./components/RecruitmentRequest/CreateRecruitmentRequestScreen";
import RecruitmentRequestManagementScreen from "./components/RecruitmentRequest/RecruitmentRequestManagementScreen";

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            {/*<Route exact path="/" component={SectionScreen}></Route>*/}
            <Header/>
            <Route exact path="/event-requests" component={EventPlanningManagementScreen}/>
            <Route exact path="/create-event-request" component={CreateEventPlanningRequestScreen}/>
            <Route exact path="/create-financial-request" component={CreateFinancialRequestScreen}/>
            <Route exact path="/financial-requests" component={FinancialRequestManagementScreen}/>
            <Route exact path="/create-recruitment-request" component={CreateRecruitmentRequestScreen}/>
            <Route exact path="/recruitment-requests" component={RecruitmentRequestManagementScreen}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
