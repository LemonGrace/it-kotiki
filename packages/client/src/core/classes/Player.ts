import { Sprite } from './Sprite';
import { Projectile } from './Projectile';
import { Enemy } from './Enemy';
import { PLAYER_ATTACKRANGE, PLAYER_HEIGHT, PLAYER_RADIUS_SPRITE, PLAYER_WIDTH } from '../../constants/core.config';
import { IProps, ObjectNum } from '../models/models';

export class Player extends Sprite {
	moving = false;
	attackRange = PLAYER_ATTACKRANGE;
	projectile: Projectile[] = [];
	frame = 0;
	frames: ObjectNum = {
		max: 1,
		val: 0,
		elapsed: 0,
	};
	size = 1;
	radius = PLAYER_RADIUS_SPRITE;
	target: null | Enemy = null;
	width = PLAYER_WIDTH;
	height = PLAYER_HEIGHT;
	constructor(props: IProps) {
		super({ ...props });
		this.size = props.size;
		this.frames.max = props.frames.max;
		this.width = props.image.width / this.frames.max;
	}
	draw() {
		this.c.drawImage(
			this.image,
			(this.frames.val * this.image.width) / this.frames.max,
			0,
			this.width,
			this.height,
			this.position.x - 20,
			this.position.y - 20,
			this.width * this.size,
			this.height * this.size,
		);

		if (!this.moving) return;

		if (this.frames.max > 1) {
			this.frames.elapsed++;
		}

		if (this.frames.elapsed % 2 === 0) {
			if (this.frames.val < this.frames.max - 1) this.frames.val++;
			else this.frames.val = 0;
		}
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
