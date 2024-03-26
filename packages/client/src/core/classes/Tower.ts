import { TOWER_ATTACKRANGE, TOWER_HEIGHT, TOWER_WIDTH } from '../../constants/core.config';
import { IProps } from '../models/models';
import { Enemy } from './Enemy';
import { Projectile } from './Projectile';
import { Sprite } from './Sprite';

export class Tower extends Sprite {
	attackRange = TOWER_ATTACKRANGE;
	target: null | Enemy = null;
	projectile: Projectile[] = [];
	width = TOWER_WIDTH;
	height = TOWER_HEIGHT;
	center = {
		x: this.position.x + this.width / 2,
		y: this.position.y + this.width / 2,
	};
	frame = 0;
	frames = {
		max: 1,
		val: 0,
		elapsed: 0,
	};
	constructor(props: IProps) {
		super({ ...props });
		this.frames.max = props.frames.max;
		this.width = props.image.width / 10;
	}
	draw() {
		this.c.beginPath();
		this.c.fillStyle = 'rgba(0,0,255, 0.1)';
		this.c.arc(this.center.x, this.center.y, this.attackRange, 0, Math.PI * 2);
		this.c.fill();
		this.c.drawImage(
			this.image,
			(this.frames.val * this.image.width) / 10,
			0,
			this.width,
			this.height,
			this.position.x,
			this.position.y - 64,
			this.width,
			this.height,
		);

		this.frames.elapsed++;

		if (this.frames.elapsed % 15 === 0) {
			if (this.frames.val < 9) this.frames.val++;
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
