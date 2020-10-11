import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions/CardActions";
import { createEventPlanningRequest } from "../../rest/EventPlanningRequestService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure()

const styles = () => ({
  textField: {
    marginTop: "1rem",
  },
});

class CreateEventPlanningRequestScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      eventName: null,
      clientName: null,
      eventType: null,
      startingDate: null,
      endingDate: null,
      numberOfAttendees: null,
      expectedBudget: null,
      preferences: null,
    };
  }

  handleCreate = () => {
    createEventPlanningRequest(this.state)
      .then((response) => {
        toast.success("Event Successfully Created");
      })
      .catch((e) => {
        toast.error("Something went wrong, please try again later");
      });
  };

  handleTextFieldChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={{ display: "inline-block", marginTop: "5rem" }}>
          <h2>Create Event Planning Request</h2>
          <form style={{ margin: "2rem" }}>
            <TextField
              className={classes.textField}
              fullWidth={true}
              id="eventName"
              label="Event Name"
              variant="outlined"
              onChange={this.handleTextFieldChange}
            />
            <TextField
              className={classes.textField}
              fullWidth={true}
              id="clientName"
              label="Client Name"
              variant="outlined"
              onChange={this.handleTextFieldChange}
            />
            <TextField
              className={classes.textField}
              fullWidth={true}
              id="eventType"
              label="Event Type"
              variant="outlined"
              onChange={this.handleTextFieldChange}
            />

            <TextField
              className={classes.textField}
              fullWidth={true}
              id="startingDate"
              label="Event Starting Date"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleTextFieldChange}
            />
            <TextField
              className={classes.textField}
              fullWidth={true}
              id="endingDate"
              label="Event Ending Date"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleTextFieldChange}
            />
            <TextField
              className={classes.textField}
              fullWidth={true}
              id="numberOfAttendees"
              label="Number of Attendees"
              variant="outlined"
              onChange={this.handleTextFieldChange}
            />
            <TextField
              className={classes.textField}
              fullWidth={true}
              id="expectedBudget"
              label="Expected Budget"
              variant="outlined"
              onChange={this.handleTextFieldChange}
            />
            <Select
              className={classes.textField}
              id="preferences"
              fullWidth={true}
              variant="outlined"
              // value={this.state.preferences}
              onChange={this.handleTextFieldChange}
            >
              <MenuItem value={"Decorations"}>Decorations</MenuItem>
              <MenuItem value={"Parties"}>Parties</MenuItem>
              <MenuItem value={"Filming"}>Filming</MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Drinks"}>Drinks</MenuItem>
            </Select>
            <Button
              className={classes.textField}
              variant="contained"
              color="primary"
              onClick={this.handleCreate}
            >
              Create Event
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

CreateEventPlanningRequestScreen.propTypes = {};

export default withStyles(styles)(CreateEventPlanningRequestScreen);
