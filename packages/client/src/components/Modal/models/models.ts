import { ModalProps } from 'antd';

export enum EMODAL_TYPE {
	GAME_END = 'gameEnd',
}

export interface IModalProps extends ModalProps {
	type: EMODAL_TYPE;
}

export interface IModalConfig {
	title: string;
	content: string;
	okText: string;
	cancelText: string;
}
