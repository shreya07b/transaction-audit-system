const sequelize = require("../config/database");

exports.createTransaction = async (req, res) => {
  const { sender_id, receiver_id, amount } = req.body;

  if (!sender_id || !receiver_id || !amount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await sequelize.transaction(async (t) => {
      // Debit sender
      await sequelize.query(
        "UPDATE users SET balance = balance - :amount WHERE id = :sender",
        {
          replacements: { amount, sender: sender_id },
          transaction: t
        }
      );

      // Credit receiver
      await sequelize.query(
        "UPDATE users SET balance = balance + :amount WHERE id = :receiver",
        {
          replacements: { amount, receiver: receiver_id },
          transaction: t
        }
      );

      // Insert audit log
      await sequelize.query(
        `INSERT INTO transactions (sender_id, receiver_id, amount, status)
         VALUES (:sender, :receiver, :amount, 'SUCCESS')`,
        {
          replacements: { sender: sender_id, receiver: receiver_id, amount },
          transaction: t
        }
      );
    });

    res.json({ message: "Transaction completed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Transaction failed" });
  }
};

exports.getTransactionHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const [results] = await sequelize.query(
      `SELECT * FROM transactions
       WHERE sender_id = :userId OR receiver_id = :userId
       ORDER BY timestamp DESC`,
      {
        replacements: { userId }
      }
    );

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch transaction history" });
  }
};
