import { HOME_HEIGHT, HOME_WEITH } from '../../constants/core.config';
import * as models from '../models/models';

export class Home {
	c;
	position;
	width = HOME_WEITH;
	height = HOME_HEIGHT;
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
