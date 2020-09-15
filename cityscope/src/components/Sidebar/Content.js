import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionIcon from "@material-ui/icons/Description";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "@material-ui/icons/Home";
import { AppContext } from "../provider";

export function Content() {
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
                <ListItemText primary="Home" />
            </ListItem>
            {/*  */}

            <Divider />
            {/*  */}

            <ListItem>
                <ListItemText>
                    <h2>CityScope</h2>
                </ListItemText>
            </ListItem>

            {/*  */}

            <ListItem
                button
                onClick={() => {
                    changeContentUrl("./docs/md/types.md");
                }}
            >
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="CS Types" />
            </ListItem>

            {/*  */}

            <ListItem
                button
                onClick={() => {
                    changeContentUrl(
                        "https://raw.githubusercontent.com/CityScope/CS_cityscopeJS/master/README.md"
                    );
                }}
            >
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="CityScope Frontend" />
            </ListItem>

            {/*  */}

            <ListItem
                button
                onClick={() => {
                    changeContentUrl("./docs/md/licences.md");
                }}
            >
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="licences" />
            </ListItem>

            {/*  */}

            <ListItem
                button
                onClick={() => {
                    changeContentUrl("./docs/md/opensource.md");
                }}
            >
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="open-source" />
            </ListItem>

            <Divider />
            {/*  */}
            <ListItem>
                <ListItemText>
                    <h2>Archive</h2>
                </ListItemText>
            </ListItem>

            {/*  */}
            <ListItem
                button
                onClick={() => {
                    changeContentUrl("./docs/md/schema_archive.md");
                }}
            >
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="(archive) schema" />
            </ListItem>
            {/*  */}
            <ListItem
                button
                onClick={() => {
                    changeContentUrl("./docs/md/specs_archive.md");
                }}
            >
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="(archive) specs" />
            </ListItem>
            {/*  */}
        </div>
    );
}
