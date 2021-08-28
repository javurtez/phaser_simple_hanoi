import Constants from "../../Constants";
import BasePanel from "./BasePanel";
import BaseSlot from "./BaseSlot";

export default class GamePanel extends BasePanel {
    moveCountTxt: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        var moveTxt = scene.add.text(0, -170, "Move Count").setFontSize(33).setColor(Constants.FontColor).setFontFamily(Constants.FontFamily).setOrigin(.5);
        this.moveCountTxt = scene.add.text(0, -140, "0 / 0").setFontSize(44).setColor(Constants.FontColor).setFontFamily(Constants.FontFamily).setOrigin(.5).setFontStyle("Bold");

        var replyBtn = new BaseSlot(scene, -360, -170, "replay").setScale(.8);
        replyBtn.pointerUp = () => {            
            this.Close();

            scene.scene.stop(scene.scene.key);
            scene.scene.start(scene.scene.key);
        }

        this.add([moveTxt, this.moveCountTxt, replyBtn]);

        scene.add.existing(this);
    }

    public SetUpdateMoveCount(count: number, max: number) {
        this.moveCountTxt.setTintFill(count > max ? 0xbd1e13 : 0x000000)
        this.moveCountTxt.setText(count.toString() + " / " + max.toString());
    }
}