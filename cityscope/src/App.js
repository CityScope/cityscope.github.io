import React, { Component } from "react";
import ThreeScene from "./components/ThreeScene/ThreeScene";
import DocsMinsite from "./components/docsMinsite/DocsMinsite";

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <ThreeScene />
                <DocsMinsite />
            </React.Fragment>
        );
    }
}
