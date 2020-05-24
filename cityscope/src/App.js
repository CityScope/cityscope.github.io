import React, { Component } from "react";
import "./components/Docs/DocsMinsite.css";
import Docs from "./components/Docs/Docs";
import Provider from "./components/Docs/provider";

export default class App extends Component {
    render() {
        return (
            <Provider>
                <Docs />
            </Provider>
        );
    }
}
