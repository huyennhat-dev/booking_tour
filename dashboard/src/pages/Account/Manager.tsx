import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { Empty, Modal, Pagination, Select, Spin, Tooltip } from 'antd';
import userApi from '../../apis/userApi';

import { ACCOUNT_TYPE } from '../../types';
import { ToastContainer, toast } from 'react-toastify';
import { FaLock, FaRegEye } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const selectRoleData = [
  { label: <span>Hướng dẫn viên</span>, value: 'staff' },
  { label: <span>Đối tác</span>, value: 'manager' },
];

const AccountManager = () => {
  const limit = 10;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const state = useSelector((state: RootState) => state.auth);

  const params = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(params[0].get('page') ?? '1'),
  );
  const [total, setTotal] = useState<number>(0);

  const [formData, setFormData] = useState<ACCOUNT_TYPE>({
    email: '',
    username: '',
    phoneNumber: '',
  });
  const [accounts, setAccounts] = useState<any[]>([]);

  const [accountFormModal, setAccountFormModal] = useState(false);

  const getAllAccount = () => {
    const params = {
      page: currentPage,
      limit: limit,
    };
    userApi.getAllAccount(params).then((rs) => {
      console.log(rs);
      setAccounts(rs.data);
      setTotal(rs.total);
    });
  };

  useEffect(() => {
    getAllAccount();
  }, [currentPage]);

  const handleCreateAccount = () => {
    if (formData.email && formData.phoneNumber && formData.username) {
      setLoading(true);

      userApi
        .addUser(formData)
        .then((rs) => {
          setLoading(false);
          setAccountFormModal(false);
          getAllAccount();
          toast.success('Tạo tài khoản thành công');
        })
        .catch((err) => {
          setAccountFormModal(false);
          toast.error(err.response.data.message);
          setLoading(true);
        });
    } else toast.error('Bạn phải điền đầy đủ hết thông tin!');
  };

  return (
    <DefaultLayout>
      <ToastContainer autoClose={2000} />

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <div className="w-full">
              <button
                onClick={() => setAccountFormModal(true)}
                className="float-end px-4 py-1 hover:bg-orange-400 hover:text-white duration-100 ease-in-out rounded-md border-[1.5px] border-r-slate-300 mx-2 mb-4"
              >
                Thêm{' '}
                {state.userInfo?.role == 'admin' ? 'đối tác' : 'hướng dẫn viên'}
              </button>
            </div>
            <Modal
              centered
              open={accountFormModal}
              onCancel={() => setAccountFormModal(false)}
              closable={!loading}
              footer={<div></div>}
            >
              <Spin spinning={loading} delay={500}>
                <div>
                  <div className="pt-6.5">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            username: e.target.value,
                          }));
                        }}
                        placeholder="Nhập họ và tên"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            email: e.target.value,
                          }));
                        }}
                        placeholder="Nhập email"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Số điện thoại
                      </label>
                      <input
                        type="number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            phoneNumber: e.target.value,
                          }));
                        }}
                        placeholder="Nhập số điện thoại"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Vai trò
                      </label>

                      <input
                        type="text"
                        value={
                          state.userInfo?.role == 'admin'
                            ? 'Tài khoản đối tác'
                            : 'Tài khoản hướng dẫn viên'
                        }
                        disabled
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {/* <Select
                                                disabled
                                                defaultValue={selectRoleData[0].value}
                                                className='w-full '
                                                onChange={(value) => {
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        role: value,
                                                    }));
                                                }}
                                                options={selectRoleData}
                                            /> */}
                    </div>
                    <div className="mb-4.5">
                      <button
                        onClick={handleCreateAccount}
                        className="flex w-[200px] mx-auto rounded-lg justify-center  bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                      >
                        Tạo tài khoản
                      </button>
                    </div>
                  </div>
                </div>
              </Spin>
            </Modal>

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
                        src={data.avatar!}
                        alt=""
                        className="w-[80px] h-[80px] mx-auto rounded-sm"
                      />
                    </td>
                    <td className="border-b border-[#eee] text-black py-5 px-4  dark:border-strokedark ">
                      <h4 className="text-base">
                        <span className="font-semibold">Tên: </span>
                        {data.username}
                      </h4>
                      {state.userInfo?.role == 'admin' && (
                        <h4 className="text-base">
                          <span className="font-semibold">Công ty: </span>
                          {data.managerData?.company_name}
                        </h4>
                      )}
                      {state.userInfo?.role == 'manager' && (
                        <h4 className="text-base">
                          <span className="font-semibold">Địa chỉ: </span>
                          {data.staffData?.address}
                        </h4>
                      )}
                      <h4 className="text-base">
                        <span className="font-semibold">Số điện thoại: </span>
                        {data.phoneNumber}
                      </h4>
                      <h4 className="text-base">
                        <span className="font-semibold">Email: </span>
                        {data.email}
                      </h4>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                      <div>Bình thường</div>
                      {/* <div>{data.status == 0 ? 'Bình thường' : 'Tạm khóa'}</div> */}
                    </td>
                    <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                      <Tooltip placement="top" title={'Xem chi tiết'}>
                        <button
                          onClick={() => {}}
                          className="p-2 mx-1 rounded-full border-[1px] border-blue-600"
                        >
                          <FaRegEye fill="blue" />
                        </button>
                      </Tooltip>

                      <Tooltip placement="top" title={'Khóa tài khoản'}>
                        <button
                          onClick={() => {}}
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
            {accounts.length == 0 ? (
              <Empty
                description="Không có dữ liệu"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : null}
          </div>
          {total > limit ? (
            <div className="w-full my-3 text-center">
              <Pagination
                defaultCurrent={currentPage}
                total={total}
                showSizeChanger={false}
                pageSize={limit}
                onChange={(val) => {
                  navigate({ search: `?page=${val}` });
                  setCurrentPage(val);
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AccountManager;
