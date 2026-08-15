// **Đề bài:**
// Đi làm Backend, việc code bị sập (crash) là chuyện cấm kỵ. Chúng ta phải học cách tự bắt lỗi.

// **Yêu cầu:**
// 1. Viết một hàm `chiaHaiSo(a, b)`. 
//    - Nếu `b === 0`, hãy chủ động ném ra một lỗi bằng lệnh: `throw new Error("Không thể chia cho 0 được bạn êi!");`
//    - Nếu hợp lệ, trả về kết quả phép tính `a / b`.
// 2. Viết một hàm `async function main()`. Bên trong hàm này, gọi hàm `chiaHaiSo(10, 0)`.
// 3. Bắt buộc phải bọc thao tác gọi hàm bên trên bằng khối `try/catch`.
// 4. Trong phần `catch`, hãy `console.log` ra đoạn tin nhắn báo lỗi (tức là dòng chữ *"Không thể chia cho 0..."*), thay vì để hệ thống quăng dòng chữ báo lỗi đỏ lòm và sập chương trình.

// ---

function chiaHaiSo(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject(new Error("Không thể chia cho 0 dc bn ei!"));
        } else {
            resolve(a / b);
        }
    });
}
async function main() {
    try {
        const ketQua = await chiaHaiSo(10, 0);
        console.log(ketQua);
    }
    catch (error) {
        console.log(error.message);
    }
}

main();