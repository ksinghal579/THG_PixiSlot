import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from "./Loader";
import { ScenesManager } from "./ScenesManager";
class Application {
    DEFAULT_WIDTH = 1920;
    DEFAULT_HEIGHT = 1080;
    MAX_WIDTH = 2048;
    MAX_HEIGHT = 1152;
    SCALE_MODE = "SMOOTH";
    run(config) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this.config = config;
        let gameWidth = 1920;
        let gameHeight = 1080;
        this.app = new PIXI.Application({
            backgroundColor: 0xe6ffff,
            width: gameWidth,
            height: gameHeight
        });
        document.body.appendChild(this.app.view);
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / gameWidth;
        this.app.stage.scale.y = window.innerHeight / gameHeight;
        window.addEventListener('resize', () => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
            this.app.stage.scale.x = window.innerWidth / gameWidth;
            this.app.stage.scale.y = window.innerHeight / gameHeight;
        });

        this.scenes = new ScenesManager();
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);
        this.loader = new Loader(this.app.loader, this.config);
        this.loader.preload(this.app).then(() => this.start());
    }


    res(key) {
        return this.loader.resources[key].texture;
    }

    sprite(key) {
        return new PIXI.Sprite(this.res(key));
    }

    start() {
        this.scenes.start("Game");
    }
}
export const App = new Application();
