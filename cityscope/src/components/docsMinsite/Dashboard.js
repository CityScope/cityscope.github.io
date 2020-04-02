import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import { MainListItems } from "./menu";
import Content from "./Content";
import GitHubIcon from "@material-ui/icons/GitHub";

const drawerWidth = 200;

const styles = theme => ({
    root: {
        display: "flex",
        background: "#1D1F21",
        color: "#FFF"
    },
    toolbar: {
        paddingRight: 24
    },

    CSlogo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "2em",
        borderRadius: "none",
        height: "auto",
        ...theme.mixins.toolbar
    },

    appBar: {
        background: "#1D1F21",
        zIndex: theme.zIndex.drawer + 1,
        color: "#FFF"
    },

    appBarShift: {
        background: "#1D1F21",
        marginLeft: drawerWidth
    },

    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },

    menuButtonHidden: {
        display: "none"
    },

    title: {
        flexGrow: 1,
        fontSize: 25,
        fontWeight: "lighter"
    },

    drawerPaper: {
        paddingTop: "5em",
        color: "#FFF",
        background: "#1D1F21",
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing() * 3,
        height: "100vh",
        overflow: "auto"
    },
    chartContainer: {
        marginLeft: -22
    },
    tableContainer: {
        height: 320
    },
    h5: {
        marginBottom: theme.spacing() * 2
    }
});

class Dashboard extends React.Component {
    state = {
        open: true
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />

                <AppBar
                    position="fixed"
                    className={classNames(
                        classes.appBar,
                        this.state.open && classes.appBarShift
                    )}
                >
                    <Toolbar
                        disableGutters={!this.state.open}
                        className={classes.toolbar}
                    >
                        <Typography
                            component="h6"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            MIT CityScope
                        </Typography>

                        <IconButton
                            color="inherit"
                            onClick={props =>
                                window.open(
                                    "https://github.com/CityScope",
                                    "_blank"
                                )
                            }
                        >
                            <GitHubIcon />
                        </IconButton>

                        <IconButton className={classes.CSlogo}>
                            <a href="https://www.media.mit.edu/projects/cityscope/overview/">
                                <img src="./resources/logo.png" alt="" />
                            </a>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper)
                    }}
                    open={this.state.open}
                >
                    <Divider />
                    <List>
                        <MainListItems />
                    </List>
                    <Divider />
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <div className={classes.tableContainer}>
                        <Content />
                    </div>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
