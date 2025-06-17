import {Container} from "@pixi/display";
import PlusBtnControl from "app/controls/button/PlusBtnControl";
import SlotMachineBetControl from "app/controls/SlotMachineBetControl";
import MinusBtnControl from "app/controls/button/MinusBtnControl";
import MainControl from "app/controls/MainControl";
import gameModel from "app/model/GameModel";
import Signal from "app/helpers/signals/signal/Signal";
import {TBet} from "app/server/service/typing";
import GlowFilterExtension from "app/controls/extensions/GlowFilterExtension";
import SpriteSheetButtonControl from "./SpriteSheetButtonControl";

export default class BetSelectorBtnsControl extends MainControl {
    readonly betChanged = new Signal<number>();
    readonly betButton: SpriteSheetButtonControl = new SpriteSheetButtonControl("bet_button_btn.png");
    private readonly plusBtnControl: PlusBtnControl = new PlusBtnControl();
    private readonly minusBtnControl: MinusBtnControl = new MinusBtnControl();
    private readonly betControl: SlotMachineBetControl;

    constructor(bets:TBet[]) {
        super(new Container());
        this.betControl = new SlotMachineBetControl("BET", bets);
        this.betControl.addExtension(new GlowFilterExtension());
    }

    init() {
        super.init();
        const plusBtnControl = this.plusBtnControl;
        const minusBtnControl = this.minusBtnControl;
        const betControl = this.betControl;
        const gap = 90;
        this.add(this.betButton);
        this.add(plusBtnControl);
        this.add(minusBtnControl);
        this.add(betControl);
        minusBtnControl.container.position.x = -this.betButton.container.width + gap;
        plusBtnControl.container.position.x = this.betButton.container.width - gap;
        minusBtnControl.container.position.y = this.betButton.container.y + minusBtnControl.container.height/8;
        plusBtnControl.container.position.y = this.betButton.container.y + minusBtnControl.container.height/8;
        betControl.betChanged.add(betId => this.betChanged.emit(betId), this);
        plusBtnControl.onClick.add(() => {
            gameModel.getHowler().play("custom-button");
            betControl.increment();
        }, this);
        minusBtnControl.onClick.add(() => {
            gameModel.getHowler().play("custom-button");
            betControl.decrement();
        }, this);
    }

    disable() {
        this.plusBtnControl.disable();
        this.minusBtnControl.disable();
    }

    enable() {
        this.plusBtnControl.enable();
        this.minusBtnControl.enable();
    }

    setValue(betId: number) {
        this.betControl.setValue(betId);
    }

    dispose() {
        this.container.removeChildren();
        this.plusBtnControl.onClick.unload(this);
        this.minusBtnControl.onClick.unload(this);
        this.betChanged.unload(this);
        super.dispose();
    }
}
