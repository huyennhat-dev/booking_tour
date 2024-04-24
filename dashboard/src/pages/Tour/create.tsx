import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';

import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';

import provinces from '../../js/province';
import staff from '../../js/staff';
import MultiSelect from '../../components/Forms/MultiSelect';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadImage from './UploadImage';

const CreateTour = () => {
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
                                            placeholder="Nhập giá tiền"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Giảm giá
                                        </label>
                                        <input
                                            type="number"
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
                                        <DatePickerOne title="Thời gian bắt đầu" />
                                    </div>

                                    <div className="w-full xl:w-1/3">
                                        <DatePickerOne title="Thời gian kết thúc" />
                                    </div>
                                    <div className="w-full xl:w-1/3">
                                        <SelectGroupTwo
                                            title="Phương tiện"
                                            selectData={provinces}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <MultiSelect id="multiSelect" title='Chọn hướng dẫn viên' selectData={staff} />
                                </div>
                                <div className="mb-4.5">
                                    <UploadImage title='Chọn ảnh' />
                                </div>


                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Điểm chú ý về tour
                                    </label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data=""
                                        id="highline"
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nhập mô tả, hành trình của tour
                                    </label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data=""
                                        id="introduce"
                                    />
                                </div>


                                <button className="flex w-[200px] mx-auto rounded-lg justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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
