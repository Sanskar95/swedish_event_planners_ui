import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import {Route, BrowserRouter} from "react-router-dom";
import EventPlanningManagementScreen from "./components/EventPlanningRequest/EventPlanningRequestManagementScreen";
import CreateEventPlanningRequestScreen from "./components/EventPlanningRequest/CreateEventPlanningRequestScreen";

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            {/*<Route exact path="/" component={SectionScreen}></Route>*/}
            <Header/>
            <Route exact path="/event-requests" component={EventPlanningManagementScreen}></Route>
            <Route exact path="/create-event-request" component={CreateEventPlanningRequestScreen}></Route>
        </BrowserRouter>
    </div>
  );
}

export default App;
