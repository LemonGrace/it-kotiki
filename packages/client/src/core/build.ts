import * as models from './models/models';

class Sprite {
	c: CanvasRenderingContext2D;
	position: models.ObjectNum;
	width = 0;
	height = 0;
	center: models.CenterType;
	velocity: number;
	constructor(props: models.IProps) {
		this.c = props.canvas;
		this.position = props.position;
		this.velocity = props.velocity;
		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2,
		};
	}
}

export class Player extends Sprite {
	moving = false;
	attackRange = 300;
	projectile: Projectile[] = [];
	frame = 0;
	radius = 22;
	target: null | Enemy = null;
	width = 40;
	height = 40;
	constructor(props: models.IProps) {
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

export class Enemy extends Sprite {
	attackRange = 250;
	pointIndex = 0;
	moving = true;
	path;
	health = 100;
	width = 64;
	height = 64;
	radius = this.height;
	constructor(props: models.IEnemy) {
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
		if (path) {
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
}

class Projectile {
	c;
	velocity = {
		x: 0,
		y: 0,
	};
	radius = 4;
	speed = 8;
	center: models.CenterType;
	position = {
		x: 0,
		y: 0,
	};
	target: Enemy;
	constructor(props: models.IProjectile) {
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
		if (this.target !== null) {
			const angle = Math.atan2(this.target.center.y - this.position.y, this.target.center.x - this.position.x);
			this.velocity.x = Math.cos(angle) * this.speed;
			this.velocity.y = Math.sin(angle) * this.speed;

			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		}
	}
}

export class Boundary {
	c: CanvasRenderingContext2D;
	width = 64;
	height = 64;
	radius = this.width / 2;
	position: models.PositionType;
	constructor(props: models.IBoundary) {
		this.c = props.canvas;
		this.position = props.position;
		this.position.x = props.position.x * 64;
		this.position.y = props.position.y * 64;
	}

	draw() {
		this.c.beginPath();
		this.c.fillStyle = 'black';
		this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
		this.c.fill();
	}
}

export class Home {
	c;
	position;
	width = 64;
	height = 64;
	constructor(props: models.IHome) {
		this.c = props.canvas;
		this.position = props.position;
	}
	draw() {
		this.c.beginPath();
		this.c.fillStyle = 'green';
		this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
		this.c.fill();
	}
}
