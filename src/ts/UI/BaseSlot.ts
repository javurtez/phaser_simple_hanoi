import AudioManager from "../Managers/AudioManager";

export default class BaseSlot extends Phaser.GameObjects.Image {

    pointerDown: Function;
    pointerUp: Function;
    pointerOver: Function;
    pointerOut: Function;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        this.setInteractive();
        this.on("pointerdown", () => {
            if (this.pointerDown) {
                this.pointerDown();
                this.setTint(0xFFFFFF);
            }
        }, this);
        this.on("pointerup", () => {
            if (this.pointerUp) {
                this.pointerUp();
                AudioManager.Instance.PlaySFX("click", .8);
            }
        }, this);
        this.on("pointerover", () => {
            if (this.pointerOver) {
                this.pointerOver();
            }
            this.setTint(0xB1B4B8);
        }, this);
        this.on("pointerout", () => {
            if (this.pointerOut) {
                this.pointerOut();
            }
            this.setTint(0xFFFFFF);
        }, this);
    }

    public Open(): void {
        this.setActive(true);
        this.setVisible(true);
    }
    public Close(): void {
        this.setActive(false);
        this.setVisible(false);
    }
}