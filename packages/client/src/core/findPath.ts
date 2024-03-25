import { TILE_SIZE } from '../constants/core.config';
import { CordsType, IMyNode, MyNeighboursType } from './models/models';

export function findPath(map: number[], pathStart: number[], pathEnd: number[]) {
	const max = Math.max;

	const collisionMap: number[][] = [];

	for (let i = 0; i < map.length; i += 22) {
		collisionMap.push(map.slice(i, 22 + i));
	}

	for (let i = 1; i <= 10; i++) {
		collisionMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	}

	const worldWidth = collisionMap[0].length;
	const worldHeight = collisionMap.length;
	const worldSize = worldWidth * worldHeight;

	function Neighbours(x: number, y: number) {
		const N = y - 1;
		const S = y + 1;
		const E = x + 1;
		const W = x - 1;
		const myN = N > -1 && canWalk(x, N);
		const myS = S < worldHeight && canWalk(x, S);
		const myE = E < worldWidth && canWalk(E, y);
		const myW = W > -1 && canWalk(W, y),
			result = [];

		if (myN)
			result.push({
				x: x,
				y: N,
			});
		if (myE)
			result.push({
				x: E,
				y: y,
			});
		if (myS)
			result.push({
				x: x,
				y: S,
			});
		if (myW)
			result.push({
				x: W,
				y: y,
			});
		if (myN) {
			if (myE && canWalk(E, N))
				result.push({
					x: E,
					y: N,
				});
			if (myW && canWalk(W, N))
				result.push({
					x: W,
					y: N,
				});
		}
		if (myS) {
			if (myE && canWalk(E, S))
				result.push({
					x: E,
					y: S,
				});
			if (myW && canWalk(W, S))
				result.push({
					x: W,
					y: S,
				});
		}

		return result;
	}

	function canWalk(x: number, y: number) {
		return collisionMap[x] != null && collisionMap[x][y] != null && collisionMap[x][y] <= 0;
	}

	type ParentType = null | IMyNode;

	function Node(Parent: ParentType, Point: CordsType) {
		const newNode = {
			Parent: Parent,
			value: Point.x + Point.y * worldWidth,
			x: Point.x,
			y: Point.y,
			f: 0,
			g: 0,
		};

		return newNode;
	}

	function Diagonal(Point: CordsType, Goal: IMyNode) {
		return max(Math.abs(Point.x - Goal.x), Math.abs(Point.y - Goal.y));
	}

	function calculatePath() {
		const mypathStart = Node(null, {
			x: pathStart[0],
			y: pathStart[1],
		});
		const mypathEnd = Node(null, {
			x: pathEnd[0],
			y: pathEnd[1],
		});
		let AStar = new Array(worldSize);
		let Open = [mypathStart];
		let Closed: any[] = [];
		const result: number[][] = [];
		let myNeighbours: MyNeighboursType;
		let myNode: IMyNode;
		let myPath;
		let length, max, min, i, j;
		while ((length = Open.length)) {
			max = worldSize;
			min = -1;

			for (i = 0; i < length; i++) {
				if (Open[i].f < max) {
					max = Open[i].f;
					min = i;
				}
			}

			myNode = Open.splice(min, 1)[0];

			if (myNode.value === mypathEnd.value) {
				myPath = Closed[Closed.push(myNode) - 1];

				do {
					result.push([myPath.x, myPath.y]);
				} while ((myPath = myPath.Parent));
				AStar = Closed = Open = [];
				result.reverse();
			} else {
				myNeighbours = Neighbours(myNode.x, myNode.y);
				for (i = 0, j = myNeighbours.length; i < j; i++) {
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value]) {
						myPath.g = myNode.g + Diagonal(myNeighbours[i], myNode);
						myPath.f = myPath.g + Diagonal(myNeighbours[i], mypathEnd);
						Open.push(myPath);
						AStar[myPath.value] = true;
					}
				}
				Closed.push(myNode);
			}
		}
		return result;
	}

	return ArrayToObject(calculatePath());
}

const ArrayToObject = (result: number[][]) => {
	const pathObj: CordsType[] = [];

	result.forEach((tile: number[], i: number) => {
		const y = tile[0] * TILE_SIZE + TILE_SIZE / 2;
		const x = tile[1] * TILE_SIZE + TILE_SIZE / 2;
		if (i !== result.length - 1) {
			pathObj.push({
				x: x,
				y: y,
			});
		} else {
			pathObj.push({
				x: x - TILE_SIZE / 2,
				y: y - TILE_SIZE / 2,
			});
		}
	});

	return pathObj;
};
