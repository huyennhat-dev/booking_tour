import { FaBus, FaClock, FaRegBuilding } from 'react-icons/fa';
import BackToPrev from '../../components/BackToPrev';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaLocationDot } from 'react-icons/fa6';
import provinces from '../../assets/js/province';
import vehicle from '../../assets/js/vehicle';

const mockData = {
  tour: {
    id: 1,
    tour_name:
      'Tour du lịch Trung Quốc 7 ngày 30/4 khởi hành từ TP.HCM – Thượng Hải – Ô Trấn – Hàng Châu – Bắc Kinh',
    initial_price: 31238000,
    departure_day: '2024-05-03',
    end_tour_day: '2024-05-06',
    promotional: 0.2,
    destination: 'gia-lai',
    vehicle: 'train',
    photos:
      'http://res.cloudinary.com/huyennhat/image/upload/v1714507741/images/booking_tour/il9ydehnjzanslnta2m1.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714507744/images/booking_tour/vhu4p6njjm5yzfppz1rf.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714507750/images/booking_tour/gr6eyq3n3tyxrwweklnc.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714507755/images/booking_tour/c9qhyvfjkgnoyf7jwgbc.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714507759/images/booking_tour/epkzke0pnki2ibjksbst.jpg',
    highlight:
      '<ul><li><strong>Khám phá Thượng Hải tráng lệ, sầm uất với những công trình đồ sộ, độc đáo.</strong></li><li><strong>Ngắm nhìn vẻ đẹp thị trấn cổ Ô Trấn đã có từ 1.300 năm.</strong></li><li><strong>Ngồi thuyền thưởng ngoạn cảnh đẹp Tây Hồ.</strong></li><li><strong>Ghé thăm Tô Châu, Vô Tích, tham quan những công trình nổi tiếng tại đây.</strong></li><li><strong>Đến với Khai Phong Phủ, tòa án nổi tiếng thời Tống với vị quan liêm khiết Bao Thanh Thiên.</strong></li><li><strong>Check-in tại Vạn Lý Trường Thành, công trình quân sự, kỳ quan nổi tiếng trên thế giới.</strong></li><li><strong>Tham quan Di Hòa Viên, cung điện mùa hè của Từ Hy Thái Hậu với vô vàn điểm tham quan thú vị.</strong></li></ul>',
    introduce:
      '<h3><strong>ĐÊM 01 | TP.HCM - TRÙNG KHÁNH (ĂN NHẸ TRÊN MÁY BAY)</strong></h3><p>&nbsp;</p><p><strong>Tối</strong>: Đến giờ hẹn, trưởng phòng của <a href="https://www.vietnambooking.com/"><strong>Vietnam Booking</strong></a> sẽ đến đón khách tại sân bay Tân Sơn Nhất, ga quốc tế. Trưởng đoàn hỗ trợ quý khách làm thủ tục xuất cảnh, chuyến bay <strong>CA408 SGN-CKG</strong> sẽ đưa đoàn đến với Trùng Khánh.</p><h3><strong>NGÀY 01 | TRÙNG KHÁNH - THƯỢNG HẢI - THÁP TRUYỀN HÌNH DƯƠNG MINH CHÂU - PHỐ ĐI BỘ NAM KINH - MIẾU THÀNH HOÀNG - SÔNG HOÀNG PHỐ (ĂN TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Sau khi đến <strong>Trùng Khánh</strong>, đoàn tiếp tục ngồi tiếp chuyến bay <strong>CA4131 08:00-10:35</strong> để đến <strong>Thượng Hải</strong>. Đó là một trong những khu đô thị phồn hoa, nổi tiếng của Trung Quốc. Nơi đây sở hữu những công trình kiến trúc châu Âu hiện đại, độc đáo với sông Hoàng Phố êm đềm.</p><p><strong>Trưa</strong>: Đoàn dùng bữa với những món ăn thơm ngon. Sau đó, <strong>tour du lịch Trung Quốc 7 ngày 30/4</strong> sẽ đưa đoàn đến với <strong>Tháp truyền hình Dương Minh Châu</strong><i> (không lên tháp).</i></p><ul><li>Công trình này là tháp truyền hình cao nhất châu Á và đứng thứ 3 thế giới.</li></ul><p><strong>Chiều</strong>: Hành trình du lịch tiếp tục đưa đoàn đến với:</p><ul><li><strong>Phố đi bộ Nam Kinh</strong></li><li><strong>Miếu Thành Hoàng</strong></li><li><strong>Ngồi thuyền thưởng ngoạn cảnh sắc</strong> <strong>sông Hoàng Phố</strong><i> (chi phí tự túc)</i>.</li></ul><p><strong>Tối</strong>: Đoàn dùng bữa tối với thực đơn hấp dẫn và tự do hoạt động, khám phá nhịp sống sầm uất về đêm tại đây. Đoàn nghỉ đêm tại <strong>Thượng Hải</strong>.</p><h3><strong>NGÀY 02 | (THƯỢNG HẢI - Ô TRẤN - HÀNG CHÂU - TÂY HỒ (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Đoàn dùng bữa sáng tại khách sạn rồi làm thủ tục trả phòng. Trong <strong>tour du lịch Trung Quốc 7 ngày 30/4</strong> ngày thứ 2, xe đưa đoàn đến với<strong> Ô Trấn</strong>.</p><ul><li>Nơi đây nổi tiếng với những cảnh đẹp nhuốm màu thời gian cổ kính. Thị trấn này đã có tuổi đời hơn 1.300 năm. Vùng đất này gắn liền với nhiều biến động về lịch sử, văn hóa Trung Quốc. UNESCO đã từng công nhận nơi đây là Di sản văn hóa thế giới.</li></ul><p><strong>Trưa</strong>: Đoàn dùng bữa tại nhà hàng.</p><p><strong>Chiều</strong>: Hành trình tham quan tiếp tục đưa quý khách đến với <strong>Hàng Châu</strong>. Trên đường đi, xe sẽ dừng lại để quý khách thưởng thức trà Bạch Cúc nổi tiếng của Trung Quốc. Đến Hàng Châu, quý khách thưởng ngoạn cảnh sắc <strong>Tây Hồ</strong>.</p><ul><li>Đây được xem là Venice của phương Đông với cảnh sắc đầy hữu tình và thơ mộng. Chiếc thuyền nhỏ xuôi theo dòng nước, đưa quý khách tham quan Trường Kiều, Quả Sơn, Tam Đàn Ấn Nguyệt, Tô Đê Bạch Đê, Hoa Cảng Quan Ngư (bên ngoài). Điểm đến này gắn liền với những câu chuyện về Lương Sơn Bá - Chúc Anh Đài, Thanh Xà - Bạch Xà, nhà thơ Lý Bạch…</li></ul><p><strong>Tối</strong>: Đoàn dùng bữa tối tại nhà hàng rồi về khách sạn <strong>Hàng Châu</strong> nhận phòng, nghỉ ngơi. Quý khách có thể tự do khám phá Hàng Châu hoặc đăng ký xem show biểu diễn của Tống Thành Thiên Cổ Tình <i>(chi phí tự túc 1.225.000 VND/khách)</i>.</p><h3><strong>NGÀY 03 | HÀNG CHÂU - TÔ CHÂU - HÀN SƠN TỰ - VƯỜN SƯ TỬ LÂM - BẢO TÀNG TƠ LỤA - VÔ TÍCH (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Quý khách dùng bữa tại khách sạn rồi làm thủ tục trả phòng để đến với <strong>Tô Châu</strong>.</p><p><strong>Trưa</strong>: Đoàn dùng bữa rồi tiếp tục hành trình tham quan trong<strong> tour du lịch Trung Quốc 7 ngày 30/4</strong>. Xe đưa đoàn đi tham quan:</p><ul><li><strong>Hàn Sơn Tự</strong>. Ngôi chùa cổ có vị trí tọa lạc tại phía Tây của thị trấn Phong Kiều.</li><li><strong>Vườn Sư Tử Lâm</strong>. Đây là một trong những khu vườn tiêu biểu của nghệ thuật nhà vườn cổ. Quý khách sẽ có cơ hội thưởng thức những tác phẩm nghệ thuật kiến trúc độc đáo, mang đậm dấu ấn Trung Hoa.</li><li><strong>Bảo tàng tơ lụa Tô Châu</strong>. Đoàn tìm hiểu về tơ lụa của vùng đất này. Tại đây cất giữ nhiều tài liệu, hiện vật về quy trình sản xuất lụa từ thời cổ xưa cho đến ngày nay.</li></ul><p><strong>Chiều</strong>: Hành trình du lịch tiếp tục đưa đoàn đến với <strong>Vô Tích</strong>, tại đây, quý khách tham quan:</p><ul><li><strong>Khu phong cảnh Thái Hồ.</strong></li><li><strong>Công viên Trường Quảng Khê.</strong></li><li><strong>Tiệm ngọc trai.</strong></li><li><strong>Bảo tàng ấm trà Tử Sa.</strong></li></ul><p><strong>Tối</strong>: Đoàn dùng bữa tối tại Vô Tích rồi về khách sạn nhận phòng, nghỉ ngơi. Đoàn nghỉ đêm tại <strong>Vô Tích</strong>.</p><h3><strong>NGÀY 04 | VÔ TÍCH - TRỊNH CHÂU - KHAI PHONG PHỦ (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Quý khách dùng điểm tâm sáng tại khách sạn rồi làm thủ tục trả phòng. Sau đó, xe và hướng dẫn viên sẽ đưa đoàn đến trạm tàu cao tốc để đi <strong>Trịnh Châu</strong>.</p><p><strong>Trưa</strong>: Đoàn dùng bữa tại nhà hàng Trịnh Châu. Sau đó, <strong>tour du lịch Trung Quốc 7 ngày 30/4</strong> đưa đoàn đi tham quan:</p><ul><li><strong>Khai Phong Phủ</strong>. Nơi đây từng là tòa án nổi tiếng thời nhà Tống với vị quan thanh liêm, chính trực - Bao Công. Ông là người liêm khiết, luôn dám đấu tranh với thế lực đen tối, tham nhũng, bảo vệ người dân. Nếu đã từng xem qua bộ phim tuổi thơ này, hẳn bạn sẽ cảm thấy quen thuộc với nơi đây.</li></ul><p><strong>Tối</strong>: Đoàn dùng bữa tại nhà hàng địa phương. Quý khách nghỉ đêm tại <strong>Trịnh Châu</strong>.</p><h3><strong>NGÀY 05 | TRỊNH CHÂU - BẮC KINH - VẠN LÝ TRƯỜNG THÀNH - SÂN VẬN ĐỘNG TỔ CHIM (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Quý khách dùng điểm tâm sáng tại khách sạn rồi trả phòng. Trong<strong> tour du lịch Trung Quốc 7 ngày 30/4</strong> ngày thứ 5 này, xe đưa đoàn đến <strong>Bắc Kinh</strong>.</p><p><strong>Trưa</strong>: Sau khi đến Bắc Kinh, quý khách dùng bữa trưa rồi tham quan <strong>Vạn Lý Trường Thành</strong>.</p><ul><li>Đây là một trong những kỳ quan tiêu biểu của thế giới. Công trình gây ấn tượng mạnh bởi thiết kế độc đáo, kỳ vĩ. Ngày xưa, Trường Thành được xây dựng với mục đích phân chia ranh giới, chống giặc ngoại xâm. Hiện tại, công trình này là một di tích lịch sử, văn hóa đại diện cho tinh thần của người Trung Hoa.</li></ul><p><strong>Chiều</strong>: Xe đưa đoàn đi tham quan bên ngoài <strong>sân vận động Tổ Chim</strong>. Đây là nơi đã đã từng diễn ra Thế vận hội Bắc Kinh năm 2008.</p><p><strong>Tối</strong>: Đoàn di chuyển đi dùng bữa tối rồi về khách sạn nghỉ ngơi. Đoàn nghỉ đêm tại <strong>Bắc Kinh</strong>.</p><h3><strong>NGÀY 06 | BẮC KINH - TỬ CẤM THÀNH/CUNG VƯƠNG PHỦ - CỬA HÀNG ĐỒNG NHÂN ĐƯỜNG (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng</strong>: Quý khách dùng bữa tại khách sạn. Trong <strong>tour du lịch Trung Quốc 7 ngày 30/4</strong> ngày thứ 6, xe đưa đoàn đi tham quan các điểm nổi tiếng tại Bắc Kinh. Chẳng hạn như:&nbsp;</p><ul><li><strong>Tử Cấm Thành (Cố Cung)</strong>. Công trình đã trải qua 24 triều vua từ nhà Minh tới nhà Thanh. Các cung điện tại đây được xây dựng từ thời vua Vĩnh Lạc. Ông là vị hoàng đế kiệt xuất của nhà Minh.</li></ul><p><i><strong>Lưu ý</strong>: Vé sẽ được mua online, nếu không đặt được vé thì sẽ thay bằng điểm tham quan khác là Cung Vương Phủ. Nếu không đi Cố Cung, đồng nghĩa với việc sẽ không đi Thiên An Môn.</i></p><ul><li><strong>Cung Vương Phủ</strong> còn được gọi là Phủ Hòa Thân. Tính đến nay, công trình đã có tuổi đời hơn 2 thế kỷ.</li></ul><p><strong>Trưa</strong>: Quý khách dùng bữa trưa tại nhà hàng địa phương.</p><p><strong>Chiều</strong>: Tiếp tục chuyến tham quan, xe sẽ đưa đoàn đến <strong>cửa hàng thuốc bắc (Đồng Nhân Đường)</strong>.</p><ul><li>Đây là nơi kê toa thuốc cho triều đình xưa với các sản phẩm trị bỏng nổi tiếng của Bảo Phú Linh.</li></ul><p><strong>Tối</strong>: Đoàn dùng cơm tối và tự do khám phá Bắc Kinh về đêm. Đoàn nghỉ đêm tại <strong>Bắc Kinh</strong>.</p><h3><strong>NGÀY 07 | BẮC KINH - DI HÒA VIÊN - TP.HCM (ĂN SÁNG/TRƯA)</strong></h3><p><strong>Sáng</strong>: Đoàn dùng bữa sáng tại khách sạn rồi làm thủ tục trả phòng. Tiếp đến, đoàn sẽ đến với <strong>Di Hòa Viên</strong>, đây là cung điện mùa hè của Từ Hy Thái Hậu. Tại đây, quý khách sẽ tham quan:</p><ul><li><strong>Hồ Côn Minh</strong></li><li><strong>Núi Vạn Thọ</strong></li><li><strong>Hành lang đi bộ dài nhất thế giới.</strong></li><li><strong>Cùng một số công trình xa hoa khác.</strong></li></ul><p><strong>Trưa</strong>: Quý khách dùng bữa tại nhà hàng địa phương rồi tham quan, mua sắm tại <strong>Ngọc Phỉ Thúy</strong></p><p>Đến giờ hẹn, đoàn di chuyển ra sân bay để làm thủ tục xuất cảnh. Chuyến bay <strong>CA903 20:45 - 01:10+1</strong> đưa đoàn về lại TP.HCM. <strong>Tour du lịch Trung Quốc 7 ngày 30/4</strong> đến đây là kết thúc, HDV chào tạm biệt đoàn và hẹn gặp lại quý khách trong những <a href="https://www.vietnambooking.com/du-lich-nuoc-ngoai.html"><strong>tour du lịch nước ngoài</strong></a> khác.</p>',
    createdAt: '2024-04-30T17:44:31.000Z',
    id_staff: 12,
    id_manager: 1,
    insurance: true,
    meal: true,
    max_user: 10,
    point_rating: 5,
    updatedAt: '2024-04-30T17:44:31.000Z',
    staffData: {
      id: 12,
      id_account: 40,
      address: '',
      birthday: '',
      createdAt: '2024-04-30T15:56:12.000Z',
      updatedAt: '2024-04-30T15:56:12.000Z',
      accountData: {
        id: 40,
        email: 'hoangdz00123@gmail.com',
        username: 'Nguyen Van B',
        phoneNumber: '0773312827',
        role: 'staff',
      },
    },
    managerData: {
      id: 1,
      id_account: 38,
      company_name: 'VKU',
      birthday: '',
      createdAt: '2024-04-30T14:46:40.000Z',
      updatedAt: '2024-04-30T14:46:40.000Z',
      accountData: {
        id: 38,
        email: 'huyennhat.dev@gmail.com',
        username: 'Huy Hoang',
        phoneNumber: '0123456789',
        role: 'manager',
      },
    },
  },
  customer: [
    {
      user: {
        email: 'hoangdz@gmail.com',
        fullname: 'Huy Hoang',
        avatar: 'x',
      },
      member: 10,
      createdAt: '22-11-2024',
      bookInfo: {
        full_name: 'Truong Huy Hoang',
        email: 'hoang@gmail.com',
        address: 'Hoa Hai - Ngu Hanh Son - Da Nang / 470 Tran Dai Nghia',
        message: 'Dat tour cho 4 nguoi',
        phone_number: '0123456789',
      },
    },
    {
      user: {
        email: 'hoangdz@gmail.com',
        fullname: 'Huy Hoang',
        avatar: 'x',
      },
      member: 10,
      createdAt: '22-11-2024',
      bookInfo: {
        full_name: 'Truong Huy Hoang',
        email: 'hoang@gmail.com',
        address: 'Hoa Hai - Ngu Hanh Son - Da Nang / 470 Tran Dai Nghia',
        message: 'Dat tour cho 4 nguoi',
        phone_number: '0123456789',
      },
    },
    {
      user: {
        email: 'hoangdz@gmail.com',
        fullname: 'Huy Hoang',
        avatar: 'x',
      },
      member: 10,
      createdAt: '22-11-2024',
      bookInfo: {
        full_name: 'Truong Huy Hoang',
        email: 'hoang@gmail.com',
        address: 'Hoa Hai - Ngu Hanh Son - Da Nang / 470 Tran Dai Nghia',
        message: 'Dat tour cho 4 nguoi',
        phone_number: '0123456789',
      },
    },
  ],
};

