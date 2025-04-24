import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de logout aqui
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Bem-vindo ao sistema! Você está logado.</p>
      <button onClick={handleLogout} className="logout-button">
        Sair
      </button>
    </div>
  );
}

export default Dashboard;
