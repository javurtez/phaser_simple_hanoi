import Constants from "../../Constants";

export default class AudioManager {
    private static audioManagerSingleton: AudioManager;

    private sceneSoundManager: Phaser.Sound.BaseSoundManager;
    private allBackgroundAudio: Phaser.Sound.BaseSound[] = [];
    private currentBackgroundAudio: Phaser.Sound.BaseSound;

    private isMute: boolean;
    private volume: number;

    public static Init(scene: Phaser.Scene, volume: number = 1): void {
        if (!AudioManager.audioManagerSingleton) {
            this.audioManagerSingleton = new AudioManager();

            this.audioManagerSingleton.SetMute((localStorage.getItem(Constants.MuteSaveKey) == "1" ? true : false) || false);

            this.audioManagerSingleton.sceneSoundManager = scene.sound;
            this.audioManagerSingleton.SetVolume(volume);
            this.audioManagerSingleton.sceneSoundManager.pauseOnBlur = false;
        } else {
            throw new Error('You can only initialize one manager instance');
        }
    }

    static get Instance() {
        if (!AudioManager.audioManagerSingleton) {
            throw new Error('initialize Instantiator First!');
        }

        return AudioManager.audioManagerSingleton;
    }

    set Volume(volume: number) {
        this.volume = volume;
    }
    get Volume() {
        return this.volume;
    }
    get IsMuted() {
        return this.isMute;
    }

    public SetVolume(vol: number): void {
        this.volume = vol;
        this.sceneSoundManager.volume = vol;
    }
    public SetMute(isMute: boolean): void {
        this.isMute = isMute;

        if (this.isMute) {
            for (var i = 0; i < this.allBackgroundAudio.length; i++) {
                this.allBackgroundAudio[i].pause();
            }
        }
        else {
            if (this.currentBackgroundAudio) {
                this.currentBackgroundAudio.resume();
            }
        }
        localStorage.setItem(Constants.MuteSaveKey, this.isMute ? "1" : "0")
    }
    public PlaySFXOneShot(key: string, volumeSfx: number = -1): void {
        if (this.isMute) return;
        this.sceneSoundManager.play(key, {
            volume: volumeSfx == -1 ? this.volume : volumeSfx
        });
    }
    public PlaySFX(key: string, volumeSfx: number = -1): void {
        let sfx: Phaser.Sound.BaseSound = this.sceneSoundManager.get(key);

        if (!sfx) {
            sfx = this.sceneSoundManager.add(key, {
                mute: this.isMute,
                volume: volumeSfx == - 1 ? this.volume : volumeSfx,
                loop: false
            });
        }

        if (!this.isMute) {
            sfx.play();
        }
    }
    public PauseBGM(key: string): void {
        let bgm: Phaser.Sound.BaseSound = this.sceneSoundManager.get(key);

        if (!bgm) return;

        bgm.pause();
    }
    public PlayBGM(key: string): void {
        let bgm: Phaser.Sound.BaseSound = this.sceneSoundManager.get(key);
        if (!bgm) {
            bgm = this.sceneSoundManager.add(key, {
                loop: true,
                volume: this.volume
            });
            this.allBackgroundAudio.push(bgm);
            bgm.play();
        }

        if (this.isMute) {
            bgm.pause();
        }
        else {
            bgm.play();
        }
        this.currentBackgroundAudio = bgm;
    }
    public Restart() {
        this.SetVolume(.6);
        this.SetMute(false);
        for (var i = 0; i < this.allBackgroundAudio.length; i++) {
            this.allBackgroundAudio[i].stop();
        }
    }
}
