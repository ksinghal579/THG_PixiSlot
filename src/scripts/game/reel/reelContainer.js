import * as PIXI from "pixi.js";

export class ReelContainer {
    _reels = [];
    constructor(scene, x, y, width, height) {
        this.scene = scene;
        this.spinCount = 0;
        this._view = new PIXI.Container();
        this._view.position.set(x, y);
        this._view.interactive = true;
        this.scene.container.addChild(this._view);

    }
    addReels(reel) {
        this._view.addChild(reel.view);
        this._reels.push(reel);
    }
    setSymbols(symbols) {
        for (let reel in this._reels) {
            this._reels[reel].availableSymbols = symbols;
        }
    }
    setInitReels(data) {
        for (let reel in this._reels) {
            this._reels[reel].setInitResult(data[reel]);
        }
    }
    setSpinResult(data, callBack) {
        this.spinCount++;
        for (let reel in this._reels) {
            this._reels[reel].setSpinResult(data[reel], callBack);
        }
    }
    getReel(idx) {
        return this._reels[idx];
    }
}
