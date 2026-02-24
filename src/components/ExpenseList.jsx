import { FaTrash, FaEdit } from "react-icons/fa";

export default function ExpenseList({ expenses, setExpenses, setEditExpense }) {

  const handleDelete = (id) => {

    const filtered = expenses.filter((item) => item.id !== id);

    setExpenses(filtered);
    localStorage.setItem("expenses", JSON.stringify(filtered));
  };

  return (
    <div>
      <h2>Expense List</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet</p>
      ) : (
        expenses.map((item) => (
          <div key={item.id} style={{ margin: "10px 0" }}>
            ₹{item.amount} - {item.date}

            <button
              onClick={() => setEditExpense(item)}
              style={{ marginLeft: "10px" }}
            >
              <FaEdit />
            </button>

            <button
              onClick={() => handleDelete(item.id)}
              style={{ marginLeft: "10px" }}
            >
              <FaTrash />
            </button>
          </div>
        ))
      )}
    </div>
  );
}