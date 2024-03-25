import { Button, Form as AForm, Input, Upload } from 'antd';
import { EFIELD_TYPE } from './models/models';
import { EPAGE_TYPE } from '../../models/models';
import { FORM_CONFIG } from './constants/FormConfig';
import { FC, Fragment } from 'react';
import { FIELD_CONFIG } from './constants/FieldConfig';
import { UserDTO } from '../../pages/ProfilePage/models/models';
import { UploadOutlined } from '@ant-design/icons';

interface IProps {
	type: EPAGE_TYPE;
	onSubmit: (body) => void;
	formData?: UserDTO;
}

export const Form: FC<IProps> = ({ type, onSubmit, formData }: IProps) => {
	const [form] = AForm.useForm();
	const CONFIG = FORM_CONFIG[type];

	const handleSubmit = values => {
		onSubmit(values);
	};

	return (
		<AForm form={form} onFinish={handleSubmit} initialValues={formData}>
			{CONFIG.fields.map(fieldType => {
				const { name, required, message, placeholder, type, prefix = null } = FIELD_CONFIG[fieldType];
				return (
					<Fragment key={name}>
						<AForm.Item<Record<EFIELD_TYPE, string>>
							name={name}
							rules={[
								{
									required,
									message,
								},
							]}>
							{name === EFIELD_TYPE.PASSWORD ||
							name === EFIELD_TYPE.OLD_PASSWORD ||
							name === EFIELD_TYPE.NEW_PASSWORD ? (
									<Input.Password prefix={prefix} placeholder={placeholder} />
								) : (
									<Input prefix={prefix} type={type} placeholder={placeholder} />
								)}
						</AForm.Item>
					</Fragment>
				);
			})}
			{type === EPAGE_TYPE.PROFILE && (
				<AForm.Item name="upload" valuePropName="fileList" getValueFromEvent={e => e.fileList}>
					<Upload listType="picture" maxCount={1} beforeUpload={() => false}>
						<Button icon={<UploadOutlined />}>Загрузить изображение</Button>
					</Upload>
				</AForm.Item>
			)}
			<AForm.Item style={{ textAlign: 'center' }}>
				<Button htmlType="submit">{CONFIG.submitBtnText}</Button>
			</AForm.Item>
		</AForm>
	);
};
