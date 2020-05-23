import React, { Component } from "react";
import "./components/docsMinsite/DocsMinsite.css";
import Dashboard from "./components/docsMinsite/Dashboard";
import Provider from "./components/docsMinsite/provider";

export default class App extends Component {
    render() {
        return (
            <Provider>
                <Dashboard />
            </Provider>
        );
    }
}
