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
import {getRecruitmentRequestsPromise, modifyRecruitmentRequestPromise} from "../../rest/RecruitmentRequestService";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Redirect} from "react-router-dom";
toast.configure();

class RecruitmentRequestManagementScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruitmentRequests: [],
            dialogueOpen: null,
            currentDialogueMessage: null,
            status: null,
            currentId: null,
        };
    }

    fetchRequests = async () => {
        const recruitmentRequests = await getRecruitmentRequestsPromise();
        this.setState({ recruitmentRequests: recruitmentRequests.data });
    };
    componentDidMount() {
        this.fetchRequests();
    }

    handleRespondFromDialogue = () => {
        const { currentDialogueMessage, status, currentId } = this.state;

        const requestBody = {
            message: currentDialogueMessage,
            source: "recruitment",
        };
        modifyRecruitmentRequestPromise(requestBody, status, currentId)
            .then((res) => {
                toast.success("Responded Successfully");
                this.setState({
                    currentDialogueMessage: null,
                    status: null,
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
        this.setState({ currentDialogueMessage: null, status: null });
    };

    handleRespondToRequest = (id) => {
        this.setState({ currentId: id, dialogueOpen: true });
    };

    handleSelectChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        if(localStorage.getItem('role')===null){
            console.log(localStorage.getItem('role'))
            return <Redirect to='/'/>;
        }

        const { recruitmentRequests } = this.state;
        return (
            <div>
                {recruitmentRequests.map((financialRequest) => {
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
                                            <strong>{financialRequest.jobTitle}</strong>
                                        </h2>
                                        <strong>
                                            Contract Type:
                                            {financialRequest.contractType}
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
                                            <strong>Years Of Experience: </strong>
                                            {financialRequest.yearsOfExperience}
                                        </Typography>
                                        <Typography style={{ textAlign: "left" }}>
                                            <strong>Job Description: </strong>
                                            {financialRequest.jobDescription}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                {financialRequest.response && (
                                    <Accordion style={{ backgroundColor: "#cabc38", marginTop: '1rem' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Click here to see response</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={{ display: "block" }}>
                                            <Typography style={{ textAlign: "left" }}>
                                                <strong>Status : </strong>
                                                {financialRequest.status}
                                            </Typography>
                                            <Typography style={{ textAlign: "left" }}>
                                                <strong>Comment: </strong>
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
                        <InputLabel style={{ textAlign: "left" , marginTop: '2rem'}}>
                           Status
                        </InputLabel>
                        <Select
                            inputProps={{
                                name: 'status',
                            }}
                            fullWidth={true}
                            variant="outlined"
                            value={this.state.requestingDepartment}
                            onChange={this.handleSelectChange}
                        >
                            <MenuItem value={"toDo"}>To Do</MenuItem>
                            <MenuItem value={"inProgress"}>In Progress</MenuItem>
                            <MenuItem value={"done"}>Done</MenuItem>
                        </Select>
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

RecruitmentRequestManagementScreen.propTypes = {};

export default RecruitmentRequestManagementScreen;
