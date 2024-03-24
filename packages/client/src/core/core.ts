import * as build from './build';
import * as models from './models/models';
import { addEventKeys } from './events';
import { map } from './collision-map';
import { distanceHypot } from './utils/hypot';

export const Core = () => {
	const canvas: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement;
	const c: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
	canvas.width = 1408;
	canvas.height = 832;

	const collisions: number[] = map;
	const collisionMap: number[][] = [];
	const boundarys: build.Boundary[] = [];
	const homePlace = [7, 3];
	let player: build.Player;
	let home: build.Home;
	let homeHealth = 100;
	let enemies: build.Enemy[] = [];
	let killedEnemies = 0;

	const keys = {
		w: {
			pressed: false,
		},
		a: {
			pressed: false,
		},
		s: {
			pressed: false,
		},
		d: {
			pressed: false,
		},
	};

	const startGame = () => {
		homeHealth = 100;
		enemies = [];

		buildCallisian();

		home = new build.Home({
			canvas: c,
			position: {
				x: 64 * homePlace[1],
				y: 64 * homePlace[0],
			},
		});

		player = new build.Player({
			canvas: c,
			position: {
				x: canvas.width / 2,
				y: canvas.height / 2,
			},
			velocity: 3,
			target: null,
		});

		animate();
		spawnEnemy(5);

		addEventKeys('keydown', keys, true);
		addEventKeys('keyup', keys, false);
	};

	const buildCallisian = () => {
		for (let i = 0; i < collisions.length; i += canvas.width / 64) {
			collisionMap.push(collisions.slice(i, canvas.width / 64 + i));
		}

		collisionMap.forEach((row, i) => {
			row.forEach((el, k) => {
				if (el === 1 || el === 2) {
					boundarys.push(
						new build.Boundary({
							canvas: c,
							position: {
								x: k,
								y: i,
							},
						}),
					);
				}
			});
		});
	};

	function spawnEnemy(quantity: number) {
		for (let i = 1; i < quantity + 1; i++) {
			enemies.push(
				new build.Enemy({
					canvas: c,
					position: {
						x: canvas.width + 200,
						y: 100 + (i * 64 + 100),
					},
					velocity: 2,
					target: null,
					path: [
						{
							x: homePlace[1] * 64,
							y: homePlace[0] * 64,
						},
					],
				}),
			);
		}
	}

	function moving(x: number, y: number) {
		player.moving = true;
		let stop = false;
		boundarys.forEach(boundary => {
			if (
				player.position.x - x + player.width >= boundary.position.x &&
				player.position.x - x <= boundary.position.x + 64 &&
				player.position.y + y <= boundary.position.y + 64 &&
				player.position.y + y + player.width >= boundary.position.y
			) {
				stop = true;
			}
		});
		return stop;
	}

	function killCheck(gunner: build.Player) {
		const validEnemys = enemies.filter(enemy => {
			const distance = distanceHypot(enemy, gunner);
			return distance < enemy.radius + gunner.attackRange;
		});

		const validEnemysDistance: models.ValidEnemyType = {};

		validEnemys.forEach(target => {
			validEnemysDistance[distanceHypot(target, gunner)] = target;
		});

		gunner.target = validEnemysDistance[Math.min(...Object.keys(validEnemysDistance).map(Number))];
		for (let i = gunner.projectile.length - 1; i >= 0; i--) {
			const projectile = gunner.projectile[i];
			projectile.update();
			const xDifference = projectile.target.center.x - projectile.position.x;
			const yDifference = projectile.target.center.y - projectile.position.y;
			const distance = Math.hypot(xDifference, yDifference);
			if (distance <= projectile.target.width + projectile.radius) {
				projectile.target.health -= 20;
				if (projectile.target.health <= 0) {
					const targetIndex = enemies.findIndex(enemy => {
						return projectile.target === enemy;
					});
					if (0 <= targetIndex) {
						enemies.splice(targetIndex, 1);
						killedEnemies += 1;
					}
				}
				gunner.projectile.splice(i, 1);
			}
		}
	}

	function animate() {
		c.clearRect(0, 0, canvas.width, canvas.height);
		boundarys.forEach(boundary => {
			boundary.draw();
		});
		player.update();
		home.draw();

		for (let i = enemies.length - 1; i >= 0; i--) {
			const enemy = enemies[i];
			enemy.update();
			const enemyPlace = [Math.round(enemy.center.y / 64), Math.round(enemy.center.x / 64)];
			if (homePlace[0] === enemyPlace[0] && homePlace[1] === enemyPlace[1]) {
				enemies.splice(i, 1);
				homeHealth -= 10;
			}
			if (homeHealth <= 0) {
				// eslint-disable-next-line no-console
				console.log('game over');
			}
		}

		killCheck(player);

		if (enemies.length < 10) {
			spawnEnemy(Math.round(killedEnemies / 2));
		}

		if (keys.w.pressed) {
			if (!moving(0, -5)) {
				player.center.y -= player.velocity;
				player.position.y -= player.velocity;
			}
		}
		if (keys.s.pressed) {
			if (!moving(0, 5)) {
				player.center.y += player.velocity;
				player.position.y += player.velocity;
			}
		}
		if (keys.a.pressed) {
			if (!moving(5, 0)) {
				player.center.x -= player.velocity;
				player.position.x -= player.velocity;
			}
		}
		if (keys.d.pressed) {
			if (!moving(-5, 0)) {
				player.center.x += player.velocity;
				player.position.x += player.velocity;
			}
		}

		if (homeHealth > 0) window.requestAnimationFrame(animate);
	}

	startGame();
};
