import {TextStyle} from 'pixi.js';
import {Settings} from './settings'

export const TextStyles = {
    normal: new TextStyle({
        fontFamily: "Noto Sans SC",
        fontSize: Settings.grid.font,
        fill: "rgb(110,110,110)"
    }),
    strong: new TextStyle({
        fontFamily: "Noto Sans SC",
        fontSize: Settings.grid.font,
        fill: "rgb(224,46,16)"
    })
};