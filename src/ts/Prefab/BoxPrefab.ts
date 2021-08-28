import AudioManager from "../Managers/AudioManager";
import ColumnPrefab from "./ColumnPrefab";

export default class BoxPrefab extends Phaser.GameObjects.Sprite {

    currentColumn: ColumnPrefab = null;
    constructor(scene: Phaser.Scene, x: number, y: number, addWidth: number, color: number) {
        super(scene, x, y, "box");

        this.setOrigin(.5, 1);

        this.scaleY = .2;
        this.scaleX = .75 + addWidth;

        this.setTint(color);

        var width = this.width;
        var rect = new Phaser.Geom.Rectangle(0, -55, width, this.height + 120);
        this.setInteractive(rect, Phaser.Geom.Rectangle.Contains);
        this.on("pointerup", () => {
            if (this.currentColumn) {
                this.currentColumn.OnClick();
            }
        }, this);

        scene.add.existing(this);
    }

    Move(x: number, y: number, completeFunc: Function = null) {
        if (this.scene.tweens.isTweening(this)) return;
        AudioManager.Instance.PlaySFXOneShot("moveSfx", .5);
        this.scene.tweens.add({
            targets: this,
            y: { from: this.y, to: y },
            x: { from: this.x, to: x },
            duration: 200,
            ease: "Linear",
            onComplete: () => {
                if (completeFunc) {
                    completeFunc();
                }
            }
        })
    }
    Shake() {
        if (this.scene.tweens.isTweening(this)) return;
        AudioManager.Instance.PlaySFXOneShot("errorSfx", .5);
        var currentX = this.x;
        this.scene.tweens.add({
            targets: this,
            x: "+=1",
            duration: 35,
            ease: "PingPong",
            loop: 2,
            onComplete: () => {
                this.x = currentX;
            }
        })
    }
}