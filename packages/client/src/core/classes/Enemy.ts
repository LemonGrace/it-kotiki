import { Sprite } from './Sprite';
import { ENEMY_HEALTH } from '../../constants/core.config';
import { IEnemy } from '../models/models';

export class Enemy extends Sprite {
	pointIndex = 0;
	moving = true;
	path;
	health = ENEMY_HEALTH;
	radius = this.height;
	size = 1;
	frames = {
		max: 1,
		val: 0,
		elapsed: 0,
	};
	constructor(props: IEnemy) {
		super({ ...props });
		this.path = props.path;
		this.size = props.size;
		this.frames.max = props.frames.max;
	}
	draw() {
		this.c.drawImage(
			this.image,
			this.frames.val * this.width,
			0,
			this.width,
			this.height,
			this.center.x - this.radius,
			this.center.y - this.radius,
			this.width * this.size,
			this.height * this.size,
		);
		this.c.fillStyle = 'red';
		this.c.fillRect(this.center.x - this.radius + 3, this.center.y - this.radius - 10, this.height * 2, 6);
		this.c.fillStyle = 'green';
		this.c.fillRect(
			this.center.x - this.radius + 3,
			this.center.y - this.radius - 10,
			(this.height * 2 * this.health) / 100,
			6,
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

		const path = this.path[this.pointIndex];
		if (!path) return;
		const yDistance = path.y - this.center.y;
		const xDistance = path.x - this.center.x;
		const angle = Math.atan2(yDistance, xDistance);
		this.center.x += Math.cos(angle);
		this.center.y += Math.sin(angle);
		if (Math.round(this.center.x) === path.x && Math.round(this.center.y) === path.y) {
			this.pointIndex++;
		}
	}
}
