import express from "express";
import { userController } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema, updateUserSchema } from "../validations/user.validation.js";
import { verifyToken, authorizeRole } from "../middlewares/auth.middeware.js";

const router = express.Router();

/**
 * Luồng xử lý request có bảo vệ:
 *   Request → verifyToken (Xác thực danh tính) → authorizeRole (Kiểm tra quyền) → Controller
 *
 * - GET  /users       : admin + user đều được đọc (cần đăng nhập)
 * - GET  /users/:id   : admin + user đều được đọc (cần đăng nhập)
 * - POST /users       : chỉ admin mới được tạo mới
 * - PATCH /users/:id  : chỉ admin mới được cập nhật
 * - DELETE /users/:id : chỉ admin mới được xóa
 */

router.get("/users", verifyToken, authorizeRole("admin", "user"), userController.getAll);

router.get("/users/:id", verifyToken, authorizeRole("admin", "user"), userController.getById);

router.post("/users", verifyToken, authorizeRole("admin"), validate(createUserSchema), userController.create);

router.patch("/users/:id", verifyToken, authorizeRole("admin"), validate(updateUserSchema), userController.update);

router.delete("/users/:id", verifyToken, authorizeRole("admin"), userController.delete);

export default router;
