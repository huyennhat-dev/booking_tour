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
import { toast } from "react-toastify";

const MyTourItem = ({ data, openModal, isCancel }) => {
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
                {data.tour.promotional > 0 && (
                  <span className="text-slate-500 line-through  mx-1">
                    {formatCurrencyVND(data.tour.initial_price)}
                  </span>
                )}
                <span className="text-[color:#EB662B] text-base font-semibold  mx-1">
                  {formatCurrencyVND(
                    data.tour.initial_price -
                      data.tour.initial_price * data.tour.promotional
                  )}
                </span>
                / vé
              </span>
            </p>
            <p className="text-sm font-medium flex items-center">
              <span>Đã thanh toán {data.status}</span>
              <strong className={`${styles.orangeText} mx-2 text-xl`}>
                {formatCurrencyVND(data?.total_price)}
              </strong>
            </p>
            {!isCancel ? (
              <Button
                title="Hủy Tour"
                onclick={openModal}
                classes={`${styles.orangeText} hover:text-white hover:bg-[color:#EB662B] transition-all duration-300 rounded-lg border border-[#EB662B] w-full py-2 text-base font-medium`}
              />
            ) : (
              <div className="text-sm font-semibold mt-2">
                {data.cancel.is_refund ? (
                  <p className="text-green-600">Đã hoàn tiền</p>
                ) : (
                  <p className="text-orange-600">Chưa hoàn tiền</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyTour = () => {
  const [data, setData] = useState({}); // State để lưu trữ dữ liệu từ API
  const [showModal, setShowModal] = useState(false); // State để kiểm soát việc hiển thị modal
  const [cancelData, setCancelData] = useState({
    // State để lưu trữ thông tin hủy tour
    id_book: 0,
    stk: {
      name: "", // Tên chủ tài khoản
      bank: banksnapas[0].short_name, // Ngân hàng mặc định
      stk: "", // Số tài khoản
    },
    reason: "", // Lý do hủy tour
  });

  const handleToggle = () => {
    setShowModal(!showModal); // Hàm để thay đổi trạng thái hiển thị của modal
  };

  const getData = () => {
    // Hàm để lấy dữ liệu từ API khi component được tạo
    homeApi
      .getBookTours()
      .then((rs) => {
        // Chỉnh sửa dữ liệu nhận được từ API trước khi lưu vào state
        const modifyData = {
          ...rs.data,
          bookSuccess: rs.data.bookSuccess.map((e) => {
            return {
              ...e,
              tour: {
                ...e.tour,
                photos: e.tour.photos?.split(","), // Chuyển đổi chuỗi ảnh thành mảng
              },
            };
          }),
          bookCancel: rs.data.bookCancel.map((e) => {
            return {
              ...e,
              tour: {
                ...e.tour,
                photos: e.tour.photos?.split(","), // Chuyển đổi chuỗi ảnh thành mảng
              },
            };
          }),
        };
        setData(modifyData); // Lưu dữ liệu đã chỉnh sửa vào state
      })
      .catch((err) => {
        console.log(err); // Xử lý lỗi nếu có
      });
  };

  useEffect(() => {
    getData(); // Gọi hàm để lấy dữ liệu từ API khi component được tạo
  }, []);

  const handleCancel = () => {
    // Kiểm tra xem các trường thông tin cần thiết đã được điền đầy đủ chưa
    if (!cancelData.reason || !cancelData.stk.name || !cancelData.stk.stk)
      return toast.warning("Bạn phải điền đầy đủ thông tin!");

    // Tạo mới đối tượng cancelData với trường thông tin stk được kết hợp
    const newCancelData = {
      ...cancelData,
      stk: `${cancelData.stk.stk} - ${cancelData.stk.bank} - ${cancelData.stk.name}`,
    };

    // Lọc ra tour đang được hủy và thêm thông tin hủy vào mỗi tour
    const crrTour = data?.bookSuccess
      ?.filter((e) => e.id == cancelData.id_book)
      .map((item) => ({
        ...item,
        cancel: {
          ...newCancelData,
          is_refund: false, // Đặt trạng thái hoàn tiền mặc định
        },
      }));

    // Tạo mới đối tượng newData với tour đã hủy được loại bỏ và thêm vào danh sách tour đã hủy
    const newData = {
      ...data,
      bookSuccess: data?.bookSuccess?.filter((e) => e.id != cancelData.id_book),
      bookCancel: [...crrTour, ...data.bookCancel],
    };

    // Gửi yêu cầu hủy tour đến API
    homeApi
      .cancelTour(newCancelData)
      .then((rs) => {
        // Cập nhật dữ liệu mới sau khi hủy tour thành công
        setData(newData);
        setShowModal(false); // Ẩn modal
        return toast.success("Bạn đã hủy tour thành công!"); // Hiển thị thông báo thành công
      })
      .catch((err) => {
        console.log(err); // Xử lý lỗi nếu có
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
              {data?.bookSuccess?.length > 0 ? (
                data?.bookSuccess?.map((tour, index) => (
                  <MyTourItem
                    key={index}
                    data={tour}
                    isCancel={false}
                    openModal={() => {
                      setCancelData((prev) => ({
                        ...prev,
                        id_book: tour.id,
                      }));
                      setShowModal(true);
                    }}
                  />
                ))
              ) : (
                <div className="w-full flex items-center justify-center h-[300px]">
                  <p className="my-auto">Dữ liệu rỗng</p>
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {data?.bookCancel?.length > 0 ? (
                data?.bookCancel?.map((tour, index) => (
                  <MyTourItem key={index} data={tour} isCancel={true} />
                ))
              ) : (
                <div className="w-full flex items-center justify-center h-[300px]">
                  <p className="my-auto">Dữ liệu rỗng</p>
                </div>
              )}
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
