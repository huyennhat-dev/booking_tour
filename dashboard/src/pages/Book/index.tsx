import {
    CiCalendarDate,
    CiLocationOn,
} from 'react-icons/ci';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { startTransition, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BOOK_TYPE } from '../../types';
import { Modal, Pagination, Tooltip } from 'antd';
import { MdGroups } from 'react-icons/md';
import { BsCashCoin } from 'react-icons/bs';
import BookDetail from './detail';

const mockData = {
    data: [
        {
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
                tour_name: 'Tour Du lịch Campuchia từ TP.HCM 4 ngày 3 đêm – Khám phá dấu ấn thời gian qua các công trình cổ',
                initial_price: 100,
                departure_day: '2024-05-01',
                end_tour_day: '2024-05-10',
                promotional: 10,
                destination: 'Destination 1',
                vehicle: 'Vehicle 1',
                photos: ['photo1.jpg', 'photo2.jpg'],
                highlight: `
                    <p><strong>Các điểm đến nổi tiếng tại Campuchia</strong></p>
                    <ul>
                        <li><strong>Đền Angkor Wat:</strong> Được coi là một trong những di sản văn hóa thế giới, đền Angkor Wat là điểm dừng chân không thể bỏ qua khi du lịch Campuchia. Khám phá kiến trúc hoành tráng và lịch sử huy hoàng của đền thánh này.</li>
                        <li><strong>Phố cổ Siem Reap:</strong> Thành phố nổi tiếng với kiến trúc cổ điển và không khí yên bình, Phố cổ Siem Reap là điểm dừng chân lý tưởng để tận hưởng những ngày thư giãn.</li>
                        <li><strong>Thành phố Phnom Penh:</strong> Là thủ đô và trung tâm văn hóa, kinh tế của Campuchia, Phnom Penh không chỉ thu hút du khách bởi các công trình kiến trúc độc đáo mà còn là nơi lưu giữ nhiều di tích lịch sử và văn hóa đặc sắc.</li>
                    </ul>
                `,
                id_manager: 1,
                id_staff: 2, 
                insurance: true,
                introduce: `
                <p>
                    Tour du lịch Campuchia từ TP.HCM 4 ngày 3 đêm sẽ đưa du khách khám phá những điểm đến nổi tiếng và thú vị của Campuchia. Trải nghiệm du lịch độc đáo, thưởng thức những món ăn đặc sản, tham quan những điểm du lịch nổi tiếng và tận hưởng những khoảnh khắc đáng nhớ cùng bạn bè và người thân.
                </p>
                <p>
                    Ngày đầu tiên của chuyến đi, du khách sẽ được tham quan Đền Angkor Wat, một trong những kỳ quan của thế giới cổ đại. Sau đó, dừng chân tại phố cổ Siem Reap, nơi bạn có thể thưởng thức những món ăn đặc sản và mua sắm hàng hóa thủ công.
                </p>
                <p>
                    Trong những ngày tiếp theo, chúng ta sẽ thăm quan các điểm du lịch khác nhau, như khu phố cổ Angkor Thom, Bảo tàng Quốc gia Campuchia, và tham quan thành phố thủ đô Phnom Penh với nhiều di tích lịch sử và văn hóa đặc sắc.
                </p>
                <p>
                    Cuối cùng, chúng ta sẽ kết thúc chuyến đi tuyệt vời này với nhiều kỷ niệm đẹp và những câu chuyện đáng nhớ về Campuchia.
                </p>
                <p>
                    Hãy tham gia cùng chúng tôi để khám phá vẻ đẹp và sự hấp dẫn của đất nước Campuchia!
                </p>
            `,

                max_user: 10, // Số lượng người tối đa cho mỗi tour
                meal: true, // Có bao gồm bữa ăn trong tour không
                point_rating: 5, // Điểm đánh giá của tour
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
        {
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
    ],
    total: 100
}

const BooksTour = () => {
    const navigate = useNavigate();
    const limit = 10

    const [booksTour, setBooksTour] = useState<BOOK_TYPE[]>([]);
    const [total, setTotal] = useState<number>(0);

    const params = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        parseInt(params[0].get('page') ?? '1'),
    );

    const [accountFormModal, setAccountFormModal] = useState(false);


    useEffect(() => {
        setBooksTour(mockData.data);
        setTotal(mockData.total);
    }, []);


    const handleClickNavigate = (path: string) => {
        startTransition(() => {
            navigate(path);
        });
    };

    return (
        <DefaultLayout>
            <ToastContainer autoClose={2000} />
            <Breadcrumb pageName="Tour" key={'tour'} />
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
                                    <React.Fragment key={index}>
                                        <tr >
                                            <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                                                <p className="text-sm font-bold">{index + 1}</p>
                                            </td>
                                            <td className="border-b text-center w-[200px] h-[140px] border-[#eee] py-5 px-4  dark:border-strokedark ">
                                                <img
                                                    src={data.user.photo}
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
                                                    {data.tour.tour_name}
                                                </h4>
                                                <h6 className="text-sm mt-1 flex items-center">
                                                    <MdGroups size={20} className="mr-2" />
                                                    <label className="mr-1">Số người: </label>
                                                    {data.member} Người
                                                </h6>
                                                <h6 className="text-sm mt-1 flex items-center">
                                                    <CiLocationOn size={18} className="mr-2" />
                                                    <label className="mr-1">Điểm đến: </label>
                                                    {data.tour.destination}
                                                </h6>
                                                <h6 className="text-sm mt-1 flex items-center">
                                                    <BsCashCoin size={18} className="mr-2" />
                                                    <label className="mr-1">Tổng tiền: </label>
                                                    {data.total_price} đ
                                                </h6>
                                                <h6 className="text-sm mt-1 flex items-center">
                                                    <CiCalendarDate size={18} className="mr-2" />
                                                    <label className="mr-1">Ngày xuất phát: </label>
                                                    {data.tour.departure_day}
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
                                                            onClick={() =>
                                                                setAccountFormModal(true)
                                                            }
                                                            className="p-2 mx-1 rounded-full border-[1px] border-orange-600"
                                                        >
                                                            <FaRegEye fill="orange" />
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
                                            <BookDetail data={booksTour[index]} />
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

export default BooksTour;
