import Constants from "../../Constants";
import AudioManager from "../Managers/AudioManager";
import BasePanel from "./BasePanel";
import BaseSlot from "./BaseSlot";

export default class CompletePanel extends BasePanel {

    moveCountTxt: Phaser.GameObjects.Text;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        var bg = scene.add.image(0, 0, "box");
        bg.setInteractive().setScale(14).setOrigin(.5).setAlpha(.3);
        var panel = scene.add.image(0, 0, "panel");
        panel.setScale(1.6);

        var okayBtn = new BaseSlot(scene, 0, 100, "button");
        okayBtn.pointerUp = () => {
            this.Close();

            scene.scene.stop(scene.scene.key);
            scene.scene.start(scene.scene.key);
        }
        var okayTxt = scene.add.text(okayBtn.x, okayBtn.y, "Retry").setFontSize(28).setColor(Constants.FontColor).setFontFamily(Constants.FontFamily).setOrigin(.5);

        var moveTxt = scene.add.text(0, -60, "Move Count").setFontSize(44).setColor(Constants.FontColor).setFontFamily(Constants.FontFamily).setOrigin(.5);
        this.moveCountTxt = scene.add.text(moveTxt.x, -20, "0").setFontSize(54).setColor(Constants.FontColor).setFontFamily(Constants.FontFamily).setOrigin(.5).setFontStyle("Bold");

        this.add([bg, panel, okayBtn, okayTxt, moveTxt, this.moveCountTxt]);

        scene.add.existing(this);

        this.Close();
    }

    public OpenComplete(count: number, max: number) {
        AudioManager.Instance.PlaySFXOneShot(count > max ? "errorSfx" : "completeSfx", .5);
        super.Open();
        this.moveCountTxt.setTintFill(count > max ? 0xbd1e13 : 0x000000)
        this.moveCountTxt.setText(count + " / " + max);
    }
}