import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { toast } from 'react-hot-toast';

function Navbar() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    toast.success("Logged Out Successfully");
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark custom-navbar shadow-sm py-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold fs-3">
          <i className="fa fa-sticky-note me-2 fa-lg"></i> NotesApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link fs-5">
                <i className="fa fa-home me-2 fa-lg"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/createnotes" className="nav-link fs-5">
                <i className="fa fa-plus-circle me-2 fa-lg"></i> Create Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link fs-5">
                <i className="fa fa-user me-2 fa-lg"></i> Profile
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-light ms-3 rounded-pill px-4 py-2 fw-semibold fs-6 logout-btn"
                onClick={handleLogout}
              >
                <i className="fa fa-sign-out me-2 fa-lg"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;