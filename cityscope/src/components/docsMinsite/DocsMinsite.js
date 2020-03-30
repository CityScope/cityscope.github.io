import React from "react";
import "../../styles.css";
import Dashboard from "./Dashboard";
import Provider from "./provider";

function DocsMinsite() {
    return (
        <Provider>
            <Dashboard />
        </Provider>
    );
}

export default DocsMinsite;
