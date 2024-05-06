import {
    CiCalendarDate,
    CiLocationOn,
} from 'react-icons/ci';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { startTransition, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BOOK_INFO, BOOK_TYPE } from '../../types';
import { Empty, Modal, Pagination, Tooltip } from 'antd';
import { MdGroups } from 'react-icons/md';
import { BsCashCoin } from 'react-icons/bs';
import BookDetail from './detail';
import tourApi from '../../apis/tourApi';


const BooksTour = () => {
    const navigate = useNavigate();
    const limit = 10

    const [booksTour, setBooksTour] = useState<BOOK_TYPE[]>([]);
    // const [total, setTotal] = useState<number>(0);

    // const params = useSearchParams();
    // const [currentPage, setCurrentPage] = useState(
    //     parseInt(params[0].get('page') ?? '1'),
    // );

    const [accountFormModal, setAccountFormModal] = useState(false);
    const [modalData, setModalData] = useState<any>()

    useEffect(() => {
        tourApi.getBookTours().then(rs => {
            console.log(rs.data.bookSuccess)

            const modifyData = rs.data?.bookSuccess.map((e: any) => {
                console.log(JSON.parse(JSON.stringify(e.booking_info)))
                return {
                    ...e,
                    booking_info: JSON.parse(e.booking_info)
                };
            });

            setBooksTour(modifyData);
            // setTotal(rs.data?.bookSuccess?.length);

        }).catch(err => console.log(err))

    }, []);


    const handleClickNavigate = (path: string) => {
        startTransition(() => {
            navigate(path);
        });
    };

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
                                {booksTour.map((data, index) => (
                                    <tr key={index} >
                                        <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <p className="text-sm font-bold">{index + 1}</p>
                                        </td>
                                        <td className="border-b text-center w-[200px] h-[140px] border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <img
                                                src={data?.userData?.avatar}
                                                className="mx-auto w-[80px] h-[80px] rounded-full object-cover border-[2.5px] border-stone-400 p-[2px]"
                                            />

                                            <h4 className="font-semibold text-black mt-1">
                                                Nguyễn Đức Bảo
                                            </h4>
                                        </td>
                                        <td className="border-b border-[#eee] text-black py-5 px-4  dark:border-strokedark ">
                                            <h4
                                                onClick={() =>
                                                    handleClickNavigate(`/tour/view/${data.id}`)
                                                }
                                                className="hover:text-blue-600 hover:underline font-semibold text-base cursor-pointer line-clamp-2 overflow-hidden"
                                            >
                                                {data.tourData.tour_name}
                                            </h4>
                                            <h6 className="text-sm mt-1 flex items-center">
                                                <MdGroups size={20} className="mr-2" />
                                                <label className="mr-1">Số người: </label>
                                                {data.member} Người
                                            </h6>
                                            <h6 className="text-sm mt-1 flex items-center">
                                                <CiLocationOn size={18} className="mr-2" />
                                                <label className="mr-1">Điểm đến: </label>
                                                {data.tourData.destination}
                                            </h6>
                                            <h6 className="text-sm mt-1 flex items-center">
                                                <BsCashCoin size={18} className="mr-2" />
                                                <label className="mr-1">Tổng tiền: </label>
                                                {data.total_price} đ
                                            </h6>
                                            <h6 className="text-sm mt-1 flex items-center">
                                                <CiCalendarDate size={18} className="mr-2" />
                                                <label className="mr-1">Ngày xuất phát: </label>
                                                {data.tourData.departure_day}
                                            </h6>
                                        </td>
                                        <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <h6 className="text-sm mt-1 flex">
                                                {data.status == 'success' ? (
                                                    <p className="text-blue-600 font-medium">
                                                        Đã thanh toán
                                                    </p>
                                                ) : (
                                                    <p className="text-red-600 font-medium">
                                                        Chưa thanh toán
                                                    </p>
                                                )}
                                            </h6>
                                        </td>
                                        <td className="border-b h-[140px] border-[#eee] py-5 px-4  dark:border-strokedark  ">
                                            <div className=" flex justify-center">
                                                <Tooltip placement="top" title={'Xem chi tiết'}>
                                                    <button
                                                        onClick={() => {
                                                            setAccountFormModal(true)
                                                            setModalData(booksTour[index])
                                                        }}
                                                        className="p-2 mx-1 rounded-full border-[1px] border-orange-600"
                                                    >
                                                        <FaRegEye fill="orange" />
                                                    </button>
                                                </Tooltip>

                                            </div>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                            <Modal
                                width={900}
                                className='rounded-none'
                                centered
                                open={accountFormModal}
                                onCancel={() => setAccountFormModal(false)}
                                footer={<div></div>}
                            >
                                <BookDetail data={modalData} />
                            </Modal>
                        </table>
                        {booksTour.length == 0 ? <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE} /> : null}

                    </div>
                    {/* {total > 10 ? <div className="w-full my-3 text-center">
                        <Pagination
                            defaultCurrent={currentPage}
                            total={total}
                            showSizeChanger={false}
                            pageSize={limit}
                            onChange={(val) => {
                                navigate({ search: `?page=${val}` });
                            }}
                        />
                    </div> : null} */}
                </div>
            </div>

        </DefaultLayout>
    );
};

export default BooksTour;
