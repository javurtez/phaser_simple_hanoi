import Constants from "../../Constants";
import AudioManager from "../Managers/AudioManager";
import GameScene from "../Scene/GameScene";
import BoxPrefab from "./BoxPrefab";

export default class ColumnPrefab extends Phaser.GameObjects.Sprite {

    public moveY: number = 0;
    public boxList: BoxPrefab[] = [];

    private isFinish: boolean = false;

    get BoxListLength() {
        return this.boxList.length;
    }
    get LastBox() {
        if (this.BoxListLength > 0) {
            return this.boxList[this.BoxListLength - 1];
        }
        else {
            return null;
        }
    }

    constructor(scene: Phaser.Scene, x: number, y: number, isFinish: boolean = false) {
        super(scene, x, y, "box");

        this.setOrigin(.5, 1);
        this.setTint(0xd6ae4c);

        this.scaleX = .25;
        this.scaleY = 3.3;

        this.moveY = this.y - 270;

        this.isFinish = isFinish;

        var width = this.width + 500;
        var rect = new Phaser.Geom.Rectangle(-width / 2.3, 0, width, this.height)
        this.setInteractive(rect, Phaser.Geom.Rectangle.Contains);
        this.on("pointerup", this.OnClick, this);

        scene.add.existing(this);
    }

    public AddInColumn(box: BoxPrefab) {
        this.boxList.push(box);
        box.currentColumn = this;

        if (this.isFinish && GameScene.prototype.boxCount == this.BoxListLength) {
            console.log("FINISHED!");

            GameScene.prototype.setCompleteFunc();
        }
    }
    public RemoveInColumn(box: BoxPrefab) {
        const index = this.boxList.indexOf(box, 0);
        this.boxList.splice(index, 1);
    }

    public OnClick() {
        if (!GameScene.prototype.currentBox) {
            if (this.BoxListLength == 0) return;
            var box = this.boxList[this.BoxListLength - 1];
            box.Move(box.x, this.moveY);
            this.RemoveInColumn(box);
            GameScene.prototype.currentBox = box;

            GameScene.prototype.moveBarFunc();
        }
        else {
            var box = GameScene.prototype.currentBox;
            if (this.LastBox && box.scaleX > this.LastBox.scaleX) {
                box.Shake();
                return;
            }
            var startY = 440;
            box.Move(this.x, this.moveY, () => {
                box.Move(this.x, startY - (this.BoxListLength * Constants.SpaceY), () => {
                    this.AddInColumn(box);
                    AudioManager.Instance.PlaySFXOneShot("placeSfx", .5);
                    GameScene.prototype.currentBox = null;
                });
            });
        }
    }
}