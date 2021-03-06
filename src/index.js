import { Config, __Player__, DieObject } from "./config";
import Player from './player';
import Enemy from './enemy';
import p5 from 'p5/lib/p5';
import 'p5/lib/addons/p5.play';

window.playerOneName = null || 'Collin';
window.playerTwoName = null || 'Lindsey';

const Quest = (p5) => {
    window.p5 = p5;
    let PlayerOne = new Player(playerOneName);
    let PlayerTwo = new Player('Lindsey');

    let Villain = new Enemy();

    p5.preload = () => {
        p5.loadJSON('../assets/tiles/static-tiles.json', function (tile_frames) {
            Config.PLATFORM = p5.loadSpriteSheet('../assets/sprites/tiles_spritesheet.png', tile_frames);
        });

        PlayerOne.Preload();
        PlayerTwo.Preload({
            atlas: '../assets/tiles/player_2.json',
            spritesheet: '../assets/sprites/player_2.png',
            idleFrame: [{ 'name': 'sprite1', "frame": { "x": 0, "y": 1, "width": 47, "height": 56 } }]
        });
        Villain.Preload();
    }
    p5.setup = () => {
        p5.frameRate(60);
        p5.createCanvas(800, 400);
        PlayerOne.PlayerSetup(150, 200);
        PlayerTwo.PlayerSetup(200, 200);
        Villain.CreateEnemy(300, 250, 4);

        // create Platforms
        Config.__PLATFORM__ = new p5.Group();
        let s = 0;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 840; i += 70) {
                Config.GROUND = p5.createSprite(i + s, 340 - (j * 150), 70, 0.000000000000001);
                Config.GROUND.debug = p5.mouseIsPressed;
                Config.__PLATFORM__.add(Config.GROUND);
            }
            s += 840;
        }
        // simulate DieObject.die roll
        DieObject.die = p5.createSprite(100, 200, 50, 50);
        DieObject.die.scale = 0.3;
        DieObject.die.addAnimation('normal', DieObject.side[6]);
        DieObject.die.addAnimation('rolling', DieObject.side[1], DieObject.side[2], DieObject.side[3], DieObject.side[4], DieObject.side[5], DieObject.side[6]);
    }

    p5.draw = () => {
        p5.background('black');
        PlayerOne.State();
        PlayerTwo.State();

        if (Villain.enemyGroup.length === 0 && PlayerOne.score > PlayerTwo.score) {
            p5.text("Player 1 Wins");
            p5.noLoop();
        }
        if (Villain.enemyGroup.length === 0 && PlayerTwo.score > PlayerOne.score) {
            p5.text("Player 2 Wins");
            p5.noLoop();
        }
        let offSet = 0;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 840; i += 70) {
                Config.PLATFORM.drawFrame(Config.PLATFORM_TYPE[j], i + offSet, 340 - (j * 150));
                Config.PLATFORM.immovable = true;
            }
            offSet += 840;
        }
        PlayerOne.DrawPlayer(Config, { livesPos: 'top' })
            .AddControls()
            .Armed('space')
            .Collision(Villain.enemyGroup);
        PlayerTwo.DrawPlayer(Config, { livesPos: 'bottom' })
            .AddControls({ up: p5.UP_ARROW, left: p5.LEFT_ARROW, right: p5.RIGHT_ARROW })
            .Armed('enter')
            .Collision(Villain.enemyGroup);

        Villain.RenderEnemy(Config, PlayerOne);
        Villain.RenderEnemy(Config, PlayerTwo);

        p5.camera.position.x = PlayerOne.sprite.position.x + 10;
        p5.camera.position.y = PlayerOne.sprite.position.y - 80;

        // Die
        DieObject.die.position.x = p5.camera.position.x;
        DieObject.die.position.y = p5.camera.position.y - 170;
        // Draw the sign tiles
        Config.PLATFORM.drawFrame('signRight.png', 0, 270);
        Config.PLATFORM.drawFrame('signExit.png', 2100, 100);
        Config.PLATFORM.drawFrame('tochLit2.png', 700, 270);

        // simulate DieObject.die animation
        if (p5.mouseIsPressed && PlayerOne.turn) {
            DieObject.die.changeAnimation('rolling');
            DieObject.dieFrame = DieObject.die.animation.getFrame();
            PlayerOne.attack.power = DieObject.dieFrame;
            PlayerOne.turn = !PlayerOne.turn;
            PlayerTwo.turn = true;
        }
        else if (p5.mouseIsPressed && PlayerTwo.turn) {
            DieObject.die.changeAnimation('rolling');
            DieObject.dieFrame = DieObject.die.animation.getFrame();
            PlayerTwo.attack.power = DieObject.dieFrame;
            PlayerTwo.turn = !PlayerTwo.turn;
            PlayerOne.turn = true;
        }
        else {
            if (DieObject.dieFrame) {
                DieObject.die.animation.changeFrame(DieObject.dieFrame);
                DieObject.currentSide = DieObject.dieFrame;
            }
            else { DieObject.die.changeAnimation('normal'); DieObject.dieFrame = null; };
        }
        p5.drawSprites();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('form-input').style.display = 'none';
        (document.getElementById('p1').value.length > 3) ? playerOneName = document.getElementById('p1').value : playerOneName = 'Player 1';
        (document.getElementById('p2').value.length > 3) ? playerTwoName = document.getElementById('p2').value : playerTwoName = 'Player 2';
        new p5(Quest);
    });
})
