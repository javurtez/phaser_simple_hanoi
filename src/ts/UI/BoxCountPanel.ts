import BasePanel from "./BasePanel";
import Slider from 'phaser3-rex-plugins/plugins/slider.js';
import BaseSlot from "./BaseSlot";
import GameScene from "../Scene/GameScene";
import Constants from "../../Constants";

export default class BoxCountPanel extends BasePanel {
    slider: Slider;
    min: number = 3;
    max: number = 10;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        var bg = scene.add.image(0, 0, "box");
        bg.setInteractive().setScale(14).setOrigin(.5).setAlpha(.3);
        var panel = scene.add.image(0, 0, "panel");
        panel.setScale(2);

        var setBoxTxt = scene.add.text(0, -120, "Set Disks").setFontSize(40).setColor(Constants.FontColor).setFontFamily(Constants.FontFamily).setOrigin(.5);
        var boxCountTxt = scene.add.text(0, -75, this.min.toString()).setFontSize(54).setColor(Constants.FontColor).setFontFamily(Constants.FontFamily).setOrigin(.5).setFontStyle("Bold");

        var okayBtn = new BaseSlot(scene, 0, 100, "button");
        okayBtn.pointerUp = () => {
            GameScene.prototype.boxCount = this.slider.getValue(this.min, this.max);
            GameScene.prototype.setHanoiFunc();
            this.Close();
        }
        var okayTxt = scene.add.text(okayBtn.x, okayBtn.y, "Set").setFontSize(38).setColor(Constants.FontColor).setFontFamily(Constants.FontFamily).setOrigin(.5);

        var img = scene.add.circle(0, 0, 12, 0x000000);
        var endPoints = {
            endPoints: [{
                x: img.x - 100,
                y: img.y
            },
            {
                x: img.x + 100,
                y: img.y
            }
            ],
            value: 0
        }

        this.slider = new Slider(img,
            {
                endPoints: [{
                    x: endPoints.endPoints[0].x,
                    y: endPoints.endPoints[0].y
                },
                {
                    x: endPoints.endPoints[1].x,
                    y: endPoints.endPoints[1].y
                }
                ],
                value: endPoints.value,
                valuechangeCallback: () => {
                    if (!this.slider) return;
                    var vals = this.slider.getValue(this.min, this.max);
                    vals = Phaser.Math.CeilTo(vals);
                    this.slider.value = (vals - this.min) / (this.max - this.min);
                    boxCountTxt.setText(vals.toString());
                    GameScene.prototype.boxCount = this.slider.getValue(this.min, this.max);
                    GameScene.prototype.setMovementFunc();
                    console.log("Disks: " + vals);
                }
            });

        var graph = scene.add.graphics()
            .lineStyle(9, 0x878787, .3)
            .strokePoints(endPoints.endPoints);

        this.add([bg, panel, setBoxTxt, boxCountTxt, graph, img, okayBtn, okayTxt]);

        scene.add.existing(this);
    }
}