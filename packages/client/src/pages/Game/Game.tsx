import { useEffect } from 'react';
import { Core } from '../../core/core';

export const Game = () => {
	useEffect(() => {
		Core();
	}, []);

	return (
		<div className="Core">
			<canvas id="canvas"></canvas>
		</div>
	);
};
