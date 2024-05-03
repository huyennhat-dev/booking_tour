import Skeleton from "react-loading-skeleton";
import { calculateDateDifference, formatCurrencyVND } from "../../utils";

const BookingTourCard = ({ data, formData, setFormData }) => {
  return (
    <div className="col-span-4 md:col-span-4 box_shadow rounded-xl flex flex-col gap-2 px-4 md:p-6 py-4 mt-8 md:mt-0">
      <h3 className="text-[24px] font-semibold">Chi tiết đặt tour của bạn</h3>
      <div className="flex items-center">
        {!data.photos ||
        !Array.isArray(data.photos) ||
        data.photos.length === 0 ? (
          <div className="w-[80px] h-[80px] mr-3 rounded">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <img
            src={data.photos[0]}
            className="w-[80px] h-[80px] mr-3 rounded"
          />
        )}
        <h5 className="line-clamp-3 overflow-hidden text-wrap font-medium text-base">
          {data.tour_name}
        </h5>
      </div>
      <div className="border my-3"></div>
      <div className="flex text-sm items-center justify-between">
        <p>Ngày xuất phát:</p>
        <p>{data?.departure_day}</p>
      </div>
      <div className="flex text-sm items-center justify-between">
        <p>Thời gian:</p>
        <p>
          {calculateDateDifference(data?.departure_day, data?.end_tour_day)}{" "}
          Ngày
        </p>
      </div>
      <div className="flex text-sm items-center justify-between">
        <p>Giá sau khuyến mãi:</p>
        <p>
          {formatCurrencyVND(
            data.initial_price - data.initial_price * data.promotional
          )}
        </p>
      </div>
      <div className="flex text-sm items-center justify-between">
        <p>Số lượng vé:</p>
        <input
          type="number"
          name="quantity"
          min={1}
          max={100}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              member: parseInt(e.target.value),
              total_price:
                parseInt(e.target.value) *
                  (data.initial_price - data.initial_price * data.promotional) +
                parseInt(e.target.value) *
                  (data.initial_price - data.initial_price * data.promotional) *
                  0.03,
            }));
          }}
          value={formData.member}
          className="border-[1.5px] border-orange-500 outline-none px-2 py-1 rounded-md text-center "
        />
      </div>
      <div className="border my-3"></div>
      <div className="flex text-sm items-center justify-between">
        <p>Thành tiền:</p>
        <p>
          {formatCurrencyVND(
            formData.member *
              (data.initial_price - data.initial_price * data.promotional)
          )}
        </p>
      </div>
      <div className="flex text-sm items-center justify-between">
        <p>Thuế VAT (3%):</p>
        <p>
          {formatCurrencyVND(
            formData.member *
              (data.initial_price - data.initial_price * data.promotional) *
              0.03
          )}
        </p>
      </div>
      <div className="flex text-sm items-center justify-between">
        <p>Tổng tiền:</p>
        <p> {formatCurrencyVND(formData.total_price)}</p>
      </div>
    </div>
  );
};

export default BookingTourCard;
