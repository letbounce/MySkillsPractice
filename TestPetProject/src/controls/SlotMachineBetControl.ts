import {Container} from "@pixi/display";
import {Text} from "@pixi/text";
import MainControl from "app/controls/MainControl";
import {TBet} from "app/server/service/typing";
import Signal from "app/helpers/signals/signal/Signal";
import TextStyles from "app/model/TextStyles";
import gameModel from "app/model/GameModel";

export default class SlotMachineBetControl extends MainControl {
    readonly betChanged = new Signal<number>();
    public readonly labelValue: Text;
    private index = 2;

    constructor(private title: string, protected bets: TBet[]) {
        super(new Container());
        this.labelValue = new Text(`${this.bets[this.index].value}`, TextStyles.TOOLTIP_LABEL_TEXT_STYLE);
        gameModel.game.signals.betPanel.update.add(this.setValue, this);
    }

    init() {
        super.init();
        this.container.addChild(this.labelValue);
        this.labelValue.anchor.set(0.5, 0.5);
        this.labelValue.position.set(0, 20);
    }

    dispose() {
        this.container.removeChildren();
        super.dispose();
    }

    increment() {
        if (this.index != this.bets.length - 1) {
            this.index += 1;
        } else {
            this.index = 0;
        }
        this.updateBet();
    }

    decrement() {
        if (this.index != 0) {
            this.index -= 1;
        } else {
            this.index = this.bets.length - 1;
        }
        this.updateBet();
    }

    private updateBet() {
        const bet = this.bets[this.index];
        this.labelValue.text = `${bet.value}`;
        this.betChanged.emit(bet.id);
    }

    setValue(betId: number) {
        this.index = this.bets.findIndex(value => value.id == betId);
        this.updateBet();
    }
}
