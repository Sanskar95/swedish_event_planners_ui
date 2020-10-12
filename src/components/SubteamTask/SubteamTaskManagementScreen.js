import React, {PureComponent} from 'react';
import {getRecruitmentRequestsPromise, modifyRecruitmentRequestPromise} from "../../rest/RecruitmentRequestService";
import {getSubteamTasksPromise, modifySubteamTaskPromise} from "../../rest/SubteamTaskService";
import TableContainer from "@material-ui/core/TableContainer";
import {Paper} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {toast} from "react-toastify";

class SubteamTaskManagementScreen extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            subteamTasks: [],
            dialogueOpen: null,
            currentDialogueMessage: null,
            status: null,
            currentId: null,
        };
    }

    fetchRequests = async () => {
        const subteamTasks = await getSubteamTasksPromise();
        this.setState({ subteamTasks: subteamTasks.data });
    };
    componentDidMount() {
        this.fetchRequests();
    }

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

    handleRespondFromDialogue = () => {
        const { currentDialogueMessage, status, currentId } = this.state;

        const requestBody = {
            message: currentDialogueMessage,
            source: "subteamTask",
        };
        modifySubteamTaskPromise(requestBody, status, currentId)
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

    render() {
const {subteamTasks} = this.state
        return (
            <div>
                <TableContainer style={{margin: '3rem', width: '70%', backgroundColor: '#faffbb'}} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Department</TableCell>
                                <TableCell align="right">Project Reference</TableCell>
                                <TableCell align="right">Priority</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                                <TableCell align="right">Comments</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subteamTasks.map((row) => (
                                <TableRow key={row.projectReference}>
                                    <TableCell align="right">{row.department}</TableCell>
                                    <TableCell align="right">{row.projectReference}</TableCell>
                                    <TableCell align="right">{row.priority}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">

                                        <Button
                                            color="primary"
                                            size={'small'}
                                            onClick={() =>
                                                this.handleRespondToRequest(row.id)
                                            }
                                        >
                                         Respond
                                        </Button>

                                    </TableCell>
                                    <TableCell align="right">{row.response?.message}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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


export default SubteamTaskManagementScreen;