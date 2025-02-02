import { BaseScene } from "@/scenes/BaseScene";
import { Music } from "@/components/Music";
import { Bauble } from "@/components/RhythmGame/Bauble";
import { Collidable } from "@/components/RhythmGame/Collidable";
import { Beatmap } from "@/components/RhythmGame/Beatmap";
import { BasicEffect } from "@/components/RhythmGame/BasicEffect";


export class MusicScene extends BaseScene {
	private background: Phaser.GameObjects.Image;
	private music: Music;

	public curBeat: number;
	public blist: Bauble[];
	public eList: BasicEffect[];
	public script: Beatmap;
	public ttimer: number = 3000;
	public initTest: boolean = false;

	private mtext: Phaser.GameObjects.Text;

	private layer1: Phaser.GameObjects.Container;
	private layer2: Phaser.GameObjects.Container;
	private layer3: Phaser.GameObjects.Container;

	public stageMusic: Music;
	constructor() {
		super({ key: "MusicScene" });
	}

	create(): void {
		super.create();
		this.blist = [];
		this.eList = [];
		this.script=new Beatmap(this);
		this.background = new Phaser.GameObjects.Image(this,0,0,"t_bkg");
		this.background.setOrigin(0,0);
		this.add.existing(this.background);
		this.stageMusic = new Music(this,"m_test");
		this.stageMusic.setVolume(1);
		this.mtext = this.addText({
			x: 1460,
			y: 940,
			size: 70,
			color: "black",
			text: "",
		});
		this.layer1 = new Phaser.GameObjects.Container(this,0,0);
		this.layer2 = new Phaser.GameObjects.Container(this,0,0);
		this.layer3 = new Phaser.GameObjects.Container(this,0,0);
		this.add.existing(this.layer1);
		this.add.existing(this.layer2);
		this.add.existing(this.layer3);

		this.layer1.setDepth(10);
		this.layer1.setDepth(20);
		this.layer1.setDepth(30);

		// this.background = this.add.image(0, 0, "background");
		// this.background.setOrigin(0);
		// this.fitToScreen(this.background);
	}

	update(time: number, delta: number) {
		this.mtext.setText("");
		if(this.ttimer > 0) {
			if(!this.initTest){
				this.ttimer -= delta;
				if(this.ttimer <= 0) {
					this.stageMusic.play();
					this.script.start();
					this.initTest = true;
				}
			}
		}

		this.script.update(time,delta,this.stageMusic.getBarTime());
		this.updateBubbles(time,delta,this.stageMusic.getBarTime());
		this.updateEffects(time,delta);
	}

	updateBubbles(t: number, d: number, beat: number){
		for(let i = (this.blist.length-1); i >= 0; i--){
			this.blist[i].update(t, d, beat);
			for(let e = this.blist.length-1; e >= 0; e--) {
				if(e != i) {
					this.blist[i].collide(this.blist[e]);
				}
			}
			if(this.blist[i].deleteFlag){
				this.blist[i].destroy();
				this.blist.splice(i,1);
			}
		}
	}

	updateEffects(t: number, d: number){
		for(let ee = this.eList.length-1; ee >= 0; ee--) {
			this.eList[ee].tick(t,d);
			if(this.eList[ee].deleteFlag){
				this.eList[ee].destroy();
				this.eList.splice(ee,1);
			}
		}
	}

	addEffect(e: BasicEffect){
		this.layer3.add(e);
		this.eList.push(e);
	}

	addBubble(b: Bauble){
		this.layer2.add(b);
		this.blist.push(b);
	}

	addProp(e: BasicEffect){
		this.layer1.add(e);
		this.eList.push(e);
	}

	setVolume(n: number){
		this.stageMusic.setVolume(n);
	}

}
