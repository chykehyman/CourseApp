import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => (
  <div className="jumbotron">
    <h1 className="display-4">PluralSight Administration</h1>
    <p className="lead">
      <Link to="/about" className="btn btn-primary btn-lg">Learn More</Link>
    </p>
  </div>
);

export default HomePage;
