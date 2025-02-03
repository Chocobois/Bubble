import { BaseScene } from "@/scenes/BaseScene";
import { Music } from "@/components/Music";
import { Bauble } from "@/components/RhythmGame/Bauble";
import { Collidable } from "@/components/RhythmGame/Collidable";
import { Beatmap } from "@/components/RhythmGame/Beatmap";
import { BasicEffect } from "@/components/RhythmGame/BasicEffect";
import { Squeaker } from "@/components/RhythmGame/Squeaker";
import { TrainerButton } from "@/components/RhythmGame/TrainerButton";


export class MusicScene extends BaseScene {
	private background: Phaser.GameObjects.Image;
	private background2: Phaser.GameObjects.Image;
	private pointer: Phaser.GameObjects.Image;
	private music: Music;

	public training: boolean = false;

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

	private aphAdj: number = 0;
	private cfade: number = 0; //max 3000
	private fadeOn: boolean = false;

	private lastBeat: number = 183;

	public tsb: TrainerButton;

	private stBeat: number = 0;
	private nextBeat: number = 0;
	private mBeat: number = 161;
	private squeaking: boolean = false;

	private scoreUI: Phaser.GameObjects.Image;

	public scoreText: Phaser.GameObjects.Text;
	public score: number = 0;

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
		this.background2 = new Phaser.GameObjects.Image(this,0,0,"t_bkg_p");
		this.background2.setAlpha(0);
		this.background2.setOrigin(0,0);
		this.add.existing(this.background2);
		this.stageMusic = new Music(this,"matojam");
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
		this.scoreUI = new Phaser.GameObjects.Image(this,1340,910,"UI_score");
		this.add.existing(this.scoreUI);
		this.scoreUI.setOrigin(0.125,0.5);
		this.scoreUI.setDepth(11);

		this.tsb = new TrainerButton(this, 1840, 60);
		this.add.existing(this.tsb);
		this.tsb.setDepth(12);

		this.scoreText = this.addText({
			x: 1340,
			y: 910,
			size: 50,
			color: "black",
			text: "Score: ",
		});
		this.scoreText.setOrigin(0,0.5);
		this.scoreText.setDepth(12);
		this.layer1.setDepth(10);
		this.layer2.setDepth(20);
		this.layer3.setDepth(30);

		this.pointer = this.add.image(0, 0, "pointer");
		this.pointer.setDepth(1000);
		this.pointer.setScale(0.5);
		this.pointer.setOrigin(82/256, 53/256);
		this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
			this.pointer.setPosition(pointer.x, pointer.y);
		});
	}

	makeSqueakGenerator(){
		this.stBeat = Math.floor(this.stageMusic.getBarTime());
		this.nextBeat = this.stBeat+2;
		this.squeaking = true;
	}

	updateSqueaker(beat:number){
		if(!this.squeaking){
			return;
		}
		if(beat >= this.nextBeat) {
			if(beat < this.mBeat){
				this.addProp(new Squeaker(this, (100+Math.random()*1760), (80+Math.random()*920),"jsmol",[0,0],0));
				this.nextBeat+=2;
			}
		}
	}

	update(time: number, delta: number) {
		this.updateStartTimers(time, delta);
		this.updateBkg(time,delta);
		this.updateSqueaker(this.stageMusic.getBarTime());
		this.scoreText.setText("Score: " + this.score);

		this.script.update(time,delta,this.stageMusic.getBarTime());
		this.updateBubbles(time,delta,this.stageMusic.getBarTime());
		this.updateEffects(time,delta);
	}

	updateBkg(time:number, delta:number){
		if(this.cfade > 0) {
			this.cfade -= delta;
			if(this.cfade <= 0) {
				this.cfade = 0;
				if(!this.fadeOn) {
					this.fadeOn = true;
					this.aphAdj = 0.65;
				}
			} else {
				this.aphAdj = (1-(this.cfade/3000))*0.65;
			}
		}

		this.background2.setAlpha(this.aphAdj*((Math.sin(time/500)+1)/2));
	}


	updateStartTimers(time: number, delta: number){
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

	crossFade(){
		this.cfade = 3000;
	}

	addProp(e: BasicEffect){
		this.layer1.add(e);
		this.eList.push(e);
	}

	setVolume(n: number){
		this.stageMusic.setVolume(n);
	}

}
