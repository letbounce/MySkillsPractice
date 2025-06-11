import SpineControl from "app/controls/SpineControl";
import gameModel from "app/model/GameModel";
import GameSignals, { TBackgroundType } from "app/model/GameSignals";

export default class MainGameControl extends SpineControl{
    constructor() {
        super("trees");
        gameModel.game.signals.background.show.add(this.onShowBackground, this);
    }
    init() {
        super.init();
        this.play("idle", {loop:true});
    }

    protected onShowBackground(type: TBackgroundType): void 
    {
        type === "main" ? this.show() : this.hide();  
    }

    dispose() {
    }
}