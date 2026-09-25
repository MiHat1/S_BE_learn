import pool from '../database.js';
// Lưu trữ danh sách Refresh Token hợp lệ (In-Memory Store cho Repository)
const refreshTokensStore = new Set();

export const authRepository = {
    async findByEmail(email) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    },

    // Create user
    async create(email, password) {
        const [result] = await pool.query(
            "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
            [email, password, "user"]
        );
        return result.insertId;
    },

    // Tìm user theo id 
    async findById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    },

    // Lưu Refresh Token vào storage
    async saveRefreshToken(token) {
        refreshTokensStore.add(token);
        return token;
    },

    // Kiểm tra Refresh Token có tồn tại/hợp lệ trong storage không
    async findRefreshToken(token) {
        return refreshTokensStore.has(token);
    },

    // Xóa/Thu hồi Refresh Token khỏi storage khi Logout
    async removeRefreshToken(token) {
        return refreshTokensStore.delete(token);
    }
};
