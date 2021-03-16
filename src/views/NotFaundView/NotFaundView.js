import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundView = () => {
  return (
    <h1>
      404 not found, Go back to main page - <Link to="/">click here</Link>
    </h1>
  );
};

export default NotFoundView;
