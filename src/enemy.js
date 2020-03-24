export default class Enemy {
    constructor() {
        this.enemyGroup = null;
        this.spritesheet = '';
        this.spriteAnimation = {
            walk: null,
            attack: null
        };
        this.lives = {
            value: 3,
            img: '../assets/sprites/life.png',
            sprite: []
        }
    }
    Preload(options = { atlas: '../assets/tiles/enemy_small.json', spritesheet: '../assets/sprites/enemy.png', idleFrame: [{ 'name': 'sprite4', "frame": { "x": 412, "y": 62, "width": 45, "height": 50 } }] }) {
        p5.loadJSON(options.atlas, (player_frames) => {
            this.spritesheet = p5.loadSpriteSheet(options.spritesheet, player_frames);
            this.spriteAnimation.walk = p5.loadAnimation(this.spritesheet);
            this.spriteAnimation.attack = p5.loadAnimation(new p5.SpriteSheet(options.spritesheet, options.idleFrame));
        });
    }
    CreateEnemy(x = 150, y = 200, numberOfEnemies = 3) {
        // Player lives
        this.enemyGroup = new p5.Group();
        for (let i = 0; i < numberOfEnemies; i++) {
            let __enemy = p5.createSprite(p5.random(x * i / 2, p5.width - 100), y, 45, 50);
            __enemy.addAnimation('walk', this.spriteAnimation.walk);
            __enemy.addAnimation('attack', this.spriteAnimation.attack);
            __enemy.setCollider('rectangle', 0, 0, 45, 50);
            this.enemyGroup.add(__enemy);
        }
    }
    AttackMode(Player, Enemy) {
        Enemy.overlap(Player.sprite, (curr, col) => {

            // if (col.sprite.position.y > p5.height && this.lives.value > 0) {
            //     col.lives.sprite.pop().remove();
            //     col.lives.value -= 1;
            //     col.sprite.position.x = 150;
            //     col.sprite.position.y = 200;
            // }
            Player.State();
        });

        if (Math.abs(Enemy.position.x - Player.sprite.position.x) <= 250) {
            Enemy.changeAnimation('walk');
            Enemy.attractionPoint(0.1, Player.sprite.position.x, Player.sprite.position.y);
            if (Enemy.position.x > Player.sprite.position.x) {
                Enemy.mirrorX(-1);
            }
            else {
                Enemy.mirrorX(1);
            }
            //Enemy.velocity.x = 2;
        }
        else {
            Enemy.changeAnimation('attack');
            Enemy.setSpeed(0);
        }
        if (Enemy.position.y > p5.height) {
            Enemy.remove();
        }
    }

    RenderEnemy(Config, P) {
        this.enemyGroup.forEach(e => {
            this.AttackMode(P, e);
            e.velocity.y = Config.GRAVITY;
            if (e.overlap(Config.__PLATFORM__)) {
                e.velocity.y = 0;
            } else {
                e.velocity.y = Config.GRAVITY;
            }
        })
    }
}