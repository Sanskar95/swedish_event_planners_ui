import React, { Fragment } from "react";
import "./Header.css";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {Link, Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  const handleLogout=()=>{
      localStorage.clear()
     window.location.reload();
  }

  const list = () => {
    const role = localStorage.getItem("role");
    switch (role) {
      case "CUSTOMER_SERVICE_OFFICER":
        return (
          <List style={{ backgroundColor: "#f2f2f2" }}>
            <Link
              to={"/create-event-request"}
              style={{ textDecoration: "none" }}
            >
              <ListItem button onClick={() => toggleDrawer()}>
                <ListItemIcon>
                  <FormatAlignJustifyIcon />
                </ListItemIcon>
                <ListItemText primary={"Create Event Request"} />
              </ListItem>
            </Link>
          </List>
        );
      case "SENIOR_CUSTOMER_SERVICE_OFFICER":
        return (
          <List style={{ backgroundColor: "#f2f2f2" }}>
            <Link to={"/event-requests"} style={{ textDecoration: "none" }}>
              <ListItem button onClick={() => toggleDrawer()}>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary={"View Event Requests"} />
              </ListItem>
            </Link>
          </List>
        );
      case "PRODUCTION_MANAGER":
        return (
          <List style={{ backgroundColor: "#f2f2f2" }}>
            <Link
              to={"/create-financial-request"}
              style={{ textDecoration: "none" }}
            >
              <ListItem button onClick={() => toggleDrawer()}>
                <ListItemIcon>
                  <FormatAlignJustifyIcon />
                </ListItemIcon>
                <ListItemText primary={"Create Financial Request"} />
              </ListItem>
            </Link>
            <Link
              to={"/create-recruitment-request"}
              style={{ textDecoration: "none" }}
            >
              <ListItem button onClick={() => toggleDrawer()}>
                <ListItemIcon>
                  <FormatAlignJustifyIcon />
                </ListItemIcon>
                <ListItemText primary={"Create Recruitment Request"} />
              </ListItem>
            </Link>
            <Link
              to={"/create-subteam-task"}
              style={{ textDecoration: "none" }}
            >
              <ListItem button onClick={() => toggleDrawer()}>
                <ListItemIcon>
                  <FormatAlignJustifyIcon />
                </ListItemIcon>
                <ListItemText primary={"Create Subteam Task"} />
              </ListItem>
            </Link>
              <Link to={"/subteam-tasks"} style={{ textDecoration: "none" }}>
                  <ListItem button onClick={() => toggleDrawer()}>
                      <ListItemIcon>
                          <VisibilityIcon />
                      </ListItemIcon>
                      <ListItemText primary={"View Subteam Tasks"} />
                  </ListItem>
              </Link>
          </List>
        );
      case "FINANCIAL_MANAGER":
        return (
          <List style={{ backgroundColor: "#f2f2f2" }}>
            <Link to={"/financial-requests"} style={{ textDecoration: "none" }}>
              <ListItem button onClick={() => toggleDrawer()}>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary={"View Financial Requests"} />
              </ListItem>
            </Link>
            <Link to={"/event-requests"} style={{ textDecoration: "none" }}>
              <ListItem button onClick={() => toggleDrawer()}>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary={"View Event Requests"} />
              </ListItem>
            </Link>
          </List>
        );
      case "SUBTEAM":
        return (
          <List style={{ backgroundColor: "#f2f2f2" }}>
            <Link to={"/subteam-tasks"} style={{ textDecoration: "none" }}>
              <ListItem button onClick={() => toggleDrawer()}>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary={"View Subteam Tasks"} />
              </ListItem>
            </Link>
          </List>
        );
      case "ADMIN":
        return (
          <List style={{ backgroundColor: "#f2f2f2" }}>
            <Link to={"/event-requests"} style={{ textDecoration: "none" }}>
              <ListItem button onClick={() => toggleDrawer()}>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary={"View Event Requests"} />
              </ListItem>
            </Link>
          </List>
        );
      case "HR":
        return (
          <List style={{ backgroundColor: "#f2f2f2" }}>
            <Link
              to={"/recruitment-requests"}
              style={{ textDecoration: "none" }}
            >
              <ListItem button onClick={() => toggleDrawer()}>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary={"View Recruitment Requests"} />
              </ListItem>
            </Link>
          </List>
        );

      default:
        return <List style={{ backgroundColor: "#f2f2f2" }}></List>;
    }
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{flexGrow: 1}} variant="h6">SWEDISH EVENT PLANNERS</Typography>
            <Button onClick={handleLogout} color="inherit">LOGOUT</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={drawerOpen} onClose={() => toggleDrawer()}>
          {list()}
      </Drawer>
    </div>
  );
};

export default Header;
