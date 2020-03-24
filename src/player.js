export default class Player {
    constructor(name = '') {
        this.name = name.toString().toUpperCase();
        this.score = 0;
        this.sprite = null;
        this.turn = true;
        this.spritesheet = '';
        this.spriteAnimation = {
            walk: null,
            idle: null
        };
        this.collectibles = [];
        this.lives = {
            value: 3,
            img: '../assets/sprites/life.png',
            sprite: []
        }
        this.attack = {
            img: '../assets/props/fire.gif',
            ammunition: null,
            power: null
        }
    }
    Preload(options = { atlas: '../assets/tiles/player_1.json', spritesheet: '../assets/sprites/player_1.png', idleFrame: [{ 'name': 'sprite1', "frame": { "x": 0, "y": 0, "width": 50, "height": 54 } }] }) {
        p5.loadJSON(options.atlas, (player_frames) => {
            this.spritesheet = p5.loadSpriteSheet(options.spritesheet, player_frames);
            this.spriteAnimation.walk = p5.loadAnimation(this.spritesheet);
            this.spriteAnimation.idle = p5.loadAnimation(new p5.SpriteSheet(options.spritesheet, options.idleFrame));
        });
        return this;
    }
    PlayerSetup(x = 150, y = 200) {
        this.attack.ammunition = new p5.Group();
        // Player lives 
        for (let i = 0; i < this.lives.value; i++) {
            this.lives.sprite[i] = p5.createSprite(5, 5);
            this.lives.sprite[i].addImage(p5.loadImage(this.lives.img));
        }
        this.sprite = p5.createSprite(x, y, 50, 54);
        this.sprite.addAnimation('walk', this.spriteAnimation.walk);
        this.sprite.addAnimation('idle', this.spriteAnimation.idle);
        this.sprite.setCollider('rectangle', 0, 0, 50, 62);
        return this;
    }
    DrawPlayer(Config, options = { livesPos: 'top' }) {
        // first, draw the player's lives
        let positionOffset = null;
        // draw lives
        p5.fill('white');
        p5.textAlign(p5.CENTER, p5.CENTER);
        for (let i = 0; i < this.lives.sprite.length; i++) {
            positionOffset = (350 - (i * 40));
            this.lives.sprite[i].scale = 0.1;

            if (options.livesPos == 'top') {//? {
                this.lives.sprite[i].position.x = this.sprite.position.x - positionOffset;
                this.lives.sprite[i].position.y = this.sprite.position.y - 250;
                p5.text(this.name, this.sprite.position.x - 220, this.sprite.position.y - 250);
                p5.text('Score: ' + this.score, this.sprite.position.x - 220, this.sprite.position.y - 260);
            } else {
                this.lives.sprite[i].position.x = this.sprite.position.x + positionOffset
                this.lives.sprite[i].position.y = this.sprite.position.y - 250;
                p5.text(this.name, this.sprite.position.x + 220, this.sprite.position.y - 250);
                p5.text('Score: ' + this.score, this.sprite.position.x + 220, this.sprite.position.y - 260);
            }
        }
        this.sprite.velocity.y = Config.GRAVITY;
        if (this.sprite.overlap(Config.__PLATFORM__)) {
            this.sprite.velocity.y = 0;
        } else {
            this.sprite.velocity.y = Config.GRAVITY;
        }
        return this;
    }
    AddControls(controls = { up: 'w', left: 'a', right: 'd' }) {
        if (p5.keyDown(controls.right)) {
            this.sprite.changeAnimation('walk');
            this.sprite.mirrorX(1);
            this.sprite.velocity.x = 2;
        }
        else if (p5.keyDown(controls.left)) {
            this.sprite.changeAnimation('walk');
            this.sprite.mirrorX(-1);
            this.sprite.velocity.x = -2;
        }
        else if (p5.keyDown(controls.up)) {
            if (Math.abs(this.sprite.velocity.y) > 12) this.sprite.velocity.y = -12;

            this.sprite.velocity.y = -9.8;
        }
        else {
            this.sprite.changeAnimation('idle');
            this.sprite.velocity.x = 0;
        }
        return this;
    }
    State(EnemyGroup = null) {
        // the player fell off the platform. die
        if (this.sprite.position.y > p5.height && this.lives.value > 0) {
            this.lives.sprite.pop().remove();
            this.lives.value -= 1;
            this.Reset();
        }
        if (this.lives.value <= 0) {
            p5.allSprites.clear();
            document.querySelector('h1').innerHTML = "Game Over";
            document.querySelector('.description').innerHTML = "Press Ctrl+R to Start a New Game";
            p5.noLoop();
        }
        return this;
    }
    Armed(key) {
        if (p5.keyWentDown(key)) {
            let fire = p5.createSprite(this.sprite.position.x, this.sprite.position.y);
            fire.addImage(p5.loadImage(this.attack.img));
            fire.rotation = 90;
            fire.setSpeed(10, this.sprite.getDirection());
            fire.life = 100;
            this.attack.ammunition.add(fire);
        }
        return this;
    }
    Collision(Enemy) {
        this.attack.ammunition.overlap(Enemy, (curr, col) => {
            this.State();
            curr.remove();
            col.remove();
            this.score += 10;
        });
        return this;
    }
    Reset() {
        this.sprite.position.x = 150;
        this.sprite.position.y = 200;
    }
}