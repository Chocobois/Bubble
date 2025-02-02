import { BaseScene } from "@/scenes/BaseScene";
import { MusicScene } from "@/scenes/MusicScene";
import { BasicEffect } from "./BasicEffect";

export class Prop extends BasicEffect {
    public scene: MusicScene;
    public v: number[] = [0,0];
    public vx: number = 0;
    public vy: number = 0;
    public spin: number = 0;
    public spr: Phaser.GameObjects.Sprite;
    constructor(scene:MusicScene, x: number, y: number, spr:string, v:number[],spin:number){
        super(scene,x,y);
        this.scene=scene;
        this.spin=spin;
        this.v=v;
        this.vx = this.v[0]*Math.cos(this.v[1]);
        this.vy = this.v[0]*Math.sin(this.v[1]);
        this.spr = this.scene.add.sprite(0,0,spr);
        this.spr.setOrigin(0.5,0.5);
        this.add(this.spr);
    }

    tick(t:number,d:number){
        this.x += this.vx*(d/1000);
        this.y += this.vy*(d/1000);
        this.setAngle(this.angle + (d*this.spin/1000));
    }
}