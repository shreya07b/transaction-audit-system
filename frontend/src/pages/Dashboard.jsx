import TransferForm from "../components/TransferForm";
import TransactionHistory from "../components/TransactionHistory";
import CreateUser from "../components/CreateUser";
import { useState } from "react";

function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container">
      <h1>Transaction Audit System</h1>

      <div className="card">
        <CreateUser />
      </div>

      <div className="card">
        <TransferForm onSuccess={() => setRefresh(!refresh)} />
      </div>

      <div className="card">
        <TransactionHistory userId={1} key={refresh} />
      </div>
    </div>
  );
}

export default Dashboard;
