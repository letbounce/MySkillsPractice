import {PartialLayout} from "app/layoutManager/LayoutManager";
import {betPanelLayout} from "app/scenes/subscenes/BetPanelScene.layout";

const commonLayouts: PartialLayout[] = [{
    name: "box",
    uid: "box",
    scaleBy: "fit.in",
    height: "100%",
    width: "100%",
    top: "0%",
    left: "0%",
    display: "table",
}];
const header: PartialLayout = {
    name: "header",
    extend: "box",
    width: "100%",
    display: "fixed",
    sortBy: "horizontal",

    layouts: [
        {
            name: "logo",
            scaleBy: "fit.in",
            alignIn: "c",
            avoidBounding: "yes",

            aspects: {
                "1920/4157": {
                    height: "100%",
                    width: "85%",
                    align: "c",
                },
                "1920/3408": {
                    height: "100%",
                    width: "85%",
                    align: "c",
                },
                "1920/2561": {
                    height: "90%",
                    width: "70%",
                    align: "c",
                },
                "1920/1440": {
                    height: "90%",
                    width: "70%",
                    align: "c",
                },
                "1920 / 1335": {
                    height: "90%",
                    width: "70%",
                    align: "c",
                },
                "1920 / 1334": {
                    height: "70%",
                    width: "60%",
                    align: "c",
                },
                "1920/1082": {
                    height: "70%",
                    width: "45%",
                    align: "c",
                },
                "1920/887": {
                    height: "70%",
                    width: "35%",
                    align: "c",
                },
            },
        },
    ],
    aspects: {
        "1920/4157": {
            height: "12.5%",
        },
        "1920/3408": {
            height: "12.5%",
        },
        "1920/2561": {
            height: "12.5%",
        },
        "1920/1440": {
            height: "12.5%",
        },
        "1920/1082": {
            height: "14.5%",
        },
        "1920/887": {
            height: "12.5%",
        },
    },
};
const footer: PartialLayout = {
    name: "footer",
    extend: "box",
    width: "100%",
    display: "relative",
    layouts: [
        {
            name: "footer_content",
            extend: "box",
            scaleBy: "fit.in",
            alignIn: "c",
            top: "0%",
            width: "55%",
            layouts: [
                ...betPanelLayout.layouts ?? [],
                // todo: support child nodes extending [#39]
                /* {
                name: "footerLayout",
                extend: "bet_panel"
            }*/
            ],
            aspects: {
                "1920/4157": {
                    width: "85%",
                    height: "90%",
                    align: "b",
                },
                "1920/3408": {
                    width: "85%",
                    height: "90%",
                    align: "b",
                },
                "1920/2561": {
                    width: "77%",
                    height: "90%",
                    align: "b",
                },
                "1920/1440": {
                    width: "60%",
                    height: "100%",
                    align: "c",
                },
                "1920/1082": {
                    width: "60%",
                    height: "90%",
                    align: "b",
                },
                "1920/887": {
                    width: "55%",
                    height: "100%",
                    align: "c",
                },
            },
        },
    ],
    aspects: {
        "1920/4157": {
            height: "7.5%",
        },
        "1920/3408": {
            height: "7.5%",
        },
        "1920/2561": {
            height: "9.5%",
        },
        "1920/1440": {
            height: "11%",
        },
        "1920/1082": {
            height: "10.5%",
        },
        "1920/887": {
            height: "12.5%",
        },
    },
};
const leftSideBox: PartialLayout = {
    name: "\nleftSideBox",
    display: "relative",
    top: "0%",
    layouts: [
        

        {
            name: "options_btn",
            scaleBy: "fit.in",
            avoidBounding: "yes",
            alignIn: "c",
            align: "bl",
            height: "15%",
            layouts: [
                {
                    name: "options_selector",
                    align: "b",
                    scaleBy: "fit.in",
                    alignIn: "b",
                    aspects: {
                        "1920/4157": {
                            width: "150%",
                            height: "500%",
                            top: "-110%",
                        },
                        "1920/3408": {
                            width: "150%",
                            height: "500%",
                            top: "-110%",
                        },
                        "1920/2561": {
                            width: "150%",
                            height: "500%",
                            top: "-110%",
                        },
                        "1920/1440": {
                            width: "155%",
                            height: "515%",
                            top: "-92%",
                        },
                        "1920/1082": {
                            width: "175%",
                            height: "600%",
                            top: "-110%",
                        },
                        "1920/887": {
                            width: "150%",
                            height: "500%",
                            top: "-110%",
                        },
                    },
                },
            ],
            aspects: {
                "1920/4157": {
                    top: "-3%",
                    left: "20%",
                    width: "27%",
                },
                "1920/3408": {
                    top: "-3%",
                    left: "20%",
                    width: "27%",
                },
                "1920/2561": {
                    top: "-3%",
                    left: "20%",
                    width: "27%",
                },
                "1920/1440": {
                    top: "0%",
                    left: "33%",
                    width: "34%",
                },
                "1920/1082": {
                    top: "-1.5%",
                    left: "25%",
                    width: "27%",
                },
                "1920/887": {
                    top: "-3%",
                    left: "20%",
                    width: "27%",
                },
            },
        },
    ],
    aspects: {
        "1920/4157": {
            width: "0%",
            height: "0%",
        },
        "1920/3408": {
            width: "0%",
            height: "0%",
        },
        "1920/2561": {
            width: "0%",
            height: "0%",
        },
        "1920/1440": {
            width: "17.5%",
            height: "100%",
        },
        "1920/1082": {
            width: "20%",
            height: "100%",
        },
        "1920/887": {
            width: "20%",
            height: "100%",
        },
    },
};
const rightSideBox: PartialLayout = {
    name: "\nrightSideBox",
    display: "relative",
    layouts: [
        {
            name: "btns_con",
            width: "100%",
            layouts: [
                {
                    name: "options_btn",
                    scaleBy: "fit.in",
                    avoidBounding: "yes",
                    alignIn: "c",
                    layouts: [
                        {
                            name: "options_selector",
                            align: "b",
                            scaleBy: "fit.in",
                            alignIn: "b",
                            aspects: {
                                "1920/4157": {
                                    width: "150%",
                                    height: "500%",
                                    top: "-110%",
                                },
                                "1920/3408": {
                                    width: "150%",
                                    height: "470%",
                                    top: "-110%",
                                },
                                "1920/2561": {
                                    width: "100%",
                                    height: "500%",
                                    top: "-110%",
                                },
                                "1920/1440": {
                                    width: "155%",
                                    height: "515%",
                                    top: "-110%",
                                },
                                "1920/1082": {
                                    width: "175%",
                                    height: "600%",
                                    top: "-110%",
                                },
                                "1920/887": {
                                    width: "150%",
                                    height: "500%",
                                    top: "-110%",
                                },
                            },
                        },
                    ],
                    aspects: {
                        "1920/4157": {
                            width: "30%",
                            height: "20%",
                            align: "c",
                            left: "-41%",
                            top: "33%",
                        },
                        "1920/3408": {
                            width: "30%",
                            height: "25%",
                            align: "c",
                            left: "-43%",
                            top: "30%",
                        },
                        "1920/2561": {
                            width: "35%",
                            height: "40%",
                            align: "c",
                            left: "-44%",
                            top: "-5%",
                        },
                        "1920/1440": {
                            width: "70%",
                            height: "70%",
                            align: "c",
                            left: "-450%",
                            top: "400%",
                        },
                        "1920/1082": {
                            width: "60%",
                            height: "60%",
                            align: "c",
                            left: "-400%",
                            top: "410%",
                        },
                        "1920/887": {
                            width: "60%",
                            height: "60%",
                            align: "c",
                            left: "-400%",
                            top: "410%",
                        },
                    },
                },
                {
                    name: "force_btn",
                    avoidBounding: "yes",
                    alignIn: "c",
                    scaleBy: "fit.in",
                    aspects: {
                        "1920/4157": {
                            width: "20%",
                            height: "20%",
                            align: "b",
                            top: "-10%",
                            left: "-18%",
                        },
                        "1920/3408": {
                            width: "30%",
                            height: "30%",
                            align: "b",
                            top: "-10%",
                            left: "-18%",
                        },
                        "1920/2561": {
                            width: "32.5%",
                            height: "32.5%",
                            align: "c",
                            top: "0%",
                            left: "-18%",
                        },
                        "1920/1440": {
                            width: "62%",
                            height: "62%",
                            align: "t",
                            top: "-97%",
                            left: "0%",
                        },
                        "1920/1082": {
                            width: "62%",
                            height: "62%",
                            align: "t",
                            top: "-97%",
                            left: "0%",
                        },
                        "1920/887": {
                            width: "62%",
                            height: "62%",
                            align: "t",
                            top: "-97%",
                            left: "0%",
                        },
                    },
                },
                {
                    name: "autoplay_btn",
                    avoidBounding: "yes",
                    alignIn: "c",
                    scaleBy: "fit.in",
                    aspects: {
                        "1920/4157": {
                            width: "30%",
                            height: "27%",
                            align: "b",
                            top: "-42%",
                            left: "29%",
                        },
                        "1920/3408": {
                            width: "30%",
                            height: "30%",
                            align: "b",
                            top: "-42%",
                            left: "22%",
                        },
                        "1920/2561": {
                            width: "45%",
                            height: "45%",
                            align: "c",
                            top: "-5%",
                            left: "20%",
                        },
                        "1920/1440": {
                            width: "90%",
                            height: "85%",
                            align: "t",
                            top: "-210%",
                            left: "0%",
                        },
                        "1920/1082": {
                            width: "90%",
                            height: "65%",
                            align: "t",
                            top: "-80%",
                            left: "0%",
                        },
                        "1920/887": {
                            width: "90%",
                            height: "65%",
                            align: "t",
                            top: "-65%",
                            left: "0%",
                        },
                    },
                },
                {
                    name: "spin_btn",
                    avoidBounding: "yes",
                    alignIn: "c",
                    scaleBy: "fit.in",
                    aspects: {
                        "1920/4157": {
                            width: "70%",
                            height: "50%",
                            align: "t",
                            top: "15%",
                            left: "0%"
                        },
                        "1920/3408": {
                            width: "70%",
                            height: "50%",
                            align: "t",
                            top: "15%",
                            left: "0%"
                        },
                        "1920/2561": {
                            width: "72.5%",
                            height: "72.5%",
                            align: "t",
                            top: "5%",
                            left: "0%"
                        },
                        "1920/1440": {
                            width: "90%",
                            height: "140%",
                            align: "t",
                            top: "-180%",
                            left: "0%"
                        },
                        "1920/1082": {
                            width: "90%",
                            height: "100%",
                            align: "t",
                            top: "-85%",
                            left: "0%"
                        },
                        "1920/887": {
                            width: "90%",
                            height: "100%",
                            align: "t",
                            top: "-70%",
                            left: "0%"
                        },
                    },

                },
                {
                    name: "bet_btn",
                    avoidBounding: "yes",
                    alignIn: "c",
                    scaleBy: "fit.in",
                    layouts: [
                        {
                            name: "bet_selector",
                        },
                    ],
                    aspects: {
                        "1920/4157": {
                            width: "30%",
                            height: "25%",
                            align: "b",
                            top: "-43%",
                            left: "-33%",
                        },
                        "1920/3408": {
                            width: "30%",
                            height: "25%",
                            align: "b",
                            top: "-44%",
                            left: "-28%",
                        },
                        "1920/2561": {
                            width: "25%",
                            height: "45%",
                            align: "c",
                            top: "-5%",
                            left: "-23%",
                        },
                        "1920/1440": {
                            width: "85%",
                            height: "85%",
                            align: "t",
                            top: "-90%",
                            left: "0%",
                        },
                        "1920/1082": {
                            width: "90%",
                            height: "65%",
                            align: "t",
                            top: "-45%",
                            left: "0%",
                        },
                        "1920/887": {
                            width: "90%",
                            height: "65%",
                            align: "t",
                            top: "-30%",
                            left: "0%",
                        },
                    },
                },
            ],
            aspects: {
                "1920/4157": {
                    sortBy: "horizontal",
                    display: "fixed",
                    height: "100%",
                    align: "c",
                },
                "1920/3408": {
                    sortBy: "horizontal",
                    display: "fixed",
                    height: "100%",
                    align: "c",
                },
                "1920/2561": {
                    sortBy: "horizontal",
                    display: "fixed",
                    height: "100%",
                    align: "c",
                },
                "1920/1440": {
                    sortBy: "vertical",
                    display: "table",
                    height: "76%",
                    align: "b",
                },
                "1920/1082": {
                    sortBy: "vertical",
                    display: "table",
                    height: "104%",
                    align: "b",
                },
                "1920/887": {
                    sortBy: "vertical",
                    display: "table",
                    height: "110%",
                    align: "b",
                },
            },
        },
    ],
    aspects: {
        "1920/4157": {
            sortBy: "horizontal",
            width: "100%",
            height: "35%",
        },
        "1920/3408": {
            sortBy: "horizontal",
            width: "100%",
            height: "30%",
        },
        "1920/2561": {
            sortBy: "horizontal",
            width: "100%",
            height: "20%",
        },
        "1920/1440": {
            sortBy: "vertical",
            width: "18%",
            height: "100%",
        },
        "1920/1082": {
            sortBy: "vertical",
            width: "20%",
            height: "100%",
        },
        "1920/887": {
            sortBy: "vertical",
            width: "20%",
            height: "100%",
        },
    },
};
const reelBoxContainer: PartialLayout = {
    name: "reelBoxContainer",
    extend: "box",
    display: "fixed",
    alignIn: "c",
    align: "c",
    top: "20%",
    height: "85%",
    layouts: [
        {
            name: "reelBox",
            extend: "box",
            height: "90%",
            width: "100%",
            scaleBy: "fit.in",
            aspects: {
                "1920/4157": {
                    alignIn: "b",
                },
                "1920/3408": {
                    alignIn: "b",
                },
                "1920/2561": {
                    alignIn: "b",
                },
                "1920/1440": {
                    alignIn: "c",
                },
                "1920/1082": {
                    alignIn: "c",
                },
                "1920/887": {
                    alignIn: "c",
                },
            },
        },
        {
            name: "autoplay_selector",
            extend: "box",
            avoidBounding: "yes",
            alignIn: "c",
            width: "96%",
            aspects: {
                "1920/4157": {
                    height: "20%",
                    align: "b",
                    top: "-15%",
                    scaleBy: "fit.out",
                },
                "1920/3408": {
                    height: "20%",
                    align: "b",
                    top: "-20%",
                    scaleBy: "fit.out",
                },
                "1920/2561": {
                    height: "30%",
                    align: "b",
                    top: "-25%",
                    scaleBy: "fit.in",
                },
                "1920/1440": {
                    height: "20%",
                    align: "b",
                    top: "-35%",
                    scaleBy: "fit.out",
                },
                "1920/1082": {
                    height: "40%",
                    align: "c",
                    top: "0%",
                    scaleBy: "fit.in",
                },
                "1920/887": {
                    height: "40%",
                    align: "c",
                    top: "0%",
                    scaleBy: "fit.in",
                },
            },
        },
        {
            name: "bet_options_selector",
            alignIn: "c",
            align: "c",
            width: "80%",
            height: "80%",
            scaleBy: "fit.in",
            avoidBounding: "yes",
            aspects: {
                "1920/4157": {
                    top: "25%",
                },
                "1920/3408": {
                    top: "15%",
                },
                "1920/2561": {
                    top: "0%",
                },
                "1920/1440": {
                    top: "0%",
                },
                "1920/1082": {
                    top: "0%",
                },
                "1920/887": {
                    top: "0%",
                },
            },
        },
    ],
    aspects: {
        "1920/4157": {
            width: "92%",
        },
        "1920/3408": {
            width: "100%",
        },
        "1920/2561": {
            width: "100%",
        },
        "1920/1440": {
            width: "90%",
        },
        "1920/1082": {
            width: "100%",
        },
        "1920/887": {
            width: "100%",
        },
    },
};
const reelBoxAndWheelContrainer: PartialLayout = {
    name: "reelBoxAndWheelContrainer",
    extend: "box",
    height: "90%",
    width: "100%",
    display: "fixed",
    alignIn: "c",
    layouts: [
        reelBoxContainer,
        {
            name: "free_spins_counter",
            scaleBy: "fit.in",
            avoidBounding: "yes",
            align: "tl",
            height: "20%",
            aspects: {
                "1920/4157": {
                    top: "18%",
                    left: "1.5%",
                    width: "15%",
                },
                "1920/3408": {
                    top: "18%",
                    left: "1.5%",
                    width: "15%",
                },
                "1920/2561": {
                    top: "0%",
                    left: "2%",
                    width: "15%",
                },
                "1920/1440": {
                    top: "20%",
                    left: "-15%",
                    width: "15%",
                },
                "1920/1082": {
                    top: "18%",
                    left: "-10%",
                    width: "15%",
                },
                "1920/887": {
                    top: "18%",
                    left: "0%",
                    width: "15%",
                },
            },
        },
    ],
};
const centerGameBody: PartialLayout = {
    name: "centerGameBody",
    extend: "box",
    sortBy: "vertical",
    display: "relative",
    layouts: [
        reelBoxAndWheelContrainer,
        {
            name: "messageBar",
            avoidBounding: "yes",
            scaleBy: "fit.in",
            alignIn: "c",
            left: "10%",
            top: "0%",
            width: "80%",
            height: "10%",
        },
    ],
    aspects: {
        "1920/4157": {
            width: "100%",
            height: "65%",
            left: "0%",
        },
        "1920/3408": {
            width: "100%",
            height: "70%",
            left: "0%",
        },
        "1920/2561": {
            width: "100%",
            height: "80%",
            left: "0%",
        },
        "1920/1440": {
            width: "64%",
            height: "100%",
            left: "-0.5%",
        },
        "1920/1082": {
            width: "60%",
            height: "100%",
            left: "0%",
        },
        "1920/887": {
            width: "60%",
            height: "100%",
            left: "0%",
        },
    },
};
const gameBody: PartialLayout = {
    name: "gameBody",
    extend: "box",
    display: "relative",
    width: "100%",
    layouts: [
        leftSideBox,
        centerGameBody,
        rightSideBox,
    ],
    aspects: {
        "1920/4157": {
            sortBy: "vertical",
            height: "80%",
        },
        "1920/3408": {
            sortBy: "vertical",
            height: "80%",
        },
        "1920/2561": {
            sortBy: "vertical",
            height: "78%",
        },
        "1920/1440": {
            sortBy: "horizontal",
            height: "76.5%",
        },
        "1920/1082": {
            sortBy: "horizontal",
            height: "75%",
        },
        "1920/887": {
            sortBy: "horizontal",
            height: "75%",
        },
    },

};

export const treesLayout: PartialLayout = {
    name: "trees",
    display: "relative",
    scaleBy: "fit.in",
    alignIn: "c",
    extend: "box",
    height: "100%",
    width: "100%",
    left: "20%",
    aspects: {
        "1920/4157": {
            top: "100%",
        },
        "1920/3408": {
            top: "100%",
        },
        "1920/2900": {
            top: "100%",
        },
        "1920/2561": {
            top: "75%",
        },
        "1920/1440": {
            top: "80%",
        },
        "1920/1220": {
            top: "95%",
        },
        "1920/1082": {
            top: "95%",
        },
        "1920/887": {
            top: "100%",
        },
    },
};

const layouts: PartialLayout = {
    name: "body",
    display: "relative",
    extend: "box",
    height: "100%",
    width: "100%",
    sortBy: "vertical",
    layouts: [
        header,
        gameBody,
        footer,
    ],
};
const mainGameLayout = {
    commonLayouts, layouts
};

export default mainGameLayout
