import Constants from "../../Constants";
import Utilities from "../../Utilities";
import BoxPrefab from "../Prefab/BoxPrefab";
import ColumnPrefab from "../Prefab/ColumnPrefab";
import BoxCountPanel from "../UI/BoxCountPanel";
import CompletePanel from "../UI/CompletePanel";
import GamePanel from "../UI/GamePanel";

export default class GameScene extends Phaser.Scene {
    /**
     * Unique name of the scene.
     */
    public static Name = "MainGame";

    public boxCountPanel: BoxCountPanel;
    public completePanel: CompletePanel;
    public gamePanel: GamePanel;

    public boxCount: number = 3;
    public boxPrefabList: BoxPrefab[] = [];
    public columnPrefabList: ColumnPrefab[] = [];

    public currentBox: BoxPrefab;

    public setHanoiFunc: Function;
    public setCompleteFunc: Function;
    public setMovementFunc: Function;
    public moveBarFunc: Function;

    private moveCount = 0;
    public totalMoveCount: number = 0;

    private columnSpaceX = 245;
    public columnStartY = 245;

    public create(): void {
        Utilities.LogSceneMethodEntry("MainGame", "create");

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(Constants.BackgroundHex);

        let centerX = this.cameras.main.centerX;
        let centerY = this.cameras.main.centerY;

        this.boxCountPanel = new BoxCountPanel(this, centerX, centerY);
        this.completePanel = new CompletePanel(this, centerX, centerY);
        this.gamePanel = new GamePanel(this, centerX, centerY - 100);
        this.completePanel.setDepth(1);
        this.boxCountPanel.setDepth(2);

        var columnY = 440;
        this.columnPrefabList.push(new ColumnPrefab(this, centerX - this.columnSpaceX, columnY));
        this.columnPrefabList.push(new ColumnPrefab(this, centerX, columnY));
        this.columnPrefabList.push(new ColumnPrefab(this, centerX + this.columnSpaceX, columnY, true));

        var ground = this.add.sprite(centerX, 440, "box").setOrigin(.5, 0);
        ground.setScale(15, 1);
        ground.setTint(0xd6ae4c);
        ground = this.add.sprite(centerX, 460, "box").setOrigin(.5, 0);
        ground.setScale(15, 5);
        ground.setTint(0x0ea700);

        this.events.on('shutdown', this.shutdownScene, this);

        GameScene.prototype.currentBox = null;
        GameScene.prototype.moveBarFunc = this.MoveBar.bind(this);
        GameScene.prototype.setMovementFunc = this.SetMovement.bind(this);
        GameScene.prototype.setCompleteFunc = this.SetComplete.bind(this);
        GameScene.prototype.setHanoiFunc = this.SetHanoi.bind(this);
        GameScene.prototype.boxCount = this.boxCount;

        this.SetMovement();
    }

    private shutdownScene() {
        this.moveCount = 0;
        this.columnPrefabList.length = 0;
        this.boxPrefabList.length = 0;
        this.boxCountPanel.destroy();
        this.completePanel.destroy();
        this.gamePanel.destroy();

        this.events.off('shutdown', this.shutdownScene, this);
    }

    private MoveBar() {
        this.moveCount++;
        this.gamePanel.SetUpdateMoveCount(this.moveCount, this.totalMoveCount);
    }

    private SetMovement() {
        this.boxCount = GameScene.prototype.boxCount;
        this.totalMoveCount = (Math.pow(2, this.boxCount) - 1);
        this.gamePanel.SetUpdateMoveCount(0, this.totalMoveCount);
    }
    private SetComplete() {
        this.gamePanel.Close();
        this.completePanel.OpenComplete(this.moveCount, this.totalMoveCount);
        this.columnPrefabList.forEach((value) => {
            value.disableInteractive();
        })
        this.boxPrefabList.forEach((value) => {
            value.disableInteractive();
        })
    }
    public SetHanoi() {
        this.boxCount = GameScene.prototype.boxCount;
        this.totalMoveCount = (Math.pow(2, this.boxCount) - 1);

        GameScene.prototype.totalMoveCount = this.totalMoveCount;

        let centerX = this.cameras.main.centerX;

        var columnY = 440;

        this.columnStartY = columnY - ((this.boxCount - 1) * Constants.SpaceY);
        for (var i = this.boxCount - 1; i >= 0; i--) {
            var box = new BoxPrefab(this, centerX - this.columnSpaceX, this.columnStartY + (i) * Constants.SpaceY, (i + 1) * .25, Constants.Color[i]);
            this.boxPrefabList.push(box);
            this.columnPrefabList[0].AddInColumn(box);
        }
    }
}