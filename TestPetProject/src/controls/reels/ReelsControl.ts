import MainControl from "app/controls/MainControl";
import {Container} from "@pixi/display";
import ReelControl, {TReelStopStatement} from "app/controls/reels/ReelControl";
import gameModel, {TMainGameInfo} from "app/model/GameModel";
import {promiseDelay, TimeUnit} from "app/helpers/TimeHelper";
import {TJumpInfo, TScatterWin, TSymbolId, TSymbolPosition, TWin} from "app/server/service/typing";
import SpineReelSymbol, {TAnimations, TSkins} from "app/controls/reels/SpineReelSymbol";
import Signal from "app/helpers/signals/signal/Signal";
import AnticipationFrameControl from "app/controls/reels/AnticipationFrameControl";
import SpeedFactorExtension, {SpeedFactorControl} from "app/controls/extensions/SpeedFactorExtension";
import gameConfig from "res/configs/gameConfig.json";
import pgsap from "app/helpers/promise/gsap/PromisableGsap";
import {BitmapText, IPointData, Point} from "pixi.js";
import SpineControl from "../SpineControl";
import SpineLoader from "app/loader/SpineLoader";
import { VisibilitySignals } from "app/model/GameSignals";

export type PlaySymbolAnimationParams = {x: number; y: number; animation: TAnimations; track?: number};

type ReelSymbolData = {
    symbol: SpineReelSymbol,
    position: {x: number, y: number},
    symbolId: TSymbolId,
};

export default class ReelsControl extends MainControl implements SpeedFactorControl {
    private readonly reelsContainer = new Container();
    private readonly anticipationFrame: AnticipationFrameControl;
    private readonly anticipationReels: number[] = [];
    readonly reels: ReelControl[] = [];
    readonly anticipationShown = new Signal<number>();
    readonly signals = {
        reelStopped: new Signal<number>(),
        reelSpinStarted: new Signal<number>(),
        reelStopStarted: new Signal<number>(),
    };
    public speedFactor = 1;

    constructor(protected readonly mainGameInfo:TMainGameInfo) {
        super();
        this.anticipationFrame = new AnticipationFrameControl(mainGameInfo);
        this.addExtension(new SpeedFactorExtension());
    }

    updateSpeedFactor(speedFactor: number): void {
        this.speedFactor = speedFactor;
    }

    init() {
        super.init();
        const mainGameInfo = this.mainGameInfo;
        const reels = mainGameInfo.reels;
        for (let i = 0; i < reels.amount; i++) {
            const reelControl = new ReelControl(i, mainGameInfo);
            reelControl.addExtension(new SpeedFactorExtension());
            reelControl.name(`reel_${i}`);
            this.reels.push(reelControl);
        }
        this.container.addChild(this.reelsContainer);
        this.add(this.anticipationFrame);
        this.anticipationFrame.moveOnReel(0);
        this.anticipationFrame.hide().then();
    }

    updateSkins(skin: TSkins) {
        this.reels.forEach(value => {
            value.updateSkins(skin);
        });
    }

    stopAllSymbols() {
        this.reels.map(async value => {
            value.getVisibleSymbols().forEach(value1 => {
                value1.stop().name("idle");
            });
        });
    }

    async updateAnimation(animation: TAnimations, loop = true, trackIndex = 1) {
        await Promise.all(this.reels.map(async value => {
            await value.updateAnimations(animation, loop, trackIndex);
        }));
    }

    async spin(speed?: number) {
        this.clearSymbols();
        await Promise.all(this.reels.map(async (reel, index) => {
            await promiseDelay((gameConfig.reels.spinDelay * index) / this.speedFactor, TimeUnit.sec);
            this.signals.reelSpinStarted.emit(index);
            await reel.spin(speed);
            this.signals.reelStopped.emit(index);
        }));
    }

    async forceStop(reelStops: number[]) {
        this.reels.forEach((reel, index) => {
            reel.forceStop(reelStops[index]);
        });
    }

