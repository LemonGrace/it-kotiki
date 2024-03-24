import { IKeys } from './models/models';

export const addEventKeys = (name: string, keys: IKeys, flag: boolean) => {
	if (name === 'keydown' || name === 'keyup') {
		window.addEventListener(name, (e: KeyboardEvent) => {
			if (e.key === 'w' || e.key === 'ц') {
				keys.w.pressed = flag;
			}
			if (e.key === 'a' || e.key === 'ф') {
				keys.a.pressed = flag;
			}
			if (e.key === 's' || e.key === 'ы') {
				keys.s.pressed = flag;
			}
			if (e.key === 'd' || e.key === 'в') {
				keys.d.pressed = flag;
			}
		});
	}
};
