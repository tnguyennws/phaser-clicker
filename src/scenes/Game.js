import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    saveFile(){
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
        console.log("Fichier enregistré");
        localStorage.setItem('saveFile',JSON.stringify(file));
    };

    loadFile(){
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

    deleteFile(){
        localStorage.removeItem('saveFile');
    };


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

        this.load.image('sauvegarde', 'assets/sauvegarde.png')
        this.load.image('telecharger', 'assets/telecharger.png')
        this.load.image('delete', 'assets/trash.png')
        
    }

    create()
    {
        this.labelScore = this.add.text(20, 20, "Score: 0", {font: "50px Times New Roman", fill: "#FFE200"} );

        this.labelMarket = this.add.text(860, 460, "Market: 0", {font: "30px Times New Roman", fill: "#FF91A9"} );
        this.labelDev= this.add.text(860, 180, "Dev: 0", {font: "30px Times New Roman", fill: "#FFE200"} );
        this.labelDesign = this.add.text(860, 770, "Design: 0", {font: "30px Times New Roman", fill: "#00CFFF"} );

        this.labelPointPerClick = this.add.text(0, 800, "Point par Clique: 1", {font: "30px Times New Roman", fill: "#FF91A9"} );
        this.labelTemps = this.add.text(0, 750, "Points toutes les : ", {font: "30px Times New Roman", fill: "#FFE200"} );
        this.labelPointsTemps = this.add.text(0, 850, "nombre de point(s) par tic  : ", {font: "30px Times New Roman", fill: "#00CFFF"} );

        this.coutmarket = this.add.text(860, 380, "Cout Market: 10", {font: "30px Times New Roman", fill: "#FF91A9"} );
        this.coutdev = this.add.text(860, 90, "Cout Dev: 10", {font: "30px Times New Roman", fill: "#FFE200"} );
        this.coutdesign = this.add.text(860, 690, "Cout Design: 10", {font: "30px Times New Roman", fill: "#00CFFF"} );

        var sauvegarde = this.add.image(1230, 45, "sauvegarde").setScale(0.1);

        sauvegarde.setInteractive();
        sauvegarde.on(
            "pointerdown",
            function(){
                this.saveFile();
            },
            this
        );

        var telecharger = this.add.image(1300, 45, "telecharger").setScale(0.1);

        telecharger.setInteractive();
        telecharger.on(
            "pointerdown",
            function(){
                this.loadFile();
            },
            this
        );

        var supprimer = this.add.image(1300, 850, "delete").setScale(0.1);

        supprimer.setInteractive();
        supprimer.on(
            "pointerdown",
            function(){
                if (window.confirm("Voulez vous supprimez ????.")) {
                    this.deleteFile();
                }

            },
            this
        );

        var nws = this.add.image(300, 400, "nws").setScale(0.2);

        nws.setInteractive();

        nws.on(
            "pointerdown",
            function() {
                this.score += (this.levelmarket * 0.1) + 1;
                localStorage.setItem('score', this.score);
            },
            this
        );

        var dev = this.add.image(750, 150, "dev").setScale(1);

        dev.setInteractive();

        dev.on(
            "pointerdown",
            function() {
                if(this.score >= this.prixdev){
                    this.score  -= this.prixdev;
                    this.leveldev = this.leveldev + 1;
                    this.prixdev += this.prixdev * 0.1;
                    localStorage.setItem('score', this.score);
                    localStorage.setItem('leveldev', this.leveldev);
                    localStorage.setItem('prixdev', this.prixdev);
                }
            },
            this
        );

        var market = this.add.image(750, 450, "market").setScale(1);

        market.setInteractive();

        market.on(
            "pointerdown",
            function() {
                if(this.score >= this.prixmarket){
                    this.score  -= this.prixmarket;
                    this.levelmarket = this.levelmarket + 1;
                    this.prixmarket += this.prixmarket * 0.1;
                    localStorage.setItem('score', this.score);
                    localStorage.setItem('levelmarket', this.levelmarket);
                    localStorage.setItem('prixmarket', this.prixmarket);
                    
                }
            },
            this
        );

        var design = this.add.image(740, 750, "design").setScale(1);

        design.setInteractive();

        design.on(
            "pointerdown",
            function() {
                if(this.score >= this.prixdesign){
                    this.score  -= this.prixdesign;
                    this.leveldesign = this.leveldesign + 1;
                    this.prixdesign += this.prixdesign * 0.1;
                    this.temps = 0.99 * this.temps;
                    localStorage.setItem('score', this.score);
                    localStorage.setItem('leveldesign', this.leveldesign);
                    localStorage.setItem('prixdesign', this.prixdesign);
                    localStorage.setItem('temps', this.temps);
                }
            },
            this
        );
    }

    update(time, delta)
    {
      // ZONE DE TEXTE
      this.labelScore.text = "Score:" + this.score.toFixed(2); // affichage du score
      this.labelMarket.text = "Market:" + this.levelmarket; // affichage du score
      this.labelDev.text = "Dev:" + this.leveldev; // affichage du score
      this.labelDesign.text = "Design:" + this.leveldesign; // affichage du score
      this.labelPointsTemps.text =
        "Nombre de point(s) par tic :" + this.leveldev; // affichage du score
      this.labelTemps.text =
        "Points toutes les :" + (this.temps / 1000).toFixed(3) + " seconde"; // affichage du score
      this.labelPointPerClick.text =
        "Points par clique:" + (1 + this.levelmarket * 0.1); // affichage du score
      this.coutmarket.text = "Cout Market:" + this.prixmarket.toFixed(2); // affichage du score
      this.coutdev.text = "Cout Dev:" + this.prixdev.toFixed(2); // affichage du score
      this.coutdesign.text = "Cout Design:" + this.prixdesign.toFixed(2); // affichage du score
      //this.timer = this.time.events.loop(200, this.score += (this.leveldev * 1 ), this);


      this.timer += delta;
      
      while (this.timer > this.temps) {
        this.timer -= this.temps;
        this.score += 1 * this.leveldev;
        localStorage.setItem('score', this.score);
      }
    }
    
}