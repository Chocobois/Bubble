import { BaseScene } from "@/scenes/BaseScene";
import { Collidable } from "./Collidable";
import { MusicScene } from "@/scenes/MusicScene";
import { TextEffect } from "./TextEffect";

export class Bauble extends Collidable{
    public scene: MusicScene;
    private preTimer: number = 1000;
    private postTimer: number = 1000;

    private activeBeat: number = 0;
    private endBeat: number = 0;
    private note: string;

    private activeTimer: number = 0;
    private clicked: boolean = false;

    //display stuff
    private spr: Phaser.GameObjects.Sprite;
    private disp: Phaser.GameObjects.Graphics;
    //radius of circle effect
    private rd: number = 194;

    private spawnCheck: number[] = [0,0,0,0]; //-x,+x,-y,+y
    private clearedSpawn: boolean = false;
    private cleared: boolean = false;

    private bpm: number = 120;
    private atimer: number = 0;
    private mtimer: number = 0;
    private activated: boolean = false;
    private circling: boolean = false;

    private myText: Phaser.GameObjects.Text;

    constructor(scene:MusicScene, x: number, y: number, act: number, end: number, note: string, spr:string, v: number[], collide: number[], txt: string = ""){
        super(scene, x, y);
        this.scene=scene;
        this.disp=this.scene.add.graphics();
        this.activeBeat=act;
        this.endBeat=end;
        this.note=note;
        this.coll=collide;

        this.rad = 110;
        this.v = v;
        this.vx = this.v[0]*Math.cos(this.v[1]);
        this.vy = this.v[0]*Math.sin(this.v[1]);

        this.disp.lineStyle(10, 0xFFFFFF, 1);
        this.spr = this.scene.add.sprite(0,0,spr);
        this.atimer = -1;
        this.mtimer = (this.endBeat-this.activeBeat)*(60000/this.bpm);
        this.spr.setOrigin(0.5,0.5);
        this.spr.setAlpha(0);
        this.add(this.spr);
        this.add(this.disp);

        this.myText = this.scene.addText({
			x: 0,
			y: 0,
			size: 60,
			color: "white",
			text: txt,
		});

        this.myText.setOrigin(0.5,0.5);
        this.add(this.myText)
        this.myText.setAlpha(0);

        if(this.x <= 0) {
            this.spawnCheck[0] = 1;
        }
        if(this.x >= 1920) {
            this.spawnCheck[1] = 1;
        }
        if(this.y <= 0) {
            this.spawnCheck[2] = 1;
        }
        if(this.y >= 1080) {
            this.spawnCheck[3] = 1;
        }

    }

    redrawCircle(){
        this.disp.clear();
        this.disp.lineStyle(10, 0xFFFFFF, 1-(this.atimer/this.mtimer));
        this.disp.beginPath();
        this.disp.arc(0,0,(this.rd*(this.atimer/this.mtimer)),0,360,false,0.01);
        this.disp.closePath();
        this.disp.strokePath();
    }

    onDown(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData): void {
        super.onDown(pointer,localX,localY,event);
        this.clicked = true;
        this.spr.setFrame(2);
        this.spr.setAlpha(0);
        this.randomTextEffect();
        this.spr.removeInteractive();
    }

    update(t:number,d:number,beat:number){
        this.x += this.vx*(d/1000);
        this.y += this.vy*(d/1000);

        if(beat >= this.activeBeat){
            if(!this.circling) {
                this.atimer = this.mtimer;
                this.circling = true;
            }
            if(beat >= (this.activeBeat+1)){
                if(!this.activated){
                    this.spr.setAlpha(1);
                    this.myText.setAlpha(1);
                    this.spr.setFrame(2);
                    this.bindInteractive(this.spr);
                    this.activated = true;
                }
            }
            if(this.atimer >= 0){
                this.atimer -= d;
                if(this.atimer <= 0){
                    this.atimer = 0;
                    this.disp.clear();
                } else {
                    this.redrawCircle();
                }
            }
            
        } else if (this.activeBeat-beat <= 2) {
            this.spr.setAlpha(0.35+(0.8*(1-((this.activeBeat-beat)/2))));
            this.myText.setAlpha(0.35+(0.8*(1-((this.activeBeat-beat)/2))));
        }

        this.boundCheck();
        if(beat >= this.endBeat) {
            this.play();
        }

    }

