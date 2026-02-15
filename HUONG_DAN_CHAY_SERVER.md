# HƯỚNG DẪN KHỞI CHẠY WEBSITE

Để website hoạt động đầy đủ tính năng (hiển thị món ăn từ Server), bạn cần làm theo các bước sau:

### Bước 1: Khởi động Server (Chỉ làm 1 lần khi mở máy)
1. Mở Terminal trong VS Code bằng cách nhấn tổ hợp phím **Ctrl + `** (dấu huyền cạnh số 1).
2. Gõ lệnh sau rồi nhấn Enter:
   ```bash
   npm start
   ```
3. Khi thấy dòng chữ hiện ra như sau là thành công:
   ```
   Resources
   http://localhost:3000/products
   ```

### Bước 2: Xem Website
- Mở file `index.html` hoặc `MENU.HTML` bằng Live Server như bình thường.
- Dữ liệu món ăn sẽ được lấy từ file `db.json`.

---
⚠ **LƯU Ý QUAN TRỌNG:**
- KHÔNG tắt cửa sổ Terminal đang chạy Server. Nếu tắt, web sẽ không lấy được dữ liệu.
- Nếu muốn dừng Server, bấm **Ctrl + C** trong Terminal rồi chọn Y.
