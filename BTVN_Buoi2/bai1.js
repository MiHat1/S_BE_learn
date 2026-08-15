// **Đề bài:**
// Cho một mảng dữ liệu mô phỏng danh sách người dùng trong hệ thống:
// ```javascript
// const users = [
//   { id: 1, name: 'Tùng', age: 25, role: 'admin', isActive: true },
//   { id: 2, name: 'An', age: 20, role: 'user', isActive: true },
//   { id: 3, name: 'Bình', age: 22, role: 'user', isActive: false },
// ];
// ```

// **Yêu cầu:**
// 1. Viết hàm `getActiveUsers(users)`: Trả về danh sách những người đang ở trạng thái active (`isActive: true`). *(Gợi ý: Dùng `.filter()`)*
// 2. Viết hàm `getNames(users)`: Trả về một mảng CHỈ chứa tên của mọi người, kết quả mong muốn: `['Tùng', 'An', 'Bình']`. *(Gợi ý: Dùng `.map()`)*
// 3. Viết hàm `printUserInfo(user)`: Nhận vào MỘT user object, in ra màn hình chuỗi theo định dạng `"Tên: Tùng - Tuổi: 25"`. **Bắt buộc phải dùng Destructuring** ở tham số truyền vào hàm.

// Sau khi viết xong, gọi thử các hàm trên và `console.log` ra để xem kết quả.

const users = [
    { id: 1, name: 'Tùng', age: 25, role: 'admin', isActive: true },
    { id: 2, name: 'An', age: 20, role: 'user', isActive: true },
    { id: 3, name: 'Bình', age: 22, role: 'user', isActive: false },
];
//1
function getActiveUsers(users) {
    return users.filter(i => i.isActive === true);
}
console.log(getActiveUsers(users));

//2
function getNames(users) {
    return users.map(i => i.name);
}
console.log(getNames(users));

//3
function printUserInfo(user) {
    let { name, age } = user;
    console.log("Ten: " + name + " - Tuoi: " + age);
} 
printUserInfo(users[1]);