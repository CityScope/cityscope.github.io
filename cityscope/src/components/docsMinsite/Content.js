import React, { useEffect, useState, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { AppContext } from "./provider";
import axios from "axios";

export default () => {
    const [content, setContent] = useState();
    const { contentUrl } = useContext(AppContext);
    const globalDocsURL =
        "https://raw.githubusercontent.com/CityScope/cityscope.github.io/dev/";

    const thisDocURL = globalDocsURL + contentUrl;

    useEffect(() => {
        axios
            .get(thisDocURL, {
                mode: "no-cors",
            })
            .then((response) => {
                setContent(response.data);
            });
    }, [thisDocURL]);

    return (
        <div className="result-pane">
            <ReactMarkdown
                className="result"
                source={content}
                transformImageUri={(uri) =>
                    uri.startsWith("http") ? uri : `${globalDocsURL}${uri}`
                }
            />
        </div>
    );
};
