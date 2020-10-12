import React, { Component } from "react";
import {
  getAdminApprovePromise,
  getEventPlanningRequestsPromise,
  getFinalScsoApprovalPromise,
  getFinancialManagerApprovalPromise,
  getScsoApprovePromise,
} from "../../rest/EventPlanningRequestService";
import Card from "@material-ui/core/Card";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@material-ui/core/Checkbox";
toast.configure();

class EventPlanningManagementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventPlanningRequests: [],
    };
  }

  fetchRequests = async () => {
    const eventPlanningRequests = await getEventPlanningRequestsPromise();
    this.setState({ eventPlanningRequests: eventPlanningRequests.data });
  };
  componentDidMount() {
    this.fetchRequests();
  }

  handleInitialScsoApproval = (id) => {
    getScsoApprovePromise(id)
      .then((res) => {
        toast.success("SCSO approved successfully");
        this.fetchRequests();
      })
      .catch(() => {
        toast.error("something went wrong!");
      });
  };

  handleFinancialManagerApproval = (id, feedBack) => {
    getFinancialManagerApprovalPromise(id, feedBack)
      .then((res) => {
        toast.success("Financial Manager approved successfully");
        this.fetchRequests();
      })
      .catch(() => {
        toast.error("something went wrong!");
      });
  };

  handleAdminApproval = (id) => {
    getAdminApprovePromise(id)
      .then((res) => {
        toast.success("Admin approved successfully");
        this.fetchRequests();
      })
      .catch(() => {
        toast.error("something went wrong!");
      });
  };

  handleFinalScsoApproval = (id) => {
    getFinalScsoApprovalPromise(id)
      .then((res) => {
        toast.success("Final Scso approved successfully");
        this.fetchRequests();
      })
      .catch(() => {
        toast.error("something went wrong!");
      });
  };

  render() {
    const { eventPlanningRequests } = this.state;
    return (
      <div>
        {eventPlanningRequests.map((eventPlanningRequest) => {
          return (
            <Card
              style={{
                backgroundColor: "#d3cdf7",
                margin: "2rem 10%",
              }}
            >
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  style={{ textAlign: "left" }}
                >
                  <div style={{ display: "grid" }}>
                    <h2>
                      <strong>{eventPlanningRequest.eventName}</strong>
                    </h2>
                    <strong>
                      Scso Approval:{" "}
                      <Checkbox
                        checked={
                          eventPlanningRequest.approvedBySeniorCustomerServiceOfficer
                        }
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </strong>
                    <strong>
                      Financial Manager Approval:{" "}
                      <Checkbox
                        checked={
                          eventPlanningRequest.approvedByFinancialManager
                        }
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </strong>
                    <strong>
                      Admin Approval:{" "}
                      <Checkbox
                        checked={eventPlanningRequest.approvedByAdminManager}
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </strong>
                    <strong>
                      Final Scso Approval:{" "}
                      <Checkbox
                        checked={eventPlanningRequest.finalScsoApproval}
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </strong>
                  </div>
                </Typography>
                <Accordion style={{ backgroundColor: "#a3b0f7" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Click for more details!</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ display: "block" }}>
                    <Typography style={{ textAlign: "left" }}>
                      <strong>Client Name: </strong>
                      {eventPlanningRequest.clientName}
                    </Typography>
                    <Typography style={{ textAlign: "left" }}>
                      <strong>Event Type: </strong>
                      {eventPlanningRequest.eventType}
                    </Typography>
                    <Typography style={{ textAlign: "left" }}>
                      <strong>Starting Date: </strong>
                      {eventPlanningRequest.startingDate}
                    </Typography>
                    <Typography style={{ textAlign: "left" }}>
                      <strong>Ending Date: </strong>
                      {eventPlanningRequest.endingDate}
                    </Typography>
                    <Typography style={{ textAlign: "left" }}>
                      <strong>Number of Attendees: </strong>
                      {eventPlanningRequest.numberOfAttendees}
                    </Typography>
                    <Typography style={{ textAlign: "left" }}>
                      <strong>Expected Budget: </strong>
                      {eventPlanningRequest.expectedBudget}
                    </Typography>
                    <Typography style={{ textAlign: "left" }}>
                      <strong>Preferences: </strong>
                      {eventPlanningRequest.preferences}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
              <CardActions style={{ float: "right" }}>
                <Button
                  size={"small"}
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    this.handleInitialScsoApproval(eventPlanningRequest.id)
                  }
                >
                  Change Initial Scso approval status
                </Button>
                <Button
                  size={"small"}
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    this.handleFinancialManagerApproval(
                      eventPlanningRequest.id,
                      "niceee"
                    )
                  }
                >
                  Change financial manager approval status
                </Button>
                <Button
                  size={"small"}
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    this.handleAdminApproval(eventPlanningRequest.id)
                  }
                >
                  Change admin approval status
                </Button>
                <Button
                  size={"small"}
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    this.handleFinalScsoApproval(eventPlanningRequest.id)
                  }
                >
                  Change Final approval status
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    );
  }
}

EventPlanningManagementScreen.propTypes = {};

export default EventPlanningManagementScreen;
