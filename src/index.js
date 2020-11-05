import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import "./styles/index.css";
import AD from "./components/AD/App";
import KD from "./components/KD/App";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AD} />
        <Route exact path="/ad" component={AD} />
        <Route exact path="/kd" component={KD} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<AppRouter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
