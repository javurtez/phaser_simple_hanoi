import 'phaser';

import MenuScene from './ts/Scene/MenuScene';
import Preloader from './ts/Scene/Preloader';
import GameScene from './ts/Scene/GameScene';
import SplashScreen from './ts/Scene/SplashScreen';
import Utilities from './Utilities';

const GameConfig: Phaser.Types.Core.GameConfig = {
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "content",
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.ENVELOP
  },
  type: Phaser.AUTO,
  input: {
    keyboard: true
  },
  render: { pixelArt: true, antialias: true },
  title: 'Hanoi',
  version: '0.0.1',
};


export default class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    Utilities.LogSceneMethodEntry("Game", "constructor");

    super(config);

    this.scene.add(Preloader.Name, Preloader);
    this.scene.add(SplashScreen.Name, SplashScreen);
    this.scene.add(MenuScene.Name, MenuScene);
    this.scene.add(GameScene.Name, GameScene);

    this.scene.start(Preloader.Name);
  }
}

window.addEventListener('load', () => {
  // Expose `_game` to allow debugging, mute button and fullscreen button
  (window as any)._game = new Game(GameConfig);
});
