import React, { useEffect, useState } from "react";
import axios from "axios";

const NonprofitForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [nonprofits, setNonprofits] = useState([]);

  useEffect(() => {
    fetchNonprofits();
  }, []);

  const fetchNonprofits = () => {
    axios
      .get("http://localhost:8080/nonprofit")
      .then((response) => {
        setNonprofits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching nonprofits:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = { city, state, zipCode };
    const nonprofitData = { name, email, address };

    axios
      .post("http://localhost:8080/nonprofit", nonprofitData)
      .then((response) => {
        console.log("Nonprofit created successfully:", response.data);
        // Reset form fields
        setName("");
        setEmail("");
        setCity("");
        setState("");
        setZipCode("");

        fetchNonprofits();
      })
      .catch((error) => {
        alert("Wrong input, please check for errors");
        console.error("Error creating nonprofit:", error);
      });
  };

  return (
    <div>
      <h2>Create Nonprofit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="number"
          required
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <button type="submit">Save Nonprofit</button>
      </form>

      <h2>Existing Nonprofits</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {nonprofits.map((nonprofit, index) => (
              <tr key={index}>
                <td>{nonprofit.name}</td>
                <td>{nonprofit.email}</td>
                <td>{nonprofit.address?.city}</td>
                <td>{nonprofit.address?.state}</td>
                <td>{nonprofit.address?.zipCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NonprofitForm;
