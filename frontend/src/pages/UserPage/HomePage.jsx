import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faCheckCircle,
  faGift,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import Banner from "../../components/User/Banner";
import Heading from "../../components/User/Heading";
import LocationCard from "../../components/User/LocationCard";
import TourCard from "../../components/User/TourCard";

import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";

const HomePage = () => {
  const gift = [
    {
      img: "https://www.vietnambooking.com/wp-content/uploads/2023/06/bao-sale-don-he-san-ve-may-bay.png",
      title: "Voucher giảm 500.000 VNĐ cho tour du lịch Hạ Long 3 ngày 2 đêm",
      url: "url_đến_trang_voucher_1",
    },
    {
      img: "https://www.vietnambooking.com/wp-content/uploads/2023/06/combo-du-lich-uu-dai-muon-noi-3-6-2023.png",
      title: "Voucher giảm 20% cho tour trekking Sapa 2 ngày 1 đêm",
      url: "url_đến_trang_voucher_2",
    },
    {
      img: "https://www.vietnambooking.com/wp-content/uploads/2023/06/baivietkhuyenmai_725x463.png",
      title:
        "Voucher giảm giá 30% cho tour khám phá Phong Nha - Kẻ Bàng 4 ngày 3 đêm",
      url: "url_đến_trang_voucher_3",
    },
  ];

  const connect_user = [
    {
      icon: faBus,
      iconColor: "#59CA00",
      text: "Hàng trăm tour mỗi ngày được tạo bởi các công ty du lịch uy tín",
    },
    {
      icon: faGift,
      iconColor: "#FF0000",
      text: "Đặt tour nhanh và thông tin chi tiết",
    },
    {
      icon: faCheckCircle,
      iconColor: "#CC00FF",
      text: "Hoàn ngay 150% nếu không có vé tour, mang đến hành trình du lịch trọn vẹn",
    },
    {
      icon: faTags,
      iconColor: "#DFE307",
      text: "Hàng trăm ưu đãi hấp dẫn tại chỉ có  ở BookingTour",
    },
  ];

  return (
    <>
      <Navbar />
      <Banner />
      <Heading title="Tour ưu đãi đặc biệt" />
      <div className=" grid grid-cols-3 px-28 py-2 gap-6">
        {[1, 2, 3].map((e) => (
          <TourCard
            key={e}
            data={{
              img: "https://media.travel.com.vn//destination/dg_230628_Ha-noi.jpg",
              title:
                "Hà Nội Quy Nhơn: Dịch vụ xe Khứ Hồi + 2 đêm nghỉ dưỡng tại L'Amor Boutique 4 sao (Đã bao gồm ăn sáng)",
              desc: "Quy Nhơn: Dịch vụ xe Khứ Hồi + 2 đêm nghỉ dưỡng tại L'Amor Boutique 4 sao (Đã bao gồm ăn sáng)",
              rate: 5,
              price: 2050000,
              sale: 0.225,
              departurePoin: "Tp Hồ Chí Minh",
              date: "17/04/2024",
            }}
          />
        ))}
      </div>
      <Heading title="Điểm đến yêu thích" />
      <div className=" grid grid-cols-4 px-28 py-2 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
          <LocationCard
            key={e}
            data={{
              img: "https://media.travel.com.vn//destination/dg_230628_Ha-noi.jpg",
              title: "Hà Nội",
              view: 1000,
            }}
          />
        ))}
      </div>
      <Heading title="Ưu đãi" />
      <div className=" grid grid-cols-3 px-28 py-2 gap-9">
        {gift.map((e, index) => (
          <a
            key={index}
            href={e.url}
            className="rounded-md overflow-hidden border-[1.5px] shadow-custom"
          >
            <img className="" src={e.img} alt={e.title} />
            <h6 className="title font-semibold px-3 py-2 text-wrap truncate overflow-hidden line-clamp-2">
              {e.title}
            </h6>
          </a>
        ))}
      </div>
      <Heading title="Hệ thống kết nối du khách và các tour" />
      <div className=" grid grid-cols-4 px-28 py-2 gap-9">
        {connect_user.map((e, index) => (
          <div className="rounded-md shadow-custom p-3 text-center" key={index}>
            <FontAwesomeIcon
              icon={e.icon}
              className="text-[30px] my-3"
              color={e.iconColor}
            />
            <p className="text-[16px]">{e.text}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
