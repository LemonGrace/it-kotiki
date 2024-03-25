import { CordsType } from '../models/models';

export const distanceHypot = (a: CordsType, b: CordsType, checkX = 0, checkY = 0) => {
	const xDifference = a.x - b.x + checkX;
	const yDifference = a.y - b.y + checkY;
	const distance = Math.hypot(xDifference, yDifference);
	return distance;
};
