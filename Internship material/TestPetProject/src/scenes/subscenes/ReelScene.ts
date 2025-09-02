import BaseScene from "app/scenes/BaseScene";
import gameModel from "app/model/GameModel";
import {TJumpInfo, TScatterWin, TWin} from "app/server/service/typing";
import {TAnimations, TSkins} from "app/controls/reels/SpineReelSymbol";
import {PlaySymbolAnimationParams} from "app/controls/reels/ReelsControl";
import GameControl from "app/controls/GameControl";
import {ShakeExtension} from "app/controls/extensions/ShakeExtension";
import gameConfig from "res/configs/gameConfig.json";
import { VisibilitySignals } from "app/model/GameSignals";

export default class ReelScene extends BaseScene {
    readonly gameControl: GameControl = new GameControl(gameModel.mainGameInfo).name("reelBox");
    readonly reelsControl = this.gameControl.reelsControl;
    readonly linesControl = this.gameControl.linesControl;

    async compose() {
        this.addControl(this.gameControl);
        this.gameControl.addExtension(new ShakeExtension(
            {
                speedFactorUpdate: gameModel.game.signals.speedFactorUpdate,
                shakeSignal: gameModel.game.signals.reels.shake,
            },
            gameConfig.animations.reelsShaking,
        ));
        gameModel.game.signals.reels.anticipateReels.add(this.onSetAnticipateReels, this);
        gameModel.game.signals.reels.updateSkin.add(this.onUpdateSkins, this);
        gameModel.game.signals.reels.updateAnimation.add(this.onUpdateAnimations, this);
        gameModel.game.signals.reels.spin.add(this.onSpin, this);
        gameModel.game.signals.reels.stop.add(this.onStop, this);
        gameModel.game.signals.reels.forceMoveOn.add(this.onForceMoveOn, this);
        gameModel.game.signals.reels.dimAllSymbols.add(this.onAllDimSymbols, this);
        gameModel.game.signals.reels.stopAllAnimations.add(this.onStopAllSymbols, this);
        gameModel.game.signals.reels.showScatterWins.add(this.onShowScatterWins, this);
        gameModel.game.signals.reels.showLineWins.add(this.onShowLineWins, this);
        gameModel.game.signals.reels.clearSymbols.add(this.onClearSymbols, this);
        gameModel.game.signals.reels.showLine.add(this.onShowLine, this);
        gameModel.game.signals.reels.hideLines.add(this.onHideLines, this);
        gameModel.game.signals.reels.play.add(this.onPlaySymbolAnimation, this);
        this.reelsControl.signals.reelStopped.add(this.onReelStopped, this);
        this.reelsControl.signals.reelStopStarted.add(this.onReelStopStarted, this);
        this.reelsControl.anticipationShown.add(this.onAnticipationShown, this);
        gameModel.game.signals.reels.updateReelOffset.add(this.updateReelOffset, this);
        gameModel.game.signals.reels.expandWild.add(this.onExpandWild, this);
    }

    dispose() {
        gameModel.game.signals.reels.stopAllAnimations.unload(this);
        gameModel.game.signals.reels.anticipateReels.unload(this);
        gameModel.game.signals.reels.updateSkin.unload(this);
        gameModel.game.signals.reels.updateAnimation.unload(this);
        gameModel.game.signals.reels.spin.unload(this);
        gameModel.game.signals.reels.stop.unload(this);
        gameModel.game.signals.reels.forceMoveOn.unload(this);
        gameModel.game.signals.reels.dimAllSymbols.unload(this);
        gameModel.game.signals.reels.showScatterWins.unload(this);
        gameModel.game.signals.reels.showLineWins.unload(this);
        gameModel.game.signals.reels.clearSymbols.unload(this);
        gameModel.game.signals.reels.showLine.unload(this);
        gameModel.game.signals.reels.hideLines.unload(this);
        gameModel.game.signals.reels.play.unload(this);
        this.reelsControl.signals.reelStopped.unload(this);
        this.reelsControl.signals.reelStopStarted.unload(this);
        this.reelsControl.signals.reelSpinStarted.unload(this);
        this.reelsControl.anticipationShown.unload(this);
        gameModel.game.signals.reels.updateReelOffset.unload(this);
        gameModel.game.signals.reels.expandWild.unload(this);
        super.dispose();
    }

