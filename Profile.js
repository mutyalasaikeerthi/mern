import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

const Profile = () => {
  const [user, setUser] = useState({ fullName: "", email: "", balance: 0 });
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Welcome, {user.fullName}</h1>
        <div className="profile-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Balance:</strong> ${user.balance}</p>
        </div>

        <div className="profile-links">
          <Link to="/dashboard" className="profile-link">Go to Dashboard</Link>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
