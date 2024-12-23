// src/frontend/pages/AccountOverview.js
import React from "react";
import "../../styles.css"; // Make sure the styles are imported

function AccountOverview() {
  const transactions = [
    { id: 1, type: "Deposit", amount: 1000, isDebit: false },
    { id: 2, type: "Withdrawal", amount: 200, isDebit: true },
    { id: 3, type: "Transfer", amount: 500, isDebit: false },
    { id: 4, type: "Deposit", amount: 1500, isDebit: false },
    { id: 5, type: "Withdrawal", amount: 300, isDebit: true }
  ];

  const totalBalance = 5000;
  const totalTransactions = transactions.reduce((acc, txn) => {
    return txn.isDebit ? acc - txn.amount : acc + txn.amount;
  }, totalBalance);

  return (
    <div className="account-overview">
      <h2 className="account-heading">Account Overview</h2>

      {}
      <div className="account-card">
        {}
        <div className="balance-card">
          <h4 className="section-heading">Account Balance</h4>
          <p className="balance-amount">₹{totalBalance}</p>
        </div>

        {}
        <div className="transactions-card">
          <h4 className="section-heading">Recent Transactions</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>Amount</th>
                <th>Transaction</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.type}</td>
                  <td className={txn.isDebit ? "text-danger" : "text-success"}>
                    {txn.isDebit ? `- ₹${txn.amount}` : `+ ₹${txn.amount}`}
                  </td>
                  <td>{txn.isDebit ? "Debit" : "Credit"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountOverview;
