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
import { Redirect } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
toast.configure();

class EventPlanningManagementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventPlanningRequests: [],
      dialogueOpen: false,
      feedback: null,
      currentId: null,
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

  handleFinancialManagerApproval = () => {
    const { currentId, feedback } = this.state;
    getFinancialManagerApprovalPromise(currentId, feedback)
      .then((res) => {
        toast.success("Financial Manager approved successfully");
        this.setState({
          feedback: null,
          dialogueOpen: false,
          currentId: null,
        });
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
  handleTextFieldChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleRespondToRequest = (id) => {
    this.setState({ currentId: id, dialogueOpen: true });
  };

  render() {
    const role = localStorage.getItem("role");
    if (localStorage.getItem("role") === null) {
      console.log(localStorage.getItem("role"));
      return <Redirect to="/" />;
    }

    const { eventPlanningRequests } = this.state;
    return (
      <div>
        <p>LOGGED IN AS : {role}</p>
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
                {eventPlanningRequest.financialManagerFeedback &&
                  (role === "FINANCIAL_MANAGER" || role === "ADMIN") && (
                    <Accordion
                      style={{ backgroundColor: "#cabc38", marginTop: "1rem" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Click here to see feedback</Typography>
                      </AccordionSummary>
                      <AccordionDetails style={{ display: "block" }}>
                        <Typography style={{ textAlign: "left" }}>
                          <strong>FeedBack : </strong>
                          {eventPlanningRequest.financialManagerFeedback}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  )}
              </CardContent>
              <CardActions style={{ float: "right" }}>
                {role === "SENIOR_CUSTOMER_SERVICE_OFFICER" && (
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
                )}
                {role === "FINANCIAL_MANAGER" && (
                  <Button
                    size={"small"}
                    variant="outlined"
                    disabled={
                      !eventPlanningRequest.approvedBySeniorCustomerServiceOfficer
                    }
                    color="secondary"
                    onClick={() =>
                      this.handleRespondToRequest(eventPlanningRequest.id)
                    }
                  >
                    Respond
                  </Button>
                )}
                {role === "ADMIN" && (
                  <Button
                    size={"small"}
                    variant="outlined"
                    disabled={!eventPlanningRequest.approvedByFinancialManager}
                    color="secondary"
                    onClick={() =>
                      this.handleAdminApproval(eventPlanningRequest.id)
                    }
                  >
                    Change admin approval status
                  </Button>
                )}

                {role === "SENIOR_CUSTOMER_SERVICE_OFFICER" && (
                  <Button
                    size={"small"}
                    variant="outlined"
                    color="primary"
                    disabled={
                      !(
                        eventPlanningRequest.approvedBySeniorCustomerServiceOfficer &&
                        eventPlanningRequest.approvedByAdminManager
                      )
                    }
                    onClick={() =>
                      this.handleFinalScsoApproval(eventPlanningRequest.id)
                    }
                  >
                    Change Final approval status
                  </Button>
                )}
              </CardActions>
            </Card>
          );
        })}
        <Dialog
          open={this.state.dialogueOpen}
          onClose={this.handleOnClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Respond</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please respond to the request by filling the below fields!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="feedback"
              label="FeedBack"
              variant="outlined"
              fullWidth
              onChange={this.handleTextFieldChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ dialogueOpen: false })}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleFinancialManagerApproval}
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EventPlanningManagementScreen.propTypes = {};

export default EventPlanningManagementScreen;