    async stop(reelStops: number[]) {
        await Promise.all(this.reels.map(async (reel, index) => {
            const delay = this.anticipationReels.filter((value, i) => i <= index)
                .map(value => value == 0 ? gameConfig.reels.stopDelay : gameConfig.reels.anticipationDelay)
                .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            await promiseDelay(delay, TimeUnit.sec);
            reel.reelStopped.promise().then(this.showAnticipationReel.bind(this));
            this.signals.reelStopStarted.emit(index);
            await reel.stop(reelStops[index]);
        }));
    }

    async showScatterWins(scatterWins: TScatterWin[]) {
        await Promise.all(scatterWins.map(async win => {
            await Promise.all(win.symbols.map(async symbol => {
                await this.reels[symbol.x].getSymbol(symbol.y).moveTop().play("undim", {timeScale: 4});
                await this.reels[symbol.x].getSymbol(symbol.y).moveTop().play("win", {timeScale: 2});
            }));
        }));
    }

    async showLineWins(wins: TWin[]) {
        if (wins.length == 0) {
            return;
        }
        const winSymbols = this.getWinSymbols(wins);
        await Promise.all(winSymbols.map(async symbol => symbol.symbol.moveTop().play("undim", { timeScale: 4 })));
        await Promise.all(winSymbols.map(async symbol => symbol.symbol.moveTop().play("win", { timeScale: 2 })));
        await Promise.all(winSymbols.map(async symbol => symbol.symbol.moveTop().play("dim")));
    }

    async showWinLabel(win: TWin, betValue:number) {
        const labeledSymbolId:number = Math.floor(win.symbolsAmount / 2.0);
        const winSymbol: ReelSymbolData = this.getWinSymbols([win])[labeledSymbolId];

        const winLabelPopup = new SpineControl("fs_intro_popup");
        winLabelPopup.setSkin("winline");
        const label = new BitmapText(`$${(win.win*betValue).toFixed(2)}`, { fontName: "win_counter", fontSize: 62 });
        label.anchor.set(0.5, 0.5);
        winLabelPopup.setScale({ x: 0.6 });
        winLabelPopup.replace("counter", label);
        const reelBoxPosition = this.getSymbolReelBoxPosition(winSymbol.position.x, winSymbol.position.y);
        winLabelPopup.setPosition(reelBoxPosition);
        this.container.addChild(winLabelPopup.container);
        await promiseDelay(1, TimeUnit.sec);
        this.container.removeChild(winLabelPopup.container);
    }

    clearSymbols() {
        this.reels.forEach(reel => {
            reel.getVisibleSymbols().forEach(symbol => symbol.removeAdditionalInfo());
        });
    }

    public getWinSymbols(wins: TWin[]) {
        const cache: SpineReelSymbol[] = [];
        const result: ReelSymbolData[] = [];
        wins.forEach(win => {
            this.mainGameInfo.lines[win.lineId].forEach((lineOffset, index) => {
                if (index < win.symbolsAmount) {
                    const symbol = this.reels[index].getSymbol(lineOffset);
                    if (!cache.includes(symbol)) {
                        cache.push(symbol);
                        result.push({
                            symbol,
                            position: {x: index, y: lineOffset},
                            symbolId: win.symbolId,
                        });
                    }
                }
            });
        });
        return result;
    }

    async undimAllSymbols() {
        await this.reels.map(async reel => {
            await reel.getSymbolsSymbols()
                .map(async symbol => {
                    const isSpecial = symbol.getSkin() == "wild" || symbol.getSkin() == "scatter";
                    const ignore = symbol.getCurrentAnimation(1) == "dim_for_spin" && isSpecial;
                    const timeScale = ignore ? 100 : this.speedFactor;
                    await symbol.play("undim", {overrideAnimation: false, timeScale: timeScale, trackIndex: 1});
                }).promise().all();
        }).promise().all();
    }

