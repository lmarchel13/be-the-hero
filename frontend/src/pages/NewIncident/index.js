import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logoImage from "../../assets/logo.svg";

import "./styles.css";
import provider from "../../provider";

export default () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);

  const ngoId = localStorage.getItem("ngo_id");
  const history = useHistory();

  const handleNewIncident = async event => {
    event.preventDefault();
    const payload = { title, description, value };

    try {
      await provider.post("incidents", payload, { headers: { Authorization: ngoId } });
      history.push("/profile");
    } catch (error) {
      alert("Error while creating new incident. Please try again");
    }
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImage} alt="Logo"></img>
          <h1>Create new incident</h1>
          <p>Describe your incident, so you can find a hero to solve it.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft color="#E02041" size={16} />
            Back
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Incident title" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
          <input value={value} onChange={e => setValue(e.target.value)} placeholder="Value ($)" />

          <button className="button" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
