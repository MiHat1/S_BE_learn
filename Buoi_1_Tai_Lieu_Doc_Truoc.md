# 📘 Buổi 1 — Tổng quan & Khởi động Dự án Node.js

> **SGroup Backend Basic 2026** · Đọc trước buổi training · Thời gian đọc ước tính: ~45 phút

---

## 🎯 Mục tiêu buổi này

Sau khi đọc tài liệu này và tham gia buổi training, bạn sẽ:

- Hiểu được bức tranh tổng quan về phần mềm và vai trò của Backend
- Biết Node.js và Express là gì, tại sao chúng ta dùng chúng
- Hiểu cấu trúc thư mục và các file cơ bản trong một project Node.js
- Biết cách dùng Git và GitHub trong dự án nhóm
- Chạy được một server Node.js đơn giản đầu tiên

---

## 🛠️ Cài đặt Công cụ Trước Buổi Học

### 1. Node.js (v20 LTS)
- Tải tại: https://nodejs.org/en/download
- Chọn bản **LTS (Long Term Support)** — hiện tại là v20.x
- Sau khi cài, mở terminal và kiểm tra:
```bash
node --version   # Kết quả: v20.x.x
npm --version    # Kết quả: 10.x.x
```

### 2. Git (Nếu chưa có)
- Tải tại: https://git-scm.com/downloads
- Sau khi cài:
```bash
git --version    # Kết quả: git version 2.x.x
```
- Cấu hình thông tin cá nhân:
```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
```

### 3. Visual Studio Code (Optional)
- Tải tại: https://code.visualstudio.com/

### 4. Postman
- Tải tại: https://www.postman.com/downloads/
- Dùng để test API trong suốt khóa học
- Tạo tài khoản miễn phí để lưu collection

### 5. Tạo tài khoản GitHub (Nếu chưa có)
- Nếu chưa có: https://github.com/signup

---

## 1. Tổng quan về Phần mềm

### Phần mềm là gì?
Phần mềm (software) là tập hợp các câu lệnh (code) được viết ra để máy tính thực thi, nhằm giải quyết một bài toán hoặc nhu cầu cụ thể.

Trong thực tế, một ứng dụng thường được chia thành 3 tầng:

```
┌─────────────────────────────────┐
│         Frontend (UI)           │  ← Người dùng nhìn thấy và tương tác
│   Web, Mobile App, Desktop...   │
├─────────────────────────────────┤
│          Backend (API)          │  ← Xử lý logic, nghiệp vụ
│   Node.js, Java, Python...      │
├─────────────────────────────────┤
│          Database               │  ← Lưu trữ dữ liệu
│   PostgreSQL, MySQL, MongoDB... │
└─────────────────────────────────┘
```

## 2. Kiến trúc Client — Server

### Mô hình Client-Server
Đây là mô hình giao tiếp phổ biến nhất trên Internet.

```
Client (Trình duyệt / App)          Server (Backend)
        │                                  │
        │ ── HTTP Request ──────────────► │
        │   GET /api/users                 │
        │                                  │  Xử lý...
        │ ◄── HTTP Response ───────────── │
        │   200 OK + JSON data             │
        │                                  │
```

- **Client** gửi **Request** (yêu cầu) đến Server
- **Server** nhận, xử lý, rồi trả về **Response** (phản hồi)
- Giao tiếp qua giao thức **HTTP/HTTPS**


## 3. Backend làm gì?

Backend là phần "vô hình" mà người dùng không thấy trực tiếp, nhưng là "não" của toàn bộ ứng dụng. Backend chịu trách nhiệm:

| Nhiệm vụ | Ví dụ cụ thể |
|---|---|
| **Xử lý nghiệp vụ** | Khi đặt hàng, kiểm tra hàng còn hàng không, tính giá... |
| **Xác thực người dùng** | Kiểm tra mật khẩu đúng không, user có quyền không... |
| **Tương tác với Database** | Đọc/ghi dữ liệu vào PostgreSQL |
| **Giao tiếp dịch vụ ngoài** | Gửi email, lưu file lên S3, gọi API bên thứ 3 |
| **Bảo mật dữ liệu** | Hash mật khẩu, validate đầu vào |

