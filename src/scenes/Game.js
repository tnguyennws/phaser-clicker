import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    init()
    {
        this.score = 0;
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
        this.labelScore = this.add.text(20, 20, "score: 0", {font: "30px Arial", fill: "#ffff"} );
        var nws = this.add.image(300, 400, "nws").setScale(0.2);

        nws.setInteractive();

        nws.on(
            "pointerdown",
            function() {
              this.score = this.score + 1
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
        console.log(this.score)
        this.labelScore.text = "score:" + this.score;// affichage du score
    }

    setScore = function(){
        Game.scene.score = parseInt(localStorage.getItem('score')) || 0;
        Game.scene.scoreTxt.setText(Game.scene.score);
    };

    saveFile = function(){
        var file = {
            score: Game.scene.score,
            visits: Game.scene.visits
        };
        localStorage.setItem('saveFile',JSON.stringify(file));
    };

    loadFile = function(){
        var file = JSON.parse(localStorage.getItem('saveFile'));
        Game.scene.score = file.score;
        Game.scene.visits = file.visits;
    };

}