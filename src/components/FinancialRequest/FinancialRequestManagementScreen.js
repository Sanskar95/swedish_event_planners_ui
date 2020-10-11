import React, { Component } from "react";
import Card from "@material-ui/core/Card";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getFinancialRequestsPromise,
  modifyFinancialRequestPromise,
} from "../../rest/FinancialRequestService";
import TextField from "@material-ui/core/TextField";
toast.configure();

class FinancialRequestManagementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      financialRequests: [],
      dialogueOpen: null,
      currentDialogueMessage: null,
      agreedAmount: null,
      currentId: null,
    };
  }

  fetchRequests = async () => {
    const financialRequests = await getFinancialRequestsPromise();
    this.setState({ financialRequests: financialRequests.data });
  };
  componentDidMount() {
    this.fetchRequests();
  }

  handleRespondFromDialogue = () => {
    const { currentDialogueMessage, agreedAmount, currentId } = this.state;

    const requestBody = {
      message: currentDialogueMessage,
      source: "financial",
    };
    modifyFinancialRequestPromise(requestBody, agreedAmount, currentId)
      .then((res) => {
        toast.success("Responded Successfully");
        this.setState({
          currentDialogueMessage: null,
          agreedAmount: null,
          dialogueOpen: false,
          currentId: null,
        });
          this.fetchRequests();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  handleTextFieldChange = (event) => {
    console.log(event.target.id);
    this.setState({ [event.target.id]: event.target.value });
  };

  handleOnClose = () => {
    this.setState({ currentDialogueMessage: null, agreedAmount: null });
  };

  handleRespondToRequest = (id) => {
    this.setState({ currentId: id, dialogueOpen: true });
  };

  render() {
    const { financialRequests } = this.state;
    return (
      <div>
        {financialRequests.map((financialRequest) => {
          return (
            <Card
              style={{
                backgroundColor: "#d3cdf7",
                margin: "2rem",
                width: "70%",
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
                      <strong>{financialRequest.projectReference}</strong>
                    </h2>
                    <strong>
                      Requested Amount:
                      {financialRequest.requestedAmount}
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
                      <strong>Requesting Department: </strong>
                      {financialRequest.requestingDepartment}
                    </Typography>
                    <Typography style={{ textAlign: "left" }}>
                      <strong>Reason: </strong>
                      {financialRequest.reason}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                {financialRequest.response && (
                  <Accordion style={{ backgroundColor: "#a3b0f7" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Click here to see response</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: "block" }}>
                      <Typography style={{ textAlign: "left" }}>
                        <strong>Agreed Amount : </strong>
                        {financialRequest.agreedAmount}
                      </Typography>
                      <Typography style={{ textAlign: "left" }}>
                        <strong>Reason: </strong>
                        {financialRequest.response.message}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                )}
              </CardContent>
              <CardActions style={{ float: "right" }}>
                <Button
                  size={"small"}
                  variant="contained"
                  color="primary"
                  disabled={financialRequest.response}
                  onClick={() =>
                    this.handleRespondToRequest(financialRequest.id)
                  }
                >
                  Respond
                </Button>
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
              id="agreedAmount"
              label="Agreed Amount"
              variant="outlined"
              type={'number'}
              fullWidth
              onChange={this.handleTextFieldChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="currentDialogueMessage"
              label="Message"
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
            <Button onClick={this.handleRespondFromDialogue} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FinancialRequestManagementScreen.propTypes = {};

export default FinancialRequestManagementScreen;