    //        this.curAngle = Math.atan2((pointer.y-this.y),(pointer.x-this.x));
    reflect(c: Collidable){
        //set angles to opposite
        this.v[1] = -1*Math.atan2(c.y-this.y,c.x-this.x);
        this.vx = this.v[0]*Math.cos(this.v[1]);
        this.vy = this.v[0]*Math.sin(this.v[1]);
    }

    boundCheck(){
        if(this.clearedSpawn) {
            if((this.x <= (this.rad)) || (this.x >= (1920-this.rad))) {
                this.vx *= -1;
            }
            if((this.y <= (this.rad)) || (this.y >= (1080-this.rad))) {
                this.vy *= -1;
            }
            this.v[1] = Math.atan2(this.vy,this.vx);
        } else {
            if(this.x >= (this.rad)) {
                this.spawnCheck[0] = 0;
            }
            if(this.x <= (1920-this.rad)) {
                this.spawnCheck[1] = 0;
            }
            if(this.y >= (this.rad)){
                this.spawnCheck[2] = 0;
            }
            if(this.y <= (1920-this.rad)) {
                this.spawnCheck[3] = 0;
            }
            if(this.spawnCheck[0] == 0 && this.spawnCheck[1] == 0 && this.spawnCheck[2] == 0 && this.spawnCheck[3] == 0) {
                this.clearedSpawn = true;
            }
        }

    }

    collide(c: Collidable){
        if(!this.clearedSpawn) {
            return;
        }
        if(this.coll[0] > 0){
            if(this.coll[1] == c.coll[1]){
                if(Math.hypot(c.y-this.y, c.x-this.x) < (this.rad+c.rad)){
                    this.reflect(c);
                }
            }
        }
    }

    randomFailSound(){
        switch(Math.trunc(Math.random()*7)){
            case 0: {
                this.scene.sound.play("fail0", {volume: 0.2});
                break;
            } case 1: {
                this.scene.sound.play("fail1", {volume: 0.05});
                break;
            } case 2: {
                this.scene.sound.play("fail2", {volume: 0.2});
                break;
            } case 3: {
                this.scene.sound.play("fail3", {volume: 0.2});
                break;
            } case 4: {
                this.scene.sound.play("fail4", {volume: 0.2});
                break;
            } case 5: {
                this.scene.sound.play("fail5", {volume: 0.2});
                break;
            } case 6: {
                this.scene.sound.play("fail6", {volume: 0.1});
                break;
            } default: {
                break;
            }
        }
    }

    randomTextEffect(){
        switch(Math.trunc(Math.random()*3)){
            case 0: {
                this.scene.addEffect(new TextEffect(this.scene,this.x,this.y,"GREAT!","green",80,true,"fuchsia",1000,100,1));
                break;
            } case 1: {
                this.scene.addEffect(new TextEffect(this.scene,this.x,this.y,"COOL!","cyan",80,true,"fuchsia",1000,100,1));
                break;
            } case 2: {
                this.scene.addEffect(new TextEffect(this.scene,this.x,this.y,"JAMMIN!","yellow",80,true,"fuchsia",1000,100,1));
                break;
            } default: {
                break;
            }
        }

    }

    randomFailText(){
        switch(Math.trunc(Math.random()*3)){
            case 0: {
                this.scene.addEffect(new TextEffect(this.scene,this.x,this.y,"Fail","red",50,true,"maroon",1000,200,-1.5));
                break;
            } case 1: {
                this.scene.addEffect(new TextEffect(this.scene,this.x,this.y,"Suck","red",50,true,"maroon",1000,200,-1.5));
                break;
            } case 2: {
                this.scene.addEffect(new TextEffect(this.scene,this.x,this.y,"RIP","red",50,true,"maroon",1000,200,-1.5));
                break;
            } default: {
                break;
            }
        }

    }

    play(){
        if(this.clicked){
            //this.scene.sound.play(this.note,{volume: 0.5});
            this.scene.setVolume(1);
            this.scene.sound.play("pop", {volume: 0.65});
            this.scene.score += 10;
        } else {
            //this.scene.sound.play(this.note,{volume: 0.5});
            //this.scene.sound.play("fail",{volume: 0.5});
            this.scene.setVolume(0.95);
            this.randomFailSound();
            this.randomFailText();
        }
        this.deleteFlag = true;

    }


}