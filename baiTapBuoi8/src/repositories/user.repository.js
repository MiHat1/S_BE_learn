import pool from "../configs/db.config.js";

export const getAllUsersFromDB = async () => {
    const [rows] = await pool.query(`
    SELECT
      id,
      full_name,
      email,
      role,
      is_active,
      password_hash,
      created_at
    FROM users
    ORDER BY id ASC
  `);

    return rows;
};

export const getUserByIdFromDB = async (id) => {
    const [rows] = await pool.query(
        `
    SELECT
      id,
      full_name,
      email,
      role,
      is_active,
      password_hash,
      created_at
    FROM users
    WHERE id = ?
    `,
        [id]
    );

    return rows[0] ?? null;
};

export const getUserByEmailFromDB = async (email) => {
    const [rows] = await pool.query(
        `
    SELECT
      id,
      full_name,
      email,
      role,
      is_active,
      password_hash,
      created_at
    FROM users
    WHERE email = ?
    `,
        [email]
    );

    return rows[0] ?? null;
};

export const createUserInDB = async ({
    fullName,
    email,
    role = "user",
    password,
}) => {
    const [result] = await pool.query(
        `
    INSERT INTO users
      (full_name, email, role, is_active, password_hash)
    VALUES (?, ?, ?, ?, ?)
    `,
        [fullName, email, role, true, password]
    );

    return getUserByIdFromDB(result.insertId);
};
