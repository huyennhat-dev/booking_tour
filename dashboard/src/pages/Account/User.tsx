import { CiLock } from 'react-icons/ci';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';
export type Package = {
    name: string;
    photo: string;
    role: number;
    email: string;
    phone: string;
    status: number;
};

const packageData: Package[] = [
    {
        name: 'John Doe',
        photo: 'john.jpg',
        role: 123,
        email: 'john@example.com',
        phone: '123-456-7890',
        status: 1,
    },
    {
        name: 'Jane Smith',
        photo: 'jane.jpg',
        role: 456,
        email: 'jane@example.com',
        phone: '987-654-3210',
        status: 2,
    },
    {
        name: 'Alice Johnson',
        photo: 'alice.jpg',
        role: 789,
        email: 'alice@example.com',
        phone: '555-555-5555',
        status: 1,
    },
    {
        name: 'Bob Brown',
        photo: 'bob.jpg',
        role: 101,
        email: 'bob@example.com',
        phone: '222-333-4444',
        status: 2,
    },
    {
        name: 'Emma Davis',
        photo: 'emma.jpg',
        role: 202,
        email: 'emma@example.com',
        phone: '777-888-9999',
        status: 1,
    },
    {
        name: 'Michael Wilson',
        photo: 'michael.jpg',
        role: 303,
        email: 'michael@example.com',
        phone: '666-666-6666',
        status: 1,
    },
    {
        name: 'Sarah Taylor',
        photo: 'sarah.jpg',
        role: 404,
        email: 'sarah@example.com',
        phone: '123-123-1234',
        status: 2,
    },
    {
        name: 'David Clark',
        photo: 'david.jpg',
        role: 505,
        email: 'david@example.com',
        phone: '999-999-9999',
        status: 1,
    },
    {
        name: 'Olivia Martinez',
        photo: 'olivia.jpg',
        role: 606,
        email: 'olivia@example.com',
        phone: '444-444-4444',
        status: 2,
    },
    {
        name: 'James Rodriguez',
        photo: 'james.jpg',
        role: 707,
        email: 'james@example.com',
        phone: '888-888-8888',
        status: 1,
    },
];

const AccountUser = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Account" />
            <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="max-w-[30px] py-4 text-center font-medium text-black dark:text-white ">
                                        STT
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                                        Hình ảnh
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 text-left font-medium text-black dark:text-white">
                                        Thông tin
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 text-left font-medium text-black dark:text-white">
                                        Trạng thái
                                    </th>

                                    <th className="py-4 px-4 text-left font-medium text-black dark:text-white">
                                        Chức năng
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {packageData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <p className="text-sm">{index + 1}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <img
                                                src={data.photo}
                                                alt=""
                                                className="w-[80px] h-[80px] rounded-sm"
                                            />
                                        </td>
                                        <td className="border-b border-[#eee] text-black py-5 px-4  dark:border-strokedark ">
                                            <h4 className="font-semibold text-base">{data.name}</h4>
                                            <h6 className="text-sm mt-1">Email: {data.email}</h6>
                                            <h6 className="text-sm mt-1">Sdt: {data.phone}</h6>
                                            <h6 className="text-sm mt-1">Vai trò: {data.role}</h6>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <div>{data.status == 0 ? 'Bình thường' : 'Tạm khóa'}</div>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <button
                                                className={`flex items-center rounded-md text-white px-2 py-1 ${data.status == 0 ? 'bg-orange-600' : 'bg-sky-500'}`}
                                            >
                                                <CiLock strokeWidth={1.5} className="mr-2" />
                                                <span>{data.status == 0 ? 'Khóa' : 'Mở khóa'}</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AccountUser;
