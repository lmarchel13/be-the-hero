import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logoImage from "../../assets/logo.svg";
import provider from "../../provider";

import "./styles.css";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const history = useHistory();

  const handleRegister = async event => {
    event.preventDefault();
    const payload = { name, email, whatsapp, city, state };
    console.log(payload);

    try {
      const {
        data: { id }
      } = await provider.post("ngos", payload);

      alert(`Your Access ID: ${id}`);
      history.push("/");
    } catch (error) {
      console.log("error :", error);
      alert("Erorr while registering. Please, try again.", error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImage} alt="Logo"></img>
          <h1>Register</h1>
          <p>Sign up, join the platform and help other people to help your NGO.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft color="#E02041" size={16} />
            Already registered
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Non-Governmental Organisation Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          <div className="input-group">
            <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
            <input
              type="text"
              placeholder="State"
              style={{ width: 80 }}
              value={state}
              onChange={e => setState(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
