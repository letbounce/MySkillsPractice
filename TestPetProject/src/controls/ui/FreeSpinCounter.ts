import TextStyles from "app/model/TextStyles";
import {Text} from "@pixi/text";
import MainControl from "../MainControl";
import { Container, Sprite } from "pixi.js";
import { SpriteControl } from "../SpriteControl";

export default class FreeSpinCounter extends MainControl{
    private readonly labelContainer: Container = new Container();
    private readonly spinsNumber: Text = new Text("5", TextStyles.SPIN_BTN_TEXT_STYLE);
    private readonly generalSpinsNumber: Text = new Text("10", TextStyles.SPIN_BTN_TEXT_STYLE);
    private readonly slash: Text = new Text("/", TextStyles.SPIN_BTN_TEXT_STYLE);
    private readonly background: SpriteControl = new SpriteControl("FS_Counter_Frame.png")

    constructor() {
        super(new Container())
        this.hideCounter();
    }

    init(): void {
        super.init();
        this.container.addChild(this.background.container);
        this.labelContainer.addChild(this.spinsNumber);
        this.labelContainer.addChild(this.slash);
        this.labelContainer.addChild(this.generalSpinsNumber);
        this.container.addChild(this.labelContainer);

        this.updateLabelPosition();
    }
    
    dispose(): void {
        this.container.removeChildren();
        super.dispose();
    }

    setSpinsNumberAndGeneral(value: number, generalValue: number): void {
        value = Math.max(0, value);
        this.spinsNumber.text = value;
        this.generalSpinsNumber.text = generalValue;
        this.updateLabelPosition();
    }

    setSpinsNumber(value: number): void {
        value = Math.max(0, value);
        this.spinsNumber.text = value;
        this.updateLabelPosition();
    }

    updateLabelPosition(): void{
        this.slash.x = this.spinsNumber.width - 5;
        this.generalSpinsNumber.x = this.spinsNumber.width + this.slash.width - 10;
        this.labelContainer.position = {x: this.background.container.width / 2 - 5, y: this.background.container.height / 1.5}; 
        this.labelContainer.pivot.set(this.labelContainer.width / 2,this.labelContainer.height / 2);
    }

    showCounter(): void {
        this.background.container.alpha = 1;
        this.labelContainer.alpha = 1;
    }

    hideCounter(): void{
        this.background.container.alpha = 0;
        this.labelContainer.alpha = 0;
    }
    
}