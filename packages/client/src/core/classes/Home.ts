import { HOME_HEIGHT, HOME_WIDTH } from '../../constants/core.config';
import { IHome } from '../models/models';

export class Home {
	c;
	position;
	image;
	sprites;
	width = HOME_WIDTH;
	height = HOME_HEIGHT;
	constructor(props: IHome) {
		this.c = props.canvas;
		this.position = props.position;
		this.image = props.image;
		this.sprites = props.sprites;
	}
	draw() {
		this.c.drawImage(this.image, this.position.x, this.position.y - 64);
	}
}
