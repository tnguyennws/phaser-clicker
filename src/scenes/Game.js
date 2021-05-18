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
        this.leveldev = 0;
        this.leveldesign = 0;
        this.prixmarket = 10;
        this.prixdev = 10;
        this.prixdesign = 10;
        this.temps = 1000;
        this.timer = 0;
       
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
        this.labelDev= this.add.text(900, 260, "Dev: 0", {font: "30px Arial", fill: "#ffff"} );
        this.labelDesign = this.add.text(900, 850, "Design: 0", {font: "30px Arial", fill: "#ffff"} );
        this.coutmarket = this.add.text(900, 300, "Cout Market: 10", {font: "30px Arial", fill: "#ffff"} );
        this.coutdev = this.add.text(900, 0, "Cout Dev: 10", {font: "30px Arial", fill: "#ffff"} );
        this.coutdesign = this.add.text(900, 620, "Cout Design: 10", {font: "30px Arial", fill: "#ffff"} );
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
                if(this.score >= this.prixdev){
                    this.score  -= this.prixdev
                    this.leveldev = this.leveldev + 1;
                    this.prixdev += this.prixdev * 0.1
                    
                }
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
                if(this.score >= this.prixdesign){
                    this.score  -= this.prixdesign
                    this.leveldesign = this.leveldesign + 1;
                    console.log("level market " + this.leveldesign)
                    this.prixdesign += this.prixdesign * 0.1
                    this.temps = 0.99 * this.temps
                    console.log(this.temps)
                }
            },
            this
        );
    }

    update(time, delta)
    {

        this.labelScore.text = "Score:" + this.score.toFixed(2);// affichage du score
        this.labelMarket.text = "Market:" + this.levelmarket;// affichage du score
        this.labelDev.text = "Dev:" + this.leveldev;// affichage du score
        this.labelDesign.text = "Design:" + this.leveldesign;// affichage du score
        this.coutmarket.text = "Cout Market:" + this.prixmarket.toFixed(2);// affichage du score
        this.coutdev.text = "Cout Dev:" + this.prixdev.toFixed(2);// affichage du score
        this.coutdesign.text = "Cout Design:" + this.prixdesign.toFixed(2);// affichage du score
        //this.timer = this.time.events.loop(200, this.score += (this.leveldev * 1 ), this);

        this.timer += delta;
        while (this.timer > this.temps) {

            this.timer -= this.temps;
            this.score += 1 * this.leveldev
        }
        console.log(this.score)
    }

    setScore = function(){
        Game.scene.score = parseInt(localStorage.getItem('score')) || 0;
        Game.scene.scoreTxt.setText(Game.scene.score);
    };



    saveFile = function(){
        var file = {
            score: this.score,
            levelmarket: this.levelmarket,
            leveldev: this.leveldev,
            leveldesign: this.leveldesign,
            prixmarket: this.prixmarket,
            prixdev: this.prixdev,
            prixdesign: this.prixdesign,
            temps: this.temps,
            timer: this.timer

        };
        localStorage.setItem('saveFile',JSON.stringify(file));
    };

    loadFile = function(){
        var file = JSON.parse(localStorage.getItem('saveFile'));
        this.score = file.score;
        this.levelmarket = file.levelmarket;
        this.leveldesign = file.leveldesign;
        this.leveldev = file.leveldev;
        this.prixdesign = file.prixdesign;
        this.prixdev = file.prixdev;
        this.prixmarket = file.prixmarket;
        this.temps = file.temps;
        this.timer = file.timer;

    };
    
}