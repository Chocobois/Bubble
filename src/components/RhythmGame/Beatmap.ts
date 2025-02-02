import { MusicScene } from "@/scenes/MusicScene";
import { Bauble } from "./Bauble";
import { Tower } from "./Tower";
import { FadingProp } from "./FadingProp";
import { FallingProp } from "./FallingProp";

export interface BeatData {

    //pretime: number;
    //posttime: number;
    key: string;
    spawn: number;
    spr: string;
    ac: number;
    end: number;
    note: string;
    v: number[];
    xy:number[];

}

export class Beatmap {
    public curBPM: number;
    private curIndex: number;
    public scene: MusicScene;
    private data: BeatData[];
    private playing: boolean = false;
    private brn: BeatData[] = [
        {key: "bubble", spawn: 0, spr: "bbl", ac:3, end:5, note:"t_Eb", v: [200, Phaser.Math.DegToRad(90)], xy:[300,900]},
        {key: "bubble", spawn: 0.2, spr: "bbl", ac:4, end:6, note:"t_Ab", v: [200, Phaser.Math.DegToRad(90)], xy:[600,900]},
        {key: "bubble", spawn: 0.4, spr: "bbl", ac:5, end:7, note:"t_Eb", v: [200, Phaser.Math.DegToRad(90)], xy:[900,900]},
        {key: "bubble", spawn: 0.6, spr: "bbl", ac:6, end:8, note:"t_Ab", v: [200, Phaser.Math.DegToRad(90)], xy:[1200,900]},
        {key: "bubble", spawn: 0.8, spr: "bbl", ac:7, end:9, note:"t_Eb", v: [200, Phaser.Math.DegToRad(90)], xy:[1500,900]},

        {key: "bubble", spawn: 2, spr: "bbl", ac:8, end:10, note:"t_D", v: [300, Phaser.Math.DegToRad(-90)], xy:[960,200]},
        {key: "bubble", spawn: 4, spr: "bbl", ac:10, end:12, note:"t_B", v: [300, Phaser.Math.DegToRad(0)], xy:[150,540]},
        {key: "bubble", spawn: 6, spr: "bbl", ac:12, end:14, note:"t_G", v: [300, Phaser.Math.DegToRad(180)], xy:[1770,540]},
        {key: "bubble", spawn: 8, spr: "bbl", ac:14, end:16, note:"t_F", v: [300, Phaser.Math.DegToRad(90)], xy:[960,900]},
        {key: "bubble", spawn: 9, spr: "bbl", ac:16, end:18, note:"t_G", v: [300, Phaser.Math.DegToRad(45)], xy:[960,540]},
        {key: "prop", spawn: 9, spr: "rock", ac:-360, end:4000, note:"t_G", v: [1200, Phaser.Math.DegToRad(20)], xy:[-300,200]},

        {key: "bubble", spawn: 12, spr: "bbl", ac:19, end:21, note:"t_Eb", v: [300, Phaser.Math.DegToRad(315)], xy:[150,340]},
        {key: "bubble", spawn: 13, spr: "bbl", ac:20, end:22, note:"t_Bb", v: [300, Phaser.Math.DegToRad(305)], xy:[150,740]},
        {key: "bubble", spawn: 14, spr: "bbl", ac:21, end:23, note:"t_Eb", v: [300, Phaser.Math.DegToRad(225)], xy:[1770,340]},
        {key: "prop", spawn: 14, spr: "futbol", ac:720, end:8000, note:"t_G", v: [600, Phaser.Math.DegToRad(-175)], xy:[2320,540]},
        {key: "bubble", spawn: 15, spr: "bbl", ac:22, end:24, note:"t_C", v: [300, Phaser.Math.DegToRad(235)], xy:[1770,740]},
        {key: "bubble", spawn: 16, spr: "bbl", ac:23, end:25, note:"t_Eb", v: [300, Phaser.Math.DegToRad(240)], xy:[660,150]},
        {key: "bubble", spawn: 17, spr: "bbl", ac:24, end:26, note:"t_F", v: [300, Phaser.Math.DegToRad(300)], xy:[1260,150]},

        {key: "bubble", spawn: 20, spr: "bbl", ac:26, end:28, note:"t_D", v: [400, Phaser.Math.DegToRad(90)], xy:[960,540]},
        {key: "fallprop", spawn: 21, spr: "squire", ac:0, end:8000, note:"t_G", v: [800, Phaser.Math.DegToRad(90)], xy:[210,-200]},
        {key: "fallprop", spawn: 22, spr: "squire", ac:0, end:8000, note:"t_G", v: [800, Phaser.Math.DegToRad(90)], xy:[510,-200]},
        {key: "fallprop", spawn: 23, spr: "squire", ac:0, end:8000, note:"t_G", v: [800, Phaser.Math.DegToRad(90)], xy:[810,-200]},
        {key: "fallprop", spawn: 24, spr: "squire", ac:0, end:8000, note:"t_G", v: [800, Phaser.Math.DegToRad(90)], xy:[1110,-200]},
        {key: "fallprop", spawn: 25, spr: "squire", ac:0, end:8000, note:"t_G", v: [800, Phaser.Math.DegToRad(90)], xy:[1410,-200]},
        {key: "bubble", spawn: 25, spr: "bbl", ac:32, end:34, note:"t_G", v: [200, Phaser.Math.DegToRad(90)], xy:[960,840]},

        {key: "bubble", spawn: 28, spr: "bbl", ac:35, end:37, note:"t_G", v: [100, Phaser.Math.DegToRad(-90)], xy:[115,200]},
        {key: "bubble", spawn: 28.5, spr: "bbl", ac:35.5, end:37.5, note:"t_Eb", v: [100, Phaser.Math.DegToRad(-90)], xy:[355,200]},
        {key: "bubble", spawn: 29, spr: "bbl", ac:36, end:38, note:"t_G", v: [100, Phaser.Math.DegToRad(-90)], xy:[595,200]},
        {key: "bubble", spawn: 30, spr: "bbl", ac:37, end:39, note:"t_G", v: [100, Phaser.Math.DegToRad(-90)], xy:[835,200]},
        {key: "bubble", spawn: 31, spr: "bbl", ac:38, end:40, note:"t_Eb", v: [100, Phaser.Math.DegToRad(-90)], xy:[1075,200]},
        {key: "bubble", spawn: 32, spr: "bbl", ac:39, end:41, note:"t_Eb", v: [100, Phaser.Math.DegToRad(90)], xy:[1315,200]},
        {key: "bubble", spawn: 32.5, spr: "bbl", ac:39.5, end:41.5, note:"t_C", v: [100, Phaser.Math.DegToRad(90)], xy:[1555,200]},
        {key: "bubble", spawn: 33, spr: "bbl", ac:40, end:42, note:"t_Eb", v: [100, Phaser.Math.DegToRad(90)], xy:[1795,200]},
        {key: "bubble", spawn: 34, spr: "bbl", ac:41, end:43, note:"t_Eb", v: [100, Phaser.Math.DegToRad(180)], xy:[1760,440]},
        {key: "tower", spawn: 34, spr: "tower", ac:-120, end:43, note:"t_Eb", v: [700, Phaser.Math.DegToRad(-160)], xy:[1560,340]},
        {key: "bubble", spawn: 35, spr: "bbl", ac:42, end:44, note:"t_D", v: [100, Phaser.Math.DegToRad(180)], xy:[1760,680]},

        {key: "bubble", spawn: 36, spr: "bbl", ac:43, end:45, note:"t_F", v: [200, Phaser.Math.DegToRad(45)], xy:[150,400]},
        {key: "bubble", spawn: 36.5, spr: "bbl", ac:43.5, end:45.5, note:"t_D", v: [300, Phaser.Math.DegToRad(45)], xy:[150,700]},
        {key: "bubble", spawn: 37, spr: "bbl", ac:44, end:46, note:"t_F", v: [200, Phaser.Math.DegToRad(45)], xy:[240,870]},
        {key: "bubble", spawn: 37.5, spr: "bbl", ac:44.5, end:46.5, note:"t_D", v: [300, Phaser.Math.DegToRad(45)], xy:[480,870]},

        {key: "bubble", spawn: 38, spr: "bbl", ac:45, end:47, note:"t_F", v: [200, Phaser.Math.DegToRad(-45)], xy:[115,200]},
        {key: "bubble", spawn: 39, spr: "bbl", ac:46, end:48, note:"t_G", v: [300, Phaser.Math.DegToRad(-45)], xy:[355,200]},
        {key: "bubble", spawn: 40, spr: "bbl", ac:47, end:49, note:"t_F", v: [200, Phaser.Math.DegToRad(-45)], xy:[595,200]},
        {key: "bubble", spawn: 41, spr: "bbl", ac:48, end:50, note:"t_G", v: [300, Phaser.Math.DegToRad(-45)], xy:[835,200]},

        {key: "bubble", spawn: 42, spr: "bbl", ac:49, end:51, note:"t_G", v: [75, Phaser.Math.DegToRad(90)], xy:[1770,540]},
        {key: "bubble", spawn: 43, spr: "bbl", ac:50, end:52, note:"t_Ab", v: [75, Phaser.Math.DegToRad(-90)], xy:[1530,540]},
        {key: "bubble", spawn: 44, spr: "bbl", ac:51, end:53, note:"t_G", v: [75, Phaser.Math.DegToRad(90)], xy:[1290,540]},
        {key: "bubble", spawn: 45, spr: "bbl", ac:52, end:54, note:"t_Bb", v: [75, Phaser.Math.DegToRad(-90)], xy:[1050,540]},
        {key: "bubble", spawn: 47, spr: "bbl", ac:54, end:56, note:"t_Ab", v: [75, Phaser.Math.DegToRad(90)], xy:[810,540]},
        {key: "bubble", spawn: 48, spr: "bbl", ac:55, end:57, note:"t_G", v: [75, Phaser.Math.DegToRad(-90)], xy:[570,540]},
        {key: "bubble", spawn: 49, spr: "bbl", ac:56, end:58, note:"t_F", v: [75, Phaser.Math.DegToRad(90)], xy:[330,540]},

        /*
        {spawn: 50, spr: "bbl", ac:57, end:59, note:"t_G", v: [300, Phaser.Math.DegToRad(135)], xy:[1770,120]},
        {spawn: 51, spr: "bbl", ac:58, end:60, note:"t_D", v: [300, Phaser.Math.DegToRad(135)], xy:[1530,120]},
        {spawn: 52, spr: "bbl", ac:59, end:61, note:"t_G", v: [300, Phaser.Math.DegToRad(135)], xy:[1290,120]},
        {spawn: 53, spr: "bbl", ac:60, end:62, note:"t_F", v: [300, Phaser.Math.DegToRad(135)], xy:[10500,120]},
        */
        
    ]
    constructor(scene: MusicScene){
        this.curIndex = 0;
        this.scene=scene;
        this.data = this.brn;
    }

