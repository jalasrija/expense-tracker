import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import "./Dashboard.css";

export default function Dashboard(){

  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [editExpense, setEditExpense] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      navigate("/");
    }

    const saved = JSON.parse(localStorage.getItem("expenses"));
    if (saved) {
      setExpenses(saved);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const filteredExpenses =
    selectedYear === "All"
      ? expenses
      : expenses.filter((item) => {
          if (!item.date) return false;
          const year = new Date(item.date).getFullYear().toString();
          return year === selectedYear;
        });

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = 2020; y <= currentYear; y++) {
    years.push(y);
  }

  return(
    <div className="dashboard-container">

      <div className="overlay"></div>

      <div className="dashboard-card">

        <div className="dashboard-header">
          <h1>Expense Tracker</h1>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <ExpenseForm
          expenses={expenses}
          setExpenses={setExpenses}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />

        <div className="filter-section">
          <h3>Filter by Year</h3>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <ExpenseList
          expenses={filteredExpenses}
          setExpenses={setExpenses}
          setEditExpense={setEditExpense}
        />

      </div>

    </div>
  )
}