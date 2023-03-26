import { GameConstants } from "../constants/gameConstants";
import * as PIXI from "pixi.js";
export class WinAnimation {

    constructor(gameState) {
        this._gameState = gameState;
        this.textFields = [];
    }
    createTextFeild(x, y) {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 32,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#eb4034'],
            wordWrap: true,
            wordWrapWidth: 350,
            lineJoin: 'round',
        });

        let winText = new PIXI.Text('', style);
        winText.x = x;
        winText.y = y;
        this._gameState.container.addChild(winText);
        return winText;
    }
    start(winningLinesData, onFinished) {
        this.winningLinesData = winningLinesData;
        this._onFinCallback = onFinished;
        if (this.winningLinesData.length > 0) {
            this.showWinnings();
        } else {
            this._onFinCallback();
        }

    }

    showWinnings() {
        let totalWin = 0;
        let lineCount = 0;
        let totalWinText = this.createTextFeild(GameConstants.WINTEXT.x, GameConstants.WINTEXT.y);
        for (let win of this.winningLinesData) {
            totalWin += win.paytable;
            lineCount++;
            let lineWinText = this.createTextFeild(GameConstants.WINTEXT.x, GameConstants.WINTEXT.y + (lineCount * totalWinText.height));
            lineWinText.text = 'Payline: ' + win.payline + ', ' + win.symbols + ' x' + win.length + ', ' + win.paytable;
            this.textFields.push(lineWinText);
        }
        totalWinText.text = 'Total wins: ' + totalWin;
        this.textFields.push(totalWinText);

        this._onFinCallback();
    }

    clearAllWins() {
        for (let text of this.textFields) {
            text.text = '';
        }
    }


}
