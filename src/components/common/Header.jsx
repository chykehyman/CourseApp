import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
  <nav className="nav justify-content-start">
    <Link to="/" className="nav-link" activeclassname="active">Home</Link>
    {' | '}
    <Link to="/courses" className="nav-link" activeclassname="active">Courses</Link>
    {' | '}
    <Link to="/about" className="nav-link" activeclassname="active">About</Link>
  </nav>
);

export default Header;
