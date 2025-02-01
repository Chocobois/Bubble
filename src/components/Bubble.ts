import { BaseScene } from "@/scenes/BaseScene";
import { Button } from "./elements/Button";

export class Bubble extends Button {
	public scene: BaseScene;
	public radius: number;

	private image: Phaser.GameObjects.Image;
	private bounds: Phaser.Geom.Rectangle;

	private velocity: Phaser.Math.Vector2;
	private dragOffsetX: number;
	private dragOffsetY: number;
	private dragX: number;
	private dragY: number;

	constructor(
		scene: BaseScene,
		x: number,
		y: number,
		radius: number,
		bounds: Phaser.Geom.Rectangle
	) {
		super(scene, x, y);
		scene.add.existing(this);
		this.scene = scene;
		this.radius = radius;
		this.bounds = bounds;
		this.velocity = new Phaser.Math.Vector2();

		const frame = Phaser.Math.RND.between(0, 3);
		const color = Phaser.Display.Color.HSLToColor(
			Phaser.Math.FloatBetween(0, 1),
			Phaser.Math.FloatBetween(0.4, 0.6),
			Phaser.Math.FloatBetween(0.7, 0.8)
		).color;

		this.image = scene.add.image(0, 0, "dot", frame);
		this.image.setScale((2 * radius) / 0.85 / this.image.width);
		this.image.setAngle(360 * Math.random());
		this.image.setTint(color);
		this.add(this.image);

		this.bindInteractive(this.image, true, true, radius);
	}

	setRadius(radius: number) {
		this.radius = radius;
		this.image.setScale((2 * this.radius) / 0.85 / this.image.width);
	}

	update(time: number, delta: number) {
		this.setScale(1.0 + 0.01 * this.holdSmooth);

		// Dragging
		if (this.hold) {
			this.x += (this.dragX - this.x) * 0.5;
			this.y += (this.dragY - this.y) * 0.5;
		}
		// Update physics
		else {
			const factor = 8;

			// Collision with bounds
			if (this.x < this.bounds.left) {
				this.velocity.x += (this.bounds.left - this.x) * factor;
			} else if (this.x > this.bounds.right) {
				this.velocity.x += (this.bounds.right - this.x) * factor;
			}
			if (this.y < this.bounds.top) {
				this.velocity.y += (this.bounds.top - this.y) * factor;
			} else if (this.y > this.bounds.bottom) {
				this.velocity.y += (this.bounds.bottom - this.y) * factor;
			}
			this.velocity.limit(10000);
			this.x += this.velocity.x * (delta / 1000);
			this.y += this.velocity.y * (delta / 1000);
			this.y += -200 * (delta / 1000);
			this.velocity.scale(0.9);
		}
	}

	addVelocity(vx: number, vy: number) {
		this.velocity.x += vx;
		this.velocity.y += vy;
	}

	onDragStart(pointer: Phaser.Input.Pointer): void {
		this.dragOffsetX = pointer.x - this.x;
		this.dragOffsetY = pointer.y - this.y;
		this.dragX = pointer.x - this.dragOffsetX;
		this.dragY = pointer.y - this.dragOffsetY;
	}

	onDrag(pointer: Phaser.Input.Pointer): void {
		this.dragX = pointer.x - this.dragOffsetX;
		this.dragY = pointer.y - this.dragOffsetY;
	}

	onDragEnd(pointer: Phaser.Input.Pointer): void {
		this.velocity.x = 0;
		this.velocity.y = 0;
	}

	get volume() {
		return Math.PI * this.radius * this.radius;
	}
}
