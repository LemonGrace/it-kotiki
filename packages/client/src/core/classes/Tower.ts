import { TOWER_ATTACKRANGE, TOWER_HEIGHT, TOWER_WEITH } from '../../constants/core.config';
import { IProps } from '../models/models';
import { Enemy } from './Enemy';
import { Projectile } from './Projectile';
import { Sprite } from './Sprite';

export class Tower extends Sprite {
	attackRange = TOWER_ATTACKRANGE;
	target: null | Enemy = null;
	projectile: Projectile[] = [];
	width = TOWER_WEITH;
	height = TOWER_HEIGHT;
	center = {
		x: this.position.x + this.width / 2,
		y: this.position.y + this.width / 2,
	};
	frame = 0;
	constructor(props: IProps) {
		super({ ...props });
	}
	draw() {
		this.c.beginPath();
		this.c.fillStyle = 'rgba(0,0,255, 0.1)';
		this.c.arc(this.center.x, this.center.y, this.attackRange, 0, Math.PI * 2);
		this.c.fill();
		this.c.fillStyle = 'RGB(255, 186, 170)';
		this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
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
