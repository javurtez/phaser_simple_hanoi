export default class JSONManager {
    private static jsonManagerSingleton: JSONManager;
    private static jsonCache: Phaser.Cache.BaseCache;

    public static Init(p: Phaser.Scene): void {
        if (!JSONManager.jsonManagerSingleton) {
            this.jsonManagerSingleton = new JSONManager();
            this.jsonCache = p.cache.json;
        } else {
            throw new Error('You can only initialize one manager instance');
        }
    }

    static get Instance() {
        if (!JSONManager.jsonManagerSingleton) {
            throw new Error('initialize Instantiator First!');
        }

        return JSONManager.jsonManagerSingleton;
    }

    public GetJSON(name: string) {
        return JSONManager.jsonCache.get(name);
    }
}