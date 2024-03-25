import { TILE_SIZE } from '../../constants/core.config';
import { CordsType } from '../models/models';

export function mouseCordsCheck(mouse: CordsType, object: CordsType) {
	return mouse.x > object.x && mouse.x < object.x + TILE_SIZE && mouse.y > object.y && mouse.y < object.y + TILE_SIZE;
}
