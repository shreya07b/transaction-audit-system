import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionHistory({ userId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/transactions/history/${userId}`)
      .then((res) => setTransactions(res.data))
      .catch(() => setError("Failed to load transactions"))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
    <h2>Transaction Table</h2>

      {error && <p className="error-text">{error}</p>}
    <table className="transaction-table">
  <thead>
    <tr>
      <th>Sender</th>
      <th>Receiver</th>
      <th>Amount</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    {transactions.map((t) => (
      <tr key={t.id}>
        <td>{t.sender_id}</td>
        <td>{t.receiver_id}</td>
        <td>{t.amount}</td>
        <td className={`status ${t.status.toLowerCase()}`}>
          {t.status}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </>
  );
}

export default TransactionHistory;
