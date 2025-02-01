import Phaser from "phaser";
import { PreloadScene } from "@/scenes/PreloadScene";
import { TitleScene } from "@/scenes/TitleScene";
import { MusicScene } from "@/scenes/MusicScene";
import { BubbleScene } from "@/scenes/BubbleScene";
import { PhysicsScene } from "@/scenes/PhysicsScene";

export async function Game() {
	const config: Phaser.Types.Core.GameConfig = {
		type: Phaser.WEBGL,
		width: 1920,
		height: 1080,
		mipmapFilter: "LINEAR_MIPMAP_LINEAR",
		roundPixels: false,
		scale: {
			mode: Phaser.Scale.FIT,
		},
		physics: {
			default: "matter",
			matter: {
				gravity: { x: 0, y: -0.5 },
				// gravity: { x: 0, y: 0 },
				debug: true,
			},
		},
		scene: [PreloadScene, TitleScene, MusicScene, BubbleScene, PhysicsScene],
	};

	const game = new Phaser.Game(config);
}
