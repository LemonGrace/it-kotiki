import { TILE_SIZE } from '../../constants/core.config';
import * as models from '../models/models';

export class Boundary {
	c: CanvasRenderingContext2D;
	width = TILE_SIZE;
	height = TILE_SIZE;
	radius = this.width / 2;
	position: models.CoordsType;
	constructor(props: models.IBoundary) {
		this.c = props.canvas;
		this.position = props.position;
		this.position.x = props.position.x * TILE_SIZE;
		this.position.y = props.position.y * TILE_SIZE;
	}

	draw() {
		this.c.beginPath();
		this.c.fillStyle = 'black';
		this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
		this.c.fill();
	}
}
