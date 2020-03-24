
export const Config = {
    MARGIN: 0,
    MAX_ENEMY: 3,
    LEVELS: 10,
    PAUSE: false,
    CURRENT_LEVEL: 0,
    GRAVITY: 9.8,
    PLATFORM: null,
    __PLATFORM__: null,
    GROUND: null,
    GAME_INIT: false,
    BACK_GROUND_SPEED: 3.5,
    TWO_PLAYERS: false,
    PLATFORM_TYPE: ["sand.png", "grass.png", "snow.png"]
};

export const DieObject = {
    die: null,
    dieFrame: null,
    currentSide: null,
    side: {
        1: '../assets/sprites/dice_1.png',
        2: '../assets/sprites/dice_2.png',
        3: '../assets/sprites/dice_3.png',
        4: '../assets/sprites/dice_4.png',
        5: '../assets/sprites/dice_5.png',
        6: '../assets/sprites/dice_6.png'
    }
}


export const FX = {
    gameOver: {
        sprite: null,
        img: '../assets/game-over.png'
    },
    soundOn: {
        sprite: null,
        img: '../assets/fx/sound.png'
    },
    font: null,
};
