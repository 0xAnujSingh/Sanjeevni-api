const pool = require("../../../config/database_config");
const { format } = require("date-fns");

// For Orders Tables
async function getOrder(id) {
  try {
    const [rows] = await pool.query(`SELECT * FROM Orders where id = ?`, [id]);
    return rows;
  } catch (err) {
    console.log("Error executing query:", err);
    throw err;
  }
}

async function getOrderByUser(u_id) {
  try {
    const [rows] = await pool.query(`SELECT * FROM Orders where u_id = ?`, [
      u_id,
    ]);
    return rows;
  } catch (err) {
    console.log("Error executing query:", err);
    throw err;
  }
}

async function createOrders(u_id, quantity, status, total_amount) {
  try {
    const now = new Date();
    created_at = format(now, "yyyy-MM-dd HH:mm:ss");
    const [result] = await pool.query(
      `INSERT INTO Orders (u_id, quantity, status, total_amount, created_at) VALUES (?, ?, ?, ?, ?)`,
      [u_id, quantity, status, total_amount, created_at]
    );
    return result;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
}

async function updateOrders(o_id, quantity, status, total_amount) {
  try {
    const now = new Date();
    modified_at = format(now, "yyyy-MM-dd HH:mm:ss");
    const [result] = await pool.query(
      `UPDATE Orders set  quantity = ? , status = ? , total_amount = ?, modified_at = ? WHERE id = ?`,
      [quantity, status, total_amount, modified_at, o_id]
    );
    console.log(result);
    return result;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
}
async function deleteOrder(o_id) {
  try {
    const [result] = await pool.query(`DELETE FROM Orders WHERE id = ?`, [
      o_id,
    ]);
    //console.log(result);
    return result;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
}

// Orders Tables Ends

module.exports = {
  getOrder,
  getOrderByUser,
  createOrders,
  updateOrders,
  deleteOrder,
};
