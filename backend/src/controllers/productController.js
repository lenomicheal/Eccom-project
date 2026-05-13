const pool = require('../db');

const getProducts = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.description,
        v.price,
        v.size,
        v.color,
        i.image_url
      FROM products p
      LEFT JOIN product_variants v
      ON p.id = v.product_id
      LEFT JOIN product_images i
      ON p.id = i.product_id
    `);

    res.json(result.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Server error'
    });
  }
};

module.exports = {
  getProducts
};