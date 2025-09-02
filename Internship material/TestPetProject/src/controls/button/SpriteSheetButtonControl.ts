import MainControl from "./../MainControl";
import Signal from "app/helpers/signals/signal/Signal";
import {SpriteControl} from "app/controls/SpriteControl";
import {ColorMatrixFilter} from "@pixi/filter-color-matrix";
import {IButtonControl} from "app/controls/button/ButtonControl";
import gameModel from "app/model/GameModel";

export default class SpriteSheetButtonControl extends MainControl implements IButtonControl<SpriteSheetButtonControl> {
    private readonly sepiaColorFilter: ColorMatrixFilter;
    public readonly onClick: Signal<SpriteSheetButtonControl> = new Signal<SpriteSheetButtonControl>();
    private readonly button: SpriteControl;
    public readonly hover: string;
    public readonly texture: string;

    constructor(texture: string, options?: Partial<{hover: string}>) {
        super();
        this.texture = texture;
        this.hover = options?.hover ?? texture.replace(/(\.[^.]+)$/, "_hov$1");
        this.button = new SpriteControl(texture);
        this.container.eventMode = "static";
        this.container.cursor = "pointer";

        this.sepiaColorFilter = new ColorMatrixFilter();
        this.sepiaColorFilter.sepia(false);
        this.setPivotTo(this.button.container);
    }

    init() {
        super.init();
        this.add(this.button);
        this.container.on("pointerover", () => {
            this.onOver();
        });
        this.container.on("pointerout", () => {
            this.onOut();
        });
        this.container.on("pointerdown", () => {
            this.onClicked();
            this.onOut();
        });
        this.container.eventMode = "static";
        this.container.cursor = "pointer";
    }

    dispose(): void {
        this.container.removeChildren();
        this.container.off("pointerdown");
        this.container.off("pointerout");
        this.container.off("pointerover");
        super.dispose();
    }

    isEnable() {
        return this.container.alpha === 1;
    }

    enable() {
        this.container.alpha = 1;
        this.container.filters = [];
        this.container.eventMode = "static";
        this.container.cursor = "pointer";
    }

    disable() {
        if (this.container.alpha === 1) {
            this.container.eventMode = "none";
            this.container.cursor = "default";
            this.container.filters = [this.sepiaColorFilter];
            this.container.alpha = 0.99;
        }
    }

    protected onClicked() {
        if (this.isEnable()) {
            this.onClick.emit(this);
            gameModel.getHowler().play("btn-click");
        }
    }

    protected onOut() {
        this.button.texture = this.texture;
    }

    protected onOver() {
        this.button.texture = this.hover;
        gameModel.getHowler().play("hover-button");
    }
}
