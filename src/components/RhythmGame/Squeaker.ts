import { Prop } from "./Prop";
import { MusicScene } from "@/scenes/MusicScene";

export class Squeaker extends Prop {
    private time: number = 1000;
    private squishtimer: number = 250;

    constructor(scene:MusicScene, x: number, y: number,spr:string,v:number[],spin:number) {
        super(scene,x,y,spr,v,spin);
        this.scene.sound.play("squish2", {volume:3});
        this.spr.setAlpha(0.75);
        //this.spr.setScale(0.5);
    }

    tick(t:number,d:number){
        super.tick(t,d);
        this.time -= d;
        if(this.time <= 0) {
            this.time = 0;
            this.deleteFlag = true;
            this.spr.setAlpha(0);
        } else {
            this.spr.setAlpha((this.time/1000)*0.75);
        }
        this.squishtimer -= d;
        {
            if(this.squishtimer > 0) {
                this.setScale(1, 0.75+(0.25*((1+Math.sin(t/50))/2)));
            }
        }
    }
}