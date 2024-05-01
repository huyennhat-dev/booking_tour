import { BOOK_TYPE } from '../../types';

const BookDetail = ({ data }: { data: BOOK_TYPE }) => {
    return (
        <div className="w-full bg-white dark:bg-black grid grid-cols-4">
            <div className="col-span-1 flex items-center justify-center">
                <div>
                    <img
                        src={data.user.photo}
                        className=" mx-auto w-[100px] h-[100px] rounded-full p-1 border-[3px] border-sky-500"
                        alt=""
                    />
                    <h2 className="text-lg font-semibold my-1">{data.user.name}</h2>
                </div>
            </div>
            <div className="col-span-3 border-l-2 border-l-slate-400 pl-2">
                <h2 className=" text-lg font-semibold">{data.tour.tour_name}</h2>
                <div className="md:flex items-center px-2 my-t">
                    <p className="mr-3">
                        Giá: <b> {data.tour.initial_price} / Người</b>
                    </p>
                    <p className="mr-3">
                        Khuyến mãi: <b>{data.tour.promotional} %</b>
                    </p>
                    <p className="mr-3">
                        Ngày xuất phát: <b>{data.tour.departure_day}</b>
                    </p>
                    <p className="mr-3">
                        Ngày kết thúc: <b>{data.tour.end_tour_day}</b>
                    </p>
                </div>

                <div className='px-2'>
                    Tổng tiền : <span className="font-medium"> {data.total_price}đ </span>
                    cho <span className="font-medium">{data.member} Người</span>
                </div>
                <div className='px-2'>
                    Trạng thái : <span className={`font-medium ${data.status == "success" ? "text-green-600" : "text-danger"}`}>{data.status == "success" ? "Đã thanh toán" : "Chưa thanh toán"} </span>

                </div>
                <h4 className="font-medium text-base mt-2">Thông tin đặt tour</h4>
                <div className="px-2">
                    <p>
                        Tên người đặt:
                        <b className="font-medium text-slate-600">
                            {data.book_info.full_name}
                        </b>
                    </p>
                    <p>
                        Số người:
                        <b className="font-medium text-slate-600"> {data.member}</b>
                    </p>
                    <p>
                        Số điện thoại:
                        <b className="font-medium text-slate-600">
                            {data.book_info.phone_number}
                        </b>
                    </p>
                    <p>
                        Email:
                        <b className="font-medium text-slate-600">
                            {data.book_info.email}
                        </b>
                    </p>
                    <p>
                        Địa chỉ:
                        <b className="font-medium text-slate-600">
                            {data.book_info.address}
                        </b>
                    </p>
                    <p>
                        Ngày đặt:
                        <b className="font-medium text-slate-600"> {data.createdAt}</b>
                    </p>
                    <p>
                        Lời nhắn:
                        <b className="font-medium text-slate-600">
                            {data.book_info.message}
                        </b>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
