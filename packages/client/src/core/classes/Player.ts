import { Sprite } from './Sprite';
import { Projectile } from './Projectile';
import { Enemy } from './Enemy';
import { PLAYER_ATTACKRANGE, PLAYER_HEIGHT, PLAYER_RADIUS_SPRITE, PLAYER_WEITH } from '../../constants/core.config';
import { IProps } from '../models/models';

export class Player extends Sprite {
	moving = false;
	attackRange = PLAYER_ATTACKRANGE;
	projectile: Projectile[] = [];
	frame = 0;
	radius = PLAYER_RADIUS_SPRITE;
	target: null | Enemy = null;
	width = PLAYER_WEITH;
	height = PLAYER_HEIGHT;
	constructor(props: IProps) {
		super({ ...props });
	}
	draw() {
		this.c.fillStyle = 'blue';
		this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
		this.c.fill();
	}
	update() {
		this.draw();
		if (this.frame % 20 === 0 && this.target) {
			this.projectile.push(
				new Projectile({
					canvas: this.c,
					position: {
						x: this.center.x,
						y: this.center.y,
					},
					target: this.target,
				}),
			);
		}
		this.frame++;
	}
}
