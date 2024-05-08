
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
import { Spin, UploadFile } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

type staffSelectData = {
    slug: string,
    name: string
}


const EditTour = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState<staffSelectData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [formData, setFormData] = useState<TOUR_TYPE>({
        tour_name: '',
        max_user: 0,
        initial_price: 0,
        departure_day: '',
        end_tour_day: '',
        promotional: 0,
        destination: provinces[0]?.slug,
        vehicle: vehicle[0]?.slug,
        id_staff: 0,
        id_manager: 0,
        meal: false,
        insurance: false,
        photos: [],
        introduce: '',
        highlight: '',
    });

    const handleFileListChange = (newFileList: UploadFile[]) => {
        setFileList(newFileList);
    };
    useEffect(() => {
        const getStaffFunction = () => {
            userApi
                .getStaff()
                .then((rs) => {
                    const staffData = rs.data.map((user: any) => ({
                        slug: user.id,
                        name: user.accountData.username,
                    }));

                    setStaff(staffData);
                })
                .catch((err) => console.log(err));
        };

        const getTour = () => {
            tourApi.getTour(id!).then(rs => {
                const data: TOUR_TYPE = {
                    id: rs.data.id,
                    departure_day: rs.data.departure_day,
                    end_tour_day: rs.data.end_tour_day,
                    destination: rs.data.destination,
                    highlight: rs.data.highlight,
                    insurance: rs.data.insurance,
                    introduce: rs.data.introduce,
                    id_manager: rs.data.id_manager,
                    id_staff: rs.data.id_staff,
                    initial_price: rs.data.initial_price,
                    promotional: rs.data.promotional * 100,
                    max_user: rs.data.max_user,
                    meal: rs.data.meal,
                    tour_name: rs.data.tour_name,
                    vehicle: rs.data.vehicle,
                    point_rating: rs.data.point_rating,
                    photos: rs.data.photos.split(',')
                }
                setFormData(data)
            }).catch(err => {
                console.log(err)
            })
        }

        getTour()
        getStaffFunction();
    }, []);

    useEffect(() => {
        console.log(formData)
    }, [formData])


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true)

        try {
            tourApi.update(formData, id!)
                .then(rs => {
                    setLoading(false)

                    if (rs.statusCode == 200) toast.success("Cập nhật thành công!")
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                    toast.error(err.response?.data?.message)
                })
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi (nếu cần)
        }
    };

    return (
        <>
            <ToastContainer autoClose={2000} />
            <DefaultLayout>
                <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <Spin spinning={loading} delay={500}>
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
                                                min={1}
                                                value={formData.initial_price}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    if (!isNaN(value)) {
                                                        setFormData((prevData) => ({
                                                            ...prevData,
                                                            initial_price: value,
                                                        }));
                                                    }

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
                                                    const value = parseInt(e.target.value);
                                                    if (!isNaN(value)) {
                                                        setFormData((prevData) => ({
                                                            ...prevData,
                                                            promotional: value,
                                                        }));
                                                    }
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
                                                    defaultVal={formData.insurance}
                                                    onCheckboxChange={(isChecked: boolean, id: string) => {
                                                        setFormData((prevData) => ({
                                                            ...prevData,
                                                            insurance: isChecked,
                                                        }));
                                                    }} />
                                                <CheckboxOne title='Ăn uống' id='meal'
                                                    defaultVal={formData.meal}
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
                                        <UploadImage
                                            title="Chọn ảnh"
                                            imageUrls={formData.photos}
                                            fileList={fileList}
                                            setFileList={handleFileListChange}
                                            onChangeImageUrl={(ImageUrl: string) => {
                                                console.log(ImageUrl)
                                                if (ImageUrl) {
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        photos: [...prevData.photos!, ImageUrl],
                                                    }));
                                                }
                                            }}

                                            onRemoveImageUrl={(ImageUrl: string) => {
                                                if (ImageUrl) {
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        photos: prevData.photos!.filter(
                                                            (photo) => photo !== ImageUrl,
                                                        ),
                                                    }));
                                                }
                                            }}
                                        />
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
                                        Cập nhật
                                    </button>
                                </div>
                            </form>
                        </Spin>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
};

export default EditTour;
