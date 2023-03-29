import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
function Nav() {
  return (
    <div className="nav">
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/form">
        Form
      </Link>
      <Link className="link" to="/list">
        List
      </Link>
    </div>
  );
}

export default Nav;
