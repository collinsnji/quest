
export const Config = {
    MARGIN: 0,
    MAX_ENEMY: 2,
    LEVELS: 10,
    PAUSE: false,
    CURRENT_LEVEL: 0,
    ENEMY_COUNTDOWN: 300,
    BACK_GROUND: null,
    GAME_INIT: false,
    BACK_GROUND_SPEED: 3.5,
};

//The Player Object
export const Player = {
    hero: null,
    score: 0,
    sprite: '../assets/sprites/hero.png',
    lives: {
        value: 3,
        img: '../assets/live.png',
        sprite: []
    }
};

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
