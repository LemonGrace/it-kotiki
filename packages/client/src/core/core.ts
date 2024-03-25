import * as models from './models/models';
import { addEventKeys } from './events';
import { map } from './collision-map';
import { distanceHypot } from './utils/hypot';
import { Boundary } from './classes/Boundary';
import { Player } from './classes/Player';
import { Home } from './classes/Home';
import { Enemy } from './classes/Enemy';
import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from '../constants/core.config';

export const Core = () => {
	const CANVAS_NODE: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement;
	const CTX: CanvasRenderingContext2D = CANVAS_NODE.getContext('2d') as CanvasRenderingContext2D;
	CANVAS_NODE.width = CANVAS_WIDTH;
	CANVAS_NODE.height = CANVAS_HEIGHT;

	const collisions: number[] = map;
	const collisionMap: number[][] = [];
	const boundarys: Boundary[] = [];
	const homePlace = [7, 3];
	let player: Player;
	let home: Home;
	let homeHealth = 100;
	let enemies: Enemy[] = [];
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

		home = new Home({
			canvas: CTX,
			position: {
				x: TILE_SIZE * homePlace[1],
				y: TILE_SIZE * homePlace[0],
			},
		});

		player = new Player({
			canvas: CTX,
			position: {
				x: CANVAS_WIDTH / 2,
				y: CANVAS_HEIGHT / 2,
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
		for (let i = 0; i < collisions.length; i += CANVAS_WIDTH / TILE_SIZE) {
			collisionMap.push(collisions.slice(i, CANVAS_WIDTH / TILE_SIZE + i));
		}

		collisionMap.forEach((row, i) => {
			row.forEach((el, k) => {
				if (el === 1 || el === 2) {
					boundarys.push(
						new Boundary({
							canvas: CTX,
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
				new Enemy({
					canvas: CTX,
					position: {
						x: CANVAS_WIDTH + 200,
						y: 100 + (i * TILE_SIZE + 100),
					},
					velocity: 2,
					target: null,
					path: [
						{
							x: homePlace[1] * TILE_SIZE,
							y: homePlace[0] * TILE_SIZE,
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
				player.position.x - x <= boundary.position.x + boundary.width &&
				player.position.y + y <= boundary.position.y + boundary.height &&
				player.position.y + y + player.width >= boundary.position.y
			) {
				stop = true;
			}
		});
		return stop;
	}

	function killCheck(gunner: Player) {
		const validEnemys = enemies.filter(enemy => {
			const distance = distanceHypot(enemy.center, gunner.center);
			return distance < enemy.radius + gunner.attackRange;
		});

		const validEnemysDistance: models.ValidEnemyType = {};

		validEnemys.forEach(target => {
			validEnemysDistance[distanceHypot(target.center, gunner.center)] = target;
		});

		gunner.target = validEnemysDistance[Math.min(...Object.keys(validEnemysDistance).map(Number))];
		for (let i = gunner.projectile.length - 1; i >= 0; i--) {
			const projectile = gunner.projectile[i];
			projectile.update();
			const distance = distanceHypot(projectile.target.center, projectile.position);
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
		CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		boundarys.forEach(boundary => {
			boundary.draw();
		});
		player.update();
		home.draw();

		for (let i = enemies.length - 1; i >= 0; i--) {
			const enemy = enemies[i];
			enemy.update();
			const enemyPlace = [Math.round(enemy.center.y / TILE_SIZE), Math.round(enemy.center.x / TILE_SIZE)];
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

		const verticalDirection = keys.w.pressed ? -1 : keys.s.pressed ? 1 : 0;
		const horizontalDirection = keys.a.pressed ? 1 : keys.d.pressed ? -1 : 0;

		if (!moving(horizontalDirection * 5, 0)) {
			player.center.x -= horizontalDirection * player.velocity;
			player.position.x -= horizontalDirection * player.velocity;
		}

		if (!moving(0, verticalDirection * 5)) {
			player.center.y += verticalDirection * player.velocity;
			player.position.y += verticalDirection * player.velocity;
		}

		if (homeHealth > 0) window.requestAnimationFrame(animate);
	}

	startGame();
};
