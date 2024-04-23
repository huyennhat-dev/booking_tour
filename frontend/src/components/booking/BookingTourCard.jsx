const BookingTourCard = (params) => {
  return (
    <div className="col-span-4 md:col-span-4 box_shadow rounded-xl flex flex-col gap-2 px-4 md:p-6 py-4 mt-8 md:mt-0">
      <h3 className="text-[24px] font-semibold">Chi tiết đặt tour của bạn</h3>
      <div className="flex items-center">
        <img
          src="https://viatour-reactjs.ibthemespro.com/img/hero/1.png"
          className="w-[80px] h-[80px] mr-3 rounded"
        />
        <h5 className="line-clamp-2 overflow-visible text-wrap font-medium text-base">
          Zipline 18 Platform and ATV Adventure Tour From Phuket
        </h5>
      </div>
      <div className="border my-3"></div>
      <div className="flex text-sm items-center justify-between">
        <p>Ngày xuất phát:</p>
        <p>06 April 2023</p>
      </div>
      <div className="flex text-sm items-center justify-between">
        <p>Thời gian:</p>
        <p>5 Ngày</p>
      </div>
      <div className="flex text-sm items-center justify-between">
        <p>Giá sau khuyến mãi:</p>
        <p>100000 đ</p>
      </div>
      <div className="flex text-sm items-center justify-between">
        <p>Số lượng người:</p>
        <p>10 Người</p>
      </div>
      <div className="border my-3"></div>
      <div className="flex text-sm items-center justify-between">
        <p>Thành tiền:</p>
        <p>100000 đ</p>
      </div>
      <div className="flex text-sm items-center justify-between">
        <p>Thuế VAT:</p>
        <p>100000 đ</p>
      </div>
      <div className="flex text-sm items-center justify-between">
        <p>Tổng tiền:</p>
        <p>100000 đ</p>
      </div>
    </div>
  );
};

export default BookingTourCard;
