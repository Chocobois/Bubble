import { BaseScene } from "@/scenes/BaseScene";
import { Button } from "../elements/Button";

export class Collidable extends Button{

    
    public v: number[] = [0,0]; // value + angle
    public vx: number = 0;
    public vy: number = 0;
    public rad: number = 110;
    public deleteFlag: boolean = false;
    constructor(scene:BaseScene, x: number, y:number) {
        super(scene,x,y);
    }
    

    collide(c: Collidable){

    }

    reflect(c: Collidable){

    }
}