    private async onPlaySymbolAnimation(payload: PlaySymbolAnimationParams, resolve?: () => void) {
        await this.reelsControl.playSymbolAnimation(payload);
        resolve && resolve();
    }
    private async onExpandWild(extensionInfo: {jumpsInfo: TJumpInfo[]}, resolve?: () => void) {
        await this.reelsControl.expandWild(extensionInfo.jumpsInfo);
        resolve && resolve();
    }

    private onUpdateSkins(skin: TSkins) {
        this.reelsControl.updateSkins(skin);
    }

    private onUpdateAnimations(animation: TAnimations) {
        this.reelsControl.updateAnimation(animation);
    }

    private onStopAllSymbols() {
        this.reelsControl.stopAllSymbols();
    }

    private async onSpin() {
        gameModel.game.signals.spinStarted.emit();
        await this.startReelSpinning();
    }

    private async onForceMoveOn(reelStops: number[]) {
        await this.reelsControl.forceStop(reelStops);
    }

    private async onStop(reelStops: number[]) {
        await this.stopReelSpinning(reelStops);
        gameModel.game.signals.spinComplete.emit();
    }

    async startReelSpinning(reelSpeed?: number) {
        await this.reelsControl.spin(reelSpeed);
    }

    async stopReelSpinning(reelStops: number[]) {
        await this.reelsControl.stop(reelStops);
    }

    private async onHideLines(_: void, resolve?: () => void) {
        await this.linesControl.hideAllLines();
        resolve?.();
    }

    private async onShowLine(lineNumber: number, resolve?: () => void) {
        await this.linesControl.showLine(lineNumber);
        resolve?.();
    }

    private async onShowLineWins(winInfo:{ wins: TWin[], bet:number}, resolve?: () => void) {
        for (const lineWin of winInfo.wins) {
            await [
                this.showLineWins([lineWin]),
                this.reelsControl.showWinLabel(lineWin, winInfo.bet),
            ].promise().all();
        }
        
        if(winInfo.wins.length > 1)
            await this.showLineWins(winInfo.wins);

        resolve && resolve();
    }

    private async showLineWins(wins: TWin[]) {
        await Promise.all([
            this.reelsControl.showLineWins(wins),
            this.linesControl.showLines(wins),
        ]);
        await this.linesControl.hideLines(wins);
    }

    private async onAllDimSymbols(status: { dim: boolean, except?: { x: number, y: number }[] }, resolve?: () => void) {
        if (status.dim) {
            await this.reelsControl.dimAllSymbols(status.except);
        } else {
            await this.reelsControl.undimAllSymbols();
        }
        resolve && resolve();
    }

    private async onShowScatterWins(wins: TScatterWin[], resolve?: () => void) {
        await this.reelsControl.showScatterWins(wins);
        resolve && resolve();
    }

    showDebugInfo() {
        this.reelsControl.showDebugInfo();
    }

    hideDebugInfo() {
        this.reelsControl.hideDebugInfo();
    }

    protected async onReelStopStarted(reelIndex: number) {
        gameModel.game.signals.reels.stopStarted.emit(reelIndex);
    }

    protected onReelStopped(reelIndex: number) {
        gameModel.game.signals.reels.stopped.emit(reelIndex);
    }

    protected onAnticipationShown(reelIndex: number) {
        gameModel.game.signals.reels.anticipationShown.emit(reelIndex);
    }

    private onSetAnticipateReels(reels: number[]) {
        this.reelsControl.setAnticipationReels(reels);
    }

    private onClearSymbols() {
        this.reelsControl.clearSymbols();
    }

    private updateReelOffset(reelOffset: number) {
        this.reelsControl.reels.forEach(reel => reel.updateReelOffset(reelOffset));
    }

}
