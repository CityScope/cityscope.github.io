import React, { useEffect, useState, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { AppContext } from "./provider";
import axios from "axios";

export default () => {
    const [content, setContent] = useState();
    const { contentUrl: thisContentURL } = useContext(AppContext);

    let repoURL =
        "https://raw.githubusercontent.com/CityScope/cityscope.github.io/dev/";

    // if URL of remote repo, return that
    let srcURL;

    if (thisContentURL.startsWith("http")) {
        srcURL = thisContentURL;
        // replace the repoURL with the remote URL for image loading
        let sp = thisContentURL.split("/");
        // create new URL without the filename
        let newURL = thisContentURL.replace(sp[sp.length - 1], "");
        repoURL = newURL;
    } else {
        srcURL = `${repoURL}${thisContentURL}`;
    }

    useEffect(() => {
        axios
            .get(srcURL, {
                mode: "no-cors",
            })
            .then((response) => {
                setContent(response.data);
            });
    }, [srcURL]);

    return (
        <div className="result-pane">
            <ReactMarkdown
                className="result"
                source={content}
                transformImageUri={(uri) => {
                    return uri.startsWith("http") ? uri : `${repoURL}${uri}`;
                }}
            />
        </div>
    );
};
