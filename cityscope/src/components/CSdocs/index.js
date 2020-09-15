import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
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
import Sidebar from "../Sidebar";
import ReactMarkdownHandler from "./ReactMarkdownHandler";
import GitHubIcon from "@material-ui/icons/GitHub";
import ThreeModal from "../ThreeScene";
import { style } from "./style";

const useStyles = style;

export default function CSdocs() {
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
                        <Sidebar />
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
                    <ReactMarkdownHandler />
                </div>
            </main>
        </div>
    );
}
