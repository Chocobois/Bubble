import Phaser from "phaser";
import { PreloadScene } from "@/scenes/PreloadScene";
import { TitleScene } from "@/scenes/TitleScene";
import { BubbleScene } from "@/scenes/BubbleScene";
import { MusicScene } from "@/scenes/MusicScene";
import OutlinePipelinePlugin from "phaser3-rex-plugins/plugins/outlinepipeline-plugin.js";

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
		scene: [PreloadScene, TitleScene, BubbleScene, MusicScene],

		plugins: {
			global: [
				{
					key: "rexOutlinePipeline",
					plugin: OutlinePipelinePlugin,
					start: true,
				},
			],
		},
	};

	const game = new Phaser.Game(config);
}
