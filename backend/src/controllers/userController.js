const pool = require('../db');
console.log("pool in userController:", pool);

// GET ALL USERS
const getUsers = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        role,
        created_at
      FROM users
      ORDER BY id ASC
    `);

    res.status(200).json({
      success: true,
      users: result.rows
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};


// GET SINGLE USER
const getUserById = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        role,
        created_at
      FROM users
      WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: result.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    });
  }
};


module.exports = {
  getUsers,
  getUserById
};