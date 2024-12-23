import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setEmail(user.email); 
      setBalance(user.balance); 
    }
  }, []);

  
  const handleDeposit = async () => {
    if (amount <= 0) {
      setErrorMessage("Deposit amount must be greater than 0.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/dashboard/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        setBalance(data.balance); 
        sessionStorage.setItem("user", JSON.stringify({ ...data, email })); 
        setAmount(0); 
        setErrorMessage(""); 
      } else {
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    }
  };

  // Withdraw function
  const handleWithdraw = async () => {
    if (amount <= 0) {
      setErrorMessage("Withdraw amount must be greater than 0.");
      return;
    }

    if (amount > balance) {
      setErrorMessage("Insufficient balance.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/dashboard/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        setBalance(data.balance); 
        sessionStorage.setItem("user", JSON.stringify({ ...data, email })); 
        setAmount(); 
        setErrorMessage(""); 
      } else {
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Dashboard</h1>
        <div className="dashboard-details">
          <p><strong>Balance:</strong> ${balance}</p>
        </div>

        <div className="dashboard-actions">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
          <div className="action-buttons">
            <button onClick={handleDeposit} className="action-button">Deposit</button>
            <button onClick={handleWithdraw} className="action-button">Withdraw</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <div className="dashboard-links">
          <Link to="/profile" className="dashboard-link">Go to Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
