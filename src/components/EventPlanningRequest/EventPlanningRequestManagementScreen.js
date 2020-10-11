import React, { Component } from "react";
import PropTypes from "prop-types";
import { getEventPlanningRequestsPromise } from "../../rest/EventPlanningRequestService";
import Card from "@material-ui/core/Card";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class EventPlanningManagementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventPlanningRequests: [],
    };
  }

  async componentDidMount() {
    const eventPlanningRequests = await getEventPlanningRequestsPromise();
    console.log(eventPlanningRequests);
    this.setState({ eventPlanningRequests: eventPlanningRequests.data });
  }

  render() {
    const { eventPlanningRequests } = this.state;
    return (
      <div>
        {eventPlanningRequests.map((eventPlanningRequest) => {
          return (
            <Card style={{ backgroundColor: "#BEA2F7", margin: "2rem" }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  <strong>{eventPlanningRequest.eventName}</strong>
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="secondary">
                  Default
                </Button>
                <Button variant="outlined" color="secondary">
                  Default
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
