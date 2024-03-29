import * as models from './models/models';
import { addEventKeys } from './events';
import { map } from './collision-map';
import { distanceHypot } from './utils/hypot';
import { Boundary } from './classes/Boundary';
import { Player } from './classes/Player';
import { Home } from './classes/Home';
import { Enemy } from './classes/Enemy';
import { TowerPlace } from './classes/TowerPlace';
import { CANVAS_HEIGHT, CANVAS_WIDTH, START_COUNT_TOWERS, TILE_SIZE, TILE_WIDTH } from '../constants/core.config';
import { Tower } from './classes/Tower';
import { findPath } from './findPath';
import { mouseCordsCheck } from './utils/mouseCordsCheck';
import { randomInt } from './utils/randomInt';
import { IimgSprite } from './models/models';

export const Core = () => {
	const CANVAS_NODE: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement;
	const CTX: CanvasRenderingContext2D = CANVAS_NODE.getContext('2d') as CanvasRenderingContext2D;
	CANVAS_NODE.width = CANVAS_WIDTH;
	CANVAS_NODE.height = CANVAS_HEIGHT;

	const collisions: number[] = map;
	const collisionMap: number[][] = [];
	const boundaries: Boundary[] = [];
	const towerPlaces: TowerPlace[] = [];
	const towers: Tower[] = [];
	const homePlace = [7, 3];
	const imgSprite: IimgSprite = {};
	const imgPromises: Promise<HTMLImageElement>[] = [];

	let activeTile: null | TowerPlace;
	let activeHome = false;
	let activeHomeClick = false;
	let countTowers = START_COUNT_TOWERS;
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

	const mouse: models.CordsType = {
		x: 0,
		y: 0,
	};

	const createImage = (name: string, src: string) => {
		const img = new Image();
		img.src = src;
		imgSprite[name] = img;
		imgPromises.push(
			new Promise<any>((resolve, reject) => {
				img.onload = () => resolve(img);
				img.onerror = () => reject(new Error('Ошибка загрузки изображения'));
				img.src = src;
			}),
		);
	};

	createImage('background', 'background.png');
	createImage('playerImageRigth', 'Run_right.png');
	createImage('playerImageLeft', 'Run_left.png');
	createImage('enemyRock', 'enemy_rock_run.png');
	createImage('enemyBat', 'bat.png');
	createImage('tower', 'tower.png');
	createImage('home', 'home.png');
	createImage('homeAfter', 'home_after.png');

	const startGame = () => {
		CTX.imageSmoothingEnabled = false;
		homeHealth = 100;
		enemies = [];

		buildCollision();

		Promise.all(imgPromises).then(() => {
			home = new Home({
				canvas: CTX,
				position: {
					x: TILE_SIZE * 2,
					y: TILE_SIZE * 5,
				},
				image: imgSprite.home,
				sprites: {
					before: imgSprite.home,
					after: imgSprite.homeAfter,
				},
			});

			player = new Player({
				canvas: CTX,
				position: {
					x: CANVAS_WIDTH / 2,
					y: CANVAS_HEIGHT / 2,
				},
				image: imgSprite.playerImageRigth,
				size: 2,
				velocity: 3,
				frames: {
					max: 12,
				},
				sprites: {
					left: imgSprite.playerImageLeft,
					rigth: imgSprite.playerImageRigth,
				},
				target: null,
			});

			boundaries.forEach(boundary => {
				boundary.draw();
			});

			animate();
			spawnEnemy(5);

			CANVAS_NODE.addEventListener('mousemove', event => {
				if (event.target !== null) {
					const target = event.target as HTMLCanvasElement;
					mouse.x = event.clientX - target.offsetLeft;
					mouse.y = event.clientY - target.offsetTop;
				}

				activeTile = null;
				activeHome = false;

				if (activeHomeClick) {
					for (let i = 0; i < towerPlaces.length; i++) {
						const tile = towerPlaces[i];
						if (mouseCordsCheck(mouse, tile.position, tile.width, tile.height)) {
							activeTile = tile;
							break;
						}
					}
				}

				if (mouseCordsCheck(mouse, home.position, home.width, home.height)) {
					home.image = home.sprites.after;
					activeHome = true;
				} else {
					if (!activeHomeClick) {
						home.image = home.sprites.before;
						activeHome = false;
					}
				}
			});

			CANVAS_NODE.addEventListener('click', () => {
				if (activeHome && countTowers > 0) {
					activeHomeClick = !activeHomeClick;
				}

				if (activeTile && countTowers > 0) {
					createTower(activeTile);
					countTowers -= 1;
					enemies.forEach(enemy => {
						const newPath = findPath(
							collisions,
							[Math.round(enemy.center.y / TILE_SIZE), Math.round(enemy.center.x / TILE_SIZE)],
							homePlace,
						);
						if (
							newPath.length > 0 &&
							activeTile &&
							enemy.center.x > activeTile.position.x + activeTile.width
						) {
							enemy.pointIndex = 2;
							enemy.path = newPath;
						}
					});
				}

				if (countTowers <= 0) {
					activeHomeClick = false;
				}
			});

			addEventKeys('keydown', keys, true);
			addEventKeys('keyup', keys, false);
		});
	};

	const buildCollision = () => {
		for (let i = 0; i < collisions.length; i += CANVAS_WIDTH / TILE_SIZE) {
			collisionMap.push(collisions.slice(i, CANVAS_WIDTH / TILE_SIZE + i));
		}

		collisionMap.forEach((row, i) => {
			row.forEach((el, k) => {
				if (el === 1 || el === 2) {
					boundaries.push(
						new Boundary({
							canvas: CTX,
							position: {
								x: k,
								y: i,
							},
						}),
					);
				}
				if (el === 2) {
					boundaries.push(
						new Boundary({
							canvas: CTX,
							position: {
								x: k,
								y: i,
							},
						}),
					);
				}
				if (el === 0 && k !== 1 && k !== 2 && k !== 3 && k !== 21 && k !== 20) {
					towerPlaces.push(
						new TowerPlace({
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

	function createTower(activeTile: TowerPlace) {
		collisions.splice(
			(activeTile.position.y / TILE_SIZE) * TILE_WIDTH + activeTile.position.x / TILE_SIZE + 1,
			1,
			1,
		);
		boundaries.push(
			new Boundary({
				canvas: CTX,
				position: {
					x: activeTile.position.x / TILE_SIZE,
					y: activeTile.position.y / TILE_SIZE,
				},
			}),
		);
		boundaries.forEach(boundary => {
			boundary.draw();
		});
		towers.push(
			new Tower({
				canvas: CTX,
				image: imgSprite.tower,
				position: {
					x: activeTile.position.x,
					y: activeTile.position.y,
				},
				velocity: 0,
				target: null,
				size: 0,
				sprites: {},
				frames: { max: 10 },
			}),
		);
	}

	function spawnEnemy(quantity: number) {
		for (let i = 1; i < quantity + 1; i++) {
			if (randomInt(0, 1) === 1) {
				enemies.push(
					new Enemy({
						canvas: CTX,
						position: {
							x: CANVAS_WIDTH + 200,
							y: 100 + (i * TILE_SIZE + 100),
						},
						image: imgSprite.enemyBat,
						size: 2,
						velocity: 2,
						frames: {
							max: 7,
						},
						sprites: {},
						target: null,
						path: findPath(collisions, [randomInt(4, 7), 22], homePlace),
					}),
				);
			} else {
				enemies.push(
					new Enemy({
						canvas: CTX,
						position: {
							x: CANVAS_WIDTH + 200,
							y: CANVAS_HEIGHT / 2 + i * TILE_SIZE,
						},
						image: imgSprite.enemyRock,
						size: 2,
						velocity: 2,
						target: null,
						sprites: {},
						frames: {
							max: 14,
						},
						path: findPath(collisions, [randomInt(4, 7), 22], homePlace),
					}),
				);
			}
		}
	}

	function moving(x: number, y: number) {
		if (x > 0) player.image = player.sprites.left;
		if (x < 0) player.image = player.sprites.rigth;
		player.moving = true;
		let stop = false;
		boundaries.forEach(boundary => {
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

	function killCheck(gunner: Player | Tower) {
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
		CTX.drawImage(imgSprite.background, 0, 0);

		player.update();
		home.draw();

		if (activeHomeClick) {
			towerPlaces.forEach(place => {
				place.update(mouse);
			});
		}

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

		if (player.frames.val === 0) {
			player.moving = false;
		}

		const verticalDirection = keys.w.pressed ? -1 : keys.s.pressed ? 1 : 0;
		const horizontalDirection = keys.a.pressed ? 1 : keys.d.pressed ? -1 : 0;

		if (keys.a.pressed || keys.d.pressed) {
			if (!moving(horizontalDirection * 5, 0)) {
				player.center.x -= horizontalDirection * player.velocity;
				player.position.x -= horizontalDirection * player.velocity;
			}
		}
		if (keys.w.pressed || keys.s.pressed) {
			if (!moving(0, verticalDirection * 5)) {
				player.center.y += verticalDirection * player.velocity;
				player.position.y += verticalDirection * player.velocity;
			}
		}

		towers.forEach(tower => {
			tower.update();
			killCheck(tower);
		});

		if (homeHealth > 0) window.requestAnimationFrame(animate);
	}

	startGame();
};
