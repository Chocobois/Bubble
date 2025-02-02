import { Image, SpriteSheet, Audio } from "./util";
import { image, sound, music, loadFont, spritesheet } from "./util";

/* Images */
const images: Image[] = [
	// Backgrounds
	image("backgrounds/background", "background"),
	image("backgrounds/t_bkg", "t_bkg"),
	// Characters
	image("characters/player", "player"),
	image("characters/mandala_french", "mandala_french"),
	image("characters/tower", "tower"),

	// Items
	image("items/coin", "coin"),
	image("items/bbl2", "bbl2"),
	image("items/rock", "rock"),
	image("items/futbol", "futbol"),
	// UI
	image("ui/hud", "hud"),

	// Titlescreen
	image("titlescreen/sky", "title_sky"),
	image("titlescreen/background", "title_background"),
	image("titlescreen/foreground", "title_foreground"),
	image("titlescreen/character", "title_character"),
];

/* Spritesheets */
const spritesheets: SpriteSheet[] = [
	spritesheet("dot", "dot", 128, 128),
	spritesheet("bbl", "bbl", 256, 256),
	spritesheet("meme_explosion", "meme_explosion", 200, 282),
	spritesheet("squire", "squire", 270, 270),
];

/* Audios */
const audios: Audio[] = [
	music("title", "m_main_menu"),
	music("first", "m_first"),
	music("m_test", "m_test"),
	music("matojam", "matojam"),
	sound("tree/rustle", "t_rustle", 0.5),
	sound("t_Ab", "t_Ab", 0.5),
	sound("t_B", "t_B", 0.5),
	sound("t_Bb", "t_Bb", 0.5),
	sound("t_C", "t_C", 0.5),
	sound("t_D", "t_D", 0.5),
	sound("t_Eb", "t_Eb", 0.5),
	sound("t_F", "t_F", 0.5),
	sound("t_F2", "t_F2", 0.5),
	sound("t_G", "t_G", 0.5),

	sound("fail0", "fail0", 0.35),
	sound("fail1", "fail1", 0.35),
	sound("fail2", "fail2", 0.35),
	sound("fail3", "fail3", 0.35),
	sound("fail4", "fail4", 0.35),
	sound("fail5", "fail5", 0.35),
	sound("fail6", "fail6", 0.35),

	sound("charge_big", "charge_big", 0.5),
];

/* Fonts */
await loadFont("DynaPuff-Medium", "Game Font");

export { images, spritesheets, audios };
