import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { ReelContainer } from "./reel/reelContainer";
import { GameConstants } from "./constants/gameConstants";
import { Reel } from "./reel/reel";
import { GameSymbol } from "./symbols/gameSymbol";
import { WinAnimation } from "./winPresentations/winAnimations";

export class Game extends Scene {
    create() {
        this.reelContainer = this.createReelContainer();
        this.winAnimation = new WinAnimation(this);
        let symbols = this.createSymbols();
        this.reelContainer.setSymbols(symbols);
        this.reelContainer.setInitReels(GameConstants.REELSTRIPS);
        this.startBtn = this.createBtn();
        this.enableStartBtn();
    }

    startReels() {
        this.winAnimation.clearAllWins();
        this.disableStartBtn();
        this.reelContainer.setSpinResult(GameConstants.REELSTRIPS, this.onReelSpinFinish.bind(this));
    }
    createBtn() {
        let spinBtn = App.sprite("spin_button");
        spinBtn.position.set(GameConstants.SPIN_BTN_X, GameConstants.SPIN_BTN_Y);
        this.container.addChild(spinBtn);
        return spinBtn;
    }

    createSymbols() {
        let _symbols = [];
        for (let i = 0; i < 8; i++) {
            _symbols.push(new GameSymbol(this, (i), "sym" + (i)));
        }
        return _symbols;
    }
    createReelContainer() {
        let rc = new ReelContainer(this, GameConstants.REEL_X, GameConstants.REEL_Y, 5 * (GameConstants.SYM_WIDTH + GameConstants.REEL_GAP), 3 * GameConstants.SYM_HEIGHT);
        for (let i = 0; i < 5; i++) {
            rc.addReels(new Reel(this, i, i * (GameConstants.SYM_WIDTH + GameConstants.REEL_GAP), 0, 3, GameConstants.SYM_WIDTH, GameConstants.SYM_HEIGHT));
        }
        return rc;
    }
    onReelSpinFinish() {
        this.startWinPresentation();
    }
    startWinPresentation() {
        this.findWins();
        this.winAnimation.start(this.winningLinesData, () => {
            this.enableStartBtn();
        });
    }

    findWins() {
        let wins = {};
        let lineId = 0;
        for (let line of GameConstants.WIN_LINE_DATA) {
            lineId++;
            let reelSymbols = this.getReelSymbols(line);
            this.checkLineForWin(reelSymbols, wins, lineId);
        }
    }

    checkLineForWin(symbols, wins, line) {
        let symCount = 0;
        let winSym = symbols[0]._texture.textureCacheIds[0];
        for (let i = 0; i < symbols.length; i++) {
            if (winSym === symbols[i]._texture.textureCacheIds[0]) {
                symCount++;
            } else {
                break;
            }
        }
        if (symCount > 2) {
            let symID = Number(winSym.replace(/[^0-9]/g, ""));
            let winningAmt = GameConstants.PAYTABLE_DATA[symID][symCount];
            let winningData = { payline: line, symbols: GameConstants.SYMBOLS[symID], length: symCount, paytable: winningAmt };
            this.winningLinesData.push(winningData);
        }
    }

    getReelSymbols(line) {
        let symbols = [];
        for (let i = 0; i < line.length; i++) {
            symbols.push(this.reelContainer.getReel(i).getSymatRow(line[i]));
        }
        return symbols;
    }



    enableStartBtn() {
        this.startBtn.alpha = 1;
        this.winningLinesData = [];
        this.startBtn.interactive = true;
        this.startBtn.once("pointerup", this.startReels, this);
    }
    disableStartBtn() {
        this.startBtn.alpha = 0.5;
    }


}
