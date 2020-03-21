var spriteSheet;
// a sprite sampling from sprite sheet
var mario;

// 8 frames in the spritesheet
var numSprites = 12;
// each sprite in the sheet has this bounding box
var spriteWidth = 42;
var spriteHeight = 48;
// start frame
var spriteIndex = 1;

function setup() {
    createCanvas(300, 300);
    frameRate(24);
    noSmooth();
    noFill();
    spriteSheet = loadImage("../assets/sprites/HeroKnight.png");
    // create an image to draw a single sprite into
    mario = createImage(spriteWidth, spriteHeight);
}
// set all pixels (R,G,B,A) to the same value (e.g. clear image with a colour)
function setAllPixels(image, brightness) {
    // prep. pixels for manipulation
    image.loadPixels();
    let numPixels = image.pixels.length;
    // loop through all pixels (spriteWidth * spriteHeight * colourChannels(4))
    for (let i = 0; i < numPixels; i++) {
        image.pixels[i] = brightness;
    }
    // commit value changes to image: updates it all in one go, more efficient than set()
    image.updatePixels();
}

function draw() {
    // clear frame
    background(255);
    // display the whole sprite sheet
    image(spriteSheet, 0, 0);
    // increment sprite index
    spriteIndex++;
    // reset sprite index if out of bounds
    if (spriteIndex >= numSprites) {
        spriteIndex = 0;
    }
    // visualise sprite copy rect
    rect(spriteIndex * spriteWidth, 0, spriteWidth, spriteHeight);

    // clear mario image
    setAllPixels(mario, 255);
    // copy pixels from sprite sheet into sprite
    // copy (source image, source coordinates(x,y,w,h), destination coordiantes (x,y,w,h) )
    mario.copy(spriteSheet,
        spriteIndex * spriteWidth, 0, spriteWidth, spriteHeight,
        0, 0, spriteWidth, spriteHeight);

    // display mario sprite
    image(mario, mouseX, mouseY + spriteHeight);
}