---

## 4. Node.js là gì?

### Lịch sử nhanh
- **2009**: Ryan Dahl tạo ra Node.js
- Trước đó, JavaScript **chỉ chạy trên trình duyệt**
- Node.js đưa JavaScript ra **ngoài trình duyệt**, cho phép chạy trên server

### Node.js hoạt động thế nào?

Node.js sử dụng **V8 Engine** (engine của Google Chrome) để thực thi JavaScript. Điểm đặc biệt nhất là Node.js xử lý theo mô hình **Non-blocking I/O** (không chặn):

```
// Mô hình truyền thống (Blocking)
Yêu cầu 1 → Chờ xử lý xong → Yêu cầu 2 → Chờ xử lý xong → ...

// Node.js (Non-blocking)
Yêu cầu 1 ──────────────────────────► Trả kết quả khi sẵn sàng
Yêu cầu 2 ──────────────────────────► Trả kết quả khi sẵn sàng
Yêu cầu 3 ──────────────────────────► Trả kết quả khi sẵn sàng
(Xử lý đồng thời nhiều yêu cầu)
```

**Tóm lại**: Node.js = Môi trường chạy JavaScript trên server, nhanh, nhẹ, phù hợp với API.

---

## 5. Express.js là gì?

Node.js có sẵn khả năng tạo HTTP server, nhưng code rất dài dòng. **Express.js** là một **framework** đứng trên Node.js, giúp:

- Định nghĩa **routes** (đường dẫn API) dễ dàng
- Xử lý **middleware** linh hoạt
- Đọc/ghi **request & response** thuận tiện hơn

```javascript
// Không có Express (Node.js thuần — dài dòng)
import http from 'http';
const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: [] }));
  }
});

// Có Express (gọn, rõ ràng)
import express from 'express';
const app = express();
app.get('/users', (req, res) => {
  res.json({ users: [] });
});
```

**Express = Node.js + "bộ khung" giúp code gọn, dễ quản lý hơn.**

---

## 6. Cấu trúc Thư mục

### Vì sao cần cấu trúc thư mục tốt?

Tưởng tượng bạn để tất cả quần áo vào một đống lớn — rất khó tìm. Cấu trúc thư mục tốt giúp:
- Dễ tìm code khi cần sửa
- Dễ làm việc nhóm (ai biết file gì ở đâu)
- Dễ mở rộng khi project lớn lên

### Kiến trúc Layer (phân tầng)

Trong khóa này, chúng trên code theo kiến trúc **4 tầng** rõ ràng:

```
Request từ Client
        ↓
┌─────────────────┐
│    Route        │  Nhận request, định tuyến đến đúng controller
└────────┬────────┘
         ↓
┌─────────────────┐
│   Controller    │  Xử lý request, validate dữ liệu đầu vào, gọi service
└────────┬────────┘
         ↓
┌─────────────────┐
│    Service      │  Logic nghiệp vụ chính (không biết database là gì)
└────────┬────────┘
         ↓
┌─────────────────┐
│   Repository    │  Tương tác trực tiếp với database
└─────────────────┘
        ↓
     Database (PostgreSQL)
```

### Cấu trúc thư mục dự án

```
my-project/
├── src/
│   ├── routes/         # Định nghĩa endpoints
│   ├── controllers/    # Xử lý request/response
│   ├── services/       # Business logic
│   ├── repositories/   # Database queries
│   ├── middlewares/    # Auth, error handler, logger...
│   ├── utils/          # Hàm tiện ích dùng chung
│   └── configs/        # Cấu hình DB, environment...
├── index.js            # Entry point — khởi động server
├── package.json        # Thông tin dự án và dependencies
├── .env                # Biến môi trường (KHÔNG commit lên Git)
└── .gitignore          # Danh sách file/folder Git bỏ qua
```

---

## 7. Giải thích các File Quan trọng

