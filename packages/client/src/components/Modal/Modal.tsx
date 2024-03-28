import { Modal as AModal } from 'antd';
import { IModalProps } from './models/models';
import { MODAL_CONFIG } from './constants/ModalConfig';

export const Modal: React.FC<IModalProps> = ({ type, ...props }) => {
	const { content, title, okText, cancelText } = MODAL_CONFIG[type];

	return (
		<AModal {...props} title={title} okText={okText} cancelText={cancelText}>
			{content}
		</AModal>
	);
};
