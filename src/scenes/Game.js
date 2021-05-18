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
        this.levelmarket = 0;
        this.prixmarket = 10;
       
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
        this.labelScore = this.add.text(20, 20, "Score: 0", {font: "30px Arial", fill: "#ffff"} );
        this.labelMarket = this.add.text(900, 580, "Market: 0", {font: "30px Arial", fill: "#ffff"} );
        this.coutmarket = this.add.text(900, 300, "Cout Market: 10", {font: "30px Arial", fill: "#ffff"} );
        var nws = this.add.image(300, 400, "nws").setScale(0.2);

        nws.setInteractive();

        nws.on(
            "pointerdown",
            function() {
                
                this.score += (this.levelmarket * 0.1) + 1;
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
                if(this.score >= this.prixmarket){
                    this.score  -= this.prixmarket
                    this.levelmarket = this.levelmarket + 1;
                    console.log("level market " + this.levelmarket)
                    this.prixmarket += this.prixmarket * 0.1
                }
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

        this.labelScore.text = "Score:" + this.score.toFixed(2);// affichage du score
        this.labelMarket.text = "Market:" + this.levelmarket;// affichage du score
        this.coutmarket.text = "Cout Market:" + this.prixmarket.toFixed(2);// affichage du score
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
    };

}