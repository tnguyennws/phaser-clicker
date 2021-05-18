import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    init()
    {

    }

    preload()
    {
        this.load.image('nws', 'assets/logo.png')

        this.load.image('dev', 'assets/logo_dev.png')
        this.load.image('market', 'assets/logo_market.png')
        this.load.image('design', 'assets/logo_web.png')
    }

    create()
    {
        var nws = this.add.image(300, 400, "nws").setScale(0.2);

        nws.setInteractive();

        nws.on(
            "pointerdown",
            function() {
              this.scene.start("listlevelm1");
            },
            this
        );

        var dev = this.add.image(1000, 150, "dev").setScale(1);

        dev.setInteractive();

        dev.on(
            "pointerdown",
            function() {
              
            },
            this
        );

        var market = this.add.image(1000, 450, "market").setScale(1);

        market.setInteractive();

        market.on(
            "pointerdown",
            function() {
              
            },
            this
        );

        var design = this.add.image(1000, 750, "design").setScale(1);

        design.setInteractive();

        design.on(
            "pointerdown",
            function() {
              
            },
            this
        );
    }

    update()
    {

    }

}