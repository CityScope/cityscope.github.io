import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const style = makeStyles((theme) => ({
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
