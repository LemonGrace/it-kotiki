import { KEY_MAP } from '../constants/core.config';
import { IKeys } from './models/models';

export const addEventKeys = (name: string, keys: IKeys, flag: boolean) => {
	if (name === 'keydown' || name === 'keyup') {
		window.addEventListener(name, (e: KeyboardEvent) => {
			Object.keys(KEY_MAP).forEach(key => {
				if (e.key === key || e.key === KEY_MAP[key]) {
					keys[key].pressed = flag;
				}
			});
		});
	}
};
