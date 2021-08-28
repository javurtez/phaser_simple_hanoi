import Constants from "../../Constants";
import Utilities from "../../Utilities";
import AudioManager from "../Managers/AudioManager";
import SplashScreen from "./SplashScreen";

import box from "../../assets/UI/GUI_White.png";
import button from "../../assets/UI/Button.png";
import panel from "../../assets/UI/Panel.png";
import replay from "../../assets/UI/Replay.png";

import click from "../../assets/Audio/click.wav";
import errorSfx from "../../assets/Audio/Bells1.mp3";
import placeSfx from "../../assets/Audio/Clank_4.mp3";
import completeSfx from "../../assets/Audio/PowerUp19.mp3";
import moveSfx from "../../assets/Audio/UI_Quirky19.mp3";
import bgm from "../../assets/Audio/bgm.mp3";

export default class Preloader extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name = "Preloader";

	public preload(): void {
		this.addProgressBar();

		this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(Constants.BackgroundHex);

		this.load.image("box", box);
		this.load.image("button", button);
		this.load.image("panel", panel);
		this.load.image("replay", replay);
		
		this.load.audio("bgm", bgm);
		this.load.audio("click", click);
		this.load.audio("errorSfx", errorSfx);
		this.load.audio("placeSfx", placeSfx);
		this.load.audio("completeSfx", completeSfx);
		this.load.audio("moveSfx", moveSfx);
	}

	public create(): void {
		Utilities.LogSceneMethodEntry("Preloader", "create");

		AudioManager.Init(this);
		AudioManager.Instance.SetVolume(.5);
	}

	/**
	 * Adds a progress bar to the display, showing the percentage of assets loaded and their name.
	 */
	private addProgressBar(): void {
		const width = this.cameras.main.width;
		const height = this.cameras.main.height;
		/** Customizable. This text color will be used around the progress bar. */
		const outerTextColor = '#ffffff';

		const progressBar = this.add.graphics();
		const progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);

		const loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			//text: "Loading...",
			style: {
				font: "20px monospace",
				color: outerTextColor
			}
		});
		loadingText.setOrigin(0.5, 0.5).setFontFamily("kenney_pixel");

		const percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: "0%",
			style: {
				font: "18px monospace",
				color: "#ffffff"
			}
		});
		percentText.setOrigin(0.5, 0.5).setFontFamily("kenney_pixel");

		const assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: "",
			style: {
				font: "18px monospace",
				color: outerTextColor
			}
		});

		assetText.setOrigin(0.5, 0.5);

		this.load.on("progress", (value: number) => {
			percentText.setText(parseInt(value * 100 + "", 10) + "%");
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect((width / 4) + 10, (height / 2) - 30 + 10, (width / 2 - 10 - 10) * value, 30);
		});

		this.load.on("fileprogress", (file: Phaser.Loader.File) => {
			assetText.setText("Loading asset: " + file.key);
		});

		this.load.on("complete", () => {
			this.scene.start(SplashScreen.Name);

			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});
	}
}