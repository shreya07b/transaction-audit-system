const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransactionHistory
} = require("../controllers/transactionController");

router.post("/transfer", createTransaction);
router.get("/history/:userId", getTransactionHistory);

module.exports = router;
