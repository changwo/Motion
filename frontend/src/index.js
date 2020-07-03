import React from "react";
import ReactDOM from "react-dom";
import authComponent from "../src/HOC/authHOC/";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { defaultTheme, GlobalStyle } from "./style";
import { ThemeProvider } from "styled-components";
import { login } from "./store/actions/loginAction";
import Home from "./routes/Home";
import Feed from "./routes/Feed";
import Friends from "./routes/Friends";
import Profile from "./routes/Profile";
import UserProfile from "./routes/UserProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { store } from "./store";
import UpdateProfile from "./routes/UpdateProfile";
import {setLoggedInUser} from "./store/actions/userAction";
import Comments from "./components/UserPost/Comments";

if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token");
  store.dispatch(login(token));
}
if (localStorage.getItem("user")) {
  const user = localStorage.getItem("user");
  store.dispatch(setLoggedInUser(JSON.parse(user)));
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={Comments} />
          <Route exact path="/feed" component={authComponent(Feed)} />
          <Route exact path="/friends" component={authComponent(Friends)} />
          <Route exact path="/profile" component={authComponent(Profile)} />
          <Route exact path="/updateprofile" component={authComponent(UpdateProfile)} />
          <Route
            exact
            path="/user/:id"
            component={authComponent(UserProfile)}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
