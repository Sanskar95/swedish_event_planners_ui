import React, { PureComponent } from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {createRecruitmentRequest} from "../../rest/RecruitmentRequestService";
import {createSubteamTask} from "../../rest/SubteamTaskService";
toast.configure();

const styles = () => ({
    textField: {
        marginTop: "1rem",
    },
});

class CreateSubteamTaskScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            department: null,
            subteamContactName: null,
            priority: null,
            description: null,
            projectReference: null
        };
    }

    handleSelectChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleTextFieldChange = (event) => {
        console.log(event.target.id);
        this.setState({ [event.target.id]: event.target.value });
    };

    handleCreate = () => {
        createSubteamTask(this.state)
            .then(() => {
                toast.success("Task created successfully");
            })
            .catch(() => {
                toast.error("Something  went wrong!");
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div style={{ display: "inline-block", marginTop: "5rem" }}>
                    <h2>Create Subteam Task</h2>
                    <form style={{ margin: "4rem" }}>
                        <InputLabel style={{ textAlign: "left" }}>
                            Department
                        </InputLabel>
                        <Select
                            className={classes.textField}
                            inputProps={{
                                name: 'department',
                            }}
                            fullWidth={true}
                            variant="outlined"
                            value={this.state.department}
                            onChange={this.handleSelectChange}
                        >

                            <MenuItem value={"General"}>General</MenuItem>
                            <MenuItem value={"Decorations"}>Decorations</MenuItem>
                            <MenuItem value={"Photograph"}>Photograph</MenuItem>
                            <MenuItem value={"Music"}>Music</MenuItem>
                            <MenuItem value={"GraphicDesign"}>GraphicDesign</MenuItem>
                            <MenuItem value={"ComputerRelated"}>ComputerRelated</MenuItem>
                        </Select>

                        <InputLabel style={{ textAlign: "left" , marginTop: '2rem'}}>
                           Priority
                        </InputLabel>
                        <Select
                            className={classes.textField}
                            inputProps={{
                                name: 'priority',
                            }}
                            fullWidth={true}
                            variant="outlined"
                            value={this.state.priority}
                            onChange={this.handleSelectChange}
                        >
                            <MenuItem value={"High"}>High</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Low"}>Low</MenuItem>
                        </Select>
                        <TextField
                            className={classes.textField}
                            fullWidth={true}
                            id="subteamContactName"
                            label="Assign To:"
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                        />
                        <TextField
                            className={classes.textField}
                            fullWidth={true}
                            id="projectReference"
                            label="ProjectReference"
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                        />
                        <TextField
                            className={classes.textField}
                            fullWidth={true}
                            id="description"
                            label="Description"
                            multiline={true}
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                        />

                        <Button
                            className={classes.textField}
                            variant="contained"
                            color="primary"
                            onClick={this.handleCreate}
                        >
                            Create Request
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(CreateSubteamTaskScreen);
