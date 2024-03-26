import { CordsType } from '../models/models';

export function mouseCordsCheck(mouse: CordsType, object: CordsType, width: number, height: number) {
	return mouse.x > object.x && mouse.x < object.x + width && mouse.y > object.y && mouse.y < object.y + height;
}
