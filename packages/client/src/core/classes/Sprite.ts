import * as models from '../models/models';

export class Sprite {
	c: CanvasRenderingContext2D;
	position: models.ObjectNum;
	image: HTMLImageElement;
	sprites: models.ObjectImg;
	frames: models.ObjectNum;
	width;
	height;
	center: models.CordsType;
	velocity: number;
	constructor(props: models.IProps) {
		this.c = props.canvas;
		this.image = props.image;
		this.sprites = props.sprites;
		this.frames = props.frames;
		this.width = this.image.width / this.frames.max;
		this.height = this.image.height;
		this.position = props.position;
		this.velocity = props.velocity;
		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2,
		};
	}
}
