const pool = require("../../../config/database_config");
const Transaction = require("../Model/transactionModel");
const { format } = require("date-fns");

class TransactionService {
  // For Transactions Tables
  static async getAllUserTransactions(u_id) {
    console.log("transaction service running");
    try {
      const [rows] = await pool.query(
        `SELECT * FROM Transactions Where u_id = ?`,
        [u_id]
      );
      console.log("transaction service rows", rows);
      return rows.map(
        (row) =>
          new Transaction(
            row.id,
            row.u_id,
            row.o_id,
            row.mode,
            row.item,
            row.amount,
            row.created_at,
            row.modified_at,
            row.deleted_at
          )
      );
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }

  static async getAllOrderTransactions(u_id, o_id) {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM Transactions Where u_id = ? && o_id = ?`,
        [u_id, o_id]
      );
      console.log("rows service transactions line 40", rows);
      return rows;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }

  static async getTransactionById(id) {
    try {
      const [row] = await pool.query(
        `SELECT * FROM Transactions where id = ?`,
        [id]
      );
      return row;
    } catch (error) {
      console.log("Error executing the query", error);
    }
  }

  static async createTransactions(u_id, o_id, item, mode, amount) {
    try {
      const now = new Date();
      const created_at = format(now, "yyyy-MM-dd HH:mm:ss"); // Declare `created_at` with `const`
      const [result] = await pool.query(
        `INSERT INTO Transactions (u_id, o_id, item, mode, amount, created_at) VALUES(?,?,?,?,?,?)`,
        [u_id, o_id, item, mode, amount, created_at]
      );
      return result;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }

  static async updateTransactions(t_id, item, mode, amount) {
    try {
      const now = new Date();
      const modified_at = format(now, "yyyy-MM-dd HH:mm:ss");
      const [result] = await pool.query(
        `UPDATE Transactions SET item = ?, mode = ?, amount = ?, modified_at = ? WHERE id = ?`,
        [item, mode, amount, modified_at, t_id]
      );
      return result;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }

  static async deleteTransactions(t_id) {
    try {
      const [result] = await pool.query(
        `DELETE FROM Transactions WHERE id = ?`,
        [t_id]
      );
      return result;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }
}

module.exports = TransactionService;
