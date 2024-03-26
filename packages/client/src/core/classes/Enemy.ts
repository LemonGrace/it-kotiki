import { Sprite } from './Sprite';
import { ENEMY_HEALTH, ENEMY_HEIGHT, ENEMY_WIDTH } from '../../constants/core.config';
import { IEnemy } from '../models/models';

export class Enemy extends Sprite {
	pointIndex = 0;
	moving = true;
	path;
	health = ENEMY_HEALTH;
	width = ENEMY_WIDTH;
	height = ENEMY_HEIGHT;
	radius = this.height;
	constructor(props: IEnemy) {
		super({ ...props });
		this.path = props.path;
	}
	draw() {
		this.c.beginPath();
		this.c.fillStyle = 'grey';
		this.c.arc(this.center.x, this.center.y, 30, 0, Math.PI * 2);
		this.c.fill();
		this.c.fillStyle = 'red';
		this.c.fillRect(this.center.x - this.width / 2, this.center.y - this.height / 2, this.height, 6);
		this.c.fillStyle = 'green';
		this.c.fillRect(
			this.center.x - this.width / 2,
			this.center.y - this.height / 2,
			(this.height * this.health) / 100,
			6,
		);
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
