import { BaseScene } from "@/scenes/BaseScene";
import { Music } from "@/components/Music";

export class MusicScene extends BaseScene {
	private background: Phaser.GameObjects.Image;
	private music: Music;

	constructor() {
		super({ key: "MusicScene" });
	}

	create(): void {
		super.create();

		// this.background = this.add.image(0, 0, "background");
		// this.background.setOrigin(0);
		// this.fitToScreen(this.background);
	}

	update(time: number, delta: number) {}
}
