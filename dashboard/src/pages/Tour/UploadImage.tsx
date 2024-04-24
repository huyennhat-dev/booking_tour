import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import { useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
  
const UploadImage = ({ title }: { title: string }) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


    const onRemove: UploadProps<any>['onRemove'] = (info) => {
        const photo = info.response?.url
        if (photo)
            axios.delete('http://192.168.1.2:8000/api/v1/test', { data: { photo } })
                .then(rs => { console.log(rs) })
                .catch(err => {
                    console.log(err)
                })
    };

    const onChange: UploadProps<any>['onChange'] = (info) => {
        const { fileList: newFileList, file } = info;
        setFileList(newFileList);
        console.log(file.status);
        console.log(newFileList);
    };


    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };


    return (
        <>
            <label className="mb-2.5 block text-black dark:text-white">
                {title}
            </label>
            <div>
                <ImgCrop rotationSlider>
                    <Upload
                        action={`http://192.168.1.2:8000/api/v1/upload`}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={handlePreview}
                        onRemove={onRemove}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </ImgCrop>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}

            </div>
        </>
    )
}

export default UploadImage


