import { MusicScene } from "@/scenes/MusicScene";
import { Button } from "../elements/Button";
import { Music } from "../Music";

export class TrainerButton extends Button{
    public scene: MusicScene;
    public state: number = 0;
    private spr: Phaser.GameObjects.Sprite;

    constructor(scene:MusicScene,x:number,y:number){
        super(scene,x,y);
        this.scene=scene;
        this.spr = new Phaser.GameObjects.Sprite(scene,0,0,"trainerbutton");
        this.add(this.spr);
        this.bindInteractive(this.spr);
    }

    onDown(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData): void {
        super.onDown(pointer,localX,localY,event);
        this.toggleState();
    }


    toggleState(){
        if(this.state == 1) {
            this.state = 0;
            this.scene.training = false;
            this.spr.setFrame(0);
        } else if (this.state == 0) {
            this.state = 1;
            this.scene.training = true;
            this.spr.setFrame(1);
        }
    }
}