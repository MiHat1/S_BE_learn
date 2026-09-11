import pool from "../configs/db.config.js";

// Get all products
export const findProductsFromDB = async () => {
    const [rows] = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.stock,
        p.created_at,
        c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id ASC
  `);
    return rows;
}

// Get product by id
export const findProductByIdFromDB = async (id) => {
    const [rows] = await pool.query(`
    SELECT 
      p.id,
      p.name,
      p.price,
      p.stock,
      p.created_at,
      c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `, [id]);
    return rows[0] ?? null;
}

export const createProductDB = async (
    name,
    price,
    stock = 0,
    category_id = null
) => {
    const [[{ total }]] = await pool.query(
        "SELECT COUNT(*) AS total FROM products"
    );

    const id = total + 1;

    await pool.query(
        `
    INSERT INTO products (id, name, price, stock, category_id)
    VALUES (?, ?, ?, ?, ?)
    `,
        [id, name, price, stock, category_id]
    );

    return findProductByIdFromDB(id);
};

export const updateProductDB = async (
    id,
    name,
    price,
    stock,
    category_id
) => {
    await pool.query(
        `
    UPDATE products
    SET name = ?, price = ?, stock = ?, category_id = ?
    WHERE id = ?
    `,
        [name, price, stock, category_id, id]
    );

    return findProductByIdFromDB(id);
};

export const deleteProductDB = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM products WHERE id = ?",
        [id]
    );

    return result.affectedRows > 0;
};