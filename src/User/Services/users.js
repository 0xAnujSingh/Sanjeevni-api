const pool = require("../../../config/database_config");
const { format } = require("date-fns");
class Users {
  // For Users Tables
  // Function to fetch all users
  static async getAllUsers() {
    try {
      const [rows] = await pool.query(`SELECT * FROM Users`);
      return rows;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }

  // Function to fetch a specific user by ID
  static async getUserById(id) {
    try {
      const [rows] = await pool.query(`SELECT * FROM Users WHERE id = ?`, [id]);
      return rows[0];
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }

  static async getUserByEmail(email) {
    try {
      const [row] = await pool.query(`SELECT * FROM Users WHERE email = ?`, [
        email,
      ]);
      return row[0];
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }

  // Function to create a new user
  static async createUser(name, password, phone_number, address, type, email) {
    try {
      const now = new Date();
      const created_at = format(now, "yyyy-MM-dd HH:mm:ss");
      const [result] = await pool.query(
        `INSERT INTO Users (name, password, phone_number, created_at, address, type, email) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, password, phone_number, created_at, address, type, email]
      );
      return result;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }

  // Functin to update User
  static async updateUser(
    id,
    name,
    password,
    phone_number,
    address,
    type,
    email
  ) {
    try {
      const now = new Date();
      const modified_at = format(now, "yyyy-MM-dd HH:mm:ss");
      const [result] = await pool.query(
        `Update Users Set name=?, password=?, phone_number=?, modified_at=?,address=?, type=? where id = ?`,
        [name, password, phone_number, modified_at, address, type, id]
      );
      return result;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }

  static async deleteUser(id) {
    const [result] = await pool.query(`Delete from Users where id = ?`, [id]);
    return result;
  }
}
// Users Tables Ends

module.exports = Users;
