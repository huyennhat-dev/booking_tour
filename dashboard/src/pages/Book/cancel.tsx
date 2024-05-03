import { CiBank, CiCalendarDate } from 'react-icons/ci';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaEnvelopeOpenText, FaRegEye } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { startTransition, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { CANCEL_TOUR_TYPE } from '../../types';
import { Modal, Pagination, Tooltip } from 'antd';
import { BsCashCoin } from 'react-icons/bs';
import BookDetail from './detail';
import { FaMoneyBillTransfer } from 'react-icons/fa6';

const mockData = {
    data: [
        {
            id: 1,
            book_tour: {
                id: 1,
                user: {
                    id: 1,
                    email: 'bao@gmail.com',
                    name: 'Nguyen Duc Bao',
                    photo:
                        'https://dungplus.com/wp-content/uploads/2019/12/girl-xinh-768x768.jpg',
                },
                tour: {
                    id: 1,
                    tour_name:
                        'Tour Du lịch Campuchia từ TP.HCM 4 ngày 3 đêm – Khám phá dấu ấn thời gian qua các công trình cổ',
                    initial_price: 100,
                    departure_day: '2024-06-01',
                    end_tour_day: '2024-05-10',
                    promotional: 10,
                    destination: 'Destination 1',
                    vehicle: 'Vehicle 1',
                    photos: ['photo1.jpg', 'photo2.jpg'],
                    highlight: '',
                    id_manager: 1,
                    id_staff: 1,
                    insurance: true,
                    introduce: '',
                    max_user: 10,
                    meal: true,
                    point_rating: 5,
                },
                book_info: {
                    full_name: 'Truong Huy Hoang',
                    email: 'hoang@gmail.com',
                    address: 'Hoa Hai - Ngu Hanh Son - Da Nang / 470 Tran Dai Nghia',
                    message: 'Dat tour cho 4 nguoi',
                    phone_number: '0123456789',
                },
                member: 10,
                total_price: 10000,
                status: 'success',
                createdAt: '22-11-2024'

            },
            is_refund: false,
            reason_cancel: "Huy vi ban viec",
            stk: "9773312827-vcb",
            createdAt: "22-11-2024"
        },
        {
            id: 1,
            book_tour: {
                id: 1,
                user: {
                    id: 1,
                    email: 'bao@gmail.com',
                    name: 'Nguyen Duc Bao',
                    photo:
                        'https://dungplus.com/wp-content/uploads/2019/12/girl-xinh-768x768.jpg',
                },
                tour: {
                    id: 1,
                    tour_name:
                        'Tour Du lịch Campuchia từ TP.HCM 4 ngày 3 đêm – Khám phá dấu ấn thời gian qua các công trình cổ',
                    initial_price: 100,
                    departure_day: '2024-06-01',
                    end_tour_day: '2024-05-10',
                    promotional: 10,
                    destination: 'Destination 1',
                    vehicle: 'Vehicle 1',
                    photos: ['photo1.jpg', 'photo2.jpg'],
                    highlight: '',
                    id_manager: 1,
                    id_staff: 1,
                    insurance: true,
                    introduce: '',
                    max_user: 10,
                    meal: true,
                    point_rating: 5,
                },
                book_info: {
                    full_name: 'Truong Huy Hoang',
                    email: 'hoang@gmail.com',
                    address: 'Hoa Hai - Ngu Hanh Son - Da Nang / 470 Tran Dai Nghia',
                    message: 'Dat tour cho 4 nguoi',
                    phone_number: '0123456789',
                },
                member: 10,
                total_price: 10000,
                status: 'success',
                createdAt: '22-11-2024'

            },
            is_refund: false,
            reason_cancel: "Huy vi ban viec",
            stk: "9773312827-vcb",
            createdAt: "22-11-2024"
        },

    ],
    total: 100
}

const CancelTours = () => {
    const navigate = useNavigate();
    const limit = 10

    const [cancelTours, setCancelTours] = useState<CANCEL_TOUR_TYPE[]>([]);
    const [total, setTotal] = useState<number>(0);

    const params = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        parseInt(params[0].get('page') ?? '1'),
    );

    const [accountFormModal, setAccountFormModal] = useState(false);


    useEffect(() => {
        setCancelTours(mockData.data);
        setTotal(mockData.total);
    }, []);


    const handleClickNavigate = (path: string) => {
        startTransition(() => {
            navigate(path);
        });
    };

    const handleRefundClick = (index: number) => {
        setCancelTours((prev) => {
            return [...prev.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        is_refund: true
                    };
                }
                return item;
            })]
        });
        toast.success("Cập nhật thành công")
    }

    return (
        <DefaultLayout>
            <ToastContainer autoClose={2000} />
            <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="w-[20px] py-4 text-center font-medium text-black dark:text-white ">
                                        STT
                                    </th>
                                    <th className=" py-4 px-4 text-center font-medium text-black dark:text-white">
                                        Hình ảnh
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 text-left font-medium text-black dark:text-white">
                                        Thông tin
                                    </th>
                                    <th className="w-[110px] py-4 px-4 text-left font-medium text-black dark:text-white">
                                        Trạng thái
                                    </th>

                                    <th className=" w-[80px] py-4 px-4 text-center font-medium text-black dark:text-white">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cancelTours.map((data, index) => (
                                    <React.Fragment key={index}>
                                        <tr >
                                            <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                                                <p className="text-sm font-bold">{index + 1}</p>
                                            </td>
                                            <td className="border-b text-center w-[200px] h-[140px] border-[#eee] py-5 px-4  dark:border-strokedark ">
                                                <img
                                                    src={data.book_tour.user.photo}
                                                    className="mx-auto w-[80px] h-[80px] rounded-full object-cover border-[2.5px] border-stone-400 p-[2px]"
                                                />

                                                <h4 className="font-semibold text-black mt-1">
                                                    {data.book_tour.user.name}
                                                </h4>
                                            </td>
                                            <td className="border-b border-[#eee] text-black py-5 px-4  dark:border-strokedark ">
                                                <h4
                                                    onClick={() =>
                                                        handleClickNavigate(`/tour/view/${data.id}`)
                                                    }
                                                    className="hover:text-blue-600 hover:underline font-semibold text-base cursor-pointer line-clamp-2 overflow-hidden"
                                                >
                                                    {data.book_tour.tour.tour_name}
                                                </h4>

                                                <h6 className="text-sm mt-1 flex items-center">
                                                    <BsCashCoin size={18} className="mr-2" />
                                                    <label className="mr-1">Tiền đặt tour: </label>
                                                    <b>{data.book_tour.total_price} đ</b>
                                                </h6>
                                                <h6 className="text-sm mt-1 flex items-center">
                                                    <FaMoneyBillTransfer size={18} className="mr-2" />
                                                    <label className="mr-1">Tiền phải hoàn: </label>
                                                    <b>{data.book_tour.total_price * 0.75} đ</b>
                                                </h6>
                                                <h6 className="text-sm mt-1 flex items-center">
                                                    <CiBank size={18} className="mr-2" />
                                                    <label className="mr-1">Ngân hàng: </label>
                                                    <span className='font-semibold text-sky-600'>{data.stk}</span>
                                                </h6>
                                                <h6 className="text-sm mt-1 flex items-center">
                                                    <CiCalendarDate size={18} className="mr-2" />
                                                    <label className="mr-1">Ngày hủy: </label>
                                                    {data.createdAt}
                                                </h6>
                                                <h6 className="text-sm mt-1 flex items-center">
                                                    <FaEnvelopeOpenText size={17} className="mr-2" />
                                                    <label className="mr-1">Lý do hủy: </label>
                                                    {data.reason_cancel}
                                                </h6>
                                            </td>
                                            <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                                                <h6 className="text-sm mt-1 flex">

                                                    {data.is_refund ? <p className="text-sky-600 font-medium">
                                                        Đã hoàn tiền
                                                    </p> : <p className="text-red-600 font-medium">
                                                        Đợi hoàn tiền
                                                    </p>}
                                                </h6>
                                            </td>
                                            <td className="border-b h-[140px] border-[#eee] py-5 px-4  dark:border-strokedark  ">
                                                <div className=" flex justify-center">
                                                    <Tooltip placement="top" title={'Xem chi tiết'}>
                                                        <button
                                                            onClick={() =>
                                                                setAccountFormModal(true)
                                                            }
                                                            className="p-2 mx-1 rounded-full border-[1px] border-orange-600"
                                                        >
                                                            <FaRegEye fill="orange" />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip placement="top" title={'Xác nhận hoàn tiền'}>
                                                        <button
                                                            disabled={data.is_refund ? true : false}
                                                            onClick={() => { !data.is_refund ? handleRefundClick(index) : null }}
                                                            className={`p-2 mx-1 rounded-full border-[1px] ${data.is_refund ? " border-stone-500" : " border-green-600"}`}
                                                        >
                                                            <FaMoneyBillTransfer fill={`${data.is_refund ? " gray" : "green"}`} />
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                        <Modal
                                            width={900}
                                            className='rounded-none'
                                            centered
                                            open={accountFormModal}
                                            onCancel={() => setAccountFormModal(false)}
                                            footer={<div></div>}
                                        >
                                            <BookDetail data={cancelTours[index].book_tour} />
                                        </Modal>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {total > 10 ? <div className="w-full my-3 text-center">
                        <Pagination
                            defaultCurrent={currentPage}
                            total={total}
                            showSizeChanger={false}
                            pageSize={limit}
                            onChange={(val) => {
                                navigate({ search: `?page=${val}` });
                            }}
                        />
                    </div> : null}
                </div>
            </div>

        </DefaultLayout>
    );
};

export default CancelTours;
