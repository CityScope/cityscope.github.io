import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ghpages

ghpages.publish('doc', {
  branch: 'master',
  repo: 'https://github.com/CityScience/cityscope.github.io.git'
}, function(err){});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
