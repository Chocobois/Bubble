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
	public ttimer: number = 0;
	public initTest: boolean = false;

	private mtext: Phaser.GameObjects.Text;

	private layer1: Phaser.GameObjects.Container;
	private layer2: Phaser.GameObjects.Container;
	private layer3: Phaser.GameObjects.Container;

	private t1: number = 1000;
	private t2: number = 0;
	private t3: number = 0;

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
			x: 960,
			y: 540,
			size: 360,
			color: "black",
			text: "3",
		});
		this.mtext.setOrigin(0.5,0.5);
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
		if(this.t1 > 0) {
			this.t1 -= delta;
			if(this.t1 <= 0){
				this.t2 = 1000;
				this.mtext.setText("2");
				this.mtext.setAlpha(1);
			} else {
				this.mtext.setAlpha(this.t1/1000);
			}
		}
		if(this.t2 > 0) {
			this.t2 -= delta;
			if(this.t2 <= 0){
				this.t3 = 1000;
				this.mtext.setText("1");
				this.mtext.setAlpha(1);
			} else {
				this.mtext.setAlpha(this.t2/1000);
			}
		}
		if(this.t3 > 0) {
			this.t3 -= delta;
			if(this.t3 <= 0){
				this.t3 = 0;
				this.ttimer=1000;
				this.mtext.setText("GO!");
				this.mtext.setAlpha(1);
				if(!this.initTest){
					this.stageMusic.play();
					this.script.start();
					this.initTest = true;
				}
			} else {
				this.mtext.setAlpha(this.t3/1000);
			}
		}
		if(this.ttimer > 0) {
			this.ttimer -= delta;
			if(this.ttimer <= 0){
				this.ttimer = 0;
				this.mtext.setText("");
				this.mtext.setAlpha(1);
			} else {
				this.mtext.setAlpha(this.ttimer/1000);
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
