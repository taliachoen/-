import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/HomePage.css'

function HomePage() {
  return (
    <div>
      <h1> Welcome </h1>
      <Link to="/hmo/members"> Displaying the details of the members of the cash register </Link>
    </div>
  );
}

export default HomePage;
