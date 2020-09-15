import React, { Component } from "react";
import "./style.css";
import CSdocs from "./components/CSdocs";
import Provider from "./components/provider";

export default class App extends Component {
    render() {
        return (
            <Provider>
                <CSdocs />
            </Provider>
        );
    }
}
