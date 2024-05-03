import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { styles } from "../styles/styles";
import { useEffect, useState } from "react";
import { CiClock1, CiLocationOn } from "react-icons/ci";
import {
  calculateDateDifference,
  createSlug,
  formatCurrencyVND,
  getProvinceName,
} from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import Button from "../components/global/Button";
import { IoClose } from "react-icons/io5";

import banksnapas from "../_mock/banksnapas";
import homeApi from "../apis/homeApi";
const mockData = {
  statusCode: 200,
  data: [
    {
      id: 12,
      booking_info: {
        name: "Trương Huy Hoàng",
        email: "hoangdz00123@gmail.com",
        phone_number: "0773312827",
        address: "470 Trần Đại Nghĩa - Hoa Hai - Ngu Hanh Son - Đà Nẵng",
        message: "Dat tour",
      },
      tour: {
        id: 5,
        tour_name:
          "Tour du lịch Đà Nẵng – Hội An – Huế – Thánh Địa La Vang – Động Phong Nha 5N4Đ dịp Lễ 30/4",
        initial_price: 4938000,
        departure_day: "2024-05-07",
        end_tour_day: "2024-05-10",
        promotional: 0.15,
        destination: "da-nang",
        vehicle: "bus",
        photos:
          "http://res.cloudinary.com/huyennhat/image/upload/v1714746352/images/booking_tour/ucxep3kokaz6qe3jwscu.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714746355/images/booking_tour/fmvpkeezpzaanmypyxfx.jpg,http://res.cloudinary.com/huyennhat/image/upload/v1714746359/images/booking_tour/lvuqjzjrb2j5of067w0s.jpg",
        highlight:
          '<ul><li>Hành trình khám phá Động Phong Nha, Động Thiên Đường - Nơi được mệnh danh là "Hoàng cung dưới lòng đất".</li><li>Đắm chìm trong không gian cổ kính, hoài niệm của một thời kỳ&nbsp;lịch sử đã qua tại Cố Đô Huế.</li><li>Chinh phục Bà Nà Hills bằng cáp treo đạt kỷ lục Guiness thế giới.</li><li>Tìm về một chút bình yên giữa lòng phố cổ thanh bình, tĩnh lặng.</li></ul>',
        introduce:
          '<h3><strong>NGÀY 1 | TP.HCM - ĐÀ NẴNG - BÁN ĐẢO SƠN TRÀ - SUN WHEEL (ĂN TRƯA/TỐI)</strong></h3><p><strong>Sáng:</strong> Quý khách tập trung tại sân bay để làm thủ tục đáp chuyến bay đi <strong>Đà Nẵng</strong>. Sau khi đã đến được Đà Nẵng, HDV của <a href="http://vietnambooking.vn/"><strong>Vietnam Booking</strong></a> sẽ đón quý khách tại điểm hẹn trung tâm thành phố từ 7h - 11h30. Nếu không đến kịp lúc trong khoảng thời gian này, quý khách tự túc nhập đoàn. <strong>Tour du lịch Đà Nẵng Hội An Huế Quảng Bình 5N4Đ</strong> chính thức khởi hành!</p><p><strong>Trưa:</strong> HDV đưa quý khách đi ăn trưa với các món đặc sản nổi tiếng từ Đà Nẵng như "Bánh tráng thịt heo 2 đầu da và mì Quảng". Sau đó, HDV đưa quý khách đến khách sạn để nhận phòng và nghỉ ngơi.&nbsp;</p><p><strong>Chiều:</strong> <strong>Tour du lịch Đà Nẵng</strong> sẽ bắt đầu với một số địa danh nổi tiếng như:</p><ul><li><strong>Bán Đảo Sơn Trà: </strong>Đây là đảo nổi được hợp thành bởi 3 ngọn núi. Nơi đây không chỉ sở hữu hệ thống sinh thái đa dạng, đặc sắc mà còn có rất nhiều cảnh quan hấp dẫn, ẩm thực phong phú.</li><li><strong>Viếng chùa Linh Ứng Tự: </strong>Ngôi chùa tọa lạc trên độ cao 693 mét so với mực nước biển. Hiện nay, chùa Linh Ứng Tự đang nắm giữ kỷ lục "Bức tượng Phật Quan Thế Âm cao nhất Việt Nam.&nbsp;</li></ul><p><strong>Tối:</strong> Đoàn dùng bữa tối tại nhà hàng địa phương. Sau đó, quý khách tự do trải nghiệm cảm giác với<strong> Vòng quay Mặt Trời Sun Wheel</strong> - Top 10 vòng quay cao nhất thế giới. Phóng tầm mắt từ trên cao, quý khách có thể chiêm ngưỡng toàn cảnh thành phố Đà Nẵng về đêm lung linh trong hàng nghìn ánh đèn rực rỡ (Chi phí tự túc).</p><h3><strong>NGÀY 2 | NGŨ HÀNH SƠN -&nbsp; HỘI AN - JEEP TOUR (ĂN SÁNG/TRƯA)</strong></h3><p><strong>Sáng:</strong> Quý khách dùng điểm tâm sáng tại nhà hàng địa phương. <strong>Tour du lịch Đà Nẵng Hội An Huế Quảng Bình 5N4Đ</strong> tiếp tục chuyến hành trình khám phá<strong> 1 TRONG 2 OPTION</strong> mà Vietnam Booking đưa ra:</p><p><strong>OPTION 1: TRẢI NGHIỆM VÒNG QUAY CẦU RỒNG</strong></p><ul><li><strong>Vòng quay Cầu Rồng: </strong>Nơi lưu lại dấu ấn tình yêu của các cặp đôi trên Cầu Tình Yêu. Đồng thời, quý khách có thể tản bộ và hít thở bầu không khí trong lành, mát mẻ của bên bờ Hàn Giang với tượng Cá Chép Hóa Rồng - Biểu tượng vươn lên của người dân Đà Nẵng.&nbsp;</li><li>Mua sắm các<strong> đặc sản miền Trung </strong>để mua về quà biếu tặng người thân, bạn bè.</li></ul><p><strong>OPTION 2: THAM GIA CHƯƠNG TRÌNH JEEP TOUR</strong>&nbsp;</p><ul><li>Trải nghiệm <strong>ngồi xe Jeep tham quan bán đảo Sơn Trà.</strong></li><li>Tham quan<strong> Đài phát sóng DRT.</strong></li><li>Ngắm nhìn <strong>toàn cảnh Thành phố Đà Nẵng có độ cao 230 mét và Nhà Vọng Cảnh ở độ cao 580 mét.</strong></li><li>Chinh phục đỉnh <strong>Bàn Cờ Tiên.</strong></li><li>Chiêm ngưỡng cây đa ngàn năm tuổi - <strong>Bách Đại Thụ </strong>(chi phí 1.500.000 VNĐ/xe/3 khách).</li></ul><p><strong>Trưa:</strong> Đoàn dùng cơm trưa tại nhà hàng.&nbsp;</p><p><strong>Chiều:</strong> Chuyến hành trình khám phá dải đất miền Trung tiếp tục khởi hành đến các địa danh du lịch nổi tiếng như:</p><ul><li><strong>Núi Ngũ Hành Sơn.</strong></li><li><strong>Làng Nghề Điêu Khắc.</strong></li></ul><p>Xe tiếp tục di chuyển đến <strong>Phố Cổ Hội An</strong> để quý khách có thể check-in và chiêm ngưỡng vẻ đẹp hoài cổ, mộc mạc của phố cổ . Đến Hội An, du khách tự do viếng thăm và chiêm bái tại Chùa Cầu Nhật Bản, Nhà Cổ hàng trăm năm tuổi, Hội Quán Phước Kiến và Xưởng thủ công mỹ nghệ...</p><p>Quý khách tự túc ăn tối tại các khu phố ẩm thực tại Hội An <strong>(chi phí tự túc).</strong></p><p><strong>Tối:</strong> Đoàn quay trở về Đà Nẵng sau chuyến tham quan Phố cổ. Sau khi về khách sạn nghỉ ngơi, đoàn có thể tự do thưởng ngoạn phong cảnh và du thuyền trên sông Hàn (chi phí tự túc) hoặc đơn giản là check-in "cháy máy" trên Cầu Quay Sông Hàn, cầu Rồng phun lửa và nước vào cuối tuần.</p><p><strong>Nghỉ đêm tại Đà Nẵng.</strong></p><h3><strong>NGÀY 3 | BÀ NÀ HILLS - LĂNG KHẢI ĐỊNH - HUẾ (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng:</strong> Quý khách dùng điểm tâm sáng. Sau đó, <strong>tour du lịch Đà Nẵng Hội An Huế Quảng Bình 5N4Đ</strong> tiếp tục khởi hành đến<strong> Bà Nà Hills - Núi Chúa</strong> <strong>(Vé cáp treo Bà Nà tự túc).</strong></p><p>Đến Bà Nà Hills, du khách có dịp chiêm ngưỡng khoảnh khắc giao mùa đầy hấp dẫn và bất ngờ giữa 4 <strong>mùa Xuân - Hạ - Thu - Đông</strong> chỉ trong 1 ngày. Đến đây, quý khách có thể tận hưởng cảm giác lâng lâng diệu kỳ của chốn bồng lai tiên cảnh.</p><ul><li>Ngồi trên Cabin, du khách sẽ được chiêm ngưỡng biển mây giăng kín lối.</li><li>Viếng <strong>chùa Linh Ứng Tự và tượng Phật Thích Ca cao đến 27 mét.</strong></li><li>Viếng đền thờ <strong>Bà Chúa Mẫu Thượng Ngàn.&nbsp;</strong></li><li>Tham gia các trò chơi hấp dẫn tại<strong> công viên giải trí Fantasy Park</strong>: Vòng Quay Tình Yêu, Phi Công Skiver, Đường Đua Lửa, Ngôi Nhà Ma và Khu trưng bày hơn 40 tượng sáp những nhân vật nổi tiếng trên thế giới.</li></ul><p>Trong trường hợp quý khách không đi tham quan <strong>Bà Nà Hills</strong>, quý khách có thể tự do nghỉ ngơi tại khách sạn hoặc tham gia chương trình tắm bùn khoáng nóng Galina với <strong>tổng chi phí 350.000 VNĐ/khách</strong>. Quý khách nghỉ ngơi đến 11h30\'. Sau đó, trả phòng và nhập đoàn để ăn trưa.</p><p><strong>Trưa:</strong> Cả đoàn tập hợp lại ăn trưa tại nhà hàng.</p><p><strong>Chiều:</strong> Xe và HDV khởi hành đi <strong>Cố Đô Huế</strong> - Di sản văn hóa Thế giới, xuyên hầm đường bộ đèo Hải Vân. Sau khi xe dừng chân tại <strong>làng chài Lăng Cô</strong>, cả đoàn sẽ chụp ảnh lưu niệm. Chuyến xe tiếp tục đưa quý khách đến tham quan:</p><ul><li><strong>Lăng Khải Định: </strong>Đây được xem là công trình mang nhiều trường phái kiến trúc khác nhau khi kết hợp hoàn hảo giữa truyền thống phương Đông lẫn phương Tây, Á - Âu, Cổ Kim vô cùng độc đáo. Có thể nói, so với công trình kiến trúc kiến trúc truyền thống Việt Nam, Lăng Khải Định được xem là công trình có bước đột phá ngoạn mục trong thời kỳ phong kiến xưa.</li></ul><p>Sau khi kết thúc hành trình tham quan, đoàn về khách sạn nghỉ ngơi.&nbsp;</p><p><strong>Tối:</strong> Quý khách dùng cơm tối tại nhà hàng địa phương với <strong>các món đặc sản Huế</strong> (bánh bèo, lọc, nậm, khoái,...)&nbsp;</p><p>Quý khách lên du thuyền Rồng để thưởng thức ca Huế trên sông Hương. Sau khi kết thúc chương trình, đoàn quay trở lại khách sạn để nghỉ ngơi</p><h3><strong>NGÀY 4 | HUẾ - THÁNH ĐỊA LA VANG - ĐỘNG PHONG NHA (ĂN SÁNG/TRƯA/TỐI)</strong></h3><p><strong>Sáng:</strong> Đoàn dùng điểm tâm sáng rồi khởi hành đi tham quan một số địa danh nổi bật ở<strong> Quảng Bình</strong>:</p><ul><li><strong>Thánh Địa La Vang</strong> - Nơi đây được mệnh danh là Tiểu Vương Cung Thánh Đường và đi ngang qua khu vực Vĩ Tuyến 17.</li><li><strong>Cầu Hiền Lương</strong> - Chiêm ngưỡng dòng sông Bến Hải huyền thoại. Đến đây, quý khách sẽ được lắng nghe thuyết minh chân thực về địa danh lịch sử này.</li></ul><p><strong>Trưa:</strong> Đoàn ăn trưa tại nhà hàng ở Phong Nha.</p><p><strong>Chiều:</strong> Kết thúc bữa trưa, đoàn tiếp tục ngồi thuyền ngược dòng sông Son để chinh phục một số danh thắng nổi tiếng nhất đất <strong>Quảng Bình</strong> như:</p><ul><li><strong>Động Phong Nha: </strong>Khám phá hang Cô Tiên và Cùng Đình dưới sâu lòng núi - Nơi có con sông ngầm chảy từ nước Lào sang. Đồng thời, du khách còn có cơ hội chiêm ngưỡng khối thạch nhũ tuyệt đẹp được kiến tạo bởi thiên nhiên qua hàng ngàn thiên niên kỷ.&nbsp;</li><li>Hoặc du khách có thể lựa chọn tham quan <strong>Động Thiên Đường (thay thế cho Động Phong Nha)</strong>. Nơi đây được mệnh danh là "Hoàng cung lộng lẫy dưới lòng đất". Đến đây, du khách có thể chiêm ngưỡng một trong những kỳ quan tráng lệ và huyền ảo bậc nhất thế giới. (chỉ cần đóng thêm vé tham 100.000 VNĐ/khách là có thể khám phá Động Thiên Đường).</li></ul><p><strong>Tối:</strong> Đoàn khởi hành về <strong>Huế</strong> theo đường Trường Sơn - Hồ Chí Minh Huyền Thoại.</p><p>Đoàn dùng cơm tối tại nhà hàng địa phương. Sau đó, đoàn có thể tự do khám phá <strong>Cố Đô Huế</strong> về đêm trên<strong> Cầu Tràng Tiền </strong>soi bóng dưới dòng sông Hương mơ mộng. Ngoài ra, bạn có thể dạo chợ đêm và khám phá nét văn hóa, sinh hoạt của người dân ở đất kinh thành.</p><p><strong>Nghỉ đêm tại khách sạn ở Huế.</strong></p><h3><strong>NGÀY 5 | CỐ ĐÔ HUẾ - CHÙA THIÊN MỤ - TP.HCM (ĂN SÁNG/TRƯA)</strong></h3><p><strong>Sáng:</strong> Đoàn dùng điểm tâm sáng tại khách sạn. Đoàn khởi hành về <strong>Đại Nội - Hoàng cung triều Nguyễn</strong> để tham quan: Ngọ Môn, Điện Thái Hòa, Tử Cấm Thành, Thế Miếu, Hiển Lâm Các, Cửu Đỉnh,... Sau đó, đoàn tiếp tục di chuyển đến chùa Thiên Mụ cổ kính để viếng thăm và ngắm nhìn những cổ vật quý giá có giá trị về mặt lịch sử lẫn nghệ thuật.</p><p><strong>Trưa:</strong> Đoàn dùng cơm trưa tại nhà hàng tại Huế.</p><p><strong>Chiều:</strong> HDV tiễn quý khách ra sân bay (các chuyến sau 14h00). Sau đó, đoàn làm thủ tục đáp chuyến bay trở về TP.HCM. HDV nói lời chào tạm biệt và hẹn gặp lại quý khách trong chương trình du lịch giá rẻ tiếp theo! <strong>Tour du lịch Đà Nẵng Hội An Huế Quảng Bình 5N4Đ</strong> chính thức kết thúc.</p><p><i><strong>LƯU Ý: Thứ tự và chi tiết trong chương trình có thể thay đổi cho phù hợp với tình hình thực tế, nhưng vẫn đảm bảo đủ điểm đến tham quan!</strong></i></p>',
        createdAt: "2024-05-03T14:21:46.000Z",
        id_staff: 30,
        id_manager: 9,
        insurance: true,
        meal: true,
        max_user: 100,
        point_rating: 5,
        updatedAt: "2024-05-03T14:21:46.000Z",
        staffData: {
          id: 30,
          id_account: 57,
          address: "",
          birthday: "",
          createdAt: "2024-05-03T14:21:46.000Z",
          updatedAt: "2024-05-03T14:21:46.000Z",
          accountData: {
            id: 57,
            email: "hoangdz00123@gmail.com",
            username: "Nguyen Van A",
            phoneNumber: "0773312827",
            role: "staff",
          },
        },
        managerData: {
          id: 9,
          id_account: 58,
          company_name: "",
          birthday: "Invalid date",
          createdAt: "2024-05-03T14:21:46.000Z",
          updatedAt: "2024-05-03T14:21:46.000Z",
          accountData: {
            id: 58,
            email: "thhoang.20it3@vku.udn.vn",
            username: "Nha Cung Cap 1",
            phoneNumber: "0123456789",
            role: "manager",
          },
        },
      },
      status: "success",
      total_price: 10,
      member: 10,
      day_booking: "2024-11-22",
    },
  ],
};

