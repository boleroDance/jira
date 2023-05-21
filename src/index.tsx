import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import { loadServer, DevTools } from 'jira-dev-tool'
import "antd/dist/antd.less";
import  { AppProviders } from "context"
import { BrowserRouter as Router } from "react-router-dom";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <Router>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
      </Router>
    </React.StrictMode>, document.getElementById("root"))
)



