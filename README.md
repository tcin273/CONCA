# MASSIMO - WEBSITE ĐẶT MÓN ĂN TRỰC TUYẾN

## Thành viên nhóm
Hồ Thị Tú Trinh 
Nguyễn Thành Công 
Châu Đăng Khoa

## Mô tả chức năng

Massimo là một ứng dụng web thương mại điện tử mượt mà và trực quan dành cho lĩnh vực F&B (Thức ăn nhanh), cung cấp những tính năng cốt lõi sau:

* **Xác thực người dùng:** Hệ thống đăng ký tài khoản mới và đăng nhập bảo mật bằng Session thông qua next-auth.
* **Danh sách thực đơn:** Duyệt, khám phá món ăn phân loại trực quan theo danh mục động (Pizza, Burgers, Pastas...) nhờ kỹ thuật Nested Routing.
* **Chi tiết món ăn:** Xem thông tin chi tiết thành phần, hình ảnh sắc nét, áp dụng logic tùy chọn kích cỡ (Size) tự động cập nhật giá tiền thực tế nhờ Dynamic Routing.
* **Giỏ hàng động:** Đồng bộ trạng thái toàn cục (CartContext), cho phép thêm nhanh món, tăng/giảm số lượng hoặc xóa món trực tiếp realtime.
* **Giả lập đặt hàng (Checkout):** Chặn người dùng chưa đăng nhập, tiếp nhận thông tin giao hàng và lưu trữ lịch sử đơn hàng tạm thời qua mock API.
* **Responsive Design:** Giao diện tối ưu hóa hiển thị chuyên nghiệp, không vỡ bố cục trên cả Desktop, Tablet và Mobile.

## Công nghệ sử dụng

* **Next.js 13+:** Framework React mạnh mẽ sử dụng kiến trúc App Router tối ưu hiệu năng.
* **TypeScript:** Ngôn ngữ tĩnh an toàn kiểu dữ liệu, ngăn ngừa lỗi runtime.
* **Tailwind CSS:** Thiết kế giao diện hiện đại theo tư duy Component.
* **Next-Auth:** Thư viện quản lý Session và xác thực trạng thái đăng nhập.
* **React Context:** Quản lý trạng thái giỏ hàng toàn cục (CartContext) theo thời gian thực.
* **Mock API (JSON):** Xử lý đọc/ghi dữ liệu thông qua API Routes tích hợp sẵn nội bộ.

## Yêu cầu hệ thống

Trước khi bắt đầu, đảm bảo máy tính của bạn đã cài đặt:

* Node.js phiên bản 18.0 trở lên.
* Trình quản lý gói npm (được cài đặt sẵn kèm Node.js).
* Trình duyệt Web hiện đại (Chrome, Edge, Firefox, Safari).

## Hướng dẫn cài đặt và chạy trên localhost

### Bước 1: Clone hoặc tải project

Mở Terminal hoặc Git Bash và chạy lệnh:
git clone [https://github.com/tcin273/CONCA.git](https://github.com/tcin273/CONCA.git)
cd CONCA

### Bước 2: Cài đặt dependencies

Chạy lệnh sau để tải và cài đặt các thư viện phụ thuộc của dự án:
npm install

### Bước 3: Chạy development server

Kích hoạt môi trường Local Server bằng lệnh:
npm run dev

### Bước 4: Mở ứng dụng

Mở trình duyệt web bất kỳ và truy cập đường dẫn: http://localhost:3000
Ứng dụng sẽ tự động tải lại (Hot Reload) bất cứ khi nào bạn tiến hành chỉnh sửa mã nguồn.

## Cấu trúc project

Thư mục gốc CONCA bao gồm:

* Thư mục **public/**: Chứa tài nguyên tĩnh như hình ảnh sản phẩm, ảnh slide, icon.
* Thư mục **src/app/**: Nơi quản lý các trang và định tuyến hệ thống (App Router).
* Thư mục **src/app/api/**: Hệ thống Mock API routes xử lý dữ liệu Auth, Orders, và Contact.
* Thư mục **src/app/cart/**: Giao diện trang giỏ hàng.
* Thư mục **src/app/checkout/**: Giao diện trang xác nhận đặt hàng.
* Thư mục **src/app/contact/**: Giao diện và form liên hệ góp ý.
* Thư mục **src/app/login/**: Giao diện trang đăng nhập tài khoản.
* Thư mục **src/app/menu/**: Định tuyến phân cấp danh mục thực đơn.
* Thư mục **src/app/orders/**: Giao diện xem lịch sử các đơn hàng đã đặt.
* Thư mục **src/app/product/[id]/**: Định tuyến động xem chi tiết từng món ăn.
* Thư mục **src/app/thank-you/**: Giao diện thông báo thanh toán thành công.
* Thư mục **src/components/**: Các thành phần giao diện tái sử dụng như Navbar, Footer, Slider.
* Thư mục **src/context/**: Quản lý State giỏ hàng toàn cục thông qua file CartContext.tsx.
* Thư mục **src/lib/**: Chứa dữ liệu thực đơn mẫu (data.ts) và các hàm tiện ích.

## Các đường dẫn (Endpoint) chính

* Đường dẫn **/**: Trang chủ Massimo hiển thị nhà hàng, Slider banner và món ăn nổi bật.
* Đường dẫn **/menu**: Danh sách tổng hợp các nhóm danh mục món ăn lớn.
* Đường dẫn **/menu/[category]**: Lọc món ăn chi tiết theo loại (Ví dụ: /menu/pizzas).
* Đường dẫn **/product/[id]**: Xem chi tiết, chọn kích cỡ và thêm món ăn vào giỏ.
* Đường dẫn **/cart**: Kiểm tra lại hóa đơn, tăng giảm số lượng sản phẩm trước khi mua.
* Đường dẫn **/checkout**: Điền thông tin giao hàng và xác nhận đơn (Yêu cầu đăng nhập).
* Đường dẫn **/orders**: Xem lại lịch sử toàn bộ danh sách các hóa đơn cá nhân đã mua.

## Xử lý sự sự cố thường gặp (Troubleshooting)

**1. Port 3000 đang bị chiếm dụng bởi ứng dụng khác:**
Nếu cổng 3000 bị trùng, bạn có thể chuyển dự án sang chạy ở cổng khác (Ví dụ: 3001) bằng lệnh:
npm run dev -- -p 3001

**2. Lỗi bộ nhớ Cache hoặc xung đột thư viện:**
Nếu dự án hoạt động không đúng do xung đột gói cài đặt cũ, hãy chạy chuỗi lệnh sau để dọn sạch và cài đặt lại từ đầu:

* Đối với máy Windows (PowerShell): Remove-Item -Recurse -Force node_modules, package-lock.json; npm install
* Đối với máy Linux hoặc macOS: rm -rf node_modules package-lock.json && npm install
* 1.	Link github: https://github.com/tcin273/CONCA.git
  2.	Link deloy vercel: https://massimo-conca.vercel.app/
