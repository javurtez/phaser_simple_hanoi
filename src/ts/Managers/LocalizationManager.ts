import JSONManager from "./JSONManager";

export default class LocalizationManager {
    private static managerSingleton: LocalizationManager;

    private currentLanguage: string;

    public static Init(): void {
        if (!this.managerSingleton) {
            this.managerSingleton = new LocalizationManager();
            this.managerSingleton.currentLanguage = "en";
        } else {
            throw new Error('You can only initialize one manager instance');
        }
    }

    static get Instance() {
        if (!LocalizationManager.managerSingleton) {
            throw new Error('initialize Instantiator First!');
        }

        return LocalizationManager.managerSingleton;
    }

    public SetLanguage(lang: string) {
        this.currentLanguage = lang;
    }

    public GetLocalized() {
        return JSONManager.Instance.GetJSON("local_" + this.currentLanguage);
    }
    public GetLocalizedWord(name: string): string {
        return JSONManager.Instance.GetJSON("local_" + this.currentLanguage)[name];
    }
}