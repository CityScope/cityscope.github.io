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
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MainListItems } from "./menu";
import Content from "./Content";
import GitHubIcon from "@material-ui/icons/GitHub";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";

const drawerWidth = 300;

const styles = theme => ({
    root: {
        display: "flex",
        background: "#1D1F21",
        color: "#FFF"
    },
    toolbar: {
        paddingRight: 24
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 5%",
        ...theme.mixins.toolbar
    },
    appBar: {
        background: "#1D1F21",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        color: "#FFF"
    },
    appBarShift: {
        background: "#1D1F21",
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
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
        fontSize: 20,
        fontWeight: "lighter"
    },
    drawerPaper: {
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
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing() * 7,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing() * 9
        }
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
        open: false
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
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
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h6"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            MIT CityScope Project
                        </Typography>

                        <IconButton
                            color="inherit"
                            onClick={props =>
                                window.open(
                                    "https://github.com/CityScope/CS_cityscopeJS",
                                    "_blank"
                                )
                            }
                        >
                            <GitHubIcon />
                        </IconButton>

                        <IconButton
                            color="inherit"
                            onClick={props =>
                                window.open(
                                    "https://cityio.media.mit.edu",
                                    "_blank"
                                )
                            }
                        >
                            <CloudQueueIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(
                            classes.drawerPaper,
                            !this.state.open && classes.drawerPaperClose
                        )
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
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
