import { TILE_SIZE, TOWER_PLACE_HEIGHT, TOWER_PLACE_WEITH } from '../../constants/core.config';
import { CordsType, IDefaultProps } from '../models/models';
import { mouseCordsCheck } from '../utils/mouseCordsCheck';

export class TowerPlace {
	c;
	position;
	width = TOWER_PLACE_WEITH;
	height = TOWER_PLACE_HEIGHT;
	color = 'rgb(186, 170, 255, 0.2)';
	constructor(props: IDefaultProps) {
		this.c = props.canvas;
		this.position = props.position;
		this.position.x = props.position.x * TILE_SIZE;
		this.position.y = props.position.y * TILE_SIZE;
	}
	draw() {
		this.c.fillStyle = this.color;
		this.c.fillRect(this.position.x + 4, this.position.y + 4, this.width, this.height);
	}

	update(mouse: CordsType) {
		this.draw();
		// eslint-disable-next-line no-console
		console.log(mouseCordsCheck(mouse, this.position));
		if (mouseCordsCheck(mouse, this.position)) {
			this.color = 'rgb(157, 193, 151, 0.5)';
		} else this.color = 'rgb(186, 170, 255, 0.2)';
	}
}
