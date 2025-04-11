// src/components/shared/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';

function Navbar({ currentUser }) {
  const navigate = useNavigate();

  const logOut = () => {
    AuthService.logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        BudgetBuddy
      </Link>
      <div className="navbar-nav mr-auto">
        {currentUser && (
          <>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Tableau de bord
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/expenses" className="nav-link">
                Dépenses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tags" className="nav-link">
                Tags
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/groups" className="nav-link">
                Groupes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/budgets" className="nav-link">
                Budgets
              </Link>
            </li>
          </>
        )}
      </div>

      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <span className="nav-link">{currentUser.name}</span>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              Déconnexion
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Connexion
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Inscription
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
}

export default Navbar;