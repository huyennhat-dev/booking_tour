
import DefaultLayout from '../../layout/DefaultLayout';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { startTransition, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { TOUR_TYPE } from '../../types';
import { Image, Pagination, Tooltip } from 'antd';
import tourApi from '../../apis/tourApi';
import provinces from '../../assets/js/province';


const mockData = {
  "statusCode": 200,
  "page": 1,
  "data": [
    {
      "id": 1,
      "tour_name": "Tour du lịch Trung Quốc 7 ngày 30/4 khởi hành từ TP.HCM – Thượng Hải – Ô Trấn – Hàng Châu – Bắc Kinh",
      "initial_price": 31238000,
      "departure_day": "2024-05-03",
      "end_tour_day": "2024-05-06",
      "promotional": 0.2,
      "destination": "gia-lai",
      "vehicle": "train",
      "photos": "http://res.cloudinary.com/huyennhat/image/upload/v1714507741/images/booking_tour/il9ydehnjzanslnta2m1.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714507744/images/booking_tour/vhu4p6njjm5yzfppz1rf.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714507750/images/booking_tour/gr6eyq3n3tyxrwweklnc.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714507755/images/booking_tour/c9qhyvfjkgnoyf7jwgbc.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714507759/images/booking_tour/epkzke0pnki2ibjksbst.jpg",
      "highlight": "<ul><li><strong>Khám phá Thượng Hải tráng lệ, sầm uất với những công trình đồ sộ, độc đáo.</strong></li><li><strong>Ngắm nhìn vẻ đẹp thị trấn cổ Ô Trấn đã có từ 1.300 năm.</strong></li><li><strong>Ngồi thuyền thưởng ngoạn cảnh đẹp Tây Hồ.</strong></li><li><strong>Ghé thăm Tô Châu, Vô Tích, tham quan những công trình nổi tiếng tại đây.</strong></li><li><strong>Đến với Khai Phong Phủ, tòa án nổi tiếng thời Tống với vị quan liêm khiết Bao Thanh Thiên.</strong></li><li><strong>Check-in tại Vạn Lý Trường Thành, công trình quân sự, kỳ quan nổi tiếng trên thế giới.</strong></li><li><strong>Tham quan Di Hòa Viên, cung điện mùa hè của Từ Hy Thái Hậu với vô vàn điểm tham quan thú vị.</strong></li></ul>",
      "introduce": "<h3><strong>ĐÊM 01 | TP.HCM - TRÙNG KHÁNH (ĂN NHẸ TRÊN MÁY BAY)</strong></h3><p>&nbsp;</p><p><strong>Tối</strong>: Đến giờ hẹn, trưởng phòng của <a href=\"https://www.vietnambooking.com/\"><strong>Vietnam Booking</strong></a> sẽ đến đón khách tại sân bay Tân Sơn Nhất, ga quốc tế. Trưởng đoàn hỗ trợ quý khách làm thủ tục xuất cảnh, chuyến bay <strong>CA408 SGN-CKG</strong> sẽ đưa đoàn đến với Trùng Khánh.</p><h3><strong>NGÀY 01 | TRÙNG KHÁNH - THƯỢNG HẢI - THÁP TRUYỀN HÌNH DƯƠNG MINH CHÂU - PHỐ ĐI BỘ NAM KINH - MIẾU THÀNH HOÀNG - SÔNG HOÀNG PHỐ (ĂN TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Sau khi đến <strong>Trùng Khánh</strong>, đoàn tiếp tục ngồi tiếp chuyến bay <strong>CA4131 08:00-10:35</strong> để đến <strong>Thượng Hải</strong>. Đó là một trong những khu đô thị phồn hoa, nổi tiếng của Trung Quốc. Nơi đây sở hữu những công trình kiến trúc châu Âu hiện đại, độc đáo với sông Hoàng Phố êm đềm.</p><p><strong>Trưa</strong>: Đoàn dùng bữa với những món ăn thơm ngon. Sau đó, <strong>tour du lịch Trung Quốc 7 ngày 30/4</strong> sẽ đưa đoàn đến với <strong>Tháp truyền hình Dương Minh Châu</strong><i> (không lên tháp).</i></p><ul><li>Công trình này là tháp truyền hình cao nhất châu Á và đứng thứ 3 thế giới.</li></ul><p><strong>Chiều</strong>: Hành trình du lịch tiếp tục đưa đoàn đến với:</p><ul><li><strong>Phố đi bộ Nam Kinh</strong></li><li><strong>Miếu Thành Hoàng</strong></li><li><strong>Ngồi thuyền thưởng ngoạn cảnh sắc</strong> <strong>sông Hoàng Phố</strong><i> (chi phí tự túc)</i>.</li></ul><p><strong>Tối</strong>: Đoàn dùng bữa tối với thực đơn hấp dẫn và tự do hoạt động, khám phá nhịp sống sầm uất về đêm tại đây. Đoàn nghỉ đêm tại <strong>Thượng Hải</strong>.</p><h3><strong>NGÀY 02 | (THƯỢNG HẢI - Ô TRẤN - HÀNG CHÂU - TÂY HỒ (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Đoàn dùng bữa sáng tại khách sạn rồi làm thủ tục trả phòng. Trong <strong>tour du lịch Trung Quốc 7 ngày 30/4</strong> ngày thứ 2, xe đưa đoàn đến với<strong> Ô Trấn</strong>.</p><ul><li>Nơi đây nổi tiếng với những cảnh đẹp nhuốm màu thời gian cổ kính. Thị trấn này đã có tuổi đời hơn 1.300 năm. Vùng đất này gắn liền với nhiều biến động về lịch sử, văn hóa Trung Quốc. UNESCO đã từng công nhận nơi đây là Di sản văn hóa thế giới.</li></ul><p><strong>Trưa</strong>: Đoàn dùng bữa tại nhà hàng.</p><p><strong>Chiều</strong>: Hành trình tham quan tiếp tục đưa quý khách đến với <strong>Hàng Châu</strong>. Trên đường đi, xe sẽ dừng lại để quý khách thưởng thức trà Bạch Cúc nổi tiếng của Trung Quốc. Đến Hàng Châu, quý khách thưởng ngoạn cảnh sắc <strong>Tây Hồ</strong>.</p><ul><li>Đây được xem là Venice của phương Đông với cảnh sắc đầy hữu tình và thơ mộng. Chiếc thuyền nhỏ xuôi theo dòng nước, đưa quý khách tham quan Trường Kiều, Quả Sơn, Tam Đàn Ấn Nguyệt, Tô Đê Bạch Đê, Hoa Cảng Quan Ngư (bên ngoài). Điểm đến này gắn liền với những câu chuyện về Lương Sơn Bá - Chúc Anh Đài, Thanh Xà - Bạch Xà, nhà thơ Lý Bạch…</li></ul><p><strong>Tối</strong>: Đoàn dùng bữa tối tại nhà hàng rồi về khách sạn <strong>Hàng Châu</strong> nhận phòng, nghỉ ngơi. Quý khách có thể tự do khám phá Hàng Châu hoặc đăng ký xem show biểu diễn của Tống Thành Thiên Cổ Tình <i>(chi phí tự túc 1.225.000 VND/khách)</i>.</p><h3><strong>NGÀY 03 | HÀNG CHÂU - TÔ CHÂU - HÀN SƠN TỰ - VƯỜN SƯ TỬ LÂM - BẢO TÀNG TƠ LỤA - VÔ TÍCH (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Quý khách dùng bữa tại khách sạn rồi làm thủ tục trả phòng để đến với <strong>Tô Châu</strong>.</p><p><strong>Trưa</strong>: Đoàn dùng bữa rồi tiếp tục hành trình tham quan trong<strong> tour du lịch Trung Quốc 7 ngày 30/4</strong>. Xe đưa đoàn đi tham quan:</p><ul><li><strong>Hàn Sơn Tự</strong>. Ngôi chùa cổ có vị trí tọa lạc tại phía Tây của thị trấn Phong Kiều.</li><li><strong>Vườn Sư Tử Lâm</strong>. Đây là một trong những khu vườn tiêu biểu của nghệ thuật nhà vườn cổ. Quý khách sẽ có cơ hội thưởng thức những tác phẩm nghệ thuật kiến trúc độc đáo, mang đậm dấu ấn Trung Hoa.</li><li><strong>Bảo tàng tơ lụa Tô Châu</strong>. Đoàn tìm hiểu về tơ lụa của vùng đất này. Tại đây cất giữ nhiều tài liệu, hiện vật về quy trình sản xuất lụa từ thời cổ xưa cho đến ngày nay.</li></ul><p><strong>Chiều</strong>: Hành trình du lịch tiếp tục đưa đoàn đến với <strong>Vô Tích</strong>, tại đây, quý khách tham quan:</p><ul><li><strong>Khu phong cảnh Thái Hồ.</strong></li><li><strong>Công viên Trường Quảng Khê.</strong></li><li><strong>Tiệm ngọc trai.</strong></li><li><strong>Bảo tàng ấm trà Tử Sa.</strong></li></ul><p><strong>Tối</strong>: Đoàn dùng bữa tối tại Vô Tích rồi về khách sạn nhận phòng, nghỉ ngơi. Đoàn nghỉ đêm tại <strong>Vô Tích</strong>.</p><h3><strong>NGÀY 04 | VÔ TÍCH - TRỊNH CHÂU - KHAI PHONG PHỦ (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Quý khách dùng điểm tâm sáng tại khách sạn rồi làm thủ tục trả phòng. Sau đó, xe và hướng dẫn viên sẽ đưa đoàn đến trạm tàu cao tốc để đi <strong>Trịnh Châu</strong>.</p><p><strong>Trưa</strong>: Đoàn dùng bữa tại nhà hàng Trịnh Châu. Sau đó, <strong>tour du lịch Trung Quốc 7 ngày 30/4</strong> đưa đoàn đi tham quan:</p><ul><li><strong>Khai Phong Phủ</strong>. Nơi đây từng là tòa án nổi tiếng thời nhà Tống với vị quan thanh liêm, chính trực - Bao Công. Ông là người liêm khiết, luôn dám đấu tranh với thế lực đen tối, tham nhũng, bảo vệ người dân. Nếu đã từng xem qua bộ phim tuổi thơ này, hẳn bạn sẽ cảm thấy quen thuộc với nơi đây.</li></ul><p><strong>Tối</strong>: Đoàn dùng bữa tại nhà hàng địa phương. Quý khách nghỉ đêm tại <strong>Trịnh Châu</strong>.</p><h3><strong>NGÀY 05 | TRỊNH CHÂU - BẮC KINH - VẠN LÝ TRƯỜNG THÀNH - SÂN VẬN ĐỘNG TỔ CHIM (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Quý khách dùng điểm tâm sáng tại khách sạn rồi trả phòng. Trong<strong> tour du lịch Trung Quốc 7 ngày 30/4</strong> ngày thứ 5 này, xe đưa đoàn đến <strong>Bắc Kinh</strong>.</p><p><strong>Trưa</strong>: Sau khi đến Bắc Kinh, quý khách dùng bữa trưa rồi tham quan <strong>Vạn Lý Trường Thành</strong>.</p><ul><li>Đây là một trong những kỳ quan tiêu biểu của thế giới. Công trình gây ấn tượng mạnh bởi thiết kế độc đáo, kỳ vĩ. Ngày xưa, Trường Thành được xây dựng với mục đích phân chia ranh giới, chống giặc ngoại xâm. Hiện tại, công trình này là một di tích lịch sử, văn hóa đại diện cho tinh thần của người Trung Hoa.</li></ul><p><strong>Chiều</strong>: Xe đưa đoàn đi tham quan bên ngoài <strong>sân vận động Tổ Chim</strong>. Đây là nơi đã đã từng diễn ra Thế vận hội Bắc Kinh năm 2008.</p><p><strong>Tối</strong>: Đoàn di chuyển đi dùng bữa tối rồi về khách sạn nghỉ ngơi. Đoàn nghỉ đêm tại <strong>Bắc Kinh</strong>.</p><h3><strong>NGÀY 06 | BẮC KINH - TỬ CẤM THÀNH/CUNG VƯƠNG PHỦ - CỬA HÀNG ĐỒNG NHÂN ĐƯỜNG (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Quý khách dùng bữa tại khách sạn. Trong <strong>tour du lịch Trung Quốc 7 ngày 30/4</strong> ngày thứ 6, xe đưa đoàn đi tham quan các điểm nổi tiếng tại Bắc Kinh. Chẳng hạn như:&nbsp;</p><ul><li><strong>Tử Cấm Thành (Cố Cung)</strong>. Công trình đã trải qua 24 triều vua từ nhà Minh tới nhà Thanh. Các cung điện tại đây được xây dựng từ thời vua Vĩnh Lạc. Ông là vị hoàng đế kiệt xuất của nhà Minh.</li></ul><p><i><strong>Lưu ý</strong>: Vé sẽ được mua online, nếu không đặt được vé thì sẽ thay bằng điểm tham quan khác là Cung Vương Phủ. Nếu không đi Cố Cung, đồng nghĩa với việc sẽ không đi Thiên An Môn.</i></p><ul><li><strong>Cung Vương Phủ</strong> còn được gọi là Phủ Hòa Thân. Tính đến nay, công trình đã có tuổi đời hơn 2 thế kỷ.</li></ul><p><strong>Trưa</strong>: Quý khách dùng bữa trưa tại nhà hàng địa phương.</p><p><strong>Chiều</strong>: Tiếp tục chuyến tham quan, xe sẽ đưa đoàn đến <strong>cửa hàng thuốc bắc (Đồng Nhân Đường)</strong>.</p><ul><li>Đây là nơi kê toa thuốc cho triều đình xưa với các sản phẩm trị bỏng nổi tiếng của Bảo Phú Linh.</li></ul><p><strong>Tối</strong>: Đoàn dùng cơm tối và tự do khám phá Bắc Kinh về đêm. Đoàn nghỉ đêm tại <strong>Bắc Kinh</strong>.</p><h3><strong>NGÀY 07 | BẮC KINH - DI HÒA VIÊN - TP.HCM (ĂN SÁNG/TRƯA)</strong></h3><p><strong>Sáng</strong>: Đoàn dùng bữa sáng tại khách sạn rồi làm thủ tục trả phòng. Tiếp đến, đoàn sẽ đến với <strong>Di Hòa Viên</strong>, đây là cung điện mùa hè của Từ Hy Thái Hậu. Tại đây, quý khách sẽ tham quan:</p><ul><li><strong>Hồ Côn Minh</strong></li><li><strong>Núi Vạn Thọ</strong></li><li><strong>Hành lang đi bộ dài nhất thế giới.</strong></li><li><strong>Cùng một số công trình xa hoa khác.</strong></li></ul><p><strong>Trưa</strong>: Quý khách dùng bữa tại nhà hàng địa phương rồi tham quan, mua sắm tại <strong>Ngọc Phỉ Thúy</strong></p><p>Đến giờ hẹn, đoàn di chuyển ra sân bay để làm thủ tục xuất cảnh. Chuyến bay <strong>CA903 20:45 - 01:10+1</strong> đưa đoàn về lại TP.HCM. <strong>Tour du lịch Trung Quốc 7 ngày 30/4</strong> đến đây là kết thúc, HDV chào tạm biệt đoàn và hẹn gặp lại quý khách trong những <a href=\"https://www.vietnambooking.com/du-lich-nuoc-ngoai.html\"><strong>tour du lịch nước ngoài</strong></a> khác.</p>",
      "createdAt": "2024-04-30T17:44:31.000Z",
      "id_staff": 12,
      "id_manager": 1,
      "insurance": true,
      "meal": true,
      "max_user": 10,
      "point_rating": 5,
      "updatedAt": "2024-04-30T17:44:31.000Z",
      "staffData": {
        "id": 12,
        "id_account": 40,
        "address": "",
        "birthday": "",
        "createdAt": "2024-04-30T15:56:12.000Z",
        "updatedAt": "2024-04-30T15:56:12.000Z",
        "accountData": {
          "id": 40,
          "email": "hoangdz00123@gmail.com",
          "username": "Nguyen Van B",
          "phoneNumber": "0773312827",
          "role": "staff"
        }
      },
      "managerData": {
        "id": 1,
        "id_account": 38,
        "company_name": "VKU",
        "birthday": "",
        "createdAt": "2024-04-30T14:46:40.000Z",
        "updatedAt": "2024-04-30T14:46:40.000Z",
        "accountData": {
          "id": 38,
          "email": "huyennhat.dev@gmail.com",
          "username": "Huy Hoang",
          "phoneNumber": "0123456789",
          "role": "manager"
        }
      }
    },
    {
      "id": 2,
      "tour_name": "Tour Miền Tây 1 ngày Vietnam Booking | Chương trình khám phá miệt vườn dân dã, bình dị",
      "initial_price": 985000,
      "departure_day": "2024-05-24",
      "end_tour_day": "2024-05-31",
      "promotional": 0.1,
      "destination": "ca-mau",
      "vehicle": "plane",
      "photos": "http://res.cloudinary.com/huyennhat/image/upload/v1714509865/images/booking_tour/y2v2joudtlhef12jbwql.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714509869/images/booking_tour/d1yre3rx9yfzmy94k4nm.jpg",
      "highlight": "<ul><li><strong>Chiêm bái chùa Vĩnh Tràng, ngôi chùa cổ nổi tiếng về sự linh thiêng.</strong></li><li><strong>Trải nghiệm cuộc sống dân dã, miệt vườn.</strong></li><li><strong>Thưởng thức đờn ca tài tử.</strong></li><li><strong>Trải nghiệm cảm giác đi đò chèo vô cùng thú vị và hấp dẫn.</strong></li><li><strong>Tham quan lò sản xuất kẹo dừa, lò bánh tráng.</strong></li></ul>",
      "introduce": "<h3><strong>SÁNG | TP.HCM - CHÙA VĨNH TRÀNG - KHÁM PHÁ CÙ LAO</strong></h3><p><strong>6h45 - 7h00</strong> Xe của <a href=\"https://www.vietnambooking.com/\"><strong>Vietnam Booking</strong></a><strong>&nbsp;</strong>sẽ đón quý khách tại địa chỉ <strong>54 Phạm Hồng Thái, Phường Bến Thành, Quận 1&nbsp;</strong>hoặc<strong> 164 Lê Thánh Tôn, Phường Bến Thành, Quận 1</strong>. Sau khi đón đủ khách, <strong>Tour Miền Tây 1 ngày Vietnam Booking</strong> bắt đầu khởi hành. Xe di chuyển theo lộ trình đường cao tốc TP.HCM - Trung Lương.</p><p>Đến với <strong>Mỹ Tho</strong>, xe dừng tại <strong>Mekong Restop</strong> để quý khách ăn sáng <i>(chi phí tự túc)</i>. Quý khách tự do chụp hình, tham quan.</p><p>Sau đó, xe lăn bánh, đưa quý khách đến với:</p><ul><li><strong>Chùa Vĩnh Tràng</strong>. Công trình được xây dựng bởi ông bà Bùi Công Đạt vào giai đoạn thế kỷ XIX. Đây là một di tích kiến trúc nghệ thuật được xếp vào hàng thứ ba trong số mọi kiểu chùa tại đất Nam phần. Ngôi chùa có sự pha trộn hài hòa giữa đường nét châu Âu lẫn châu Á.</li><li>Xe đưa quý khách đến với <strong>cảng du thuyền Mỹ Tho</strong> để lên tàu du lịch sông Tiền, ngắm nhìn bốn cù lao <strong>Long, Lân, Quy, Phụng</strong>. Trên đường đi, tàu sẽ chạy ngang qua các bè nuôi cá dọc sông Tiền và ngắm nhìn cầu Rạch Miễu.</li><li>Đến với <strong>Cù Lao Thới Sơn (cồn Lân)</strong>, quy khách dạo bước trên đường làng, tham quan vườn trái cây sai trĩu quả, lắng nghe đờn ca tài tử và ăn trái cây theo mùa miễn phí.</li><li>Ngồi xuồng chèo len lỏi vào những con rạch nhỏ ngắm nhìn hai hàng dừa nước, cảm nhận vẻ đẹp thiên nhiên miệt vườn. Đến đây, quý khách sẽ có cơ hội tham quan trại nuôi ong mật, thưởng thức trà mật ong và rượu chuối hột…</li><li>Đoàn trở về thuyền lớn xuôi dòng sông Tiền, đến với tỉnh <strong>Rạch Tân Thạch (Bến Tre)</strong> để tham quan lò kẹo dừa - đặc sản Bến Tre, lò bánh tráng…</li></ul><h3><strong>TRƯA | BẾN TRE - TP.HCM</strong></h3><ul><li>Đoàn ngồi đò máy&nbsp;khám phá <strong>Rạch Tân Thạch</strong>, tìm hiểu về cuộc sống thường nhật của người dân nơi đây.</li></ul><p>Sau đó, dừng tại nhà hàng để dùng cơm trưa.</p><ul><li>Tại đây, đoàn sẽ tham quan trại nuôi cá sấu, nhím, mô hình nuôi ếch, nuôi rắn… Nếu quý khách không tham quan sau khi dùng bữa có thể nghỉ ngơi tại võng hoặc đi xe đạp <i>(miễn phí)</i> tham quan vườn dừa, vườn trái cây, cánh đồng lúa…</li><li>Ngồi xe ngựa ngắm nhìn tham quan đường làng, ngắm nhìn cuộc sống làng quê.</li></ul><p><strong>15h00&nbsp;</strong>Đoàn trở về <strong>Mỹ Tho&nbsp;</strong>và khởi hành về lại <strong>TP.HCM</strong>. Xe đưa quý khách về điểm trả khách và hẹn gặp lại quý khách trong những <a href=\"https://www.vietnambooking.com/du-lich-trong-nuoc.html\"><strong>tour du lịch trong nước giá rẻ</strong></a> sau.</p>",
      "createdAt": "2024-04-30T20:30:41.000Z",
      "id_staff": 12,
      "id_manager": 1,
      "insurance": true,
      "meal": true,
      "max_user": 100,
      "point_rating": 5,
      "updatedAt": "2024-04-30T20:30:41.000Z",
      "staffData": {
        "id": 12,
        "id_account": 40,
        "address": "",
        "birthday": "",
        "createdAt": "2024-04-30T15:56:12.000Z",
        "updatedAt": "2024-04-30T15:56:12.000Z",
        "accountData": {
          "id": 40,
          "email": "hoangdz00123@gmail.com",
          "username": "Nguyen Van B",
          "phoneNumber": "0773312827",
          "role": "staff"
        }
      },
      "managerData": {
        "id": 1,
        "id_account": 38,
        "company_name": "VKU",
        "birthday": "",
        "createdAt": "2024-04-30T14:46:40.000Z",
        "updatedAt": "2024-04-30T14:46:40.000Z",
        "accountData": {
          "id": 38,
          "email": "huyennhat.dev@gmail.com",
          "username": "Huy Hoang",
          "phoneNumber": "0123456789",
          "role": "manager"
        }
      }
    },
    {
      "id": 3,
      "tour_name": "Tour 30/4 Điệp Sơn Phú Yên 3 ngày 3 đêm | Vịnh Xuân Đừng – Bãi Xép – Gành Đá Đĩa",
      "initial_price": 4740000,
      "departure_day": "2024-05-17",
      "end_tour_day": "2024-05-28",
      "promotional": 0.25,
      "destination": "ben-tre",
      "vehicle": "train",
      "photos": "http://res.cloudinary.com/huyennhat/image/upload/v1714510135/images/booking_tour/lv3cyqhcqsxgjccpu2ne.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714510140/images/booking_tour/emhfddqhrgqwqnh6r67g.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714510145/images/booking_tour/kdlbyffn35trfiq92l0z.jpg",
      "highlight": "<ul><li><strong>Khám phá đảo Điệp Sơn - Điểm đến du lịch nổi tiếng không còn xa lạ với nhiều du khách.</strong></li><li><strong>Ngoạn cảnh Vịnh Vũng Rô và lắng nghe sự kiện&nbsp;hành trình Tàu Không Số, di tích Đường Mòn Hồ Chí Minh.</strong></li><li><strong>Du ngoạn đến Đầm Ô Loan - Đập Tam Giang để thưởng thức những món ăn đặc sản Phú Yên.</strong></li><li><strong>Check-in với Gành Đá Đĩa - Một trong những hiện tượng địa chất độc đáo nhất trên thế giới.</strong></li><li><strong>Trầm trồ trước phong cảnh hữu tình, thơ mộng trong phân cảnh của bộ phim \"Tôi thấy hoa vàng trên cỏ xanh\"</strong></li><li><strong>Tour trọn gói xe du lịch đời mới + Phục vụ buffet + Phí tham quan + Khách sạn 3 - 4 sao.&nbsp;</strong></li></ul>",
      "introduce": "<h3><strong>TỐI NGÀY 1 | TP.HCM - NINH HÒA</strong></h3><p>&nbsp;</p><p><strong>Tối:</strong> Xe và Hướng dẫn viên (HDV) của <a href=\"http://vietnambooking.vn/\"><strong>Vietnam Booking</strong></a> đón quý khách tại điểm hẹn ban đầu. Đoàn sắp xếp hành lý và lên xe. <strong>Tour 30/4 Điệp Sơn Phú Yên 3 ngày 3 đêm</strong> chính thức khởi hành đi <strong>Khánh Hòa</strong>. Trên đường đi, HDV sẽ giới thiệu sơ lược về các điểm đến và lịch trình của tour.&nbsp;</p><p>Quý khách nghỉ ngơi tự do trên xe.</p><h3><strong>NGÀY 1 | ĐẢO ĐIỆP SƠN - VỊNH XUÂN ĐỪNG - VỊNH VŨNG RÔ - PHÚ YÊN (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng:</strong> Đến Ninh Hòa (thuộc tỉnh Khánh Hòa), đoàn dừng chân tại nhà hàng địa phương để dùng bữa sáng. Tiếp tục chuyến hành trình tham quan, quý khách di chuyển đến cảng Vạn Giã để lên tàu đến đảo Điệp Sơn.</p><ul><li><strong>Đảo Điệp Sơn: </strong>Là một quần đảo không còn xa lạ với nhiều người dân Phú Yên. Dù trải qua sự bào mòn của thời gian nhưng nơi đây vẫn còn giữ được nét đẹp nguyên sơ như thuở ban đầu. Nổi bật nhất là làn nước biển trong xanh, bãi cát trắng phau. Đến đây, quý khách sẽ được người dân đón tiếp vô cùng nồng hậu, vui vẻ. Khi thủy triều xuống, con đường cát trắng chạy thẳng dọc ra biển lớn, tạo nên một khung cảnh tuyệt đẹp. Bạn chỉ việc men theo con đường mòn trên biển nối liền với hòn đảo, giữa đảo Điệp Sơn lớn. Bạn sẽ cảm nhận con đường uốn lượn, rộng khoảng 1 mét và nằm sâu dưới mặt nước biển trong xanh chưa đến nửa mét.&nbsp;</li><li><strong>Vịnh Xuân Đừng: </strong>Bãi biển mang đậm nét đẹp nên thơ, hoang sơ với bãi cát trắng mịn và làn nước biển trong xanh vắt, bãi cát trắng mịn màng, không hề có một đợt sóng, mặt nước êm ái như mặt hồ phẳng lặng. Một điều thú vị là du khách có thể lấy nước ngọt trực tiếp trên bãi cát, sát mép biển. Bạn chỉ cần đào cát lên, cách ranh nước mặn khoảng 1 mét, nước từ từ rịn ra. Nguồn nước ngọt dâng lên trong sự ngỡ ngàng của nhiều du khách. Đến đây, quý khách tự do tắm biển thỏa thích.</li></ul><p><strong>Trưa:</strong> Quý khách dùng bữa trưa tại nhà hàng Xuân Đừng. Đoàn khởi hành đến Phú Yên, đoàn đi qua đèo Cả để đến vùng đất “Hoa vàng cỏ xanh” - Thành phố Tuy Hòa.</p><p><strong>Chiều:</strong> Đến đây, quý khách có cơ hội ngoạn cảnh đẹp với các địa danh nổi tiếng như:</p><ul><li>Ngoạn Cảnh <strong>Vịnh Vũng Rô</strong>, nghe hướng dẫn viên kể lại hành trình Tàu Không Số và sự kiện Vịnh Vũng Rô, di tích Đường Mòn Hồ Chí Minh trên Biển tìm hiểu về cách thức nuôi tôm hùm và cuộc sống bình yên của ngư dân vùng biển.&nbsp;</li><li>Đến TP. Tuy Hòa, Quý khách tham quan <strong>Tháp Nhạn</strong> - một trong những công trình kiến trúc cổ nhất của người Chăm, nơi gắn với nhiều truyền thuyết về sự hình thành và phát triển của vùng đất Phú Yên.&nbsp;</li></ul><p><strong>Tối:</strong> Đoàn dùng bữa tối tại nhà hàng địa phương. Sau đó, đoàn tự do khám phá thành phố theo cách riêng của mình. Quý khách có thể thỏa sức check-in, sống ảo tùy thích hoặc đơn giản là dạo bước trên bờ biển đêm, ngắm bầu trời đêm đầy sao.&nbsp;</p><p>Có thể nói, <strong>thành phố Tuy Hòa</strong> không chỉ nổi tiếng với đường bờ biển kỳ vĩ trải dài dọc theo thành phố. Khi màn đêm buông xuống, quảng trường ¼ lung linh ánh đèn với nhiều hoạt động giải trí và khu chợ Đêm Tuy Hòa với nhiều hàng quán dân giã hấp dẫn.</p><p>Hoặc chiêm ngưỡng vẻ đẹp kì bí của<strong> tháp Nhạn</strong> cùng cầu Đà Rằng với bộ khung thép bảo vệ hình ziczac hòa quyện cùng không gian rừng núi hữu tình của núi Nhạn, sông Ba tạo nên một khung cảnh bề thế và đẹp mắt.</p><p>Kết thúc chuyến hành trình tham quan buổi đêm. Đoàn trở về khách sạn nhận phòng và nghỉ ngơi.</p><p><strong>Nghỉ đêm tại Phú Yên.</strong></p><h3><strong>NGÀY 2 | BÃI XÉP - GÀNH ĐÁ ĐĨA - NHÀ THỜ MẰNG LĂNG (ĂN SÁNG/TRƯA)</strong></h3><p><strong>Sáng:</strong> Đoàn dùng bữa sáng buffet tại nhà hàng địa phương. <strong>Tour 30/4 Điệp Sơn Phú Yên 3 ngày 3 đêm</strong> tiếp tục chuyến hành trình khám phá cuộc sống và văn hóa phía Bắc Phú Yên:</p><ul><li>Ngoạn cảnh<strong> Đầm Ô Loan</strong> - Đập Tam Giang: Phóng tầm mắt từ trên đèo Quán Cau nhìn xuống, đầm Ô Loan rộng khoảng 1200 hecta. Nhìn từ xa, đầm mang hình dáng của một phượng hoàng xòe khoe đôi cánh. Đầm Ô Loan nằm vắt ngang trên sông Cái. Đập Tam Giang là một công trình thủy lợi đóng vai trò quan trọng đến đời sống nhân dân của tỉnh. Đến đây, bạn sẽ có cơ hội chiêm ngưỡng một ngọn thác lớn với những dòng nước chảy xuống với bọt trắng tung trắng xóa (nếu thuận lợi, đoàn dừng chân chụp ảnh phía trên).</li><li><strong>Nhà thờ Mằng Lăng: </strong>Không chỉ gây ấn tượng với lối kiến trúc cổ xưa - Nơi lưu trữ bộ sách phát hành bằng chữ Quốc ngữ đầu tiên trên thế giới. Bên cạnh đó, quý khách còn được lắng nghe về câu chuyện của Thánh Anrê Phú Yên. Đây là cơ hội tuyệt vời để quý khách tìm hiểu kiến trúc của nhà thờ theo lối La Mã. Đoàn tiếp tục tham quan và tìm hiểu về kiến trúc độc đáo nơi đây.&nbsp;</li><li><strong>Gành Đá Đĩa:</strong> Là một trong sáu loại địa chất độc đáo nhất trên thế giới. Nham thạch phun ra từ miệng núi lửa, gặp nước lạnh đông cứng lại. Và khi kết hợp với hiện tượng di ứng lực khiến các khối nham thạch bị đông cứng rạn nứt đa chiều một cách tự nhiên, nhưng vô cùng hoàn hảo. Những hòn đá với đủ loại hình dáng được xếp chồng lên nhau tạo thành hình cột như chồng đĩa lớn, có màu đen huyền và vàng sáng trải rộng ra biển.&nbsp;</li></ul><p><strong>Trưa:</strong> Đoàn dùng bữa trưa tại nhà hàng địa phương. Sau đó, đoàn trở về khách sạn để nghỉ ngơi.</p><p><strong>Chiều:</strong> Xe đưa đoàn đi tắm biển và tham quan tại:</p><ul><li><strong>Bãi Xép: </strong>Nếu bạn đã từng không ít lần trầm trồ trước vẻ đẹp của những phân cảnh trong bộ phim “Tôi thấy hoa vàng trên cỏ xanh” của đạo diễn Victor Vũ thì nhất định phải đến<strong> Bãi Xép </strong>một lần trong đời. Dù bờ biển Bãi Xép chỉ dài khoảng 500 mét nhưng nơi đây lại sở hữu cảnh quan thiên nhiên tuyệt đẹp kết hợp hài hòa với bãi cát vàng óng bên các bãi đá hoang sơ.&nbsp;</li></ul><p><strong>Tối:</strong> Đoàn tự do khám phá những món ăn nổi tiếng với bánh hỏi lòng heo, sò huyết Đầm Ô Loan, cá ngừ đại dương. Chỉ cần thưởng thức qua một lần, quý khách sẽ không thể quên hương vị đặc trưng này. (tự túc ăn tối).</p><h3><strong>NGÀY 3 | TẠM BIỆT PHÚ YÊN - TP.HCM (ĂN SÁNG/TRƯA)</strong></h3><p><strong>Sáng:</strong> Đoàn dùng <strong>buffet sáng</strong> tại khách sạn. Sau đó, đoàn làm thủ tục trả phòng. Quý khách khởi hành về TP.HCM. Trên đường về, xe đưa quý khách dừng chân mua sắm các đặc sản địa phương tại các cơ sở uy tín.</p><p><strong>Trưa:</strong> Quý khách dùng bữa trưa tại nhà hàng địa phương. Đoàn khởi hành về TP.HCM.</p><p>Về đến TP.HCM, đoàn nói lời chia tay và hẹn gặp lại quý khách trong các tour du lịch giá rẻ lần sau! <strong>Tour 30/4 Điệp Sơn Phú Yên 3 ngày 3 đêm</strong> chính thức kết thúc!&nbsp;</p><p><i><strong>LƯU Ý: Thứ tự và chi tiết trong chương trình có thể thay đổi cho phù hợp với tình hình thực tế, nhưng vẫn đảm bảo đủ điểm đến tham quan!</strong></i></p>",
      "createdAt": "2024-04-30T20:30:41.000Z",
      "id_staff": 12,
      "id_manager": 1,
      "insurance": true,
      "meal": true,
      "max_user": 100,
      "point_rating": 5,
      "updatedAt": "2024-04-30T20:30:41.000Z",
      "staffData": {
        "id": 12,
        "id_account": 40,
        "address": "",
        "birthday": "",
        "createdAt": "2024-04-30T15:56:12.000Z",
        "updatedAt": "2024-04-30T15:56:12.000Z",
        "accountData": {
          "id": 40,
          "email": "hoangdz00123@gmail.com",
          "username": "Nguyen Van B",
          "phoneNumber": "0773312827",
          "role": "staff"
        }
      },
      "managerData": {
        "id": 1,
        "id_account": 38,
        "company_name": "VKU",
        "birthday": "",
        "createdAt": "2024-04-30T14:46:40.000Z",
        "updatedAt": "2024-04-30T14:46:40.000Z",
        "accountData": {
          "id": 38,
          "email": "huyennhat.dev@gmail.com",
          "username": "Huy Hoang",
          "phoneNumber": "0123456789",
          "role": "manager"
        }
      }
    }
  ],
  "limit": null,
  "total": 3
}

const StaffTours = () => {
  const limit = 10;

  const navigate = useNavigate();
  const params = useSearchParams();
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(
    parseInt(params[0].get('page') ?? '1'),
  );

  const [tours, setTours] = useState<TOUR_TYPE[]>([]);

  const getAllTour = () => {
    const params = {
      page: currentPage,
      limit: limit,
      exp: 0
    }

    tourApi.getTours(params).then(rs => {
      console.log(rs);
      const modifiedTours = rs.data.map((tour: any) => {
        return {
          ...tour,
          photos: tour.photos?.split(',')
        };
      });
      setTours(modifiedTours);
      setTotal(rs.total);
    })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    // getAllTour()
    const modifiedTours = mockData.data.map((tour: any) => {
      return {
        ...tour,
        photos: tour.photos?.split(',')
      };
    });

    setTours(modifiedTours)
  }, []);


  const getProvinceName = (slug: string) => {
    const province = provinces.find(p => p.slug === slug);
    return province ? province.name : "Không tìm thấy tỉnh";
  }
  return (
    <DefaultLayout>
      <ToastContainer autoClose={2000} />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="w-[50px] py-4  text-center font-medium text-black dark:text-white ">
                    STT
                  </th>
                  <th className="w-[200px] py-4 px-4 text-left font-medium text-black dark:text-white">
                    Hình ảnh
                  </th>
                  <th className="min-w-[120px] py-4 px-4 text-left font-medium text-black dark:text-white">
                    Thông tin
                  </th>
                  <th className=" w-[100px] py-4 px-4 text-center font-medium text-black dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tours.map((data, index) => (
                  <tr key={index}>
                    <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                      <p className="text-sm font-bold">{index + 1}</p>
                    </td>
                    <td className="border-b w-[200px] h-[140px] border-[#eee] py-5 px-4  dark:border-strokedark ">
                      <Image.PreviewGroup
                        items={data.photos}
                      >
                        <Image
                          className="w-full h-full rounded object-cover"
                          src={data.photos![0]}
                        />
                      </Image.PreviewGroup>

                    </td>
                    <td className="border-b border-[#eee] text-black py-5 px-4  dark:border-strokedark ">
                      <h4 className="font-semibold text-base line-clamp-2 overflow-visible">
                        {data.tour_name}
                      </h4>

                      <h6 className="text-sm mt-1">
                        <b>Ngày bắt đầu:</b> {data.departure_day}
                      </h6>
                      <h6 className="text-sm mt-1">
                        <b>Ngày kết thúc:</b> {data.end_tour_day}
                      </h6>
                      <h6 className="text-sm mt-1">
                        <b>Điểm đến:</b> {getProvinceName(data.destination)}
                      </h6>
                    </td>

                    <td className="border-b h-[140px] border-[#eee] py-5 px-4  dark:border-strokedark  ">
                      <div className=" flex justify-center">
                        <Tooltip placement="top" title={'Xem chi tiết'}>
                          <button
                            onClick={() =>
                              startTransition(() => {
                                navigate(`/tour/staff/view/${data.id}`);
                              })
                            }
                            className="p-2 mx-1 rounded-full border-[1px] border-orange-600"
                          >
                            <FaRegEye fill="orange" />
                          </button>
                        </Tooltip>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {total > 10 ? (
            <div className="w-full my-3 text-center">
              <Pagination
                defaultCurrent={currentPage}
                total={total}
                showSizeChanger={false}
                pageSize={limit}
                onChange={(val) => {
                  navigate({ search: `?page=${val}` });
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StaffTours;
