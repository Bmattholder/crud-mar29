import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
function Home(props) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginForm;

  const navigate = useNavigate();

  const onChange = (e) => {
    setLoginForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(loginForm);
    navigate("/form");
  };

  return (
    <form onSubmit={onSubmit} className="sign-in-form">
      <input
        type="email"
        className="sign-in-input"
        name="email"
        id="email"
        value={email}
        placeholder="Email"
        onChange={onChange}
      />
      <input
        type="password"
        className="sign-in-input"
        name="password"
        id="password"
        value={password}
        placeholder="Password"
        onChange={onChange}
      />
      <button className="login-btn">Login</button>
    </form>
  );
}

export default Home;
