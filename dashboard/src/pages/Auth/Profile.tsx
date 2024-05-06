import { useEffect, useState } from 'react';
import authApi from '../../apis/authApi';
import DefaultLayout from '../../layout/DefaultLayout';

import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ImgCrop from 'antd-img-crop';
import { GetProp, Upload, UploadFile, UploadProps, Image, Spin } from 'antd';
import { env } from '../../configs/envConfig';
import { getToken } from '../../utils/tokenUtils';
import uploadApi from '../../apis/uploadApi';
import { setToken } from '../../redux/feature/authSlice';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProfilePage = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const state = useSelector((state: RootState) => state.auth);

  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isValidImage, setIsValidImage] = useState(true);
  const [data, setData] = useState({
    avatar: '',
    username: '',
    phoneNumber: '',
    companyName: '',
    is_manager: false,
    is_staff: false,
    address: '',
    current_password: '',
    new_password: '',
  });
  const onChange: UploadProps['onChange'] = (info) => {
    const { file } = info;
    setIsValidImage(false);

    if (file.response?.url)
      setData((prev) => ({
        ...prev,
        avatar: file.response?.url,
      }));
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  useEffect(() => {
    authApi
      .getUser()
      .then((rs) => {
        console.log(rs);
        setData((prev) => ({
          ...prev,
          avatar: rs.data?.avatar,
          username: rs.data?.username,
          is_manager: rs.data?.managerData ? true : false,
          is_staff: rs.data?.staffData ? true : false,
          phoneNumber: rs.data?.phoneNumber,
          companyName: rs.data?.managerData?.company_name,
          address: rs.data?.staffData?.address,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const [checked, setChecked] = useState(false);

  const onRemove: UploadProps<any>['onRemove'] = (info) => {
    const photo = info.response?.url;
    if (photo) uploadApi.removePhoto(photo);
    setData((prev) => ({
      ...prev,
      avatar: '',
    }));
  };

  const handelUpdate = () => {
    setLoading(true);
    authApi
      .update(data)
      .then((rs) => {
        setLoading(false);
        toast.success('Cập nhật thành công!');
        dispatch(setToken({ token: rs.token }));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <DefaultLayout>
      <ToastContainer autoClose={2000} />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Spin spinning={loading} delay={0}>
          <div className="rounded-sm border border-stroke bg-white p-6  shadow-default dark:border-strokedark dark:bg-boxdark ">
            <div className="max-w-full overflow-x-auto grid grid-cols-8 gap-3 ">
              <div></div>

              <div className="col-span-3">
                <div className="w-full">
                  <label htmlFor="" className="text-black ml-1">
                    Ảnh đại diện:
                  </label>
                  <div className="flex items-center">
                    {data.avatar && isValidImage && (
                      <img
                        src={data?.avatar}
                        alt=""
                        className="mr-2 w-[100.4px] rounded-md"
                      />
                    )}
                    <ImgCrop rotationSlider>
                      <Upload
                        className="my-2"
                        action={`${env.apiUrl}/auth/upload`}
                        headers={{ Authorization: getToken()! }}
                        listType="picture-card"
                        maxCount={1}
                        onPreview={handlePreview}
                        onChange={onChange}
                        onRemove={onRemove}
                      >
                        + Upload
                      </Upload>
                    </ImgCrop>
                  </div>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: 'none' }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(''),
                      }}
                      src={previewImage}
                    />
                  )}
                </div>
                <div className="w-full">
                  <label htmlFor="" className="text-black ml-1">
                    Email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={state?.userInfo?.email || ''}
                    disabled
                    className="w-full p-3 rounded-xl border mt-1 border-slate-300 text-sm font-normal outline-none"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="" className="text-black ml-1">
                    Tên người dùng:
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={data?.username}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="w-full p-3 rounded-xl border mt-1 border-slate-300 text-sm font-normal outline-none"
                    placeholder="Nhập tên của bạn"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="" className="text-black ml-1">
                    Số điện thoại:
                  </label>
                  <input
                    id="phone_nummber"
                    type="text"
                    value={data?.phoneNumber}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    className="w-full p-3 rounded-xl border mt-1 border-slate-300 text-sm font-normal outline-none"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                {data?.is_manager && (
                  <div className="w-full">
                    <label htmlFor="" className="text-black ml-1">
                      Tên công ty:
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={data?.companyName}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      className="w-full p-3 rounded-xl border mt-1 border-slate-300 text-sm font-normal outline-none"
                      placeholder="Nhập tên công ty"
                    />
                  </div>
                )}
                {data?.is_staff && (
                  <div className="w-full">
                    <label htmlFor="" className="text-black ml-1">
                      Địa chỉ:
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={data?.address}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      className="w-full p-3 rounded-xl border mt-1 border-slate-300 text-sm font-normal outline-none"
                      placeholder="Nhập địa chỉ"
                    />
                  </div>
                )}
                <div className="w-full mt-3">
                  <button
                    onClick={handelUpdate}
                    className="flex w-[200px] mx-auto rounded-lg justify-center  bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
              <div className="col-span-3">
                <div className="w-full h-[102px]"></div>
                <div className="w-full mb-4 flex items-center">
                  <input
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    id="checkbox"
                    type="checkbox"
                    className="mx-2 w-4 h-4"
                  />
                  <label htmlFor="checkbox" className="text-base mx-1">
                    Bạn muốn đổi mật khẩu
                  </label>
                </div>
                {checked && (
                  <div className="duration-1000 ease-in-out ">
                    <div className="w-full mt-2">
                      <label htmlFor="crr_password" className="text-base mx-1">
                        Mật khẩu hiện tại
                      </label>
                      <input
                        id="crr_password"
                        type="password"
                        name="password"
                        value={data?.current_password}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            current_password: e.target.value,
                          }))
                        }
                        className="w-full p-3 rounded-xl border mt-1 border-slate-300 text-sm font-normal outline-none"
                        placeholder="Nhập mât khẩu hiện tại"
                      />
                    </div>
                    <div className="w-full mt-2">
                      <label htmlFor="new_password" className="text-base mx-1">
                        Mật khẩu mới
                      </label>
                      <input
                        id="new_password"
                        type="password"
                        name="password"
                        value={data?.new_password}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            new_password: e.target.value,
                          }))
                        }
                        className="w-full p-3 rounded-xl border mt-1 border-slate-300 text-sm font-normal outline-none"
                        placeholder="Nhập mât khẩu mới"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div></div>
            </div>
          </div>
        </Spin>
      </div>
    </DefaultLayout>
  );
};

export default ProfilePage;
