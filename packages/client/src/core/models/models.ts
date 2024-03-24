import { Enemy } from '../build';

export type ObjectNum = {
	[key: string]: number;
};

export type CenterType = {
	x: number;
	y: number;
};

export type PositionType = {
	x: number;
	y: number;
};

export type ObjectImg = {
	[key: string]: HTMLImageElement;
};

export type IPath = {
	x: number;
	y: number;
};

export interface IProps {
	canvas: CanvasRenderingContext2D;
	position: PositionType;
	velocity: number;
	target: null | Enemy;
}

export interface IEnemy extends IProps {
	path: Array<IPath>;
}

export interface IProjectile {
	canvas: CanvasRenderingContext2D;
	position: PositionType;
	target: Enemy;
}

export interface IBoundary {
	canvas: CanvasRenderingContext2D;
	position: PositionType;
}

export interface IHome {
	canvas: CanvasRenderingContext2D;
	position: PositionType;
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
