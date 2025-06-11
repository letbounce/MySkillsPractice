import Signal from "app/helpers/signals/signal/Signal";
import {
    TFullUserData,
    TInitResponse,
    TJumpInfo,
    TResponse,
    TScatterWin,
    TSpinResponse,
    TSymbolId,
    TSymbolPosition,
    TWin,
} from "app/server/service/typing";
import {TAnimations, TSkins} from "app/controls/reels/SpineReelSymbol";
import {PlaySymbolAnimationParams} from "app/controls/reels/ReelsControl";

export class VisibilitySignals<T> {
    readonly show = new Signal<T>();
    readonly hide = new Signal<void>();
    readonly shown = new Signal<void>();
    readonly hidden = new Signal<void>();
}

export type TBackgroundType = "intro" | "main" | "fs" | "dark";

export default class GameSignals {
    public readonly reels = {
        updateSymbolSkin: new Signal<{symbolPosition:TSymbolPosition, symbolId:TSymbolId}>(),
        updateSkin: new Signal<TSkins>(),
        updateAnimation: new Signal<TAnimations>(),
        spin: new Signal<void>(),
        stop: new Signal<number[]>(),
        forceMoveOn: new Signal<number[]>(),
        shake: new Signal<void>(),
        updateReelOffset: new Signal<number>(),
        dimAllSymbols: new Signal<{dim:boolean, except?:{x:number, y:number}[]}>(),
        stopAllAnimations: new Signal(),
        showScatterWins: new Signal<TScatterWin[]>(),
        showLineWins: new Signal < {wins: TWin[], bet:number} >(),
        showLine: new Signal<number>(),
        stopped: new Signal<number>(),
        play: new Signal<PlaySymbolAnimationParams>(),
        anticipateReels: new Signal<number[]>(),
        scatterReels: new Signal<number[]>(),
        anticipationShown: new Signal<number>(),
        hideLines: new Signal<void>(),
        clearSymbols: new Signal<void>(),
        stopStarted: new Signal<number>(),
        moveSymbol: new Signal<{ symbolPosition: TSymbolPosition, targetPosition: TSymbolPosition }>(),
        expandWild: new Signal<{jumpsInfo:TJumpInfo[]}>(),
    };
    public readonly autoplay = {
        show: new Signal<void>(),
        hide: new Signal<void>(),
        changed: new Signal<number>(),
        decrease: new Signal<void>(),
        stop: new Signal<void>(),
    };
    public readonly spinComplete = new Signal<void>();
    public readonly spinStarted = new Signal<void>();
    public readonly data = {
        login: new Signal<TInitResponse>(),
        spin: new Signal<TSpinResponse>(),
        users: new Signal<TFullUserData[]>(),
        stopReel: new Signal<TResponse>(),
        buyAmount: new Signal<TResponse>(),
    };
    public readonly loader = {
        progressUpdate: new Signal<number>(),
        complete: new Signal<void>(),
    };
    readonly ui = {
        options: {
            info: {
                show: new Signal<void>(),
                hide: new Signal<void>(),
            },
            toggleSound: new Signal<void>(),
        },
        spinButton: {
            clicked: new Signal<void>(),
            enable: new Signal<void>(),
            disable: new Signal<void>(),
            updateCounter: new Signal<number>(),
        },
        autoplayButton: {
            enable: new Signal<void>(),
        },
        showWin: new Signal<{win:number, isTotalWin?:boolean}>(),
        disableControls: new Signal<void>(),
        enableControls: new Signal<void>(),

    };
    readonly background = new VisibilitySignals<TBackgroundType>();
    readonly popup = {
        fsIntro: new VisibilitySignals<number>(),
        fsOutro: new VisibilitySignals<number>(),
        winCounter: new VisibilitySignals<number>(),
        winLabel: new VisibilitySignals<number>()
    };
    public readonly infobar = {
        start: new Signal<void>(),
        stop: new Signal<void>(),
        hide: new Signal<void>(),
        show: new Signal<void>(),
    };
    public readonly speedFactorUpdate = new Signal<number>();
    paytableShow = new Signal();
    paytableHide = new Signal();

    public readonly freeSpinsCounter = {
        show: new Signal<void>(),
        hide: new Signal<void>()
    }
    public readonly betPanel = {
        update: new Signal<number>()
    }
}