### `package.json`
File "hộ chiếu" của dự án — chứa mọi thông tin quan trọng:

```json
{
  "name": "my-backend",        // Tên dự án
  "version": "1.0.0",          // Phiên bản
  "description": "...",        // Mô tả
  "main": "index.js",          // File chạy đầu tiên
  "type": "module",            // BẮT BUỘC để dùng import/export
  "scripts": {
    "start": "node index.js",  // npm start → chạy production
    "dev": "nodemon index.js"  // npm run dev → chạy development (tự reload)
  },
  "dependencies": {            // Các thư viện cần thiết để CHẠY
    "express": "^4.18.2"
  },
  "devDependencies": {         // Thư viện CHỈ dùng khi phát triển
    "nodemon": "^3.0.1"
  }
}
```

### `package-lock.json`
- Tự động tạo ra khi chạy `npm install`
- Ghi lại **chính xác phiên bản** của mọi thư viện (kể cả dependency của dependency)
- **Mục đích**: Đảm bảo mọi người trong team cài đúng cùng một phiên bản
- **Quy tắc**: Commit file này lên Git, không chỉnh tay

### `node_modules/`
- Thư mục chứa toàn bộ code của các thư viện bên thứ ba
- **Không bao giờ commit lên Git** (rất nặng, hàng trăm MB)
- Khi clone project về, chạy `npm install` để tạo lại
- **Bắt buộc thêm vào `.gitignore`**

### `.env`
- Chứa **biến môi trường** — thông tin nhạy cảm và cấu hình theo môi trường
- **Không bao giờ commit lên Git** (chứa mật khẩu, secret key!)

```bash
# Ví dụ file .env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydb
DB_USER=admin
DB_PASSWORD=supersecretpassword
JWT_SECRET=my-jwt-secret-key
```

- Thường có file `.env.example` (đã xóa giá trị nhạy cảm) để hướng dẫn cấu hình:

```bash
# .env.example — file này ĐƯỢC commit lên Git
PORT=3000
DB_HOST=
DB_PORT=5432
DB_NAME=
DB_USER=
DB_PASSWORD=
JWT_SECRET=
```

### `.gitignore`
- Liệt kê những file/folder Git sẽ bỏ qua, không track
- Quan trọng để không vô tình push code nhạy cảm

```gitignore
# Dependencies
node_modules/

# Environment variables
.env
```

---

## 8. npm là gì?

**npm** = **N**ode **P**ackage **M**anager — trình quản lý thư viện cho Node.js.

### npm hoạt động thế nào?
npm kết nối đến một kho lưu trữ khổng lồ (npmjs.com) gồm hơn 2 triệu thư viện mã nguồn mở. Bạn có thể dùng lại code của cộng đồng thay vì tự viết từ đầu.

### Các lệnh npm thường dùng

```bash
# Khởi tạo project mới (tạo package.json)
npm init -y

# Cài thư viện (lưu vào dependencies)
npm install express
npm install express pg dotenv bcrypt jsonwebtoken multer

# Cài thư viện chỉ dùng khi dev (lưu vào devDependencies)
npm install --save-dev nodemon

# Cài tất cả dependencies trong package.json
npm install

# Xóa một thư viện
npm uninstall ten-thu-vien

# Chạy script trong package.json
npm run dev
npm start
```

### Tại sao dùng npm?
- **Tái sử dụng**: Không phải tự viết mọi thứ từ đầu
- **Cộng đồng**: Thư viện được nhiều người test và maintain
- **Quản lý phiên bản**: Dễ update, dễ rollback

---

## 9. Ôn tập Git — Các lệnh Cơ bản

### Git là gì?
Git là hệ thống **quản lý phiên bản** (Version Control System). Nó giúp:
- Lưu lại lịch sử thay đổi của code
- Làm việc nhóm mà không bị conflict code
- Quay lại phiên bản cũ khi cần

### Các lệnh Git hay dùng

