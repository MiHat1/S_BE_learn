import jwt from "jsonwebtoken";
import brcypt from "bcrypt";
import { authRepository } from "../repositories/auth.repository.js";
import { BadRequestError, UnauthorizedError, ConflictError } from "../utils/error.helper.js";

export const authService = {
  createAccessToken(user) {
    return jwt.sign(
      { userId: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
  },

  // Tạo Refresh Token (hết hạn sau 7 ngày).
  createRefreshToken(user) {
    return jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
  },

  // Register
  async register(email, password) {
    const existingUser = await authRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictError("Email đã tồn tại");
    }
    const hashedPassword = await brcypt.hash(password, 10);
    await authRepository.create(email, hashedPassword);
    return { message: "Đăng ký thành công" };
  },

  // Login
  async login(email, password) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Email hoặc mật khẩu không chính xác");
    }
    const isMatch = await brcypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Email hoặc mật khẩu không chính xác");
    }

    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);

    // Lưu Refresh Token vào storage thông qua Repository
    await authRepository.saveRefreshToken(refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  },

  // Cấp mới Access Token bằng Refresh Token
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new BadRequestError("Refresh token là bắt buộc");
    }

    // 1. Kiểm tra Refresh Token trong storage (đã bị thu hồi/đăng xuất chưa)
    const exists = await authRepository.findRefreshToken(refreshToken);
    if (!exists) {
      throw new UnauthorizedError("Refresh token đã bị thu hồi hoặc không tồn tại");
    }

    // 2. Verify token xem có đúng chữ ký và chưa hết hạn không
    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw new UnauthorizedError("Refresh token không hợp lệ hoặc đã hết hạn");
    }

    // 3. Tìm thông tin user từ database để tạo Access Token mới
    const user = await authRepository.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedError("Người dùng không tồn tại");
    }

    // 4. Tạo Access Token mới
    const newAccessToken = this.createAccessToken(user);

    return {
      accessToken: newAccessToken,
    };
  },

  // Đăng xuất (xóa / thu hồi Refresh Token)
  async logout(refreshToken) {
    if (!refreshToken) {
      throw new BadRequestError("Refresh token là bắt buộc");
    }

    // Thu hồi Refresh Token khỏi storage trong Repository
    await authRepository.removeRefreshToken(refreshToken);

    return { message: "Đăng xuất thành công" };
  },
};

