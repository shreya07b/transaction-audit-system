import { useState } from "react";
import api from "../services/api";

function TransferForm({ onSuccess }) {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitTransfer = async () => {
    if (!senderId || !receiverId || !amount) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await api.post("/transactions/transfer", {
        sender_id: Number(senderId),
        receiver_id: Number(receiverId),
        amount: Number(amount),
      });

      setSenderId("");
      setReceiverId("");
      setAmount("");
      onSuccess();
    } catch {
      setError("Transfer failed");
    } finally {
      setLoading(false);
    }
  };

return (
    <>
      <h2>Transfer Funds</h2>

      {error && <p className="error-text">{error}</p>}

      <div className="form-row">
        <input
          placeholder="Sender ID"
          value={senderId}
          onChange={(e) => setSenderId(e.target.value)}
        />

        <input
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={submitTransfer} disabled={loading}>
          {loading ? "Processing..." : "Send"}
        </button>
      </div>
    </>
  );
}

export default TransferForm;
