import { Prop } from "./Prop";
import { MusicScene } from "@/scenes/MusicScene";

export class FadingProp extends Prop {

    private timer: number = 2000;
    private max: number = 2000;
    constructor(scene:MusicScene, x: number, y: number,spr:string,v:number[],spin:number,t:number) {
        super(scene,x,y,spr,v,spin);
        this.timer = t;
        this.max = t;
    }

    tick(t:number,d:number){
        super.tick(t,d);
        if(this.timer >= 0){
            this.timer -= d;
            if(this.timer <= 0){
                this.timer = 0;
                this.deleteFlag = true;
            } else {
                this.spr.setAlpha(this.timer/this.max);
            }
        }

    }
}