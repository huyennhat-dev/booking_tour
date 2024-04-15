import Banner from "../components/Banner";
import Heading from "../components/Heading";
import LocationCard from "../components/LocationCard";
import TourCard from "../components/TourCard";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Heading title="Tour ưu đãi đặc biệt" />
      <div className=" grid grid-cols-3 px-20 py-2 gap-5">
        {[1, 2, 3].map((e) => (
          <TourCard
            key={e}
            data={{
              img: "https://media.travel.com.vn//destination/dg_230628_Ha-noi.jpg",
              title: "Hà Nội",
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
      <div className=" grid grid-cols-4 px-20 py-2 gap-4">
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
    </>
  );
};

export default HomePage;
