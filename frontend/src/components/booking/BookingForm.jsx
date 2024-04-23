const BookingForm = (params) => {
  return (
    <div className="col-span-8 md:col-span-8 box_shadow rounded-xl flex flex-col gap-2 px-4 md:p-6 py-4 mt-8 md:mt-0">
      <h3 className="text-[24px] font-semibold">
        Hãy điền đầy đủ các thông tin!
      </h3>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6 text-sm">
          <label htmlFor="bookingName" className="w-full mb-1">
            Họ và tên:
          </label>
          <input
            className="w-full outline-none px-2 py-2 border-[1px] border-gray-300 rounded"
            type="text"
            name="name"
            id="bookingName"
          />
        </div>
        <div className="col-span-6 text-sm">
          <label htmlFor="bookingEmail" className="w-full mb-1">
            Email:
          </label>
          <input
            className="w-full outline-none px-2 py-2 border-[1px] border-gray-300 rounded"
            type="email"
            name="email"
            id="bookingEmail"
          />
        </div>
        <div className="col-span-6 text-sm">
          <label htmlFor="bookingPhone" className="w-full mb-1">
            Số điện thoại:
          </label>
          <input
            className="w-full outline-none px-2 py-2 border-[1px] border-gray-300 rounded"
            type="text"
            name="phone-number"
            id="bookingPhone"
          />
        </div>
        <div className="col-span-6 text-sm">
          <label htmlFor="bookingProvince" className="w-full mb-1">
            Tỉnh/ Thành phố:
          </label>
          <input
            className="w-full outline-none px-2 py-2 border-[1px] border-gray-300 rounded"
            type="text"
            name="province"
            id="bookingProvince"
          />
        </div>
        <div className="col-span-6 text-sm">
          <label htmlFor="bookingDistrict" className="w-full mb-1">
            Quận/ Huyện:
          </label>
          <input
            className="w-full outline-none px-2 py-2 border-[1px] border-gray-300 rounded"
            type="text"
            name="district"
            id="bookingDistrict"
          />
        </div>
        <div className="col-span-6 text-sm">
          <label htmlFor="bookingWard" className="w-full mb-1">
            Phường/ Xã:
          </label>
          <input
            className="w-full outline-none px-2 py-2 border-[1px] border-gray-300 rounded"
            type="text"
            name="ward"
            id="bookingWard"
          />
        </div>
        <div className="col-span-12 text-sm">
          <label htmlFor="bookingAddress" className="w-full mb-1">
            Địa chỉ chi tiết
          </label>
          <input
            className="w-full outline-none px-2 py-2 border-[1px] border-gray-300 rounded"
            type="text"
            name="address"
            id="bookingAddress"
          />
        </div>

        <div className="col-span-12 text-sm">
          <label htmlFor="bookingMessage" className="w-full mb-1">
            Lời nhắn:
          </label>
          <textarea
            className="w-full outline-none px-2 py-2 border-[1px] border-gray-300 rounded"
            name="message"
            id="bookingMessage"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
