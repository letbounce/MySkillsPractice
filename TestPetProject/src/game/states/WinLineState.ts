import {GameState} from "app/game/states/GameState";
import {inject} from "app/model/injection/InjectDecorator";
import BetModel from "app/model/BetModel";
import gameModel, { GameModel } from "app/model/GameModel";

export default class WinLineState extends GameState {
    @inject(BetModel)
    protected betModel!: BetModel;
    enable(): boolean {
        return super.enable() && this.spinResponse.winLines.wins.length > 0;
    }

    async run(): Promise<GameState> {
        const reel = this.gameSignals.reels;
        const except = this.mainGameModel.getWinSymbolsPositions(this.spinResponse.winLines.wins);
        reel.dimAllSymbols.emit({dim: true, except: except});
        const winsWin = this.spinResponse.winLines.totalWin;
        this.gameSignals.ui.showWin.emit({win: winsWin});
        await reel.showLineWins.emit({ wins: this.spinResponse.winLines.wins, bet: gameModel.mainGameInfo.bets.find((bet)=>bet.id === this.spinResponse.userStats.betId)!.value }).all();
        return this;
    }
}
