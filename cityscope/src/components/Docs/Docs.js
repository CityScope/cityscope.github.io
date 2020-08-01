import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Box from "@material-ui/core/Box";

import { MainListItems } from "./menu";
import Content from "./Content";
import GitHubIcon from "@material-ui/icons/GitHub";
import ThreeModal from "./ThreeModal";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        fontSize: 15,
        fontWeight: "lighter",
    },

    CSlogo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "2em",
        borderRadius: "none",
        height: "auto",
        ...theme.mixins.toolbar,
    },

    root: {
        display: "flex",
        background: "#1D1F21",
        color: "#FFF",
    },
    appBar: {
        background: "#1D1F21",
        zIndex: theme.zIndex.drawer + 1,
        color: "#FFF",
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    appBarShift: {
        background: "#1D1F21",
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        color: "#FFF",
        background: "#1D1F21",
        position: "relative",
        whiteSpace: "nowrap",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing() * 3,
        height: "100vh",
        overflow: "auto",
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <ThreeModal />
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
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
                        MIT CityScope
                    </Typography>

                    <IconButton
                        color="inherit"
                        onClick={(props) =>
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
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Box boxShadow={3} zIndex="modal">
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "ltr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <MainListItems />
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <div className={classes.tableContainer}>
                    <Content />
                </div>
            </main>
        </div>
    );
}
