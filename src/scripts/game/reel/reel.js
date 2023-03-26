import { GameConstants } from "../constants/gameConstants";
import * as PIXI from "pixi.js";
import { App } from "../../system/App";
export class Reel {
    constructor(scene, id, x, y, visibleCount, symWidth, symHeight) {
        this.scene = scene;
        this._id = id;
        this._view = new PIXI.Container();
        this._view.interactive = true;
        this._symHeight = symHeight;
        this._view.position.set(x, y);
    }

    setInitResult(data) {
        this.clearReels();
        let symb1 = App.sprite(this._availableSymbols[data[0]].reelAnim);
        symb1.position.set(0, 0);
        this._view.addChild(symb1);
        let symb2 = App.sprite(this._availableSymbols[data[1]].reelAnim);
        symb2.position.set(0, this._symHeight);
        this._view.addChild(symb2);
        let symb3 = App.sprite(this._availableSymbols[data[2]].reelAnim);
        symb3.position.set(0, 2 * this._symHeight);
        this._view.addChild(symb3);

    }

    setSpinResult(data, callBack) {
        this.clearReels();
        let reelValue = GameConstants.getRandomInt(16);
        this.modulus++;
        if (this.scene.reelContainer.spinCount % 4 === 0) {
            if (this._id === 0) {
                reelValue = 0;
            }
            if (this._id === 1) {
                reelValue = 11;
            }
            if (this._id === 2) {
                reelValue = 1;
            }
            if (this._id === 3) {
                reelValue = 10;
            }
            if (this._id === 4) {
                reelValue = 14;
            }
        }
        let symb1 = App.sprite(this._availableSymbols[data[reelValue]].reelAnim);
        symb1.position.set(0, 0);
        this._view.addChild(symb1);
        let symb2 = App.sprite(this._availableSymbols[data[reelValue + 1]].reelAnim);
        symb2.position.set(0, this._symHeight);
        this._view.addChild(symb2);
        let symb3 = App.sprite(this._availableSymbols[data[reelValue + 2]].reelAnim);
        symb3.position.set(0, 2 * this._symHeight);
        this._view.addChild(symb3);

        // this._view.add(this.scene.add.image(0, 0, this._availableSymbols[data[reelValue]].reelAnim));
        // this._view.add(this.scene.add.image(0, this._symHeight, this._availableSymbols[data[reelValue + 1]].reelAnim));
        // this._view.add(this.scene.add.image(0, 2 * this._symHeight, this._availableSymbols[data[reelValue + 2]].reelAnim));
        if (this._id === 4) {
            callBack();
        }

    }
    clearReels() {
        this._view.removeChildren();
    }
    getSymatRow(idx) {
        return this.view.children[idx];
    }
    set availableSymbols(data) {
        this._availableSymbols = data;
    }
    get availableSymbols() {
        return this._availableSymbols;
    }
    get view() {
        return this._view;
    }
}
