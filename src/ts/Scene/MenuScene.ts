import Constants from "../../Constants";
import Utilities from "../../Utilities";
import AudioManager from "../Managers/AudioManager";
import GameScene from "./GameScene";

export default class MenuScene extends Phaser.Scene {
    /**
     * Unique name of the scene.
     */
    public static Name = "MainMenu";

    public create(): void {
        Utilities.LogSceneMethodEntry("MainMenu", "create");

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(Constants.BackgroundHex);

        AudioManager.Instance.PlayBGM("bgm");

        this.scene.start(GameScene.Name);
    }
}