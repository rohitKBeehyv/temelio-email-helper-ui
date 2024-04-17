import React from "react";
import NonprofitForm from "./NonProfitForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Foundations from "./Foundations";
import EmailService from "./MailService";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
export default function Home() {
  return (
    <div>
      <h1>Welcome to Foundation Email Management App</h1>
      <p>Here you can configure foundations, non-profits and use our exxiting easy to use mail-service </p>
      <Router>
        <div>
          <nav>
          <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/nonprofit" activeClassName="active">Non Profits</NavLink>
        </li>
        <li>
          <NavLink to="/foundations" activeClassName="active">Foundations</NavLink>
        </li>
        <li>
          <NavLink to="/mail-service" activeClassName="active">Mail Helper Service</NavLink>
        </li>
      </ul>
          </nav>
          <Switch>
          <Route exact path="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bill_Gates_-_2023_-_P062021-967902_%28cropped%29.jpg/800px-Bill_Gates_-_2023_-_P062021-967902_%28cropped%29.jpg"/>
            <div class="underline">It's fine to celebrate success, but it is more important to heed the lessons of failure.</div>
          </Route>
          <Route path="/nonprofit">
          <NonprofitForm />
          </Route>
          <Route path="/foundations">
            <Foundations/>
          </Route>
          <Route path="/mail-service">
            <EmailService/>
          </Route>
        </Switch>
        </div>
      </Router>
    </div>
  );
}
