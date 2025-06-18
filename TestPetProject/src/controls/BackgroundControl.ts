import MainControl from "./MainControl";
import {GameSize} from "../model/GameModel";
import IntroShadow from "app/view/IntroShadow";
import {ResizableControl} from "app/controls/extensions/OnResizeExtension";
import SpineControl from "app/controls/SpineControl";


type TBgType = "main" | "freespin";

export default class BackgroundControl extends SpineControl {
    private rocketTimeoutId: any = null;
    private isActive: boolean = false;

    constructor() {
        super("background");
        this.setBounds(1922, 1080);
    }

    init() {
        super.init();
        this.setSkin("main");
        this.play("idle", {loop: true, trackIndex: 0});
        this.isActive = true;
        this.scheduleRocketAnimation();
    }

    dispose() {
        this.isActive = false;
        if (this.rocketTimeoutId) {
            clearTimeout(this.rocketTimeoutId);
            this.rocketTimeoutId = null;
        }
        super.dispose();
    }

    async setBackground(type: TBgType) {
        this.setSkin(type);
    }

    private scheduleRocketAnimation() {
        if (!this.isActive) return;
        const delay = 5000 + Math.random() * 5000; // 5-10 seconds
        this.rocketTimeoutId = setTimeout(async () => {
            if (!this.isActive) return;
            await this.play("rocket1", {trackIndex: 1, loop: false, overrideAnimation: true});
            this.scheduleRocketAnimation();
        }, delay);
    }
}

export class BackgroundShadowControl extends MainControl implements ResizableControl {
    private shadow: IntroShadow = new IntroShadow();

    constructor() {
        super();
    }

    init() {
        super.init();
        this.container.addChild(this.shadow);
    }

    resize(gameSize: GameSize) {
        this.shadow.resize(gameSize);
    }
}
