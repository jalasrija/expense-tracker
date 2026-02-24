import { useState, useEffect } from "react";

export default function ExpenseForm({ expenses, setExpenses, editExpense, setEditExpense }) {

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (editExpense) {
      setAmount(editExpense.amount);
      setDate(editExpense.date);
    }
  }, [editExpense]);

  const handleSubmit = () => {

    if (!amount || !date) {
      alert("Please enter amount and date");
      return;
    }

    if (date > today) {
      alert("Future dates are not allowed.");
      return;
    }

    if (editExpense) {

      const updatedExpenses = expenses.map((item) =>
        item.id === editExpense.id
          ? { ...item, amount, date }
          : item
      );

      setExpenses(updatedExpenses);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      setEditExpense(null);

    } else {

      const newExpense = {
        id: Date.now(),
        amount,
        date
      };

      const updatedExpenses = [...expenses, newExpense];

      setExpenses(updatedExpenses);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    }

    setAmount("");
    setDate("");
  };

  return (
    <div>
      <h2>Add Your Expense</h2>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        value={date}
        max={today}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editExpense ? "Update" : "Add"}
      </button>
    </div>
  );
}