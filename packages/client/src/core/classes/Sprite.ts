import * as models from '../models/models';

export class Sprite {
	c: CanvasRenderingContext2D;
	position: models.ObjectNum;
	width = 0;
	height = 0;
	center: models.CoordsType;
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
