import { CiBank, CiCalendarDate } from 'react-icons/ci';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaEnvelopeOpenText, FaRegEye } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { startTransition, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { CANCEL_TOUR_TYPE } from '../../types';
import { Empty, Modal, Pagination, Tooltip } from 'antd';
import { BsCashCoin } from 'react-icons/bs';
import BookDetail from './detail';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import tourApi from '../../apis/tourApi';
import axios from 'axios';
import { formatDate } from '@fullcalendar/core/index.js';

const CancelTours = () => {
    const navigate = useNavigate();
    const limit = 10;

    const [cancelTours, setCancelTours] = useState<CANCEL_TOUR_TYPE[]>([]);
    // const [total, setTotal] = useState<number>(0);

    // const params = useSearchParams();
    // const [currentPage, setCurrentPage] = useState(
    //     parseInt(params[0].get('page') ?? '1'),
    // );

    const [accountFormModal, setAccountFormModal] = useState(false);
    const [qrData, setQrData] = useState<string[]>([]);

    const [modalData, setModalData] = useState<any>()

    const getQrImage = (data: {
        name: string;
        bank: string;
        amount: string;
        stk: string;
    }) => {
        const payloadData = {
            accountNo: data.stk,
            accountName: data.name,
            acqId: data.bank,
            amount: data.amount,
            addInfo: 'Tourz hoàn tiền đặt vé',
            format: 'text',
            template: 'compact',
        };

        axios
            .post('https://api.vietqr.io/v2/generate', { ...payloadData })
            .then((rs) => {
                setQrData((prev) => ([
                    ...prev,
                    rs.data.data.qrDataURL
                ]))
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        tourApi
            .getBookTours()
            .then((rs) => {
                const modifyData = rs.data?.bookCancel.map((e: any) => {
                    return {
                        ...e,
                        booking_info: JSON.parse(e.booking_info),
                        cancelData: {
                            ...e.cancelData,
                            stk: JSON.parse(e.cancelData.stk),
                        },
                    };
                }).sort((a: CANCEL_TOUR_TYPE, b: CANCEL_TOUR_TYPE) => {
                    if (a.cancelData.is_refund && !b.cancelData.is_refund) {
                        return 1;
                    }
                    if (!a.cancelData.is_refund && b.cancelData.is_refund) {
                        return -1;
                    }
                    return 0;
                });

                setCancelTours(modifyData);

                // setTotal(rs.data?.bookSuccess?.length);
            })
            .catch((err) => console.log(err));
    }, []);


    useEffect(() => {

        cancelTours.map((e: CANCEL_TOUR_TYPE) => {
            getQrImage({
                amount: (calculateDaysDiff(
                    e.cancelData.createdAt,
                    e.tourData.departure_day,
                ) > 7
                    ? e.total_price
                    : e.total_price * 0.75).toString(),
                bank: e.cancelData.stk.bank,
                name: e.cancelData.stk.name,
                stk: e.cancelData.stk.stk,
            });
        });
    }, [cancelTours])


    const handleClickNavigate = (path: string) => {
        startTransition(() => {
            navigate(path);
        });
    };

    const handleRefundClick = (index: number) => {
        const cancelId = cancelTours[index].cancelData.id!;

        tourApi
            .refundMoney(cancelId)
            .then((rs) => {
                toast.success('Đã xác nhận hoàn tiền');
                setCancelTours((prev) => {
                    return [
                        ...prev.map((item, i) => {
                            if (i === index) {
                                return {
                                    ...item,
                                    cancelData: {
                                        ...item.cancelData,
                                        is_refund: true,
                                    },
                                };
                            }
                            return item;
                        }),
                    ];
                });
            })
            .catch((err) => console.log(err));
    };

    const calculateDaysDiff = (date1String: string, date2String: string) => {
        const date1 = new Date(date1String);
        const date2 = new Date(date2String);

        date1.setUTCHours(0, 0, 0, 0);
        date2.setUTCHours(0, 0, 0, 0);

        const timeDiff = Math.abs(date2.getTime() - date1.getTime());

        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return daysDiff;
    }


    return (
        <DefaultLayout>
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
                                    <th className="w-min-[120px] py-4 px-4 text-left font-medium text-black dark:text-white">
                                        Thông tin
                                    </th>
                                    <th className="text-center w-min-[120px] py-4 px-4  font-medium text-black dark:text-white">
                                        QR
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

                                    <tr key={index}>
                                        <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <p className="text-sm font-bold">{index + 1}</p>
                                        </td>
                                        <td className="border-b text-center w-[200px] h-[140px] border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <img
                                                src={data.userData.avatar}
                                                className="mx-auto w-[80px] h-[80px] rounded-full object-cover border-[2.5px] border-stone-400 p-[2px]"
                                            />

                                            <h4 className="font-semibold text-black mt-1">
                                                {data.userData.name}
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
                                                <BsCashCoin size={18} className="mr-2" />
                                                <label className="mr-1">Tiền đặt tour: </label>
                                                <b>{data.total_price} đ</b>
                                            </h6>
                                            <h6 className="text-sm mt-1 flex items-center">
                                                <FaMoneyBillTransfer size={18} className="mr-2" />
                                                <label className="mr-1">Tiền phải hoàn: </label>
                                                <b>
                                                    {calculateDaysDiff(
                                                        data.cancelData.createdAt,
                                                        data.tourData.departure_day,
                                                    ) > 7
                                                        ? data.total_price
                                                        : data.total_price * 0.75}
                                                    đ
                                                </b>
                                            </h6>
                                            <h6 className="text-sm mt-1 flex items-center">
                                                <CiCalendarDate size={18} className="mr-2" />
                                                <label className="mr-1">Ngày hủy: </label>
                                                {formatDate(data.cancelData.createdAt)}
                                            </h6>
                                            <h6 className="text-sm mt-1 flex items-center">
                                                <FaEnvelopeOpenText size={17} className="mr-2" />
                                                <label className="mr-1">Lý do hủy: </label>
                                                {data.cancelData.reason}
                                            </h6>
                                        </td>
                                        <td className="border-b  border-[#eee] px-4 text-center py-4 dark:border-strokedark ">
                                            <img
                                                src={qrData[index]}
                                                alt=""
                                                className="w-[140px] mx-auto"
                                            />
                                        </td>
                                        <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <h6 className="text-sm mt-1 flex">
                                                {data.cancelData.is_refund ? (
                                                    <p className="text-sky-600 font-medium">
                                                        Đã hoàn tiền
                                                    </p>
                                                ) : (
                                                    <p className="text-red-600 font-medium">
                                                        Đợi hoàn tiền
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
                                                            setModalData(cancelTours[index])
                                                        }}
                                                        className="p-2 mx-1 rounded-full border-[1px] border-orange-600"
                                                    >
                                                        <FaRegEye fill="orange" />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip
                                                    placement="top"
                                                    title={'Xác nhận hoàn tiền'}
                                                >
                                                    <button
                                                        disabled={
                                                            data.cancelData.is_refund ? true : false
                                                        }
                                                        onClick={() => {
                                                            !data.cancelData.is_refund
                                                                ? handleRefundClick(index)
                                                                : null;
                                                        }}
                                                        className={`p-2 mx-1 rounded-full border-[1px] ${data.cancelData.is_refund ? ' border-stone-500' : ' border-green-600'}`}
                                                    >
                                                        <FaMoneyBillTransfer
                                                            fill={`${data.cancelData.is_refund ? ' gray' : 'green'}`}
                                                        />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>


                                ))}
                                <Modal
                                    width={900}
                                    className="rounded-none"
                                    centered
                                    open={accountFormModal}
                                    onCancel={() => setAccountFormModal(false)}
                                    footer={<div></div>}
                                >
                                    <BookDetail data={modalData} />
                                </Modal>
                            </tbody>
                        </table>
                        {cancelTours.length == 0 ? <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE} /> : null}

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

export default CancelTours;
