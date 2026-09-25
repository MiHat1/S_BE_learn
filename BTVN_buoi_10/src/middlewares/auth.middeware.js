import jwt from "jsonwebtoken";
import { UnauthorizedError, ForbiddenError } from "../utils/error.helper.js";


export const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("khong phai authorization bearer");
  }

  const accessToken = authorizationHeader.split(" ")[1];

  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthorizedError("access token khong hop le");
  }
};

/**
 * Middleware 2: Phân quyền (Authorization)
 * - Đọc req.user đã được verifyToken gán ở bước trên
 * - Kiểm tra role của user có nằm trong danh sách được phép không
 * - Nếu không đủ quyền → 403 Forbidden
 * - Nếu đủ quyền → gọi next() tiếp tục vào Controller
 *
 * Cách dùng: authorizeRole("admin") hoặc authorizeRole("admin", "user")
 *
 * @param {...string} allowedRoles - Các role được phép truy cập route
 */
export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      throw new ForbiddenError(
        `k có quyền thực hiện req!`
      );
    }

    next();
  };
};
