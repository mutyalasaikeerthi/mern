import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles.css';  

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Bank Portal</h1>
      <p>Manage your accounts, view your balance, and much more, all in one place!</p>
      
      <div className="buttons-container">
        {}
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
        
        {}
        <Link to="/signup">
          <button className="home-button">Sign Up</button>
        </Link>

        {}
        <Link to="/accountoverview">
          <button className="home-button">Account Overview</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
