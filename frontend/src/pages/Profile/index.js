import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import logoImage from "../../assets/logo.svg";
import provider from "../../provider";

import "./styles.css";

export default () => {
  const ngoId = localStorage.getItem("ngo_id");
  const ngoName = localStorage.getItem("ngo_name");
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    provider.get("incidents", { headers: { Authorization: ngoId } }).then(({ data }) => {
      setIncidents(data);
    });
  }, [ngoId]);

  const handleDeleteIncident = async id => {
    console.log({ id, ngoId });
    try {
      await provider.delete(`incidents/${id}`, { headers: { Authorization: ngoId } });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      console.log("error :", error);
      alert("Error while deleting incident, please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="profile-container">
      <header>
        <img src={logoImage} alt="Logo" />
        <span>Welcome, {ngoName}</span>
        <Link className="button" to="/incidents/new">
          Add new incident
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(({ id: incidentId, title, description, value }, index) => (
          <li key={index}>
            <strong>Caso:</strong>
            <p>{title}</p>
            <strong>Description</strong>
            <p>{description}</p>
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(value)}</p>
            <button type="button" onClick={() => handleDeleteIncident(incidentId)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
