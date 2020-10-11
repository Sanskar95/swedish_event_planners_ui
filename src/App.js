import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import {Route, BrowserRouter} from "react-router-dom";
import EventPlanningManagementScreen from "./components/EventPlanningRequest/EventPlanningRequestManagementScreen";
import CreateEventPlanningRequestScreen from "./components/EventPlanningRequest/CreateEventPlanningRequestScreen";
import CreateFinancialRequestScreen from "./components/FinancialRequest/CreateFinancialRequestScreen";
import FinancialRequetManagementScreen from "./components/FinancialRequest/FinancialRequetManagementScreen";

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            {/*<Route exact path="/" component={SectionScreen}></Route>*/}
            <Header/>
            <Route exact path="/event-requests" component={EventPlanningManagementScreen}/>
            <Route exact path="/create-event-request" component={CreateEventPlanningRequestScreen}/>
            <Route exact path="/create-financial-request" component={CreateFinancialRequestScreen}/>
            <Route exact path="/financial-requests" component={FinancialRequetManagementScreen}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
