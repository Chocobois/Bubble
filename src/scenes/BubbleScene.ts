import { BaseScene } from "@/scenes/BaseScene";
import { Bubble } from "@/components/Bubble";

export class BubbleScene extends BaseScene {
	private background: Phaser.GameObjects.Image;
	private bubbles: Bubble[];
	private bounds: Phaser.Geom.Rectangle;

	constructor() {
		super({ key: "BubbleScene" });
	}

	create(): void {
		super.create();

		// this.background = this.add.image(0, 0, "background");
		// this.background.setOrigin(0);
		// this.fitToScreen(this.background);

		this.bubbles = [];

		this.bounds = new Phaser.Geom.Rectangle(
			// 0,
			this.CX - (this.H - 200) / 2,
			100,
			this.H - 200,
			this.H - 100
		);

		const b = this.bounds;
		for (let i = 0; i < 200; i++) {
			const x = Phaser.Math.RND.between(b.left, b.right);
			const y = Phaser.Math.RND.between(b.top, b.bottom);
			const radius = 10 + 60 * Math.random() * Math.random();
			this.addBubble(x, y, radius);
		}
	}

	update(time: number, delta: number) {
		this.updateBubblePhysics(time, delta);
	}

	addBubble(x: number, y: number, radius: number) {
		this.bubbles.push(new Bubble(this, x, y, radius, this.bounds));
	}

	updateBubblePhysics(time: number, delta: number) {
		for (let i = 0; i < 1; i++) {
			this.addBubble(
				// this.bounds.x + this.bounds.width * Math.random(),
				this.bounds.centerX + 10 * Math.random(),
				this.bounds.bottom,
				1 + 1 * Math.random()
			);
		}

		const factor = 5;

		// Cohesion logic
		for (let i = 0; i < this.bubbles.length; i++) {
			for (let j = i + 1; j < this.bubbles.length; j++) {
				const bubbleA = this.bubbles[i];
				const bubbleB = this.bubbles[j];
				const dx = bubbleA.x - bubbleB.x;
				const dy = bubbleA.y - bubbleB.y;
				const distance = Math.hypot(dx, dy);
				const gap = bubbleA.radius + bubbleB.radius;
				const overlap = gap - distance + 30;

				if (overlap > 0) {
					const volumeA = Math.PI * bubbleA.radius ** 2;
					const volumeB = Math.PI * bubbleB.radius ** 2;
					const totalVolume = volumeA + volumeB;
					const attractionA = volumeB / totalVolume;
					const attractionB = volumeA / totalVolume;

					const ax = (dx / distance) * overlap * factor * 0.01;
					const ay = (dy / distance) * overlap * factor * 0.01;

					bubbleA.addVelocity(-ax * attractionA, -ay * attractionA);
					bubbleB.addVelocity(ax * attractionB, ay * attractionB);
				}
			}
		}

		// Separation logic
		for (let i = 0; i < this.bubbles.length; i++) {
			for (let j = i + 1; j < this.bubbles.length; j++) {
				const bubbleA = this.bubbles[i];
				const bubbleB = this.bubbles[j];
				const dx = bubbleA.x - bubbleB.x;
				const dy = bubbleA.y - bubbleB.y;
				const distance = Math.hypot(dx, dy);
				const gap = bubbleA.radius + bubbleB.radius;
				const overlap = gap - distance;

				if (overlap > 0) {
					const volumeA = Math.PI * bubbleA.radius ** 2;
					const volumeB = Math.PI * bubbleB.radius ** 2;
					const totalVolume = volumeA + volumeB;
					const pushA = volumeB / totalVolume;
					const pushB = volumeA / totalVolume;

					const ax = (dx / distance) * overlap * factor * pushA;
					const ay = (dy / distance) * overlap * factor * pushA;

					bubbleA.addVelocity(ax, ay);
					bubbleB.addVelocity(-ax * (pushB / pushA), -ay * (pushB / pushA));

					const rad = Math.min(bubbleA.radius, bubbleB.radius);
					if (overlap > 0.5 * rad) {
						this.fuseBubbles(bubbleA, bubbleB);
					}
				}
			}
		}

		this.bubbles.forEach((bubble) => {
			bubble.setDepth(bubble.hold ? 2 : 1);
			bubble.update(time, delta);

			const max = 250;
			const odds = ((1 / 100) * Math.pow(bubble.radius, 4)) / Math.pow(max, 4);
			if (Math.random() < odds) {
				this.popBubble(bubble);
				console.log("Pop", bubble.radius);
			}
		});
	}

	fuseBubbles(bubbleA: Bubble, bubbleB: Bubble) {
		const largerBubble = bubbleA.radius >= bubbleB.radius ? bubbleA : bubbleB;
		const smallerBubble = bubbleA.radius < bubbleB.radius ? bubbleA : bubbleB;
		const totalVolume =
			Math.PI * bubbleA.radius ** 2 + Math.PI * bubbleB.radius ** 2;
		const newRadius = Math.sqrt(totalVolume / Math.PI);
		largerBubble.setRadius(newRadius);
		this.bubbles = this.bubbles.filter((b) => b !== smallerBubble);
		smallerBubble.destroy();
	}

	popBubble(bubble: Bubble) {
		this.bubbles = this.bubbles.filter((b) => b !== bubble);
		bubble.destroy();
	}
}
