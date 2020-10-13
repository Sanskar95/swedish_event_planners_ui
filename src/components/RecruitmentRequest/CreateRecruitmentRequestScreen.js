import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField/TextField";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { createFinancialRequest } from "../../rest/FinancialRequestService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {createRecruitmentRequest} from "../../rest/RecruitmentRequestService";
import {Redirect} from "react-router-dom";
toast.configure();

const styles = () => ({
    textField: {
        marginTop: "1rem",
    },
});

class CreateRecruitmentRequestScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            requestingDepartment: null,
            contractType: null,
            jobDescription: null,
            jobTitle: null,
            yearsOfExperience: null
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
        createRecruitmentRequest(this.state)
            .then(() => {
                toast.success("Requested created successfully");
            })
            .catch(() => {
                toast.error("Something  went wrong!");
            });
    };

    render() {
        if(localStorage.getItem('role')===null){
            console.log(localStorage.getItem('role'))
            return <Redirect to='/'/>;
        }
        const { classes } = this.props;
        return (
            <div>
                <div style={{ display: "inline-block", marginTop: "5rem" }}>
                    <h2>Create Recruitment Request</h2>
                    <form style={{ margin: "4rem" }}>
                        <InputLabel style={{ textAlign: "left" }}>
                            Contract Type
                        </InputLabel>
                        <Select
                            className={classes.textField}
                            inputProps={{
                                name: 'contractType',
                            }}
                            fullWidth={true}
                            variant="outlined"
                            value={this.state.contractType}
                            onChange={this.handleSelectChange}
                        >
                            <MenuItem value={"FullTime"}>Full Time</MenuItem>
                            <MenuItem value={"PartTime"}>Part Time</MenuItem>
                        </Select>

                        <InputLabel style={{ textAlign: "left" , marginTop: '2rem'}}>
                            Requesting Department
                        </InputLabel>
                        <Select
                            className={classes.textField}
                            inputProps={{
                                name: 'requestingDepartment',
                            }}
                            fullWidth={true}
                            variant="outlined"
                            value={this.state.requestingDepartment}
                            onChange={this.handleSelectChange}
                        >
                            <MenuItem value={"Administration"}>Administration</MenuItem>
                            <MenuItem value={"Service"}>Service</MenuItem>
                            <MenuItem value={"Financial"}>Financial</MenuItem>
                            <MenuItem value={"Production"}>Production</MenuItem>
                        </Select>
                        <TextField
                            className={classes.textField}
                            fullWidth={true}
                            id="yearsOfExperience"
                            label="Years of Experience"
                            variant="outlined"
                            type={'number'}
                            onChange={this.handleTextFieldChange}
                        />
                        <TextField
                            className={classes.textField}
                            fullWidth={true}
                            id="jobTitle"
                            label="Job Title"
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                        />
                        <TextField
                            className={classes.textField}
                            fullWidth={true}
                            id="jobDescription"
                            label="Job Description"
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

CreateRecruitmentRequestScreen.propTypes = {};

export default withStyles(styles)(CreateRecruitmentRequestScreen);
