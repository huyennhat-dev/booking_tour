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
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import tourApi from '../../apis/tourApi';

type staffSelectData = {
    slug: string,
    name: string
}

type tourType = {
    name_tour: string;
    initial_price: number;
    departure_day: string;
    end_tour_day: string;
    promotional: number;
    destination: string;
    vehicle: string;
    id_staff: number;
    id_manager: number;
    meal: boolean;
    insurance: boolean;
    photos: string[];
    introduce: string;
    highlight: string;
};

const CreateTour = () => {
    const [staff, setStaff] = useState<staffSelectData[]>([]);

    useEffect(() => {
        const getStaffFunction = () => {
            userApi.getUsers("staff").then(rs => {
                const userData = rs.users.map((user: any) => ({
                    slug: user.id,
                    name: user.username
                }));

                setStaff(userData)
            }).catch(err => console.log(err))

        };
        getStaffFunction()
    }, []);
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);


    const [formData, setFormData] = useState<tourType>({
        name_tour: '',
        initial_price: 0,
        departure_day: '',
        end_tour_day: '',
        promotional: 0,
        destination: provinces[0]?.slug,
        vehicle: '',
        id_staff: 1,
        id_manager: 2,
        meal: false,
        insurance: false,
        photos: [],
        introduce: '',
        highlight: ''
    });

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
                                            value={formData.name_tour}
                                            onChange={(e) => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    name_tour: e.target.value,
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
                                            defaultValue={provinces[0]?.slug}
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
                                            defaultValue={vehicle[0]?.slug}
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
                                        onChangeImageUrl={(ImageUrl: string) => {

                                            if (ImageUrl) {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    photos: [...prevData.photos, ImageUrl],
                                                }))
                                            }

                                        }}
                                        onRemoveImageUrl={(ImageUrl: string) => {
                                            if (ImageUrl) {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    photos: prevData.photos.filter(photo => photo !== ImageUrl),
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

export default CreateTour;
