import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {login} from "../../rest/LoginService";

class HomeScreen extends PureComponent {
    constructor(props){
        super(props)
        this.state={
            loginModalOpen:true,
            username: null,
            password: null,
            showBadMessageFlag:  false
        }
    }

    handleLogin=()=>{
        const {username, password}= this.state
        const user={
            username:username,
            password: password
        }
        login(user).then(response=>{
            localStorage.setItem('username',response.data.username)
            localStorage.setItem('role', response.data.role)
            this.setState({loginModalOpen: false})
        }).catch(error=>{
            this.setState({showBadMessageFlag: true})
            console.log(error)
        })
    }

    handleChange=(event)=>{
        this.setState({[event.target.id]: event.target.value})
    }
    render() {
        const{loginModalOpen, showBadMessageFlag}= this.state

        return (
            <div>
                <h1>Welcome, Click on the menu to proceed!</h1>
                <Dialog open={loginModalOpen}  >
                    <DialogTitle id="form-dialog-title">Login!</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={this.handleChange}

                        />
                    </DialogContent>
                    {showBadMessageFlag && <p style={{color: 'red', paddingLeft: '1.5rem'}}>Bad credentials!</p>}
                    <DialogActions>
                        <Button onClick={this.handleLogin} color="primary" variant="contained">
                            LOGIN
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

HomeScreen.propTypes = {};

export default HomeScreen;