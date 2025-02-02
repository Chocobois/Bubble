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
    collide:number[];

}

export class Beatmap {
    public curBPM: number;
    private curIndex: number;
    public scene: MusicScene;
    private data: BeatData[];
    private playing: boolean = false;
    private brn: BeatData[] = [
        {key: "bubble", spawn: 0, spr: "bbl", ac:3, end:5, note:"t_Eb", v: [200, Phaser.Math.DegToRad(90)], xy:[300,900], collide:[0,1]},
        {key: "bubble", spawn: 0.2, spr: "bbl", ac:4, end:6, note:"t_Ab", v: [200, Phaser.Math.DegToRad(90)], xy:[600,900], collide:[0,1]},
        {key: "bubble", spawn: 0.4, spr: "bbl", ac:5, end:7, note:"t_Eb", v: [200, Phaser.Math.DegToRad(90)], xy:[900,900], collide:[0,1]},
        {key: "bubble", spawn: 0.6, spr: "bbl", ac:6, end:8, note:"t_Ab", v: [200, Phaser.Math.DegToRad(90)], xy:[1200,900], collide:[0,1]},
        {key: "bubble", spawn: 0.8, spr: "bbl", ac:7, end:9, note:"t_Eb", v: [200, Phaser.Math.DegToRad(90)], xy:[1500,900], collide:[0,1]},

        {key: "bubble", spawn: 2, spr: "bbl", ac:8, end:10, note:"t_D", v: [300, Phaser.Math.DegToRad(-90)], xy:[960,200], collide:[0,1]},
        {key: "bubble", spawn: 4, spr: "bbl", ac:10, end:12, note:"t_B", v: [300, Phaser.Math.DegToRad(0)], xy:[150,540], collide:[0,1]},
        {key: "bubble", spawn: 6, spr: "bbl", ac:12, end:14, note:"t_G", v: [300, Phaser.Math.DegToRad(180)], xy:[1770,540], collide:[0,1]},
        {key: "bubble", spawn: 8, spr: "bbl", ac:14, end:16, note:"t_F", v: [300, Phaser.Math.DegToRad(90)], xy:[960,900], collide:[0,1]},
        {key: "bubble", spawn: 9, spr: "bbl", ac:16, end:18, note:"t_G", v: [300, Phaser.Math.DegToRad(45)], xy:[960,540], collide:[0,1]},
        {key: "prop", spawn: 9, spr: "rock", ac:-360, end:4000, note:"t_G", v: [1200, Phaser.Math.DegToRad(20)], xy:[-300,200], collide:[0,1]},

        {key: "bubble", spawn: 12, spr: "bbl", ac:19, end:21, note:"t_Eb", v: [300, Phaser.Math.DegToRad(315)], xy:[150,340], collide:[0,1]},
        {key: "bubble", spawn: 13, spr: "bbl", ac:20, end:22, note:"t_Bb", v: [300, Phaser.Math.DegToRad(305)], xy:[150,740], collide:[0,1]},
        {key: "bubble", spawn: 14, spr: "bbl", ac:21, end:23, note:"t_Eb", v: [300, Phaser.Math.DegToRad(225)], xy:[1770,340], collide:[0,1]},
        {key: "prop", spawn: 14, spr: "futbol", ac:720, end:8000, note:"t_G", v: [600, Phaser.Math.DegToRad(-175)], xy:[2320,540], collide:[0,1]},
        {key: "bubble", spawn: 15, spr: "bbl", ac:22, end:24, note:"t_C", v: [300, Phaser.Math.DegToRad(235)], xy:[1770,740], collide:[0,1]},
        {key: "bubble", spawn: 16, spr: "bbl", ac:23, end:25, note:"t_Eb", v: [300, Phaser.Math.DegToRad(240)], xy:[660,150], collide:[0,1]},
        {key: "bubble", spawn: 17, spr: "bbl", ac:24, end:26, note:"t_F", v: [300, Phaser.Math.DegToRad(300)], xy:[1260,150], collide:[0,1]},

        {key: "bubble", spawn: 20, spr: "bbl", ac:26, end:28, note:"t_D", v: [400, Phaser.Math.DegToRad(90)], xy:[960,540], collide:[0,1]},
        {key: "fallprop", spawn: 21, spr: "squire", ac:0, end:8000, note:"t_G", v: [800, Phaser.Math.DegToRad(90)], xy:[210,-200], collide:[0,1]},
        {key: "fallprop", spawn: 22, spr: "squire", ac:0, end:8000, note:"t_G", v: [800, Phaser.Math.DegToRad(90)], xy:[510,-200], collide:[0,1]},
        {key: "fallprop", spawn: 23, spr: "squire", ac:0, end:8000, note:"t_G", v: [800, Phaser.Math.DegToRad(90)], xy:[810,-200], collide:[0,1]},
        {key: "fallprop", spawn: 24, spr: "squire", ac:0, end:8000, note:"t_G", v: [800, Phaser.Math.DegToRad(90)], xy:[1110,-200], collide:[0,1]},
        {key: "fallprop", spawn: 25, spr: "squire", ac:0, end:8000, note:"t_G", v: [800, Phaser.Math.DegToRad(90)], xy:[1410,-200], collide:[0,1]},
        {key: "bubble", spawn: 25, spr: "bbl", ac:32, end:34, note:"t_G", v: [200, Phaser.Math.DegToRad(90)], xy:[960,840], collide:[0,1]},

        {key: "bubble", spawn: 28, spr: "bbl", ac:35, end:37, note:"t_G", v: [100, Phaser.Math.DegToRad(-90)], xy:[115,200], collide:[0,1]},
        {key: "bubble", spawn: 28.5, spr: "bbl", ac:35.5, end:37.5, note:"t_Eb", v: [100, Phaser.Math.DegToRad(-90)], xy:[355,200], collide:[0,1]},
        {key: "bubble", spawn: 29, spr: "bbl", ac:36, end:38, note:"t_G", v: [100, Phaser.Math.DegToRad(-90)], xy:[595,200], collide:[0,1]},
        {key: "bubble", spawn: 30, spr: "bbl", ac:37, end:39, note:"t_G", v: [100, Phaser.Math.DegToRad(-90)], xy:[835,200], collide:[0,1]},
        {key: "bubble", spawn: 31, spr: "bbl", ac:38, end:40, note:"t_Eb", v: [100, Phaser.Math.DegToRad(-90)], xy:[1075,200], collide:[0,1]},
        {key: "bubble", spawn: 32, spr: "bbl", ac:39, end:41, note:"t_Eb", v: [100, Phaser.Math.DegToRad(90)], xy:[1315,200], collide:[0,1]},
        {key: "bubble", spawn: 32.5, spr: "bbl", ac:39.5, end:41.5, note:"t_C", v: [100, Phaser.Math.DegToRad(90)], xy:[1555,200], collide:[0,1]},
        {key: "bubble", spawn: 33, spr: "bbl", ac:40, end:42, note:"t_Eb", v: [100, Phaser.Math.DegToRad(90)], xy:[1795,200], collide:[0,1]},
        {key: "bubble", spawn: 34, spr: "bbl", ac:41, end:43, note:"t_Eb", v: [100, Phaser.Math.DegToRad(180)], xy:[1760,440], collide:[0,1]},
        {key: "tower", spawn: 34, spr: "tower", ac:-120, end:43, note:"t_Eb", v: [700, Phaser.Math.DegToRad(-160)], xy:[1560,340], collide:[0,1]},
        {key: "bubble", spawn: 35, spr: "bbl", ac:42, end:44, note:"t_D", v: [100, Phaser.Math.DegToRad(180)], xy:[1760,680], collide:[0,1]},

        {key: "bubble", spawn: 36, spr: "bbl", ac:43, end:45, note:"t_F", v: [200, Phaser.Math.DegToRad(45)], xy:[150,400], collide:[0,1]},
        {key: "bubble", spawn: 36.5, spr: "bbl", ac:43.5, end:45.5, note:"t_D", v: [300, Phaser.Math.DegToRad(45)], xy:[150,700], collide:[0,1]},
        {key: "bubble", spawn: 37, spr: "bbl", ac:44, end:46, note:"t_F", v: [200, Phaser.Math.DegToRad(45)], xy:[240,870], collide:[0,1]},
        {key: "bubble", spawn: 37.5, spr: "bbl", ac:44.5, end:46.5, note:"t_D", v: [300, Phaser.Math.DegToRad(45)], xy:[480,870], collide:[0,1]},

        {key: "bubble", spawn: 38, spr: "bbl", ac:45, end:47, note:"t_F", v: [200, Phaser.Math.DegToRad(-45)], xy:[115,200], collide:[0,1]},
        {key: "bubble", spawn: 39, spr: "bbl", ac:46, end:48, note:"t_G", v: [300, Phaser.Math.DegToRad(-45)], xy:[355,200], collide:[0,1]},
        {key: "bubble", spawn: 40, spr: "bbl", ac:47, end:49, note:"t_F", v: [200, Phaser.Math.DegToRad(-45)], xy:[595,200], collide:[0,1]},
        {key: "bubble", spawn: 41, spr: "bbl", ac:48, end:50, note:"t_G", v: [300, Phaser.Math.DegToRad(-45)], xy:[835,200], collide:[0,1]},

        {key: "bubble", spawn: 42, spr: "bbl", ac:49, end:51, note:"t_G", v: [75, Phaser.Math.DegToRad(90)], xy:[1770,540], collide:[0,1]},
        {key: "bubble", spawn: 43, spr: "bbl", ac:50, end:52, note:"t_Ab", v: [75, Phaser.Math.DegToRad(-90)], xy:[1530,540], collide:[0,1]},
        {key: "bubble", spawn: 44, spr: "bbl", ac:51, end:53, note:"t_G", v: [75, Phaser.Math.DegToRad(90)], xy:[1290,540], collide:[0,1]},
        {key: "bubble", spawn: 45, spr: "bbl", ac:52, end:54, note:"t_Bb", v: [75, Phaser.Math.DegToRad(-90)], xy:[1050,540], collide:[0,1]},
        {key: "bubble", spawn: 47, spr: "bbl", ac:54, end:56, note:"t_Ab", v: [75, Phaser.Math.DegToRad(90)], xy:[810,540], collide:[0,1]},
        {key: "bubble", spawn: 48, spr: "bbl", ac:55, end:57, note:"t_G", v: [75, Phaser.Math.DegToRad(-90)], xy:[570,540], collide:[0,1]},
        {key: "bubble", spawn: 49, spr: "bbl", ac:56, end:58, note:"t_F", v: [75, Phaser.Math.DegToRad(90)], xy:[330,540], collide:[0,1]},

        /*
        {spawn: 50, spr: "bbl", ac:57, end:59, note:"t_G", v: [300, Phaser.Math.DegToRad(135)], xy:[1770,120]},
        {spawn: 51, spr: "bbl", ac:58, end:60, note:"t_D", v: [300, Phaser.Math.DegToRad(135)], xy:[1530,120]},
        {spawn: 52, spr: "bbl", ac:59, end:61, note:"t_G", v: [300, Phaser.Math.DegToRad(135)], xy:[1290,120]},
        {spawn: 53, spr: "bbl", ac:60, end:62, note:"t_F", v: [300, Phaser.Math.DegToRad(135)], xy:[10500,120]},
        */
        
    ]

