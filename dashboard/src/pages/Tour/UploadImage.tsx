import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import { env } from '../../configs/envConfig';
import { getToken } from '../../utils/tokenUtils';
import uploadApi from '../../apis/uploadApi';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function generateUID(): string {
    return Math.random().toString(36).substring(2);
}

const UploadImage = ({
    title,
    imageUrls,
    onChangeImageUrl,
    onRemoveImageUrl,
    fileList,
    setFileList,
}: {
    title: string;
    imageUrls?: string[];
    onChangeImageUrl: (ImageUrl: string) => void;
    onRemoveImageUrl: (ImageUrl: string) => void;
    fileList: UploadFile[]; // Định dạng prop fileList
    setFileList: (newFileList: UploadFile[]) => void;
}) => {


    // const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (imageUrls) {
            const files: UploadFile<any>[] = imageUrls.map(url => ({
                uid: generateUID(),
                name: 'image.png',
                status: 'done',
                url: url,
                response: { url: url }
            }));
            setFileList(files);
        }
    }, [imageUrls]);


    const onRemove: UploadProps<any>['onRemove'] = (info) => {
        const photo = info.response?.url;
        if (imageUrls) {
            const newImgList = imageUrls.filter(imgUrl => imgUrl !== photo);

            const newFiles: UploadFile<any>[] = newImgList.map(url => ({
                uid: generateUID(),
                name: 'image.png',
                status: 'done',
                url: url,
                response: { url: url }
            }));
            setFileList(newFiles);
        }
        if (photo) uploadApi.removePhoto(photo);
        onRemoveImageUrl(photo);

    };
    const onChange: UploadProps<any>['onChange'] = (info) => {
        const { fileList: newFileList, file } = info;
        setFileList(newFileList);
        if (imageUrls) {
            if (file.response?.url && !imageUrls.includes(file.response.url)) {
                onChangeImageUrl(file.response.url);
            }
        } else {
            onChangeImageUrl(file.response?.url);
        }

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
            <label className="mb-2.5 block text-black dark:text-white">{title}</label>
            <div>
                <ImgCrop rotationSlider aspect={5 / 3}>
                    <Upload
                        action={`${env.apiUrl}/auth/upload`}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={handlePreview}
                        onRemove={onRemove}
                        headers={{ Authorization: getToken()! }}
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
    );
};

export default UploadImage;
