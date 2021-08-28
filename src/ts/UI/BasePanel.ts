export default class BasePanel extends Phaser.GameObjects.Container {
    public Open(): void {
        this.setActive(true);
        this.setVisible(true);
    }
    public Close(): void {
        this.setActive(false);
        this.setVisible(false);
    }
}