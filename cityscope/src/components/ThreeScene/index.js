import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import ThreeScene from "./ThreeScene";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme) => ({
    modal: {
        background: "rgba(0,0,0,0.6)",
    },
    dialogPaper: {
        overflow: "hidden",
        height: "80vh",
        minWidth: "80vw",
        background: "rgb(0,0,0)",
    },
}));

export default function ThreeModal() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <CssBaseline />

            <Dialog
                open={open}
                className={classes.modal}
                classes={{ paper: classes.dialogPaper }}
                onClose={handleClose}
                id={"modal"}
            >
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        (x) Close
                    </Button>
                </DialogActions>
                <ThreeScene />
            </Dialog>
        </div>
    );
}
