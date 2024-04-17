import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailService = () => {
  const [foundationOptions, setFoundationOptions] = useState([]);
  const [nonProfitOptions, setNonProfitOptions] = useState([]);
  const [mailRecords, setMailRecords] = useState([]);
  const [selectedFoundation, setSelectedFoundation] = useState('');
  const [selectedNonProfit, setSelectedNonProfit] = useState('');

  useEffect(() => {
    fetchFoundations();
    fetchNonProfits();
    fetchMailRecords();
  }, []);

  const fetchFoundations = () => {
    axios.get('http://localhost:8080/foundation')
      .then(response => {
        setFoundationOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching foundations:', error);
      });
  };

  const fetchNonProfits = () => {
    axios.get('http://localhost:8080/nonprofit')
      .then(response => {
        setNonProfitOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching non-profits:', error);
      });
  };

  const fetchMailRecords = () => {
    axios.get('http://localhost:8080/email')
      .then(response => {
        setMailRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching non-profits:', error);
      });
  };

  const sendEmail = () => {
    axios.post('http://localhost:8080/email/sendEmail', null, {
            params: {
              nonprofitEmail: selectedNonProfit,
              foundationEmail: selectedFoundation
            }})
          .then(response => {
            console.log('Email sent:', response.data);
            alert("mail sent -> " + response.data);
            fetchMailRecords();
            // You can add logic here to display a success message or handle further actions
          })
          .catch(error => {
            console.error('Error sending email:', error);
          });
  };

  return (
    <div>
      <form>
        <label>
          <select required value={selectedFoundation} onChange={(e) => setSelectedFoundation(e.target.value)}>
            <option value="">Select Foundation</option>
            {foundationOptions.map((foundation) => (
              <option key={foundation.id} value={foundation.email}>
                {foundation.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          <select required value={selectedNonProfit} onChange={(e) => setSelectedNonProfit(e.target.value)}>
            <option value="">Select Non-Profit</option>
            {nonProfitOptions.map((nonProfit) => (
              <option key={nonProfit.id} value={nonProfit.email}>
                {nonProfit.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit" onClick={sendEmail}>Send Email</button>
      </form>

      <h2>Mail Logs</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Mail Body</th>
            </tr>
          </thead>
          <tbody>
            {mailRecords.map((mailRecord, index) => (
              <tr key={index}>
                <td>{mailRecord.sender}</td>
                <td>{mailRecord.receiver}</td>
                <td>{mailRecord.mailBody}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Here you can add the component or logic to display the list of sent emails */}
    </div>
  );
};

export default EmailService;
