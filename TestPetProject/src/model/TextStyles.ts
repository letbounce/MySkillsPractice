import {ITextStyle} from "@pixi/text";

export default class TextStyles {
    static readonly SYMBOL_DEV_INFO: Partial<ITextStyle> = {
        fontFamily: "AlmondMilk",
        fill: "white",
        fontSize: 60,
        fontWeight: "bold",
        letterSpacing: -1,
        lineJoin: "round",
        strokeThickness: 6,
    };

    static readonly TITLE: Partial<ITextStyle> = {
        fontFamily: "AlmondMilk",
        fill: "white",
        fontSize: 60,
        fontWeight: "bold",
        letterSpacing: -1,
        lineJoin: "round",
        strokeThickness: 6,
    };

    static readonly GAME_LABEL: Partial<ITextStyle> = {
        fontFamily: "AlmondMilk",
        fill: "white",
        fontSize: 120,
        fontWeight: "bold",
        letterSpacing: -1,
        lineJoin: "round",
        strokeThickness: 6,
    };
    static readonly MESSAGE_BAR_TEXT_STYLE: Partial<ITextStyle> = {
        fontFamily: "AlmondMilk",
        stroke: "rgba(25, 115, 225, 0.4)",
        strokeThickness: 5,
        fill: ["white", "cyan"],
        fontSize: 25,
        fontWeight: "bold",
        lineJoin: "round",
        letterSpacing: 5,
        // text under reels
    };

    static readonly INTRO_GAME_FOOTER_TITLE: Partial<ITextStyle> = {
        fontFamily: "AlmondMilk",
        fontSize: 90,
        stroke: "#25727e",
        strokeThickness: 4,
        align: "center",
        fill: ["azure", "cyan", "magenta"],
        fillGradientStops: [0.3, 0.7],
        dropShadow: true,
        dropShadowAngle: 10,
        dropShadowBlur: 3,
        dropShadowColor: "#260606",
        dropShadowDistance: 1,
    };

    static readonly INTRO_FEATURE_CONTROL_TEXT: Partial<ITextStyle> = {
        ...this.INTRO_GAME_FOOTER_TITLE,
        fontSize: 45,
        // intro with crok
    };

    static readonly LABEL_TITLE_STYLE: Partial<ITextStyle> = {
        fontFamily: "AlmondMilk",
        fill: ["azure", "cyan"],
        fontSize: 25,
        lineJoin: "round",
        // balance, win, bet
    };

    static readonly LABEL_TEXT_STYLE: Partial<ITextStyle> = {
        fontFamily: "AlmondMilk",
        stroke: "rgba(0, 0, 0, 0.4)",
        strokeThickness: 3,
        fill: "white",
        fontSize: 30,
        lineJoin: "round",
        letterSpacing: -0.5,
        // bet, win (amount)
    };

    static readonly POPUP_LABEL_STYLE: Partial<ITextStyle> = {
        ...this.LABEL_TEXT_STYLE,
        fontSize: 100,
        fill: "#a46946",
        letterSpacing: -1,
        strokeThickness: 6,
    };

    static readonly SPIN_BTN_TEXT_STYLE: Partial<ITextStyle> = {
        ...this.LABEL_TEXT_STYLE,
        fill: "white",
        fontSize: 48,
        lineJoin: "round",
        stroke: "#4a1a06",
        strokeThickness: 5,
    };

    static readonly TOOLTIP_LABEL_TITLE_STYLE: Partial<ITextStyle> = {
        ...this.LABEL_TITLE_STYLE,
        fontSize: 32,
    };

    static readonly PAYTABLE_STYLE: Partial<ITextStyle> = {
        ...this.INTRO_GAME_FOOTER_TITLE,
        fontSize: 95,
        wordWrap: true,
        wordWrapWidth: 1920 - 150,
        leading: 20,
        align: "center",
    };

    static readonly PAYTABLE_TITLE_STYLE: Partial<ITextStyle> = {
        ...this.INTRO_GAME_FOOTER_TITLE,
        fontSize: 120,
    };

    static readonly PAYTABLE_WHITE_TITLE_STYLE: Partial<ITextStyle> = {
        ...this.PAYTABLE_TITLE_STYLE,
        fontFamily: "AlmondMilk",
        fill: ["magenta", "purple"],
        strokeThickness: 0,
        align: "center",
    };

    static readonly TOOLTIP_LABEL_TEXT_STYLE: Partial<ITextStyle> = {
        ...this.LABEL_TEXT_STYLE,
        fill: "#ffc800",
        fontSize: 46,
    };

    static readonly AUTOPLAY_BUTTON: Partial<ITextStyle> = {
        ...this.LABEL_TITLE_STYLE,
        fill: "white",
        fontSize: 90,
        stroke: "#000",
        strokeThickness: 3,
    };

    static readonly AUTOPLAY_BUTTON_CONTROL: Partial<ITextStyle> = {
        ...this.LABEL_TITLE_STYLE,
        fill: "white",
        fontSize: 35,
    };
}
