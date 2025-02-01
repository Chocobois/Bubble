import { BaseScene } from "@/scenes/BaseScene";

export class PhysicsScene extends BaseScene {
	// private background: Phaser.GameObjects.Image;
	// private bubbles: Bubble[];
	// private bounds: Phaser.Geom.Rectangle;
	private balls: Phaser.Physics.Matter.Image[];
	private constraints: MatterJS.ConstraintType[];
	private constraintPairs: Set<string>;

	constructor() {
		super({ key: "PhysicsScene" });
		this.balls = [];
		this.constraints = [];
		this.constraintPairs = new Set();
	}

	create(): void {
		super.create();
		this.cameras.main.setBackgroundColor(0x000000);

		this.matter.world.setBounds();

		// Generate 50 balls in random positions
		for (let i = 0; i < 100; i++) {
			const x = Phaser.Math.Between(100, this.W - 200);
			const y = Phaser.Math.Between(100, this.H - 200);
			const radius = Phaser.Math.Between(10, 80);
			const ball = this.addBall(x, y, radius);
			this.balls.push(ball);
		}

		this.matter.add.mouseSpring();

		// Add click event to destroy ball and apply force to surrounding balls
		// this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
		// 	const clickedBall = this.balls.find((ball) =>
		// 		ball.getBounds().contains(pointer.x, pointer.y)
		// 	);
		// 	if (clickedBall) {
		// 		const clickedBallArea =
		// 			Math.PI * Math.pow(clickedBall.displayWidth / 2, 2);

		// 		this.balls.forEach((ball) => {
		// 			let distance = Phaser.Math.Distance.Between(
		// 				clickedBall.x,
		// 				clickedBall.y,
		// 				ball.x,
		// 				ball.y
		// 			);
		// 			distance -= clickedBall.displayWidth / 2 - 50;
		// 			if (distance > 0) {
		// 				const force = (0.1 * clickedBallArea) / (distance * distance);
		// 				const angle = Phaser.Math.Angle.Between(
		// 					clickedBall.x,
		// 					clickedBall.y,
		// 					ball.x,
		// 					ball.y
		// 				);
		// 				const forceVector = new Phaser.Math.Vector2(
		// 					Math.cos(angle) * force,
		// 					Math.sin(angle) * force
		// 				);
		// 				ball.applyForce(forceVector);
		// 			}
		// 		});

		// 		this.balls = this.balls.filter((ball) => ball !== clickedBall);
		// 		clickedBall.destroy();
		// 	}
		// });

		// Check distance and add/remove springs if necessary
		this.matter.world.on("beforeupdate", () => {
			for (let i = 0; i < this.balls.length; i++) {
				for (let j = i + 1; j < this.balls.length; j++) {
					const ballA = this.balls[i];
					const ballB = this.balls[j];
					const radiusA = ballA.displayWidth / 2;
					const radiusB = ballB.displayWidth / 2;
					const length = radiusA + radiusB;
					const distance = Phaser.Math.Distance.Between(
						ballA.x,
						ballA.y,
						ballB.x,
						ballB.y
					);

					const pairKey = `${i}-${j}`;

					if (distance < length) {
						if (!this.constraintPairs.has(pairKey)) {
							const spring = this.matter.add.constraint(
								ballA.body as MatterJS.BodyType,
								ballB.body as MatterJS.BodyType,
								length,
								0.05
							);
							this.constraints.push(spring);
							this.constraintPairs.add(pairKey);
						}
					} else {
						if (this.constraintPairs.has(pairKey)) {
							const spring = this.constraints.find(
								(c) =>
									(c.bodyA === ballA.body && c.bodyB === ballB.body) ||
									(c.bodyA === ballB.body && c.bodyB === ballA.body)
							);
							if (spring && distance > length + 5) {
								this.matter.world.removeConstraint(spring);
								this.constraints = this.constraints.filter((c) => c !== spring);
								this.constraintPairs.delete(pairKey);
							}
						}
					}
				}
			}
		});
	}

	update(time: number, delta: number) {}

	addBall(x: number, y: number, radius: number) {
		const frame = Phaser.Math.Between(0, 3);
		const image = this.matter.add.image(x, y, "dot", frame, {
			shape: "circle",
			friction: 0,
			restitution: 0,
			slop: 0.5,
			frictionAir: 0.05,
		});
		image.setAngle(Phaser.Math.Between(0, 360));
		image.setScale((2 * radius) / image.width);
		return image;
	}
}
