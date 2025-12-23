import { useState } from "react";
import api from "../services/api";

function Transfer() {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = async () => {
    try {
      const res = await api.post("/transactions/transfer", {
        sender_id: Number(senderId),
        receiver_id: Number(receiverId),
        amount: Number(amount),
      });

      setMessage(res.data.message || "Transfer successful");
    } catch (err) {
      setMessage("Transfer failed");
    }
  };

  return (
    <div>
      <h2>Transfer Funds</h2>

      <input
        placeholder="Sender ID"
        value={senderId}
        onChange={(e) => setSenderId(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br /><br />

      <button onClick={handleTransfer}>Send Money</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Transfer;