    start(){
        this.playing = true;
    }

    update(t:number,d:number,beat:number){
        if(!this.playing || (this.curIndex>this.data.length)){
            return;
        }
        for(let i = this.curIndex; i < this.data.length; i++) {
            if(beat >= this.data[i].spawn) {
                this.parse(i);
                this.curIndex++;
            } else {
                return;
            }
        }
    }

    parse(n: number){
        switch(this.data[n].key){
            case "bubble": {
                this.scene.addBubble(new Bauble(this.scene,this.data[n].xy[0],this.data[n].xy[1],this.data[n].ac,this.data[n].end,this.data[n].note
                    ,this.data[n].spr,this.data[n].v));
                break;
            } case "tower": {
                this.scene.addProp(new Tower(this.scene,this.data[n].xy[0],this.data[n].xy[1],this.data[n].spr,this.data[n].v,this.data[n].ac));
                break;
            } case "prop": {
                this.scene.addProp(new FadingProp(this.scene, this.data[n].xy[0], this.data[n].xy[1], this.data[n].spr, this.data[n].v, this.data[n].ac, this.data[n].end));
                break;
            } case "fallprop":{
                this.scene.addProp(new FallingProp(this.scene, this.data[n].xy[0], this.data[n].xy[1], this.data[n].spr, this.data[n].v, this.data[n].ac))
            } default: {
                break;
            }
        }
    }
}