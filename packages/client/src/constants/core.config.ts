import { ObjectString } from '../core/models/models';

export const CANVAS_WIDTH = 1408;
export const CANVAS_HEIGHT = 832;

export const TILE_SIZE = 64;
export const TILE_WIDTH = CANVAS_WIDTH / TILE_SIZE;
export const TILE_HEIGHT = CANVAS_HEIGHT / TILE_SIZE;

export const ENEMY_HEALTH = 100;

export const PLAYER_ATTACKRANGE = 300;
export const PLAYER_RADIUS_SPRITE = 22;
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 40;

export const TOWER_ATTACKRANGE = 200;
export const TOWER_WIDTH = 64;
export const TOWER_HEIGHT = 128;

export const START_COUNT_TOWERS = 4;

export const TOWER_PLACE_WIDTH = 56;
export const TOWER_PLACE_HEIGHT = 56;

export const PROJECTILE_RADIUS_SPRITE = 4;
export const PROJECTILE_SPEED = 8;

export const HOME_WIDTH = TILE_SIZE;
export const HOME_HEIGHT = 128;

export const KEY_MAP: ObjectString = {
	w: 'ц',
	a: 'ф',
	s: 'ы',
	d: 'в',
};