const StaffViewTour = () => {
  const getName = (slug: string, data: { name: string; slug: string }[]) => {
    const rs = data.find((p) => p.slug === slug);
    return rs ? rs.name : 'Không tìm thấy';
  };

  return (
    <DefaultLayout>
      <BackToPrev />
      <div className="w-full rounded-md bg-white p-2 md:p-6 items-start text-black">
        <h2 className="font-semibold text-xl md:text-2xl">{mockData.tour.tour_name}</h2>
        <div className="md:group relative my-2 md:flex justify-between md:px-16 cursor-pointer ">
          <p className="text-md font-normal flex items-center">
            <FaClock className="mr-1" />
            Ngày đi: {mockData.tour.departure_day}
          </p>
          <p className="text-md font-normal flex items-center">
            <FaClock className="mr-1" />
            Ngày về: {mockData.tour.end_tour_day}
          </p>
          <p className="text-md font-normal flex items-center">
            <FaBus className="mr-1" />
            Phương tiện: {getName(mockData.tour.vehicle, vehicle)}
          </p>
          <p className="text-md font-normal flex items-center">
            <FaLocationDot className="mr-1" />
            Địa điểm: {getName(mockData.tour.destination, provinces)}
          </p>
          <p className="text-md font-normal flex items-center">
            <FaRegBuilding className="mr-1" />
            Cung cấp bởi: {mockData.tour.managerData.company_name}
          </p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1">
          <div className="px-2 my-7 col-span-1">
            <h3 className="font-semibold text-xl">Hành khách đặt vé</h3>
            <ol className="list-decimal mx-2 md:mx-6 font-medium">
              {mockData.customer.map((cus, index) => (
                <li key={index} className="my-2">
                  <div className="flex items-center">
                    <img
                      src={cus.user.avatar}
                      className="w-[35px] h-[35px] rounded-full mr-3"
                      alt=""
                    />
                    <p className="mr-4">{cus.user.fullname}</p>

                  </div>
                  <div className="pl-12 font-normal text-sm">
                    <p className="font-medium">Thông tin nhận vé:</p>
                    <div className="px-2">
                      <p className="font-medium">
                        Số vé: <span className="font-normal ml-1">{cus.member}</span>
                      </p>
                      <p className="font-medium">
                        Ngày đặt: <span className="font-normal ml-1">{cus.createdAt}</span>
                      </p>
                      <p className="font-medium">
                        Tên người nhận:
                        <span className="font-normal ml-1">
                          {cus.bookInfo.full_name}
                        </span>
                      </p>
                      <p className="font-medium">
                        Số điện thoại:
                        <span className="font-normal ml-1">
                          {cus.bookInfo.email}
                        </span>
                      </p>
                      <p className="font-medium">
                        Địa chỉ:
                        <span className="font-normal ml-1">
                          {cus.bookInfo.address}
                        </span>
                      </p>
                      <p className="font-medium">
                        Lời nhắn:
                        <span className="font-normal ml-1">
                          {cus.bookInfo.message}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="px-2 my-7 col-span-2">

            <h3 className="font-semibold text-xl">Điểm nổi bật</h3>
            <div
              className='text-sm font-normal pl-2 my-2'
              dangerouslySetInnerHTML={{ __html: mockData.tour.highlight }}
            />
            <h3 className="font-semibold text-xl">Hành trình tour</h3>
            <div
              className='text-sm font-normal pl-2 mt-2'
              dangerouslySetInnerHTML={{ __html: mockData.tour.introduce }}
            />
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default StaffViewTour;