const MyTourItem = ({ data, openModal }) => {
  return (
    <div className="w-full min-h-[500px]">
      <div className="w-full  py-2 flex flex-col gap-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 px-2 border md:p-3 rounded-xl gap-4 hover:shadow-xl duration-200 ease-in-out">
          <img
            src={data?.tour?.photos[0]}
            alt="tour image"
            className="mx-auto md:mx-0 rounded"
          />
          <div className="md:px-2 flex flex-col col-span-2 justify-center items-start">
            <Link
              to={`/tours/${createSlug(data?.tour?.tour_name)}?id=${
                data?.tour?.id
              }`}
            >
              <p className="text-base line-clamp-2 overflow-visible font-semibold hover:text-[color:#EB662B] cursor-pointer duration-100 ease-in-out">
                {data?.tour?.tour_name}
              </p>
            </Link>
            <div className="text-xs font-normal flex items-center justify-between w-full">
              <div className="flex items-center">
                <CiLocationOn className="mr-1" />
                {getProvinceName(data?.tour?.destination)}
              </div>
              <span>Ngày đi: {data?.tour?.departure_day}</span>
              <span className="ml-5">Ngày về: {data?.tour?.end_tour_day}</span>
              <p className="text-xs font-normal flex items-center">
                <CiClock1 className="mr-1" />
                {calculateDateDifference(
                  data?.tour?.departure_day,
                  data?.tour?.end_tour_day
                )}{" "}
                Ngày{" "}
                {calculateDateDifference(
                  data?.tour?.departure_day,
                  data?.tour?.end_tour_day
                ) - 1}{" "}
                Đêm
              </p>
            </div>

            <p className="text-sm font-normal line-clamp-3 overflow-visible">
              {data?.tour?.desc}
            </p>
            <div className="w-full ">
              {data?.tour?.insurance && (
                <p className={`text-xs flex items-center`}>
                  <GiCheckMark fill="#EB662B" className="mr-2" /> Bảo hiểm
                  chuyến đi
                </p>
              )}
              {data?.tour?.meal && (
                <p className={`text-xs flex items-center`}>
                  <GiCheckMark fill="#EB662B" className="mr-2" />
                  Ăn uống trọn gói
                </p>
              )}
              <p className={`text-xs flex items-center`}>
                <GiCheckMark fill="#EB662B" className="mr-2" />
                Hướng dẫn viên nhiệt tình
              </p>
            </div>
          </div>
          <div className="md:ps-3 flex flex-col justify-center py-3 items-center  md:border-l">
            <p className="text-sm font-medium flex items-center">
              <span className="flex items-center">
                Đã đặt
                <strong className="text-[color:#EB662B] text-xl mx-1">
                  {data.member}
                </strong>
                vé
              </span>
            </p>
            <p className="text-sm font-medium flex items-center">
              <span className="flex items-center">
                Giá gốc:
                <span className="text-slate-500 line-through  mx-1">
                  {formatCurrencyVND(data.tour.initial_price)}
                </span>
                <span className="text-[color:#EB662B] text-base font-semibold  mx-1">
                  {formatCurrencyVND(data.tour.initial_price)}
                </span>
                / vé
              </span>
            </p>
            <p className="text-sm font-medium flex items-center">
              <span>Đã thanh toán</span>
              <strong className={`${styles.orangeText} mx-2 text-xl`}>
                {formatCurrencyVND(data?.total_price)}
              </strong>
            </p>
            {data.status == "success" && (
              <Button
                title="Hủy Tour"
                onclick={openModal}
                classes={`${styles.orangeText} hover:text-white hover:bg-[color:#EB662B] transition-all duration-300 rounded-lg border border-[#EB662B] w-full py-2 text-base font-medium`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyTour = () => {
  //   const [cancelId, setMyToursCancelId] = useState(0);
  const [myTours, setMyTours] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cancelData, setCancelData] = useState({
    id_book: 0,
    stk: {
      name: "",
      bank: banksnapas[0].short_name,
      stk: "",
    },
    reason: "",
  });

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const modifyData = mockData.data.map((e) => ({
      ...e,
      tour: {
        ...e.tour,
        photos: e.tour.photos.split(","),
      },
    }));
    setMyTours(modifyData);
  }, []);

  const handleCancel = () => {
    const data = {
      ...cancelData,
      stk: `${cancelData.stk.stk} - ${cancelData.stk.bank} - ${cancelData.stk.name}`,
    };

    console.log(data);

    homeApi
      .cancelTour({})
      .then((rs) => {
        console.log(rs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col gap-y-10">
      <div className={`w-full overflow-hidden ${styles.horizontalPadding}`}>
        <div className="w-full  mt-6">
          <Tabs>
            <TabList>
              <Tab>Tour đã đặt</Tab>
              <Tab>Tour đã huỷ</Tab>
            </TabList>

            <TabPanel>
              {myTours?.map((tour, index) => (
                <MyTourItem
                  key={index}
                  data={tour}
                  openModal={() => {
                    setCancelData((prev) => ({
                      ...prev,
                      id_book: tour.id,
                    }));
                    setShowModal(true);
                  }}
                />
              ))}
            </TabPanel>
            <TabPanel>
              {myTours?.map((tour, index) => (
                <MyTourItem key={index} data={tour} />
              ))}
            </TabPanel>
          </Tabs>
        </div>
        {/* <List rs={data} /> */}
      </div>
      {showModal && (
        <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-40 transition-all duration-500">
          <div
            className="logout-overlay w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 transition-all duration-500 bg-[#303d438c]"
            onClick={handleToggle}
          ></div>
          <div className="absolute center-div w-4/5 md:w-2/5 min-h-[360px] bg-white z-50 box_shadow transition-all duration-500 flex flex-col gap-y-4 py-10 px-4 md:px-10 rounded-xl">
            <div className="absolute top-4 right-4">
              <IoClose
                className="text-xl cursor-pointer"
                onClick={handleToggle}
              />
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-semibold">
                Bạn muốn xác nhận hủy tuor này!?
              </h3>
              <h6 className="text-xs px-1 mt-2 italic">
                Việc hủy tour nếu sát ngày đi sẽ bị trừ <strong>15%</strong>{" "}
                tổng tiền. Hãy cân nhác thật kĩ trước khi hủy!
              </h6>
            </div>
            <div className="w-full">
              <textarea
                type="text"
                value={cancelData.reason}
                onChange={(e) =>
                  setCancelData((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                }
                className={`w-full p-3 rounded-xl border  border-slate-300
                 text-sm font-normal outline-none`}
                placeholder="Xin hãy cho chúng tôi biết lý do hủy của bạn là gì!"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                value={cancelData.stk.name}
                onChange={(e) =>
                  setCancelData((prev) => ({
                    ...prev,
                    stk: {
                      ...prev.stk,
                      name: e.target.value.toUpperCase(),
                    },
                  }))
                }
                className={`w-full p-3 rounded-xl border border-slate-300 text-sm font-normal outline-none`}
                placeholder="Nhập họ tên chủ tài khoản!"
              />
            </div>
            <div className="w-full">
              <input
                type="number"
                name="stk"
                value={cancelData.stk.stk}
                onChange={(e) =>
                  setCancelData((prev) => ({
                    ...prev,
                    stk: {
                      ...prev.stk,
                      stk: e.target.value,
                    },
                  }))
                }
                className={`w-full p-3 rounded-xl border border-slate-300 text-sm font-normal outline-none`}
                placeholder="Nhập số tài khoản của bạn để nhận hoàn tiền!"
              />
            </div>
            <div className="w-full">
              <select
                value={cancelData.stk.bank}
                onChange={(e) =>
                  setCancelData((prev) => ({
                    ...prev,
                    stk: {
                      ...prev.stk,
                      bank: e.target.value,
                    },
                  }))
                }
                className={`w-full p-3 pr-5 rounded-xl border border-slate-300 text-sm font-normal outline-none`}
                placeholder="Nhập số tài khoản của bạn để nhận hoàn tiền!"
              >
                <option disabled></option>
                {banksnapas.map((e, index) => (
                  <option className="my-1" key={index} value={e.short_name}>
                    {e.name} - {e.short_name}
                  </option>
                ))}
                <option disabled></option>
              </select>
            </div>

            <div className="w-full py-0 my-0">
              <Button
                title={"Xác nhận"}
                classes={`w-full py-3 text-white text-sm font-medium rounded-xl ${styles.bgOrange}`}
                onclick={handleCancel}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTour;
