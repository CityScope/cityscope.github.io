import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionIcon from "@material-ui/icons/Description";

import { AppContext } from "./provider";
import HomeIcon from "@material-ui/icons/Home";

function MainListItems() {
    const { setContentUrl } = useContext(AppContext);
    const changeContentUrl = (url) => {
        setContentUrl(url);
    };
    return (
        <div>
            <ListItem
                button
                onClick={() => {
                    changeContentUrl("README.md");
                }}
            >
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="CityScope" />
            </ListItem>

            <ListItem
                button
                onClick={() => {
                    changeContentUrl("./docs/md/Home.md");
                }}
            >
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Docs" />
            </ListItem>
        </div>
    );
}

export { MainListItems };