    async dimAllSymbols(except?: {x: number; y: number}[]) {
        await this.reels.map(async (reel, x) => {
            await reel.getSymbolsSymbols()
                .filter((symbol, y) => {
                    if (except == null) {
                        return true;
                    }
                    return except.find(pos => pos.x == x && pos.y == y - reel.nearSymbolsAmount) == null;
                })
                .map(async symbol => {
                    const isSpecial = symbol.getSkin() == "wild" || symbol.getSkin() == "scatter";
                    const ignore = symbol.getCurrentAnimation(1) == "dim_for_spin" && !isSpecial;
                    const timeScale = ignore ? 100 : this.speedFactor;
                    await symbol.play("dim", {overrideAnimation: false, timeScale: timeScale, trackIndex: 1});
                }).promise().all();
        }).promise().all();
    }

    showDebugInfo() {
        this.reels.forEach(value => value.showDebugInfo());
    }

    hideDebugInfo() {
        this.reels.forEach(value => value.hideDebugInfo());
    }

    async playSymbolAnimation(payload: PlaySymbolAnimationParams, resolve?: () => void) {
        await this.reels[payload.x].getSymbol(payload.y).play(payload.animation, {trackIndex: payload.track ?? 2});
        resolve?.();
    }

    setAnticipationReels(reels: number[]) {
        this.anticipationReels.length = 0;
        this.anticipationReels.push(...reels);
    }

    private async showAnticipationReel(payload: TReelStopStatement) {
        const reelIndex = payload.reelIndex;
        if (payload.state == "early_stop") {
            await this.anticipationFrame.hide();
            if (this.anticipationReels[reelIndex + 1] == 1) {
                this.anticipationFrame.moveOnReel(reelIndex + 1);
                this.anticipationShown.emit(reelIndex + 1);
                await this.anticipationFrame.show();
            }
        }
    }

    getSymbol(pos: {x: number; y: number}) {
        return this.reels[pos.x].getSymbol(pos.y);
    }

    public async expandWild(jumpsInfo: TJumpInfo[], resolve?: () => void): Promise<void> {
        const startPoint: Point = new Point(jumpsInfo[0].jumpFrom.x, jumpsInfo[0].jumpFrom.y);
        const movingSymbol: SpineReelSymbol = this.getSymbol(startPoint);
        movingSymbol.play("undim");
        
        const initialReelBoxPosition: Point = this.getSymbolReelBoxPosition(startPoint.x, startPoint.y);
        const movingClone: SpineControl = this.getSymbolSpineControlClone(movingSymbol);
        movingClone.container.position = initialReelBoxPosition;
        this.container.addChild(movingClone.container);

        jumpsInfo.push({ jumpTo: { x: startPoint.x, y: startPoint.y}, jumpFrom: { x: 0, y: 0}, replaceOn: 0 })
        for (const jump of jumpsInfo) {
            const targetSymbol: SpineReelSymbol = this.getSymbol(jump.jumpTo);
            const targetPosition = this.getSymbolReelBoxPosition(jump.jumpTo.x, jump.jumpTo.y);
            
            movingClone.play("fly/transition1") 
            await pgsap.to(movingClone.container, {
                     x: targetPosition.x,
                     y: targetPosition.y,
                     duration: 2,
            });
            if (!startPoint.equals(jump.jumpTo as IPointData)) {
                await targetSymbol.play("land");
                this.reels[jump.jumpTo.x].updateSymbol(jump.jumpTo.y, TSymbolId.WILD);
            }

        }
        this.container.removeChild(movingClone.container);
        resolve?.();
    }

    public getSymbolReelBoxPosition(reelIndex:number, symbolIndex:number):Point {
        const positionX = this.reels[reelIndex].container.parent.parent.position.x+this.mainGameInfo.symbol.offsetX;
        const positionY = this.reels[reelIndex].getSymbol(symbolIndex).container.y;

        return new Point(positionX, positionY)
    }

    public getSymbolSpineControlClone(originSymbol:SpineReelSymbol):SpineControl {
        const symbolClone: SpineControl = new SpineControl("symbols");
        symbolClone.setSkin(originSymbol.getSkin());
        symbolClone.setScale({x: this.mainGameInfo.symbol.scale});
    
        return symbolClone;
    }
}
