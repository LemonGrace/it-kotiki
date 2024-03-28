import { EMODAL_TYPE, IModalConfig } from '../models/models';

export const MODAL_CONFIG: Record<EMODAL_TYPE, IModalConfig> = {
	[EMODAL_TYPE.GAME_END]: {
		title: 'Игра завершена',
		content: 'Спасибо, что приняли участие в нашей игре!\nЖдем вас снова',
		cancelText: 'Вернуться на главную',
		okText: 'Начать сначала?',
	},
};
