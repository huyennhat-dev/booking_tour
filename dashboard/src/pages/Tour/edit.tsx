import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';

import provinces from '../../assets/js/province';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadImage from './UploadImage';
import { useEffect, useState } from 'react';
import userApi from '../../apis/userApi';
import vehicle from '../../assets/js/vehicle';
import CheckboxOne from '../../components/Checkbox/CheckboxOne';

import tourApi from '../../apis/tourApi';
import { TOUR_TYPE } from '../../types';
import { useParams } from 'react-router-dom';

type staffSelectData = {
    slug: string,
    name: string
}

const mockData: TOUR_TYPE = {
    id: 1,
    tour_name:
        'Tour Du lịch Campuchia từ TP.HCM 4 ngày 3 đêm – Khám phá dấu ấn thời gian qua các công trình cổ',
    initial_price: 100,
    departure_day: '2024-05-01',
    end_tour_day: '2024-05-10',
    promotional: 10,
    destination: 'da-nang',
    vehicle: 'plane',
    photos: ['https://i.ibb.co/cYDrVGh/Rectangle-245.png', 'https://i.ibb.co/cYDrVGh/Rectangle-245.png', 'https://i.ibb.co/cYDrVGh/Rectangle-245.png'],
    highlight: `
        <p><strong>Các điểm đến nổi tiếng tại Campuchia</strong></p>
        <ul>
            <li><strong>Đền Angkor Wat:</strong> Được coi là một trong những di sản văn hóa thế giới, đền Angkor Wat là điểm dừng chân không thể bỏ qua khi du lịch Campuchia. Khám phá kiến trúc hoành tráng và lịch sử huy hoàng của đền thánh này.</li>
            <li><strong>Phố cổ Siem Reap:</strong> Thành phố nổi tiếng với kiến trúc cổ điển và không khí yên bình, Phố cổ Siem Reap là điểm dừng chân lý tưởng để tận hưởng những ngày thư giãn.</li>
            <li><strong>Thành phố Phnom Penh:</strong> Là thủ đô và trung tâm văn hóa, kinh tế của Campuchia, Phnom Penh không chỉ thu hút du khách bởi các công trình kiến trúc độc đáo mà còn là nơi lưu giữ nhiều di tích lịch sử và văn hóa đặc sắc.</li>
        </ul>
    `,
    id_manager: 1, // ID của người quản lý tour
    id_staff: 2, // ID của nhân viên phụ trách tour
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
}



const EditTour = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState<staffSelectData[]>([]);

    // const [tour, setTour] = useState<TOUR_TYPE>()

    const [formData, setFormData] = useState<TOUR_TYPE>({
        tour_name: '',
        max_user: 0,
        initial_price: 0,
        departure_day: '',
        end_tour_day: '',
        promotional: 0,
        destination: provinces[0]?.slug,
        vehicle: '',
        id_staff: 1,
        id_manager: 2,
        meal: true,
        insurance: true,
        photos: [],
        introduce: '',
        highlight: ''
    });

    const getStaffFunction = () => {
        userApi.getUsers("staff").then(rs => {
            const userData = rs.users.map((user: any) => ({
                slug: user.id,
                name: user.username
            }));

            setStaff(userData)
        }).catch(err => console.log(err))

    };

    const getTour = () => {
        //call api
        setFormData(mockData)
    }

    useEffect(() => {
        getTour()
        getStaffFunction()
    }, []);




    useEffect(() => {
        console.log(formData)
    }, [formData])


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            tourApi.create(formData)
                .then(rs => { console.log(rs) })
                .catch(err => { console.log(err) })
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi (nếu cần)
        }
    };





    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Tạo mới tour" />
                <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <form action="#">
                            <div className="p-6.5">
                                <div className="mb-4.5 ">
                                    <div className="w-full">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Tên tour
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.tour_name}
                                            onChange={(e) => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    tour_name: e.target.value,
                                                }));
                                            }}
                                            placeholder="Nhập tên tour"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Giá tiền / Người
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.initial_price}
                                            onChange={(e) => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    initial_price: parseInt(e.target.value),
                                                }));
                                            }}
                                            placeholder="Nhập giá tiền"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Giảm giá (%)
                                        </label>
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={formData.promotional}
                                            onChange={(e) => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    promotional: parseInt(e.target.value),
                                                }));
                                            }}
                                            placeholder="Nhập giảm giá"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Số người tối đa
                                        </label>
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={formData.max_user}
                                            onChange={(e) => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    max_user: parseInt(e.target.value),
                                                }));
                                            }}
                                            placeholder="Nhập số người tối đa"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Ngày xuất phát
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.departure_day}
                                            onChange={(e) => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    departure_day: e.target.value,
                                                }));
                                            }}
                                            min={(new Date()).toISOString().split('T')[0]}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Ngày kết thúc
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.end_tour_day}
                                            onChange={(e) => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    end_tour_day: e.target.value,
                                                }));
                                            }}
                                            min={(new Date()).toISOString().split('T')[0]}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/3">
                                        <SelectGroupTwo
                                            defaultValue={formData.destination}
                                            title="Địa điểm"
                                            selectData={provinces}
                                            onSelectChange={(value) => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    destination: value,
                                                }));
                                            }}

                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/3">
                                        <SelectGroupTwo
                                            defaultValue={formData.vehicle}
                                            title="Phương tiện"
                                            selectData={vehicle}
                                            onSelectChange={(value) => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    vehicle: value,
                                                }));
                                            }}

                                        />
                                    </div>
                                    <div className="w-full xl:w-1/3">
                                        <SelectGroupTwo
                                            defaultValue={staff[0]?.slug}

                                            title="Hướng dẫn viên"
                                            selectData={staff}
                                            onSelectChange={(value) => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    id_staff: parseInt(value),
                                                }));
                                            }}
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/3 flex items-end">
                                        <div>
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Tiện ích
                                            </label>
                                            <CheckboxOne title='Bảo hiêm chuyến đi' id='insurance'
                                                onCheckboxChange={(isChecked: boolean, id: string) => {
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        insurance: isChecked,
                                                    }));
                                                }} />
                                            <CheckboxOne title='Ăn uống' id='meal'
                                                onCheckboxChange={(isChecked: boolean, id: string) => {
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        meal: isChecked,
                                                    }));
                                                }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4.5">
                                    <UploadImage title='Chọn ảnh'
                                    imageUrls={formData.photos}

                                        onChangeImageUrl={(ImageUrl: string) => {

                                            if (ImageUrl) {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    photos: [...prevData.photos!, ImageUrl],
                                                }))
                                            }

                                        }}
                                        onRemoveImageUrl={(ImageUrl: string) => {
                                            if (ImageUrl) {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    photos: prevData.photos!.filter(photo => photo !== ImageUrl),
                                                }))
                                            }

                                        }} />
                                </div>


                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Điểm chú ý về tour
                                    </label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formData.highlight}
                                        onChange={(_event, editor) => {
                                            const data = editor.getData()
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                highlight: data,
                                            }));
                                        }}
                                        key="highline"
                                        id="highline"
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nhập mô tả, hành trình của tour
                                    </label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formData.introduce}
                                        onChange={(_event, editor) => {
                                            const data = editor.getData()
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                introduce: data,
                                            }));
                                        }}
                                        key="introduce"
                                        id="introduce"
                                    />
                                </div>

                                <button onClick={handleSubmit} className="flex w-[200px] mx-auto rounded-lg justify-center  bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
};

export default EditTour;