```bash
# ===== KHỞI TẠO =====
git init                          # Khởi tạo repo mới trong thư mục hiện tại
git clone <url>                   # Sao chép repo từ GitHub về máy

# ===== XEM TRẠNG THÁI =====
git status                        # Xem file nào đã thay đổi
git log --oneline                 # Xem lịch sử commit (gọn)
git diff                          # Xem thay đổi chưa stage

# ===== LƯU THAY ĐỔI =====
git add .                         # Stage tất cả thay đổi
git add src/index.js              # Stage file cụ thể
git commit -m "feat: add user route"  # Commit với message

# ===== BRANCH =====
git branch                        # Xem danh sách branch
git branch feature/user-module    # Tạo branch mới
git checkout feature/user-module  # Chuyển sang branch
git checkout -b feature/user-module # Tạo và chuyển luôn

# ===== ĐỒNG BỘ VỚI GITHUB =====
git pull origin main              # Lấy code mới nhất từ remote
git push origin feature/user-module  # Đẩy branch lên remote
git fetch                         # Lấy thông tin remote nhưng không merge

# ===== MERGE =====
git merge feature/user-module     # Merge branch vào branch hiện tại
```

### Quy ước đặt tên Commit Message

Trong khóa này, chúng ta dùng **Conventional Commits**:

```
<type>: <mô tả ngắn>

Ví dụ:
feat: add user registration endpoint
fix: resolve null pointer in auth middleware
docs: update README with setup instructions
refactor: extract validation logic to utils
chore: add nodemon to devDependencies
```

| Type | Ý nghĩa |
|---|---|
| `feat` | Thêm tính năng mới |
| `fix` | Sửa bug |
| `docs` | Thay đổi tài liệu |
| `refactor` | Refactor code (không thêm feature, không fix bug) |
| `chore` | Công việc lặt vặt (cài thư viện, sửa config...) |

---

## 10. Git Workflow trong Dự án Nhóm

### Quy trình làm việc (Git Flow đơn giản)

```
main ─────────────────────────────────────────────────►
       │                              ▲
       │  git checkout -b feature/xxx │  Pull Request
       ▼                              │
feature/xxx ──── commit ──── commit ──┘
```

**Quy tắc vàng**: **Không bao giờ commit thẳng vào `main`!**

### Luồng làm việc hàng ngày

```bash
# 1. Bắt đầu ngày mới — lấy code mới nhất
git checkout main
git pull origin main

# 2. Tạo branch cho tính năng đang làm
git checkout -b feature/ten-tinh-nang

# 3. Code... code... code...

# 4. Lưu thay đổi
git add .
git commit -m "feat: mô tả thay đổi"

# 5. Push branch lên GitHub
git push origin feature/ten-tinh-nang

# 6. Tạo Pull Request trên GitHub
#    → Mentor review code → Approve → Merge vào main
```

### Pull Request (PR) là gì?
Pull Request là cơ chế trên GitHub để:
- Yêu cầu merge code từ branch của bạn vào `main`
- Mentor/teammate review code trước khi merge
- Thảo luận, góp ý, sửa code ngay trên PR

**Quy tắc PR trong khóa này:**
- Tiêu đề PR: rõ ràng, mô tả đúng thay đổi
- Bắt buộc có ít nhất 1 người review (mentor)
- Không tự merge PR của mình

---

## 📝 Tự kiểm tra — Bạn đã sẵn sàng chưa?

Trước buổi training, hãy đảm bảo bạn trả lời được các câu hỏi sau:

- [ ] Client-Server là gì? Client giao tiếp với Server bằng cách nào?
- [ ] Node.js là gì? Khác JavaScript trên browser ở điểm nào?
- [ ] Express là gì? Tại sao cần Express thay vì dùng Node.js thuần?
- [ ] `package.json` và `package-lock.json` khác nhau thế nào?
- [ ] Tại sao `node_modules` và `.env` phải bỏ vào `.gitignore`?
- [ ] `npm install` và `npm install --save-dev` khác nhau thế nào?
- [ ] Tại sao không commit thẳng vào `main`?
- [ ] Pull Request để làm gì?

---
  