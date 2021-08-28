import Utilities from "../../Utilities";
import MenuScene from "./MenuScene";

export default class SplashScreen extends Phaser.Scene {
    /**
     * Unique name of the scene.
     */
    public static Name = "SplashScreen";

    public create(): void {
        Utilities.LogSceneMethodEntry("SplashScreen", "create");

        this.scene.start(MenuScene.Name);
    }
}