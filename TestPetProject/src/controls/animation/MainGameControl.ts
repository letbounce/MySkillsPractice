import SpineControl from "app/controls/SpineControl";
import gameModel from "app/model/GameModel";
import GameSignals, { TBackgroundType } from "app/model/GameSignals";

export default class MainGameControl extends SpineControl{
    private rocketTimeoutId: any = null;
    private isActive: boolean = false;
    private rocketAnimations = ["rocket1", "rocket2"];
    private lastRocketIndex: number = -1;

    constructor() {
        super("trees");
        gameModel.game.signals.background.show.add(this.onShowBackground, this);
    }
    init() {
        super.init();
        this.play("idle", {loop:true, trackIndex: 0});
        this.play("planet2_idle", {loop:true, trackIndex: 2});
        this.play("planet3_idle", {loop:true, trackIndex: 3});
        this.isActive = true;
        this.scheduleRocketAnimation();
    }

    protected onShowBackground(type: TBackgroundType): void {
        (type === "main" || type === "dark") ? this.show() : this.hide();  
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
            // Alternate between rocket1 and rocket2, never repeat the same
            let nextIndex = (this.lastRocketIndex + 1) % this.rocketAnimations.length;
            // If first time, pick randomly
            if (this.lastRocketIndex === -1) {
                nextIndex = Math.floor(Math.random() * this.rocketAnimations.length);
            }
            const rocketAnim = this.rocketAnimations[nextIndex];
            this.lastRocketIndex = nextIndex;
            await this.play(rocketAnim, {trackIndex: 1, loop: false, overrideAnimation: true});
            this.scheduleRocketAnimation();
        }, delay);
    }
}