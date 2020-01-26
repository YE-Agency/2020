import {Vector} from './Math/Vector'

export const GridPresets = {
    small: {
        cell: 20,
        font: 14,
        mouseSizeFactor: 4,
    },
    medium: {
        cell: 25,
        font: 18,
        mouseSizeFactor: 3.5,
    },
    large: {
        cell: 28,
        font: 20,
        mouseSizeFactor: 3.5,
    }
};

export const Settings = {
    sentence: 
    "•BONNE•ANNÉE•2020•ANNÉE•DU•RAT•2020•NOUS•VOUS•SOUHAITONS•DE•BIEN•MANGER•ET•D•APPRÉCIER•CHAQUE•" +
    "JOUR•LES•BONHEURS•SIMPLES•DE•LA•VIE•2020••" +
    "•真心祝您在2020年平安快乐•身体健康•愿您所有的梦想都能在鼠年得以实现•鼠你好运！••" + 
    "•祝您及家人新年快乐•吃好喝好身体好！••",
    grid: GridPresets.medium,
    gridOffset: new Vector(),
    discoveryZones: {
        2: [
            new Vector(0, 1),
            new Vector(0, -1),
            new Vector(1, 0),
            new Vector(-1, 0)
        ]
    },
    letterSkippedFrames: 5,
    mouses: {
        maxAmount: 6,
        textures: {}
    },
    spritesheets: {
        red: {
            color: "#e41b14",
            frames: [
                {"x": 0, "y": 0, "w": 180, "h": 180},
                {"x": 180, "y": 0, "w": 180, "h": 180}
            ],
            pivot: new Vector()
        },
        blue: {
            color: "#1e4af3",
            frames: [
                {"x": 360, "y": 0, "w": 180, "h": 180},
                {"x": 540, "y": 0, "w": 180, "h": 180}
            ],
            pivot: new Vector()
        },
        yellow: {
            color: "#fdcb34",
            frames: [
                {"x": 720, "y": 0, "w": 180, "h": 180},
                {"x": 900, "y": 0, "w": 180, "h": 180}
            ],
            pivot: new Vector()
        },
        green: {
            color: "#24b745",
            frames: [
                {"x": 1080, "y": 0, "w": 180, "h": 180},
                {"x": 1260, "y": 0, "w": 180, "h": 180}
            ],
            pivot: new Vector()
        },
    }
};

export const Globals = {
    scene: null,
    letterManager: null,
    container: null,
    app: null,
    mouses: [],
    startedAt: 0,
    frame: 0,
};
