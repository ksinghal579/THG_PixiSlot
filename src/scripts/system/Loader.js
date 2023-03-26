import * as PIXI from "pixi.js";

export class Loader {
    constructor(loader, config) {
        this.loader = loader;
        this.config = config;
        this.resources = {};
    }

    preload(app) {
        for (const asset of this.config.loader) {
            let key = asset.key.substr(asset.key.lastIndexOf('/') + 1);
            key = key.substring(0, key.indexOf('.'));
            if (asset.key.indexOf(".png") !== -1 || asset.key.indexOf(".jpg") !== -1) {
                this.loader.add(key, asset.data.default)

            }
        }
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 62,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#00000'],
            lineJoin: 'round',
        });

        let loadingText = new PIXI.Text('', style);
        loadingText.x = 600;
        loadingText.y = 600;
        this.loader.onProgress.add(() => {
            app.stage.addChild(loadingText);
            loadingText.text = Math.round(this.loader.progress);
            console.log("Loading Progress-------------------", Math.round(this.loader.progress));
        });

        return new Promise(resolve => {
            this.loader.load((loader, resources) => {
                this.resources = resources;
                loadingText.text = '';
                app.stage.removeChild(loadingText);
                resolve();
            });
        });
    }
}