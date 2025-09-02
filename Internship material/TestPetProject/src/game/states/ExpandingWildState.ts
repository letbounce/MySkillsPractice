import { TJumpInfo} from "app/server/service/typing";
import { GameState } from "./GameState";

export default class ExpandingWildState extends GameState{
    protected expandWildPromises: Promise<unknown>[] = [];
    protected wildJumps: TJumpInfo[][] | undefined;
    protected isFreeSpin: boolean = false;

    async run(): Promise<GameState> {
        if (!this.isFreeSpin) {
            this.wildJumps = this.spinResponse.wildFeature.jumps;
        }
        
        if (this.wildJumps!.length > 0) {
            this.wildJumps!.forEach((singleWildJumps) => {
                const promiseList = this.gameSignals.reels.expandWild.emit({ jumpsInfo: singleWildJumps });
                this.expandWildPromises.push(promiseList.all())
            })
        }

        await Promise.all(this.expandWildPromises);
        return this;
    }

}