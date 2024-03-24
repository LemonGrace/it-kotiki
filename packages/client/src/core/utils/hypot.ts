export const distanceHypot = (a: any, b: any, checkX = 0, checkY = 0) => {
	const xDifference = a.center.x - b.center.x + checkX;
	const yDifference = a.center.y - b.center.y + checkY;
	const distance = Math.hypot(xDifference, yDifference);
	return distance;
};
