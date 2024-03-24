import { Enemy } from '../build';

export type ObjectNum = {
	[key: string]: number;
};

export type CoordsType = {
	x: number;
	y: number;
};

export type ObjectImg = {
	[key: string]: HTMLImageElement;
};

export interface IProps {
	canvas: CanvasRenderingContext2D;
	position: CoordsType;
	velocity: number;
	target: null | Enemy;
}

export interface IEnemy extends IProps {
	path: Array<CoordsType>;
}

export interface IProjectile {
	canvas: CanvasRenderingContext2D;
	position: CoordsType;
	target: Enemy;
}

export interface IBoundary {
	canvas: CanvasRenderingContext2D;
	position: CoordsType;
}

export interface IHome {
	canvas: CanvasRenderingContext2D;
	position: CoordsType;
}

export interface ValidEnemyType {
	[key: number]: Enemy;
}

export interface IKeys {
	[key: string]: KeysType;
}

type KeysType = {
	pressed: boolean;
};
