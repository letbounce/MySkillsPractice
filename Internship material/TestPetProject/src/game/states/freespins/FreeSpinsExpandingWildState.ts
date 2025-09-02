import { inject } from "app/model/injection/InjectDecorator";
import FreeSpinModel from "app/model/FreeSpinModel";
import ExpandingWildState from "../ExpandingWildState";
import { GameState } from "../GameState";

export default class FreeSpinsExpandingWildState extends ExpandingWildState{
    @inject(FreeSpinModel)
    protected freeSpinModel!: FreeSpinModel;
    
    
    async run(): Promise<GameState> {
        this.wildJumps = this.freeSpinModel.getCurrentSpinResult().wildFeature.jumps;
        this.isFreeSpin = true;
        await super.run();
        this.isFreeSpin = false;
        return this;
    }

}