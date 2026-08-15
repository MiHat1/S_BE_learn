// ## Bài 2 (Lưu file: `bai2.js`)

// **Đề bài:**
// Cho một hàm giả lập thao tác lấy dữ liệu từ Server bị trễ mất 2 giây:
// ```javascript
// const layDuLieu = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Đây là dữ liệu bí mật của hệ thống");
//     }, 2000);
//   });
// };
// ```

// **Yêu cầu:**
// 1. Viết một hàm có tên `async function chayThu()` để gọi hàm `layDuLieu()` ở trên.
// 2. Bắt buộc phải dùng từ khóa `await` để chờ lấy được chuỗi kết quả rồi mới `console.log` kết quả đó ra màn hình.
// 3. Chạy lệnh `node bai2.js`. Nếu bạn thấy máy tính "đứng im" 2 giây rồi mới in ra dòng chữ *"Đây là dữ liệu bí mật của hệ thống"* thì bạn đã thành công!

// ---

const layDuLieu = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Đây là dữ liệu bí mật của hệ thống");
        }, 2000);
    });
};
async function chayThu() {
    const ketQua = await layDuLieu();
    console.log(ketQua);
}
chayThu();