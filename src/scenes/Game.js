import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    // --------------- GESTION DES DONNEES --------------------
    //Fonction de sauvegarde dans le local storage
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
          timer: this.timer,
        };
        console.log("Fichier enregistré");
        localStorage.setItem('saveFile',JSON.stringify(file));
    };

    //Fonction de chargement depuis le local storage
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

    //Deletion de la sauvegarde
    deleteFile(){
        localStorage.removeItem('saveFile');
    };

    //----------------- INIT ----------------
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
        //Preload des assets
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
        //Affichage des points
        this.labelScore = this.add.text(20, 20, "NWS Coins : 0", {font: "50px Times New Roman", fill: "#FFE200"} );

        //Affichage des quantités d'élèves
        this.labelMarket = this.add.text(860, 460, "Marketeux: 0", {font: "30px Times New Roman", fill: "#F0553E"} );
        this.labelDev= this.add.text(860, 180, "Dev: 0", {font: "30px Times New Roman", fill: "#FEC70C"} );
        this.labelDesign = this.add.text(860, 770, "Design: 0", {font: "30px Times New Roman", fill: "#00B1AB"} );

        //Affichage des bonus totaux
        this.labelPointPerClick = this.add.text(0, 800, "Point par clique: 1", {font: "30px Times New Roman", fill: "#FF91A9"} );
        this.labelTemps = this.add.text(0, 750, "Point(s) toutes les : ", {font: "30px Times New Roman", fill: "#FFE200"} );
        this.labelPointsTemps = this.add.text(0, 850, "Nombre de point(s) par tick  : ", {font: "30px Times New Roman", fill: "#00CFFF"} );

        //Affichage du niveau des bonus
        this.coutmarket = this.add.text(860, 380, "Coût Marketeux: 10", {font: "30px Times New Roman", fill: "#F0553E"} );
        this.coutdev = this.add.text(860, 90, "Coût Dev: 10", {font: "30px Times New Roman", fill: "#FEC70C"} );
        this.coutdesign = this.add.text(860, 690, "Coût Design: 10", {font: "30px Times New Roman", fill: "#00B1AB"} );

        //Bouton sauvegarde
        var sauvegarde = this.add.image(1230, 45, "sauvegarde").setScale(0.1);

        sauvegarde.setInteractive();
        sauvegarde.on(
            "pointerdown",
            function(){
                if (window.confirm("Voulez vous sauvegarder ?")) {
                    this.saveFile();
                }
                
            },
            this
        );
        
        //Bouton chargement
        var telecharger = this.add.image(1300, 45, "telecharger").setScale(0.1);

        telecharger.setInteractive();
        telecharger.on(
            "pointerdown",
            function(){                
                if (window.confirm("Voulez vous charger la sauvegarde ?")) {
                    this.loadFile();
                }
                
            },
            this
        );
        
        //Bouton suppression
        var supprimer = this.add.image(1300, 850, "delete").setScale(0.1);

        supprimer.setInteractive();
        supprimer.on(
            "pointerdown",
            function(){
                if (window.confirm("Voulez vous supprimer ?")) {
                    this.deleteFile();
                }

            },
            this
        );


        //------------------- LOGO A CLIQUER ----------------
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

    //LOOP UPDATE
    update(time, delta)
    {
      // ZONE DE TEXTE
      this.labelScore.text = "NWS Coins :" + this.score.toFixed(2); 
      this.labelMarket.text = "Marketeux :" + this.levelmarket; 
      this.labelDev.text = "Dev :" + this.leveldev; 
      this.labelDesign.text = "Design :" + this.leveldesign; 
      this.labelPointsTemps.text =
        "Nombre de point(s) par tick :" + this.leveldev; 
      this.labelTemps.text =
        "Point(s) toutes les :" + (this.temps / 1000).toFixed(3) + " seconde"; 
      this.labelPointPerClick.text =
        "Points par clique :" + (1 + this.levelmarket * 0.1); 
      this.coutmarket.text = "Coût Marketeux :" + this.prixmarket.toFixed(2); 
      this.coutdev.text = "Coût Dev :" + this.prixdev.toFixed(2); 
      this.coutdesign.text = "Coût Design :" + this.prixdesign.toFixed(2); 

      //GESTION DU TIMER
      this.timer += delta;
      
      while (this.timer > this.temps) {
        this.timer -= this.temps;
        this.score += 1 * this.leveldev;
        localStorage.setItem('score', this.score);
      }
    }
    
}