import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import Recommend from "../../components/User/Recommend";
import GridImage from "../../components/User/ImageGrid";
import ButtonComponent from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const DetailPage = () => {
  const data = {
    title: "Tour du lịch Đà Nẵng: Bãi biển Mỹ Khê 1 ngày 1 đêm",
    photos: [
      "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg",
      "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg",
      "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg",
    ],
    price: 1290000,
    sale: 0.31,
    date: "22/11/2024",
    star: 5,

    desc: `<p>Trăm năm trước, lam tinh thế giới rơi vào vô tận vực sâu, toàn dân Thâm Uyên Lĩnh Chủ thời đại mở ra.<br><br>Trở thành Thâm Uyên Lĩnh Chủ, khuếch trương lãnh địa, chống cự vực sâu xâm lấn, lãnh chúa tức hi vọng, lãnh chúa tức thiên mệnh!<br><br>Trăm năm sau thiếu niên, thu hoạch được một phát nhập hồn thiên phú, bảo rương, tài nguyên thủy tinh, sách triệu hồi, mười liên rút tất ra hoàn mỹ? Trăm liên rút tất ra truyền thuyết?<br><br>Cái này còn chờ cái gì?<br><br>Xem như vì vực sâu ý chí Ngô Phong tiếp nhận phỏng vấn: "Ta lúc đầu thật chỉ là không nghĩ mất đi lãnh chúa thân phận, các ngươi tin ta!"<br><br>Coi ngươi nhìn chăm chú vực sâu lúc, ta chính là vực sâu!</p>`,
  };

  return (
    <>
      <Navbar />
      <main className="px-28 py-10">
        <div className="grid  grid-cols-4 gap-4 shadow-custom rounded-md p-4">
          <div className="col-span-3">
            <GridImage photos={data.photos} />

            <h4 className="px-3 font-semibold  text-[26px] py-3 text-wrap">
              {data.title}
            </h4>
            <div className="flex justify-between px-6 items-center">
              <p>
                <FontAwesomeIcon
                  className="text-[color:var(--color-primary)]"
                  icon={faLocationDot}
                />
                <span className="ml-2">
                  Vị trí: <strong>Hà Tĩnh</strong>
                </span>
              </p>
              <p>
                <FontAwesomeIcon
                  className="text-[color:var(--color-primary)]"
                  icon={faCalendarDays}
                />
                <span className="ml-2">
                  Thời gian: <strong>4 Ngày</strong>
                </span>
              </p>
              <p>
                <FontAwesomeIcon
                  className="text-[color:var(--color-primary)]"
                  icon={faBus}
                />
                <span className="ml-2">
                  Phương tiện: <strong>Xe Khách</strong>
                </span>
              </p>
            </div>
            <h4 className="px-3 font-semibold  text-[22px] pt-3 text-wrap">
              Mô tả tour
            </h4>
            <div
              className="p-3"
              dangerouslySetInnerHTML={{ __html: data.desc }}
            />
          </div>
          <div className="">
            <div className="w-full shadow-custom p-4 bg-[#3C669E]">
              <h2 className=" text-[20px] text-[color:var(--color-primary)] font-bold">
                {data.price - data.price * data.sale} đ / Người
              </h2>
              <h3 className="text-gray-200 line-through font-semibold text-[18px]">
                {data.price} đ
              </h3>
              <p className="text-white ">
                Ngày khởi hành: <strong>{data.date}</strong>
              </p>
              <div className="flex w-full justify-center">
                <ButtonComponent
                  onClick={() => {}}
                  className="mt-3 mx-auto w-[90%]  border-[2px] font-semibold"
                  text="Đặt Ngay"
                />
              </div>
            </div>
            <Recommend />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DetailPage;
