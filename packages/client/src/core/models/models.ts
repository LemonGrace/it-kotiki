import { Enemy } from '../classes/Enemy';

export type ObjectNum = {
	[key: string]: number;
};

export type ObjectString = {
	[key: string]: string;
};

export type ObjectImg = {
	[key: string]: HTMLImageElement;
};

export type CordsType = {
	x: number;
	y: number;
};

export interface IimgSprite {
	[key: string]: HTMLImageElement;
}

export interface IDefaultProps {
	canvas: CanvasRenderingContext2D;
	position: CordsType;
}

export interface IProps extends IDefaultProps {
	image: HTMLImageElement;
	size: number;
	velocity: number;
	target: null | Enemy;
	sprites: ObjectImg;
	frames: ObjectNum;
}

export interface IEnemy extends IProps {
	path: Array<CordsType>;
}

export interface IProjectile extends IDefaultProps {
	target: Enemy;
}

export interface IHome extends IDefaultProps {
	image: HTMLImageElement;
	sprites: ObjectImg;
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

export type MyNeighboursType = {
	x: number;
	y: number;
}[];

export interface IMyNode {
	value: number;
	x: number;
	y: number;
	f: number;
	g: number;
}
