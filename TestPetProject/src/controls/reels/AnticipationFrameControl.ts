import gameModel, {TReelInfo} from "app/model/GameModel";
import SpineControl from "app/controls/SpineControl";

export default class AnticipationFrameControl extends SpineControl {
    constructor(private reelInfo: TReelInfo) {
        super("anticipator");
    }

    moveOnReel(reelIndex: number) {
        const reelFrameGap = this.reelInfo.reels.reelFrameGap;
        const reelGap = this.reelInfo.reels.reelGap;
        const symbolWidth = this.reelInfo.symbol.width;
        const symbolHeight = this.reelInfo.symbol.height;
        this.container.position.x = reelFrameGap * 2 + reelIndex * (symbolWidth + reelGap) + symbolWidth * .5 - gameModel.mainGameInfo.symbol.offsetX*(reelIndex-1);
        this.container.position.y = reelFrameGap * .5 + symbolHeight * 1.5;
        this.container.scale.set(1, 1.5 );
    }

    async show(): Promise<this> {
        await super.show();
        this.play("show", {loop: true});
        return this;
    }

    async hide(): Promise<this> {
        this.stop().name("show");
        await super.hide();
        return this;
    }
}
