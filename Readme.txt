Hướng dẫn triển khai và sử dụng
1
Tạo mã QR code: Sử dụng công cụ tạo mã QR để tạo các mã QR chứa URL với thông tin chi tiết về vị trí đỗ xe và cửa vào. Ví dụ:
Mã QR để lưu vị trí đỗ xe: https://viencongnghevienthong.github.io/webtest/index.html?supermarket=BigC&floor=B2&area=H1
Mã QR để tìm xe từ cửa vào: https://viencongnghevienthong.github.io/webtest/find-car.html?entrance=C1-B2
2
Dán mã QR code: Dán các mã QR này ở các khu vực đỗ xe và các cửa vào.
3
Người dùng quét mã QR:
Khi người dùng đỗ xe, họ quét mã QR code để lưu vị trí cùng thông tin chi tiết.
Nếu người dùng quét mã QR code khác trong vòng 24 giờ, họ sẽ nhận được thông báo xác nhận "Bạn muốn đổi khu vực đỗ xe?".
Nếu người dùng chọn "Yes", thông tin mới sẽ được lưu lại.
Nếu người dùng chọn "No", thông tin cũ sẽ được giữ nguyên.
Nếu thời gian từ lúc đỗ xe đến khi quét mã QR code khác vượt quá 24 giờ, thông tin mới sẽ tự động được lưu lại mà không cần xác nhận.
Khi người dùng quét mã QR code tại cửa vào để tìm xe, thông tin vị trí đỗ xe sẽ được hiển thị cùng hình ảnh bản đồ tương ứng với cửa vào và vị trí đỗ xe. Nếu người dùng quét mã tại tầng khác với tầng đã lưu vị trí, thông báo "Bạn đang ở tầng [tầng hiện tại], xe của bạn ở tầng [tầng đã lưu]" sẽ được hiển thị.




