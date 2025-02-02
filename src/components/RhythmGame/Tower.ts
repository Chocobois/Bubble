import { MusicScene } from "@/scenes/MusicScene";
import { Prop } from "./Prop";
import { Mandala } from "./Mandala";

export class Tower extends Prop {
    private m: Mandala;
    private fadeTime: number = 2000;
    private hasM: boolean = false;
    constructor(scene:MusicScene, x: number, y: number,spr:string,v:number[],spin:number) {
        super(scene,x,y,spr,v,spin);
        this.spr.setAlpha(0);
    }

    tick(t:number,d:number){
        super.tick(t,d);
        this.boundCheck();
        if(this.fadeTime >= 0) {
            this.fadeTime -= d;
            this.spr.setAlpha(1-(this.fadeTime/2000));
            if(this.fadeTime <= 0){
                if(!this.hasM) {
                    this.fadeTime = 0;
                    this.m = new Mandala(this.scene,0,0,this,"mandala_french",1,360,1000,0.75,true,"charge_big");
                    this.add(this.m);
                    this.m.setDepth(-1);
                    this.spr.setDepth(2);
                    this.hasM = true;
                }
            }
        }

        if(this.hasM){
            this.m.update(d,t);
        }
    }

    boundCheck(){
        if(this.x >= 1920){
            this.x = 1920;
            this.vx *= -1;
        }
        if(this.x <= 0) {
            this.x = 0;
            this.vx *= -1;
        }
        if(this.y >= 1080) {
            this.y = 1080;
            this.vy *= -1;
        }
        if(this.y <= 0) {
            this.y = 0;
            this.vy *= -1;
        }
    }
}