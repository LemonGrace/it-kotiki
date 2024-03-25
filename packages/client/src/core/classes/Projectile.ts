import { PROJECTILE_RADIUS_SPRITE, PROJECTILE_SPEED } from '../../constants/core.config';
import { CordsType, IProjectile } from '../models/models';
import { Enemy } from './Enemy';

export class Projectile {
	c;
	velocity = {
		x: 0,
		y: 0,
	};
	radius = PROJECTILE_RADIUS_SPRITE;
	speed = PROJECTILE_SPEED;
	center: CordsType;
	position = {
		x: 0,
		y: 0,
	};
	target: Enemy;
	constructor(props: IProjectile) {
		this.target = props.target;
		this.c = props.canvas;
		this.position = props.position;
		this.center = {
			x: this.position.x + this.radius / 2,
			y: this.position.y + this.radius / 2,
		};
	}

	draw() {
		this.c.beginPath();
		this.c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		this.c.fillStyle = 'black';
		this.c.fill();
	}

	update() {
		this.draw();
		if (this.target === null) return;

		const angle = Math.atan2(this.target.center.y - this.position.y, this.target.center.x - this.position.x);
		this.velocity.x = Math.cos(angle) * this.speed;
		this.velocity.y = Math.sin(angle) * this.speed;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}
