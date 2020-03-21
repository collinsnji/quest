let GRAVITY = 1;
var displacement = 30;
var platform;
var __Platform;
let player_sprite_sheet;
let player_walk;
let player_stand;
let player_sprite;
let die;
let dieFrame;
let currentSide;

function preload() {
    loadJSON('../assets/tiles/static-tiles.json', function (tile_frames) {
        // Load tiles sprite sheet from frames array once frames array is ready
        platform = loadSpriteSheet('../assets/sprites/tiles_spritesheet.png', tile_frames);
    });
    loadJSON('../assets/tiles/hero.json', function (player_frames) {
        // Load tiles sprite sheet from frames array once frames array is ready
        player_sprite_sheet = loadSpriteSheet('../assets/sprites/ezgif.com-crop.png', player_frames);
        player_walk = loadAnimation(player_sprite_sheet);
    });
    player_stand = loadAnimation(new SpriteSheet('../assets/sprites/ezgif.com-crop.png',
        [{ 'name': 'sprite1', "frame": { "x": 0, "y": 0, "width": 50, "height": 54 } }]));
}
function setup() {
    frameRate(60);
    createCanvas(800, 400);

    __Platform = new Group();
    for (let i = 0; i < 840; i += 70) {
        let __ground = createSprite(i, 340, 70, 1)
        noFill();
        __Platform.add(__ground);
    }

    // simulate die roll
    die = createSprite(100, 200, 50, 50);
    die.scale = 0.3;
    die.addAnimation('normal', '../assets/sprites/dice_6.png');
    die.addAnimation('rolling', '../assets/sprites/dice_1.png',
        '../assets/sprites/dice_2.png',
        '../assets/sprites/dice_3.png',
        '../assets/sprites/dice_4.png',
        '../assets/sprites/dice_5.png',
        '../assets/sprites/dice_6.png');

    player_sprite = createSprite(100, 200, 50, 54);
    player_sprite.addAnimation('walk', player_walk);
    player_sprite.addAnimation('stand', player_stand);
    player_sprite.setCollider('rectangle', 0, 0, 50, 54);
    player_sprite.setSpeed(1);

    print(platform);
    print(player_sprite)

}
function draw() {
    background('black');
    // track camera location
    camera.zoom = 1.2;
    camera.position.x = player_sprite.position.x + 10;
    camera.position.y = player_sprite.position.y - 80;
    die.position.x = player_sprite.position.x;
    die.position.y = player_sprite.position.y - 200;

    // lets simulate gravity
    player_sprite.velocity.y += GRAVITY;
    if (player_sprite.collide(__Platform)) {
        GRAVITY = 0;
        player_sprite.velocity.y = 0;
    }
    for (var x = 0; x < 840 * 2; x += 70) {
        platform.drawFrame('snow.png', x, 340);
        platform.immovable = true;
        fill('white');
        text(x / 70, x + 30, 330);
    }

    // Draw the sign tiles
    platform.drawFrame('signRight.png', 0, 270);
    platform.drawFrame('signExit.png', 1400, 270);
    platform.drawFrame('tochLit2.png', 700, 270);
    // motion 
    if (keyDown('d')) {
        player_sprite.changeAnimation('walk');
        player_sprite.mirrorX(1);
        player_sprite.velocity.x = 2;
    }
    else if (keyDown('a')) {
        player_sprite.changeAnimation('walk');
        player_sprite.mirrorX(-1);
        player_sprite.velocity.x = -2;
    }
    else {
        player_sprite.changeAnimation('stand');
        player_sprite.velocity.x = 0;
    }
    // simulate die animation
    if (mouseIsPressed) {
        die.changeAnimation('rolling');
        dieFrame = die.animation.getFrame();
        print(dieFrame);
    }
    else {
        if (dieFrame) {
            die.animation.goToFrame(dieFrame);
            currentSide = dieFrame;
            dieFrame = null;
        }
        else { die.changeAnimation('normal'); dieFrame = null; };
    }
    drawSprites();
}
