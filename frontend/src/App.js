import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import View from "./components/View";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
/* import Register from "./components/register";
import Login from "./components/login";
import User from "./components/user"; */
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/view" component={View} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* <ProtectedRoute
            path="/dashboard"
            component={Dashboard}
          ></ProtectedRoute> */}
        </Switch>
      </Router>
    </div>
  );
}
export default App;
