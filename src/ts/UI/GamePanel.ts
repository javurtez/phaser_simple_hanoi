import Constants from "../../Constants";
import BasePanel from "./BasePanel";
import BaseSlot from "./BaseSlot";

export default class GamePanel extends BasePanel {
    moveCountTxt: Phaser.GameObjects.Text;
    moveCountProgressTxt: Phaser.GameObjects.Text;
    progressBarImg: Phaser.GameObjects.Image;
    maxScaleX: number = 5;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        var moveTxt = scene.add.text(-100, -172, "Moves:").setFontSize(38).setColor(Constants.FontColor).setFontFamily(Constants.FontFamily).setOrigin(1, .5);
        this.moveCountTxt = scene.add.text(-70, -172, "0").setFontSize(38).setColor(Constants.FontColor).setFontFamily(Constants.FontFamily).setOrigin(1, .5).setFontStyle("Bold");
        this.moveCountProgressTxt = scene.add.text(250, -172, "0").setFontSize(28).setColor(Constants.FontColor).setFontFamily(Constants.FontFamily).setOrigin(0, .5).setFontStyle("Bold");

        var progressBarBg = scene.add.image(35, -170, "box").setOrigin(0, .5).setScale(this.maxScaleX + .15, .45).setAlpha(.5);
        this.progressBarImg = scene.add.image(40, -170, "box").setOrigin(0, .5).setScale(0, .3);

        var replyBtn = new BaseSlot(scene, -340, -170, "replay").setScale(.8);
        replyBtn.pointerUp = () => {            
            this.Close();

            scene.scene.stop(scene.scene.key);
            scene.scene.start(scene.scene.key);
        }

        this.add([moveTxt, this.moveCountTxt, progressBarBg, this.progressBarImg, this.moveCountProgressTxt, replyBtn]);

        scene.add.existing(this);
    }

    public SetUpdateMoveCount(count: number, max: number) {
        this.moveCountTxt.setTintFill(count > max ? 0xbd1e13 : 0x000000)
        this.moveCountTxt.setText(count.toString());
        this.moveCountProgressTxt.setText(count + " / " + max);

        var scaleX = (count / max) * this.maxScaleX;
        if (scaleX > this.maxScaleX) return;
        this.progressBarImg.setScale(scaleX, .3);
    }
}