import Pay1 from "../../../assets/images/Rectangle 11.jpg";
import Pay2 from "../../../assets/images/Rectangle 12.jpg";
import Pay3 from "../../../assets/images/Rectangle 13.jpg";
import Pay4 from "../../../assets/images/Rectangle 14.jpg";
import Pay5 from "../../../assets/images/Rectangle 15.jpg";
import Pay6 from "../../../assets/images/Rectangle 16.jpg";
import Pay7 from "../../../assets/images/Rectangle 17.jpg";
import Pay8 from "../../../assets/images/Rectangle 18.jpg";
import Pay9 from "../../../assets/images/Rectangle 19.jpg";
import Pay10 from "../../../assets/images/Rectangle 20.jpg";
import Pay11 from "../../../assets/images/Rectangle 21.jpg";
import Pay12 from "../../../assets/images/Rectangle 22.jpg";

const footer = () => {
  const Pays = [
    Pay1,
    Pay2,
    Pay3,
    Pay4,
    Pay5,
    Pay6,
    Pay7,
    Pay8,
    Pay9,
    Pay10,
    Pay11,
    Pay12,
  ];
  return (
    <footer className="w-[100%] h-[450x] footer-bg mt-20">
      <div className="bg-white bg-opacity-70 w-[100%] h-[450x] px-28 py-10 flex items-center">
        <div className="w-full flex items-center">
          <div className=" w-[60%]">
            <h3 className="text-[30px] font-bold text-black mb-3">
              Thông tin liên hệ
            </h3>
            <p className="text-black font-medium my-2">
              Email: minhquy0898240032@gmail.com
            </p>
            <p className="text-black font-medium my-2">
              Số điện thoại: 0898240032
            </p>
            <p className="text-black font-medium my-2">
              Địa chỉ: 254 Đ Nguyễn Văn Linh, Thạc Gián, Thanh Khê, Đà Nẵng,
              Việt Nam
            </p>
            <p className="text-black font-medium my-2">
              Website: https://www.facebook.com/profile.php?id=100018949579212
            </p>
          </div>
          <div className="w-[40%]">
            <div className="grid grid-cols-3 gap-2">
              {Pays.map((e, index) => (
                <img key={index} src={e}  className="rounded-md "/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