    private bbls: BeatData[] = [
        {key: "bubble", spawn: 2, spr: "bbl", ac:7, end:8, note:"t_F", v: [70, Phaser.Math.DegToRad(90)], xy:[560,540], collide:[0,1]},
        {key: "bubble", spawn: 3.5, spr: "bbl", ac:8.5, end:9.5, note:"t_F", v: [70, Phaser.Math.DegToRad(-90)], xy:[960,540], collide:[0,1]},
        {key: "bubble", spawn: 6, spr: "bbl", ac:10, end:11, note:"t_F", v: [70, Phaser.Math.DegToRad(90)], xy:[1360,540], collide:[0,1]},

        {key: "bubble", spawn: 9.5, spr: "bbl", ac:13.5, end:14.5, note:"t_F", v: [120, Phaser.Math.DegToRad(45)], xy:[150,150], collide:[0,1]},
        {key: "bubble", spawn: 9.75, spr: "bbl", ac:15, end:16, note:"t_F", v: [120, Phaser.Math.DegToRad(135)], xy:[1770,150], collide:[0,1]},
        {key: "bubble", spawn: 10, spr: "bbl", ac:16.5, end:17.5, note:"t_F", v: [120, Phaser.Math.DegToRad(-135)], xy:[1770,930], collide:[0,1]},
        {key: "bubble", spawn: 10.25, spr: "bbl", ac:18, end:19, note:"t_F", v: [120, Phaser.Math.DegToRad(-45)], xy:[150,930], collide:[0,1]},

        {key: "bubble", spawn: 17.5, spr: "bbl", ac:21.5, end:22.5, note:"t_F", v: [150, Phaser.Math.DegToRad(120)], xy:[630,150], collide:[0,1]},
        {key: "bubble", spawn: 17.5, spr: "bbl", ac:23, end:24, note:"t_F", v: [150, Phaser.Math.DegToRad(90)], xy:[850,150], collide:[0,1]},
        {key: "bubble", spawn: 17.5, spr: "bbl", ac:24.5, end:25.5, note:"t_F", v: [150, Phaser.Math.DegToRad(90)], xy:[1070,150], collide:[0,1]},
        {key: "bubble", spawn: 17.5, spr: "bbl", ac:26, end:27, note:"t_F", v: [150, Phaser.Math.DegToRad(60)], xy:[1290,150], collide:[0,1]},

        {key: "bubble", spawn: 25.5, spr: "bbl", ac:29.5, end:30.5, note:"t_F", v: [240, Phaser.Math.DegToRad(0)], xy:[150,340], collide:[0,1]},
        {key: "bubble", spawn: 25.75, spr: "bbl", ac:31, end:32, note:"t_F", v: [240, Phaser.Math.DegToRad(180)], xy:[1770,340], collide:[0,1]},
        {key: "bubble", spawn: 28.5, spr: "bbl", ac:32.5, end:33.5, note:"t_F", v: [240, Phaser.Math.DegToRad(0)], xy:[150,740], collide:[0,1]},
        {key: "bubble", spawn: 28.75, spr: "bbl", ac:34, end:35, note:"t_F", v: [240, Phaser.Math.DegToRad(180)], xy:[1770,740], collide:[0,1]},

        {key: "bubble", spawn: 32.5, spr: "bbl", ac:37.5, end:38.5, note:"t_F", v: [70, Phaser.Math.DegToRad(-135)], xy:[790,370], collide:[0,1]},
        {key: "bubble", spawn: 32.5, spr: "bbl", ac:39, end:40, note:"t_F", v: [70, Phaser.Math.DegToRad(-45)], xy:[1130,370], collide:[0,1]},
        {key: "bubble", spawn: 32.5, spr: "bbl", ac:40, end:41, note:"t_F", v: [0, Phaser.Math.DegToRad(0)], xy:[960,540], collide:[0,1]},
        {key: "bubble", spawn: 32.5, spr: "bbl", ac:40.5, end:41.5, note:"t_F", v: [70, Phaser.Math.DegToRad(45)], xy:[1130,710], collide:[0,1]},
        {key: "bubble", spawn: 32.5, spr: "bbl", ac:42, end:43, note:"t_F", v: [70, Phaser.Math.DegToRad(135)], xy:[790,710], collide:[0,1]},

        {key: "bubble", spawn: 41.125, spr: "bbl", ac:44, end:45, note:"t_F", v: [0, Phaser.Math.DegToRad(0)], xy:[960,540], collide:[0,1]},

        {key: "bubble", spawn: 41.5, spr: "bbl", ac:45.5, end:46.5, note:"t_F", v: [100, Phaser.Math.DegToRad(180)], xy:[600,780], collide:[0,1]},
        {key: "bubble", spawn: 41.5, spr: "bbl", ac:46, end:47, note:"t_F", v: [100, Phaser.Math.DegToRad(180)], xy:[840,780], collide:[0,1]},
        {key: "bubble", spawn: 41.5, spr: "bbl", ac:47, end:48, note:"t_F", v: [100, Phaser.Math.DegToRad(0)], xy:[1080,780], collide:[0,1]},
        {key: "bubble", spawn: 41.5, spr: "bbl", ac:48, end:49, note:"t_F", v: [100, Phaser.Math.DegToRad(0)], xy:[1320,780], collide:[0,1]},
        {key: "bubble", spawn: 42.5, spr: "bbl", ac:48.5, end:49.5, note:"t_F", v: [100, Phaser.Math.DegToRad(0)], xy:[840,540], collide:[0,1]},
        {key: "bubble", spawn: 42.5, spr: "bbl", ac:50, end:51, note:"t_F", v: [140, Phaser.Math.DegToRad(0)], xy:[1080,540], collide:[0,1]},
        {key: "bubble", spawn: 43.5, spr: "bbl", ac:52, end:53, note:"t_F", v: [140, Phaser.Math.DegToRad(180)], xy:[960,300], collide:[0,1]},

        {key: "bubble", spawn: 50.5, spr: "bbl", ac:53.5, end:54.5, note:"t_F", v: [0, Phaser.Math.DegToRad(0)], xy:[960,540], collide:[0,1]},
        {key: "bubble", spawn: 51, spr: "bbl", ac:54, end:55, note:"t_F", v: [200, Phaser.Math.DegToRad(60)], xy:[960,540], collide:[0,1]},
        {key: "bubble", spawn: 52, spr: "bbl", ac:55, end:56, note:"t_F", v: [200, Phaser.Math.DegToRad(120)], xy:[960,540], collide:[0,1]},
        {key: "bubble", spawn: 53, spr: "bbl", ac:56, end:57, note:"t_F", v: [200, Phaser.Math.DegToRad(180)], xy:[960,540], collide:[0,1]},
        {key: "bubble", spawn: 53.5, spr: "bbl", ac:56.5, end:57.5, note:"t_F", v: [200, Phaser.Math.DegToRad(-120)], xy:[960,540], collide:[0,1]},
        {key: "bubble", spawn: 55, spr: "bbl", ac:58, end:59, note:"t_F", v: [200, Phaser.Math.DegToRad(-60)], xy:[960,540], collide:[0,1]},
        {key: "bubble", spawn: 57, spr: "bbl", ac:60, end:61, note:"t_F", v: [200, Phaser.Math.DegToRad(0)], xy:[960,540], collide:[0,1]},

        {key: "bubble", spawn: 57.5, spr: "bbl", ac:61.5, end:62.5, note:"t_F", v: [600, Phaser.Math.DegToRad(90)], xy:[240,200], collide:[0,1]},
        {key: "bubble", spawn: 57.5, spr: "bbl", ac:62, end:63, note:"t_F", v: [600, Phaser.Math.DegToRad(90)], xy:[480,200], collide:[0,1]},
        {key: "bubble", spawn: 57.5, spr: "bbl", ac:63, end:64, note:"t_F", v: [600, Phaser.Math.DegToRad(90)], xy:[720,880], collide:[0,1]},
        {key: "bubble", spawn: 57.5, spr: "bbl", ac:64, end:65, note:"t_F", v: [600, Phaser.Math.DegToRad(-90)], xy:[960,200], collide:[0,1]},
        {key: "bubble", spawn: 57.5, spr: "bbl", ac:64.5, end:65.5, note:"t_F", v: [600, Phaser.Math.DegToRad(-90)], xy:[1200,200], collide:[0,1]},
        {key: "bubble", spawn: 57.5, spr: "bbl", ac:66, end:67, note:"t_F", v: [600, Phaser.Math.DegToRad(90)], xy:[1440,880], collide:[0,1]},
        {key: "bubble", spawn: 59, spr: "bbl", ac:68, end:69, note:"t_F", v: [600, Phaser.Math.DegToRad(-90)], xy:[1680,200], collide:[0,1]},


        {key: "bubble", spawn: 59, spr: "bbl", ac:69, end:70, note:"t_F", v: [200, Phaser.Math.DegToRad(90)], xy:[480,420], collide:[1,2]},
        {key: "bubble", spawn: 58, spr: "bbl", ac:69.5, end:70.5, note:"t_F", v: [200, Phaser.Math.DegToRad(90)], xy:[720,420], collide:[1,2]},
        {key: "bubble", spawn: 59, spr: "bbl", ac:70, end:71, note:"t_F", v: [200, Phaser.Math.DegToRad(90)], xy:[960,420], collide:[1,2]},
        {key: "bubble", spawn: 59, spr: "bbl", ac:70.5, end:71.5, note:"t_F", v: [200, Phaser.Math.DegToRad(90)], xy:[1200,420], collide:[1,2]},
        {key: "bubble", spawn: 59, spr: "bbl", ac:71, end:72, note:"t_F", v: [200, Phaser.Math.DegToRad(90)], xy:[1440,420], collide:[1,2]},
        {key: "bubble", spawn: 59, spr: "bbl", ac:71.75, end:72.75, note:"t_F", v: [200, Phaser.Math.DegToRad(-90)], xy:[1440,660], collide:[1,2]},
        {key: "bubble", spawn: 59, spr: "bbl", ac:72, end:73, note:"t_F", v: [200, Phaser.Math.DegToRad(-90)], xy:[1200,660], collide:[1,2]},
        {key: "bubble", spawn: 59, spr: "bbl", ac:72.5, end:73.5, note:"t_F", v: [200, Phaser.Math.DegToRad(-90)], xy:[960,660], collide:[1,2]},
        {key: "bubble", spawn: 59, spr: "bbl", ac:73, end:74, note:"t_F", v: [200, Phaser.Math.DegToRad(-90)], xy:[720,660], collide:[1,2]},
        {key: "bubble", spawn: 59, spr: "bbl", ac:73.5, end:74.5, note:"t_F", v: [200, Phaser.Math.DegToRad(-90)], xy:[480,660], collide:[1,2]},
        
        {key: "bubble", spawn: 58, spr: "bbl", ac:74, end:75, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[240,660], collide:[1,2]},
        {key: "bubble", spawn: 58.05, spr: "bbl", ac:74.25, end:75.25, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[240,420], collide:[1,2]},
        {key: "bubble", spawn: 58.1, spr: "bbl", ac:74.5, end:75.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[240,180], collide:[1,2]},
        {key: "bubble", spawn: 58.15, spr: "bbl", ac:75, end:76, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[480,180], collide:[1,2]},
        {key: "bubble", spawn: 58.2, spr: "bbl", ac:75.75, end:76.75, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[720,180], collide:[1,2]},
        {key: "bubble", spawn: 58.25, spr: "bbl", ac:76, end:77, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[960,180], collide:[1,2]},
        {key: "bubble", spawn: 58.3, spr: "bbl", ac:76.5, end:77.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[1200,180], collide:[1,2]},
        {key: "bubble", spawn: 58.35, spr: "bbl", ac:77, end:78, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[1440,180], collide:[1,2]},
        {key: "bubble", spawn: 58.4, spr: "bbl", ac:77.25, end:78.25, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[1680,180], collide:[1,2]},
        {key: "bubble", spawn: 58.45, spr: "bbl", ac:77.5, end:78.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[1680,420], collide:[1,2]},
        {key: "bubble", spawn: 58.5, spr: "bbl", ac:77.75, end:78.75, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[1680,660], collide:[1,2]},
        {key: "bubble", spawn: 58.55, spr: "bbl", ac:78, end:79, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[1680,900], collide:[1,2]},
        {key: "bubble", spawn: 58.6, spr: "bbl", ac:78.25, end:79.25, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[1440,900], collide:[1,2]},
        {key: "bubble", spawn: 58.65, spr: "bbl", ac:78.5, end:79.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[1200,900], collide:[1,2]},
        {key: "bubble", spawn: 58.7, spr: "bbl", ac:78.75, end:79.75, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[960,900], collide:[1,2]},
        {key: "bubble", spawn: 58.75, spr: "bbl", ac:79, end:80, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[720,900], collide:[1,2]},
        {key: "bubble", spawn: 58.8, spr: "bbl", ac:79.75, end:80.75, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[480,900], collide:[1,2]},
        {key: "bubble", spawn: 58.85, spr: "bbl", ac:80, end:81, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[240,900], collide:[1,2]},


        {key: "fade", spawn: 63, spr: "bbl", ac:80, end:81, note:"t_F", v: [0, Phaser.Math.DegToRad(-90)], xy:[240,900], collide:[1,2]},

        
        {key: "bubble", spawn: 76.5, spr: "bbl", ac:80.5, end:81.5, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1680,900], collide:[0,3]},
        {key: "bubble", spawn: 76.5, spr: "bbl", ac:81, end:82, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1440,660], collide:[0,3]},
        {key: "bubble", spawn: 76.5, spr: "bbl", ac:81.25, end:82.25, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1680,420], collide:[0,3]},
        {key: "bubble", spawn: 76.5, spr: "bbl", ac:81.5, end:82.5, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1440,420], collide:[0,3]},
        {key: "bubble", spawn: 76.5, spr: "bbl", ac:82, end:83, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1200,420], collide:[0,3]},
        {key: "bubble", spawn: 76.5, spr: "bbl", ac:82.25, end:83.25, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1200,660], collide:[0,3]},
        {key: "bubble", spawn: 76.5, spr: "bbl", ac:82.5, end:83.5, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1200,900], collide:[0,3]},
        
        {key: "bubble", spawn: 77, spr: "bbl", ac:82.75, end:83.75, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[960,900], collide:[0,3]},
        {key: "bubble", spawn: 77, spr: "bbl", ac:83, end:84, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[720,660], collide:[0,3]},
        {key: "bubble", spawn: 77, spr: "bbl", ac:83.75, end:84.75, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[720,420], collide:[0,3]},
        {key: "bubble", spawn: 77, spr: "bbl", ac:84, end:85, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[480,420], collide:[0,3]},
        {key: "bubble", spawn: 77, spr: "bbl", ac:84.5, end:85.5, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[480,660], collide:[0,3]},

        //BREAK!
        {key: "bubble", spawn: 80.5, spr: "bbl", ac:85.5, end:86.5, note:"t_F", v: [550, Phaser.Math.DegToRad(-25)], xy:[200,880], collide:[0,3]},
        {key: "bubble", spawn: 80.5, spr: "bbl", ac:86.25, end:87.25, note:"t_F", v: [450, Phaser.Math.DegToRad(-25)], xy:[420,880], collide:[0,3]},
        {key: "bubble", spawn: 80.5, spr: "bbl", ac:87, end:88, note:"t_F", v: [350, Phaser.Math.DegToRad(-25)], xy:[640,880], collide:[0,3]},
        {key: "bubble", spawn: 80.5, spr: "bbl", ac:87.75, end:88.75, note:"t_F", v: [250, Phaser.Math.DegToRad(-25)], xy:[860,880], collide:[0,3]},
        {key: "bubble", spawn: 80.5, spr: "bbl", ac:88.5, end:89.5, note:"t_F", v: [150, Phaser.Math.DegToRad(-25)], xy:[1080,880], collide:[0,3]},

        
        {key: "bubble", spawn: 83.5, spr: "bbl", ac:91, end:92, note:"t_F", v: [120, Phaser.Math.DegToRad(135)], xy:[1680,180], collide:[0,3]},
        {key: "bubble", spawn: 83.5, spr: "bbl", ac:91.75, end:92.75, note:"t_F", v: [120, Phaser.Math.DegToRad(165)], xy:[1440,180], collide:[0,3]},
        {key: "bubble", spawn: 83.5, spr: "bbl", ac:92.5, end:93.5, note:"t_F", v: [120, Phaser.Math.DegToRad(105)], xy:[1680,420], collide:[0,3]},

        {key: "bubble", spawn: 88.5, spr: "bbl", ac:93.5, end:94.5, note:"t_F", v: [75, Phaser.Math.DegToRad(0)], xy:[240,900], collide:[0,3]},
        {key: "bubble", spawn: 88.5, spr: "bbl", ac:94.25, end:95.25, note:"t_F", v: [75, Phaser.Math.DegToRad(0)], xy:[480,900], collide:[0,3]},
        {key: "bubble", spawn: 88.5, spr: "bbl", ac:95, end:96, note:"t_F", v: [75, Phaser.Math.DegToRad(0)], xy:[720,900], collide:[0,3]},
        {key: "bubble", spawn: 88.5, spr: "bbl", ac:95.75, end:96.75, note:"t_F", v: [75, Phaser.Math.DegToRad(180)], xy:[1440,660], collide:[0,3]},
        {key: "bubble", spawn: 88.5, spr: "bbl", ac:96.5, end:97.5, note:"t_F", v: [75, Phaser.Math.DegToRad(180)], xy:[1440,420], collide:[0,3]},


        {key: "bubble", spawn: 95, spr: "bbl", ac:99, end:100, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[830,370], collide:[0,3]},
        {key: "bubble", spawn: 95, spr: "bbl", ac:99.75, end:100.75, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[460,370], collide:[0,3]},
        {key: "bubble", spawn: 95, spr: "bbl", ac:100.5, end:101.5, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[460,710], collide:[0,3]},
        {key: "bubble", spawn: 95, spr: "bbl", ac:101.5, end:102.5, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[830,710], collide:[0,3]},
        
        {key: "bubble", spawn: 97, spr: "bbl", ac:102.25, end:103.25, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1260,300], collide:[0,3]},
        {key: "bubble", spawn: 97, spr: "bbl", ac:103, end:104, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1500,540], collide:[0,3]},
        {key: "bubble", spawn: 97, spr: "bbl", ac:103.75, end:104.75, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1260,780], collide:[0,3]},
        {key: "bubble", spawn: 97, spr: "bbl", ac:104, end:105, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1020,540], collide:[0,3]},
        
        {key: "bubble", spawn: 99, spr: "bbl", ac:104.5, end:105.5, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1430,370], collide:[0,3]},
        {key: "bubble", spawn: 99, spr: "bbl", ac:106, end:107, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1430,710], collide:[0,3]},
        {key: "bubble", spawn: 99, spr: "bbl", ac:106.25, end:107.25, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1090,710], collide:[0,3]},
        {key: "bubble", spawn: 99, spr: "bbl", ac:106.5, end:107.5, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[1090,370], collide:[0,3]},
        
        {key: "bubble", spawn: 101, spr: "bbl", ac:106.75, end:107.75, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[660,300], collide:[0,3]},
        {key: "bubble", spawn: 101, spr: "bbl", ac:107, end:108, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[900,540], collide:[0,3]},
        {key: "bubble", spawn: 101, spr: "bbl", ac:107.75, end:108.75, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[660,780], collide:[0,3]},
        {key: "bubble", spawn: 101, spr: "bbl", ac:108, end:109, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[420,540], collide:[0,3]},


        {key: "bubble", spawn: 104.5, spr: "bbl", ac:108.5, end:109.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[840,900], collide:[0,3]},
        {key: "bubble", spawn: 104.5, spr: "bbl", ac:109, end:110, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[600,900], collide:[0,3]},
        {key: "bubble", spawn: 104.5, spr: "bbl", ac:109.5, end:110.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[720,660], collide:[0,3]},
        {key: "bubble", spawn: 104.5, spr: "bbl", ac:110.25, end:111.25, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[840,420], collide:[0,3]},
        {key: "bubble", spawn: 104.5, spr: "bbl", ac:110.5, end:111.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[960,180], collide:[0,3]},
        {key: "bubble", spawn: 104.5, spr: "bbl", ac:110.65, end:111.625, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1080,420], collide:[0,3]},
        {key: "bubble", spawn: 104.5, spr: "bbl", ac:110.75, end:111.75, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1200,660], collide:[0,3]},
        {key: "bubble", spawn: 104.5, spr: "bbl", ac:110.875, end:111.875, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1320,900], collide:[0,3]},
        {key: "bubble", spawn: 104.5, spr: "bbl", ac:111, end:112, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1080,900], collide:[0,3]},
        
        {key: "bubble", spawn: 105.75, spr: "bbl", ac:111.75, end:112.75, note:"t_F", v: [540, Phaser.Math.DegToRad(-35)], xy:[180,660], collide:[0,3]},
        {key: "bubble", spawn: 106.75, spr: "bbl", ac:112, end:113, note:"t_F", v: [540, Phaser.Math.DegToRad(-35)], xy:[180,660], collide:[0,3]},
        {key: "bubble", spawn: 107.75, spr: "bbl", ac:112.5, end:113.5, note:"t_F", v: [540, Phaser.Math.DegToRad(-35)], xy:[180,660], collide:[0,3]},
        
        {key: "bubble", spawn: 110, spr: "bbl", ac:114, end:115, note:"t_F", v: [75, Phaser.Math.DegToRad(0)], xy:[480,180], collide:[0,3]},
        {key: "bubble", spawn: 110, spr: "bbl", ac:114.25, end:115.25, note:"t_F", v: [75, Phaser.Math.DegToRad(0)], xy:[480,420], collide:[0,3]},
        {key: "bubble", spawn: 110, spr: "bbl", ac:114.5, end:115.5, note:"t_F", v: [75, Phaser.Math.DegToRad(0)], xy:[720,660], collide:[0,3]},
        {key: "bubble", spawn: 110, spr: "bbl", ac:114.75, end:115.75, note:"t_F", v: [75, Phaser.Math.DegToRad(0)], xy:[720,900], collide:[0,3]},
        {key: "bubble", spawn: 110, spr: "bbl", ac:115, end:116, note:"t_F", v: [75, Phaser.Math.DegToRad(0)], xy:[960,660], collide:[0,3]},
        
        {key: "bubble", spawn: 111.75, spr: "bbl", ac:115.75, end:116.75, note:"t_F", v: [340, Phaser.Math.DegToRad(-90)], xy:[1440,180], collide:[0,3]},
        {key: "bubble", spawn: 111.75, spr: "bbl", ac:116, end:117, note:"t_F", v: [340, Phaser.Math.DegToRad(-90)], xy:[1200,180], collide:[0,3]},
        {key: "bubble", spawn: 111.75, spr: "bbl", ac:116.5, end:117.5, note:"t_F", v: [340, Phaser.Math.DegToRad(-90)], xy:[960,180], collide:[0,3]},
        {key: "bubble", spawn: 111.75, spr: "bbl", ac:117.25, end:118.25, note:"t_F", v: [340, Phaser.Math.DegToRad(-90)], xy:[720,180], collide:[0,3]},
        {key: "bubble", spawn: 111.75, spr: "bbl", ac:117.5, end:118.5, note:"t_F", v: [340, Phaser.Math.DegToRad(90)], xy:[480,900], collide:[0,3]},
        {key: "bubble", spawn: 111.75, spr: "bbl", ac:118, end:119, note:"t_F", v: [340, Phaser.Math.DegToRad(90)], xy:[720,900], collide:[0,3]},
        {key: "bubble", spawn: 111.75, spr: "bbl", ac:118.25, end:119.25, note:"t_F", v: [340, Phaser.Math.DegToRad(90)], xy:[960,900], collide:[0,3]},
        {key: "bubble", spawn: 111.75, spr: "bbl", ac:118.5, end:119.5, note:"t_F", v: [340, Phaser.Math.DegToRad(90)], xy:[1200,900], collide:[0,3]},
        
        {key: "bubble", spawn: 115, spr: "bbl", ac:119, end:120, note:"t_F", v: [100, Phaser.Math.DegToRad(-85)], xy:[1680,900], collide:[0,3]},
        {key: "bubble", spawn: 115, spr: "bbl", ac:119.75, end:120.75, note:"t_F", v: [100, Phaser.Math.DegToRad(-105)], xy:[1440,900], collide:[0,3]},
        {key: "bubble", spawn: 115, spr: "bbl", ac:120, end:121, note:"t_F", v: [100, Phaser.Math.DegToRad(-125)], xy:[1200,900], collide:[0,3]},
        {key: "bubble", spawn: 115, spr: "bbl", ac:120.5, end:121.5, note:"t_F", v: [100, Phaser.Math.DegToRad(-145)], xy:[960,900], collide:[0,3]},

        {key: "bubble", spawn: 118, spr: "bbl", ac:122, end:123, note:"t_F", v: [50, Phaser.Math.DegToRad(-90)], xy:[960,340], collide:[0,3]},
        {key: "bubble", spawn: 118, spr: "bbl", ac:122.25, end:123.25, note:"t_F", v: [50, Phaser.Math.DegToRad(90)], xy:[960,740], collide:[0,3]},
        {key: "bubble", spawn: 118, spr: "bbl", ac:122.5, end:123.5, note:"t_F", v: [50, Phaser.Math.DegToRad(0)], xy:[1160,540], collide:[0,3]},
        {key: "bubble", spawn: 118, spr: "bbl", ac:122.75, end:123.75, note:"t_F", v: [50, Phaser.Math.DegToRad(180)], xy:[760,540], collide:[0,3]},
        {key: "bubble", spawn: 119, spr: "bbl", ac:123, end:124, note:"t_F", v: [50, Phaser.Math.DegToRad(-45)], xy:[1160,340], collide:[0,3]},
        {key: "bubble", spawn: 119, spr: "bbl", ac:123.75, end:124.75, note:"t_F", v: [50, Phaser.Math.DegToRad(135)], xy:[760,740], collide:[0,3]},
        {key: "bubble", spawn: 119, spr: "bbl", ac:124, end:125, note:"t_F", v: [50, Phaser.Math.DegToRad(-135)], xy:[760,340], collide:[0,3]},
        {key: "bubble", spawn: 119, spr: "bbl", ac:124.5, end:125.5, note:"t_F", v: [50, Phaser.Math.DegToRad(45)], xy:[1160,740], collide:[0,3]},


        {key: "bubble", spawn: 121.5, spr: "bbl", ac:125.5, end:126.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[240,900], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:126, end:127, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[240,660], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:126.5, end:127.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[240,420], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:126.75, end:127.75, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[240,180], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:127, end:128, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[480,180], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:127.25, end:128.25, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[720,420], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:127.5, end:128.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[720,660], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:127.75, end:128.75, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[480,900], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:128.5, end:129.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[960,660], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:130, end:131, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[960,900], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:130.25, end:131.25, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1200,900], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:130.5, end:131.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1440,660], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:131, end:132, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1440,420], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:131.75, end:132.75, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1440,180], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:132, end:133, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1200,180], collide:[0,3]},
        {key: "bubble", spawn: 121.5, spr: "bbl", ac:132.5, end:133.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1680,180], collide:[0,3]},

        {key: "bubble", spawn: 129.5, spr: "bbl", ac:133.5, end:134.5, note:"t_F", v: [90, Phaser.Math.DegToRad(45)], xy:[480,180], collide:[0,3]},
        {key: "bubble", spawn: 129.5, spr: "bbl", ac:134.25, end:135.25, note:"t_F", v: [90, Phaser.Math.DegToRad(45)], xy:[240,180], collide:[0,3]},
        {key: "bubble", spawn: 129.5, spr: "bbl", ac:135, end:136, note:"t_F", v: [90, Phaser.Math.DegToRad(45)], xy:[240,420], collide:[0,3]},
        {key: "bubble", spawn: 131.75, spr: "bbl", ac:135.75, end:136.75, note:"t_F", v: [120, Phaser.Math.DegToRad(-135)], xy:[1440,900], collide:[0,3]},
        {key: "bubble", spawn: 131.75, spr: "bbl", ac:136, end:137, note:"t_F", v: [120, Phaser.Math.DegToRad(-135)], xy:[1680,900], collide:[0,3]},
        {key: "bubble", spawn: 131.75, spr: "bbl", ac:136.5, end:137.5, note:"t_F", v: [120, Phaser.Math.DegToRad(-135)], xy:[1680,660], collide:[0,3]},

        {key: "bubble", spawn: 134, spr: "bbl", ac:138, end:139, note:"t_F", v: [110, Phaser.Math.DegToRad(135)], xy:[1200,180], collide:[0,3]},
        {key: "bubble", spawn: 134, spr: "bbl", ac:138.25, end:139.25, note:"t_F", v: [110, Phaser.Math.DegToRad(135)], xy:[1200,420], collide:[0,3]},
        {key: "bubble", spawn: 134, spr: "bbl", ac:138.5, end:139.5, note:"t_F", v: [110, Phaser.Math.DegToRad(135)], xy:[1440,420], collide:[0,3]},
        {key: "bubble", spawn: 134, spr: "bbl", ac:138.75, end:139.75, note:"t_F", v: [110, Phaser.Math.DegToRad(135)], xy:[1680,420], collide:[0,3]},
        {key: "bubble", spawn: 134, spr: "bbl", ac:139, end:140, note:"t_F", v: [110, Phaser.Math.DegToRad(135)], xy:[1680,180], collide:[0,3]},

        {key: "bubble", spawn: 147, spr: "bbl", ac:151, end:152, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[960,180], collide:[0,3]},
        {key: "bubble", spawn: 147, spr: "bbl", ac:151.75, end:152.75, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1200,660], collide:[0,3]},
        {key: "bubble", spawn: 147, spr: "bbl", ac:152.5, end:153.5, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[720,660], collide:[0,3]},

        {key: "bubble", spawn: 150.25, spr: "bbl", ac:154.25, end:155.25, note:"t_F", v: [500, Phaser.Math.DegToRad(-180)], xy:[200,420], collide:[0,3]},
        {key: "bubble", spawn: 150.25, spr: "bbl", ac:154.75, end:155.75, note:"t_F", v: [500, Phaser.Math.DegToRad(-180)], xy:[200,660], collide:[0,3]},

        {key: "bubble", spawn: 154.5, spr: "bbl", ac:158.5, end:159.5, note:"t_F", v: [110, Phaser.Math.DegToRad(90)], xy:[960,660], collide:[0,3]},
        {key: "bubble", spawn: 154.5, spr: "bbl", ac:159, end:160, note:"t_F", v: [100, Phaser.Math.DegToRad(90)], xy:[720,660], collide:[0,3]},
        {key: "bubble", spawn: 154.5, spr: "bbl", ac:159.25, end:160.25, note:"t_F", v: [110, Phaser.Math.DegToRad(90)], xy:[1200,660], collide:[0,3]},

        {key: "bubble", spawn: 158, spr: "bbl", ac:162.25, end:163.25, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[720,900], collide:[0,3]},
        {key: "bubble", spawn: 158, spr: "bbl", ac:162.75, end:163.75, note:"t_F", v: [0, Phaser.Math.DegToRad(-135)], xy:[1200,900], collide:[0,3]},

    ];

    constructor(scene: MusicScene){
        this.curIndex = 0;
        this.scene=scene;
        this.data = this.bbls;
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
                    ,this.data[n].spr,this.data[n].v,this.data[n].collide));
                break;
            } case "tower": {
                this.scene.addProp(new Tower(this.scene,this.data[n].xy[0],this.data[n].xy[1],this.data[n].spr,this.data[n].v,this.data[n].ac));
                break;
            } case "prop": {
                this.scene.addProp(new FadingProp(this.scene, this.data[n].xy[0], this.data[n].xy[1], this.data[n].spr, this.data[n].v, this.data[n].ac, this.data[n].end));
                break;
            } case "fallprop":{
                this.scene.addProp(new FallingProp(this.scene, this.data[n].xy[0], this.data[n].xy[1], this.data[n].spr, this.data[n].v, this.data[n].ac));
                break;
            } case "fade": {
                this.scene.crossFade();
                break;
            }   default: {
                break;
            }
        }
    }
}