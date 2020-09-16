import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionIcon from "@material-ui/icons/Description";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import HomeIcon from "@material-ui/icons/Home";
import { AppContext } from "../provider";

export function Content() {
    const { setContentUrl } = useContext(AppContext);
    const changeContentUrl = (url) => {
        setContentUrl(url);
    };

    const contentObj = {
        home: { url: "README.md", icon: <HomeIcon />, slug: "Home" },
        types: {
            url: "./docs/md/types.md",
            icon: <DescriptionIcon />,
            slug: "CS Types",
        },
        frontend: {
            url:
                "https://raw.githubusercontent.com/CityScope/CS_cityscopeJS/master/README.md",
            icon: <DescriptionIcon />,
            slug: "CityScopeJS",
        },

        brix_index: {
            url:
                "https://raw.githubusercontent.com/CityScope/CS_Brix/master/docs/markdown/index.md",
            icon: <DescriptionIcon />,
            slug: "brix: intro",
        },
        brix_class: {
            url:
                "https://raw.githubusercontent.com/CityScope/CS_Brix/master/docs/markdown/classes.md",
            icon: <DescriptionIcon />,
            slug: "brix: class",
        },

        brix_tutorial: {
            url:
                "https://raw.githubusercontent.com/CityScope/CS_Brix/master/docs/markdown/tutorial.md",
            icon: <DescriptionIcon />,
            slug: "brix: tutorial",
        },

        licence: {
            url: "./docs/md/licences.md",
            icon: <DescriptionIcon />,
            slug: "licences",
        },
        oss: {
            url: "./docs/md/opensource.md",
            icon: <DescriptionIcon />,
            slug: "open-source",
        },
        schema: {
            url: "./docs/md/schema_archive.md",
            icon: <ErrorOutlineIcon />,
            slug: "(archive) schema",
        },
        specs: {
            url: "./docs/md/specs_archive.md",
            icon: <ErrorOutlineIcon />,
            slug: "(archive) specs",
        },
    };

    let contentItem = () => {
        let contentItemsArray = [];
        for (const conObj in contentObj) {
            const url = contentObj[conObj].url;
            const slug = contentObj[conObj].slug;
            const icon = contentObj[conObj].icon;
            let item = (
                <ListItem
                    key={conObj}
                    button
                    onClick={() => {
                        changeContentUrl(url);
                    }}
                >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={slug} />
                </ListItem>
            );

            contentItemsArray.push(item);
        }
        return contentItemsArray;
    };
    return <div>{contentItem()}</div>;
}
