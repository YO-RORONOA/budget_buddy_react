// src/components/dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExpenseService from '../../services/expense.service';
import BudgetService from '../../services/budget.service';

function Dashboard() {
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [budgetSummary, setBudgetSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const expenseResponse = await ExpenseService.getAllExpenses();
        setRecentExpenses(expenseResponse.data.slice(0, 5)); 

        if (typeof BudgetService.getAllBudgets === 'function') {
          const budgetResponse = await BudgetService.getAllBudgets();
          setBudgetSummary(budgetResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du tableau de bord", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Tableau de bord</h1>
      
      <div className="dashboard-section">
        <h2>Dépenses récentes</h2>
        {recentExpenses.length > 0 ? (
          <ul className="expense-list">
            {recentExpenses.map((expense) => (
              <li key={expense.id} className="expense-item">
                <div className="expense-title">{expense.title}</div>
                <div className="expense-amount">{expense.amount} €</div>
                <div className="expense-date">{new Date(expense.expense_date).toLocaleDateString()}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune dépense récente.</p>
        )}
        <Link to="/expenses" className="btn btn-primary">Voir toutes les dépenses</Link>
      </div>
      
      <div className="dashboard-section">
        <h2>Résumé des budgets</h2>
        {budgetSummary.length > 0 ? (
          <ul className="budget-list">
            {budgetSummary.map((budget) => (
              <li key={budget.id} className="budget-item">
                <div className="budget-category">{budget.category}</div>
                <div className="budget-progress">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${budget.percentage_used}%`,
                      backgroundColor: budget.percentage_used > 90 ? 'red' : budget.percentage_used > 70 ? 'orange' : 'green'
                    }}
                  ></div>
                </div>
                <div className="budget-stats">
                  <span>{budget.spent} € / {budget.amount} €</span>
                  <span>{budget.percentage_used.toFixed(1)}%</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun budget défini.</p>
        )}
        <Link to="/budgets" className="btn btn-primary">Gérer les budgets</Link>
      </div>
      
      <div className="dashboard-actions">
        <Link to="/expenses/new" className="btn btn-success">Ajouter une dépense</Link>
        <Link to="/groups" className="btn btn-info">Voir mes groupes</Link>
      </div>
    </div>
  );
}

export default Dashboard;