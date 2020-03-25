import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./styles.css";
import logoImage from "../../assets/logo.svg";
import heroesImage from "../../assets/heroes.png";

import provider from "../../provider";

export default () => {
  const [id, setId] = useState("");
  const history = useHistory();

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const {
        data: { name }
      } = await provider.post("sessions", { id });

      localStorage.setItem("ngo_id", id);
      localStorage.setItem("ngo_name", name);
      history.push("/profile");
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImage} alt="Logo" />
        <form onSubmit={handleLogin}>
          <h1>Log in</h1>
          <input type="text" placeholder="Your ID" value={id} onChange={e => setId(e.target.value)} />
          <button className="button" type="submit">
            Sign In
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn color="#E02041" size={16} />
            Not registered yet
          </Link>
        </form>
      </section>
      <img src={heroesImage} alt="Heroes" />
    </div>
  );
};
