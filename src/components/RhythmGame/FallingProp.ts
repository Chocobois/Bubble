import { MusicScene } from "@/scenes/MusicScene";
import { Prop } from "./Prop";
import { BasicAnim } from "./BasicAnim";

export class FallingProp extends Prop {
    public ntimer: number = 250;
    public tt: number = 250;
    public cFrame: number = 0;
    constructor(scene:MusicScene, x: number, y: number,spr:string,v:number[],spin:number) {
        super(scene,x,y,spr,v,spin);
    }

    tick(t:number,d:number){
        super.tick(t,d);
        if(this.tt > 0) {
            this.tt -= d;
            if(this.tt <= 0){
                this.advanceFrame();
                this.tt = this.ntimer;
            }
        }

        if(this.y >= 1080){
            this.deleteFlag = true;
            this.scene.sound.play("fail2", {volume: 0.25});
            this.scene.sound.play("fail3", {volume: 0.25});
            this.scene.addEffect(new BasicAnim(this.scene,this.x,this.y,"meme_explosion",24,50,0.75,false,0,Math.random()*360,[0.5,0.5]));
        }
    }

    advanceFrame(){
        if(this.cFrame == 0) {
            this.spr.setFrame(1);
        } else if (this.cFrame == 1) {
            this.spr.setFrame(0);
        }
    }
}