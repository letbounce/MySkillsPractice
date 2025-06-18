import SpineControl from "app/controls/SpineControl";
import gameModel from "app/model/GameModel";
import GameSignals, { TBackgroundType } from "app/model/GameSignals";

export default class MainGameControl extends SpineControl{
    private rocketTimeoutId: any = null;
    private isActive: boolean = false;

    constructor() {
        super("trees");
        gameModel.game.signals.background.show.add(this.onShowBackground, this);
    }
    init() {
        super.init();
        this.play("idle", {loop:true, trackIndex: 0});
        this.isActive = true;
        this.scheduleRocketAnimation();
    }

    protected onShowBackground(type: TBackgroundType): void 
    {
        type === "main" ? this.show() : this.hide();  
    }

    dispose() {
        this.isActive = false;
        if (this.rocketTimeoutId) {
            clearTimeout(this.rocketTimeoutId);
            this.rocketTimeoutId = null;
        }
        super.dispose();
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