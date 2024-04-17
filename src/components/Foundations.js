import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Foundations() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [foundations, setFoundations] = useState([]);

  useEffect(() => {
    fetchFoundations();
  }, []);

  const fetchFoundations = () => {
    axios
      .get("http://localhost:8080/foundation")
      .then((response) => {
        setFoundations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching nonprofits:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundationData = { name, email };

    axios
      .post("http://localhost:8080/foundation", foundationData)
      .then((response) => {
        console.log("Foundation created successfully:", response.data);
        setName("");
        setEmail("");

        fetchFoundations();
      })
      .catch((error) => {
        alert("Wrong input, please check for errors");

        console.error("Error creating nonprofit:", error);
      });
  };

  return (
    <div>
      <h2>Create Foundations</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Save Foundation</button>
      </form>

      <h2>Existing Foundations</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {foundations.map((foundation, index) => (
              <tr key={index}>
                <td>{foundation.name}</td>
                <td>{foundation.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
