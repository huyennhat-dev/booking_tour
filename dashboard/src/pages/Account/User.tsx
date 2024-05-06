import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { Empty, Modal, Pagination, Select, Spin, Tooltip } from 'antd';
import userApi from '../../apis/userApi';

import { ACCOUNT_TYPE } from '../../types';
import { ToastContainer, toast } from 'react-toastify';
import { FaLock, FaRegEye } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';


const AccountUser = () => {
    const limit = 10
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const params = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        parseInt(params[0].get('page') ?? '1'),
    );
    const [total, setTotal] = useState<number>(0);

    const [accounts, setAccounts] = useState<ACCOUNT_TYPE[]>([])


    const getAllAccount = () => {
        const params = {
            page: currentPage,
            limit: limit
        }
        userApi.getAllUser(params).then(rs => {

            const modifyData = rs.data.map((e: any) => {
                return {
                    ...e,
                    username: e.fullName
                }
            })
            setAccounts(modifyData)
            setTotal(rs.total)

        })
    }

    useEffect(() => {
        getAllAccount()
    }, [currentPage])


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
                                    <th className=" w-[120px] py-4 px-4 text-center font-medium text-black dark:text-white">
                                        Hình ảnh
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 text-left font-medium text-black dark:text-white">
                                        Thông tin
                                    </th>
                                    <th className="w-[120px] py-4 px-4 text-left font-medium text-black dark:text-white">
                                        Trạng thái
                                    </th>

                                    <th className=" w-[120px] py-4 px-4 text-center font-medium text-black dark:text-white">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts!.map((data, index) => (
                                    <tr key={index}>
                                        <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <p className="text-sm">{index + 1}</p>
                                        </td>
                                        <td className="border-b  border-[#eee] py-5 px-4  dark:border-strokedark text-center ">
                                            <img
                                                src={data.avatar}
                                                alt=""
                                                className="w-[80px] h-[80px] mx-auto rounded-sm"
                                            />
                                        </td>
                                        <td className="border-b border-[#eee] text-black py-5 px-4  dark:border-strokedark ">
                                            <h4 className="font-semibold text-base">{data.username}</h4>
                                            <h6 className="text-sm mt-1">Email: {data.email}</h6>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <div>Bình thường</div>
                                            {/* <div>{data.status == 0 ? 'Bình thường' : 'Tạm khóa'}</div> */}
                                        </td>
                                        <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                                            <Tooltip placement="top" title={'Xem chi tiết'}>
                                                <button
                                                    onClick={() => { }}
                                                    className="p-2 mx-1 rounded-full border-[1px] border-blue-600"
                                                >
                                                    <FaRegEye fill="blue" />
                                                </button>
                                            </Tooltip>

                                            <Tooltip placement="top" title={'Khóa tài khoản'}>
                                                <button
                                                    onClick={() => { }}
                                                    className="p-2 mx-1 rounded-full border-[1px] border-orange-600"
                                                >
                                                    <FaLock fill="orange" />
                                                </button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {accounts.length == 0 ? <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE} /> : null}

                    </div>
                    {total > limit ? <div className="w-full my-3 text-center">
                        <Pagination
                            defaultCurrent={currentPage}
                            total={total}
                            showSizeChanger={false}
                            pageSize={limit}
                            onChange={(val) => {
                                navigate({ search: `?page=${val}` });
                                setCurrentPage(val)
                            }}
                        />
                    </div> : null}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AccountUser;
